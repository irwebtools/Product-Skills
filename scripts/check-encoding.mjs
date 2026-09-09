#!/usr/bin/env node
/**
 * Fail when repository text files contain invalid UTF-8 or mojibake.
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

const cp = (...codes) => String.fromCodePoint(...codes);

// Mojibake sequences expressed only via code points (no literal corrupted glyphs in source).
const MOJIBAKE_MARKERS = [
  cp(0xe2, 0x2020, 0x2019), // misdecoded right arrow
  cp(0xe2, 0x2020, 0x201c), // misdecoded down arrow family
  cp(0xe2, 0x2020, 0x2018),
  cp(0xe2, 0x2020),
  cp(0xe2, 0x20ac, 0x201d), // misdecoded em dash
  cp(0xe2, 0x20ac, 0x201c), // misdecoded en dash
  cp(0xe2, 0x20ac, 0x2122), // misdecoded apostrophe
  cp(0xe2, 0x20ac, 0x153), // misdecoded open quote variant
  cp(0xe2, 0x20ac),
  cp(0xc3), // misdecoded e-acute style
  cp(0xc2, 0xb7), // misdecoded middle dot
  cp(0xc2, 0x20),
  '\uFFFD',
];

const errors = [];
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
      entry.name === '.editorconfig'
    ) {
      out.push(full);
    }
  }
  return out;
}

function checkFile(filePath) {
  const rel = path.relative(ROOT, filePath).split(path.sep).join('/');
  const buf = fs.readFileSync(filePath);

  if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
    errors.push(`${rel}: UTF-8 BOM present; prefer UTF-8 without BOM`);
  }

  const body = buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf ? buf.slice(3) : buf;
  let text;
  try {
    text = decoder.decode(body);
  } catch {
    errors.push(`${rel}: invalid UTF-8 byte sequence`);
    return;
  }

  if (body.includes(0x0d)) {
    errors.push(`${rel}: CRLF/CR line endings found; use LF`);
  }

  if (text.length && !text.endsWith('\n')) errors.push(`${rel}: missing newline at EOF`);

  for (const marker of MOJIBAKE_MARKERS) {
    if (text.includes(marker)) {
      errors.push(`${rel}: mojibake or replacement character detected`);
      break;
    }
  }
}

for (const file of walk(ROOT)) checkFile(file);

if (errors.length > 0) {
  for (const error of errors) console.error(`error: ${error}`);
  process.exit(1);
}

console.log('Encoding check passed.');
