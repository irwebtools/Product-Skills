#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('skills');
const errors = [];
const REQUIRED_PACKS = new Set(['product', 'delivery', 'quality']);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.isSymbolicLink() || e.name === 'node_modules') return [];
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : e.name === 'SKILL.md' ? [full] : [];
  });
}

function manifest(text, label) {
  const fields = new Map();
  let active;
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const key = line.match(/^([a-z][a-z0-9-]*)\s*:\s*(.*)$/);
    if (key) {
      active = key[1];
      if (fields.has(active)) errors.push(`${label}: duplicate field ${active}`);
      fields.set(active, key[2] === '[]' ? [] : key[2] ? key[2] : []);
      continue;
    }
    const item = line.match(/^  - (\S.*)$/);
    if (!item || !active || !Array.isArray(fields.get(active))) {
      errors.push(`${label}: unsupported manifest syntax`);
    } else {
      fields.get(active).push(item[1]);
    }
  }
  return fields;
}

const files = walk(root).filter((file) => {
  const rel = path.relative(root, path.dirname(file)).split(path.sep);
  return REQUIRED_PACKS.has(rel[0]);
});

if (!files.length) errors.push('No product/delivery/quality skills found.');

const names = new Set(files.map((f) => path.relative(root, path.dirname(f)).split(path.sep).join('/')));
const basenames = new Set([...names].map((n) => path.posix.basename(n)));

for (const file of files) {
  const dir = path.dirname(file);
  const label = path.relative(root, dir).split(path.sep).join('/');
  const name = path.basename(dir);
  const source = fs.readFileSync(file, 'utf8');
  const front = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
  if (!front || !new RegExp(`^name: *${name} *$`, 'm').test(front) || !/^description: *\S.+$/m.test(front)) {
    errors.push(`${label}: invalid name/description frontmatter`);
  }
  for (const section of ['When to use', 'Purpose', 'Inputs', 'Process', 'Outputs', 'Verification', 'Restrictions']) {
    if (!source.includes(`## ${section}`)) errors.push(`${label}: missing section ## ${section}`);
  }

  const mf = path.join(dir, 'manifest.yaml');
  if (!fs.existsSync(mf)) {
    errors.push(`${label}: missing manifest.yaml`);
    continue;
  }
  const fields = manifest(fs.readFileSync(mf, 'utf8'), label);
  for (const key of ['name', 'purpose', 'trigger', 'inputs', 'outputs', 'dependencies', 'verification']) {
    if (!fields.has(key) || (key !== 'dependencies' && !fields.get(key)?.length)) {
      errors.push(`${label}: missing or empty ${key}`);
    }
  }
  for (const key of ['trigger', 'inputs', 'outputs', 'dependencies', 'verification']) {
    if (fields.has(key) && !Array.isArray(fields.get(key))) errors.push(`${label}: ${key} must be a list`);
  }
  if (fields.get('name') !== name) errors.push(`${label}: manifest name must match folder`);
  if (Array.isArray(fields.get('dependencies'))) {
    for (const dep of fields.get('dependencies')) {
      if (!names.has(dep) && !basenames.has(dep)) errors.push(`${label}: unknown dependency ${dep}`);
    }
  }
  for (const sub of ['templates', 'examples', 'verification']) {
    const folder = path.join(dir, sub);
    if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory() || !fs.readdirSync(folder).length) {
      errors.push(`${label}: missing populated ${sub}/`);
    }
  }
}

if (errors.length) {
  errors.forEach((e) => console.error(e));
  process.exitCode = 1;
} else {
  console.log(`Skill validation passed: ${files.length} platform skills.`);
}
