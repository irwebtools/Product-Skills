#!/usr/bin/env node
/**
 * Normalize tracked text-like files to UTF-8 (no BOM) + LF.
 * Does not change semantic content beyond encoding/newlines.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const EXTENSIONS = new Set([
  '.md',
  '.yaml',
  '.yml',
  '.json',
  '.svg',
  '.txt',
  '.mjs',
  '.js',
  '.ts',
  '.tsx',
  '.css',
  '.html',
  '.toml',
]);
const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'build', '.next', 'coverage']);
const decoder = new TextDecoder('utf-8', { fatal: true });

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (
      EXTENSIONS.has(ext) ||
      entry.name === 'AGENTS.md' ||
      entry.name === 'CLAUDE.md' ||
      entry.name === 'LICENSE' ||
      entry.name === '.editorconfig' ||
      entry.name === '.gitattributes'
    ) {
      out.push(full);
    }
  }
  return out;
}

let changed = 0;
for (const file of walk(ROOT)) {
  const buf = fs.readFileSync(file);
  const hasBom = buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
  const body = hasBom ? buf.slice(3) : buf;
  let text = decoder.decode(body);
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const finalText = normalized.endsWith('\n') ? normalized : `${normalized}\n`;
  const out = Buffer.from(finalText, 'utf8');
  if (hasBom || !out.equals(buf)) {
    fs.writeFileSync(file, out);
    changed += 1;
    console.log(`normalized ${path.relative(ROOT, file).split(path.sep).join('/')}`);
  }
}
console.log(`Normalized ${changed} file(s).`);
