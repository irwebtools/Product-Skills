#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const ignored = new Set(['.git', 'node_modules', 'dist', 'build', '.next']);
const patterns = [
  /SUPABASE_SERVICE_ROLE_KEY\s*=\s*[^\s"']+/i,
  /service_role\s*[:=]\s*["'][^"']+/i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
];

const hits = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else {
      const stat = fs.statSync(full);
      if (stat.size > 1024 * 1024) continue;
      let text;
      try { text = fs.readFileSync(full, 'utf8'); } catch { continue; }
      for (const pattern of patterns) {
        if (pattern.test(text)) hits.push(path.relative(root, full));
      }
    }
  }
}
walk(root);
if (hits.length) {
  console.error('Potential privileged secret detected in:');
  for (const hit of [...new Set(hits)]) console.error(`- ${hit}`);
  process.exit(1);
}
console.log('Secret scan: no obvious privileged secret patterns found.');
