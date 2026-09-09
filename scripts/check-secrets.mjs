#!/usr/bin/env node
/**
 * Pattern-based secret scan for tracked / review files.
 *
 * Limitation: regex scanning is not complete security. It catches common
 * accidental commits of privileged material. It does not prove absence of
 * secrets, encrypted blobs, novel token formats, or secrets in binary files.
 * Never print matched secret values.
 */
import fs from 'node:fs';
import path from 'node:path';
import { reviewFiles } from './lib/review-files.mjs';

const root = process.cwd();

const patterns = [
  /\bgh[pousr]_[A-Za-z0-9]{30,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
  /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,
  /\bAKIA[A-Z0-9]{16}\b/,
  /\bASIA[A-Z0-9]{16}\b/,
  /\bsk_(?:live|test)_[A-Za-z0-9]{20,}\b/,
  /\bsk-proj-[A-Za-z0-9_-]{20,}\b/,
  /\bAIza[0-9A-Za-z\-_]{30,}\b/,
  /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/,
  /\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|secret[_-]?key|password)\s*[:=]\s*["'][^"'\s]{16,}["']/i,
  /SUPABASE_SERVICE_ROLE_KEY\s*=\s*[^\s"']+/i,
  /(?:VERCEL|OPENAI|ANTHROPIC|STRIPE)_(?:API_)?(?:KEY|TOKEN|SECRET)\s*=\s*[^\s"']{8,}/i,
  /service_role\s*[:=]\s*["'][^"']+/i,
  /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
  /-----BEGIN CERTIFICATE-----[\s\S]{200,}-----END CERTIFICATE-----/,
];

const hits = [];
for (const full of reviewFiles(root)) {
  const name = path.basename(full);
  if (/^\.env(?:\.|$)/.test(name) && !/\.(?:example|sample|template)$/.test(name)) {
    hits.push(path.relative(root, full).split(path.sep).join('/'));
    continue;
  }
  const stat = fs.statSync(full);
  if (stat.size > 1024 * 1024) continue;
  let text;
  try {
    text = fs.readFileSync(full, 'utf8');
  } catch {
    continue;
  }
  for (const pattern of patterns) {
    if (pattern.test(text)) {
      hits.push(path.relative(root, full).split(path.sep).join('/'));
      break;
    }
  }
}

if (hits.length) {
  console.error('Potential privileged secret detected in:');
  for (const hit of [...new Set(hits)]) console.error(`- ${hit}`);
  console.error('Secret values are not printed. Rotate any real credentials immediately.');
  process.exit(1);
}

console.log('Secret scan: no obvious privileged secret patterns found.');
console.log('Note: pattern scanning is incomplete; human review is still required.');
