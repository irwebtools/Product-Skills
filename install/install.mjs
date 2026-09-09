#!/usr/bin/env node
/**
 * Safe Product-Skills installer.
 *
 * Default mode never overwrites differing existing files.
 * Does not copy .git, node_modules, secrets, or execute arbitrary repo scripts.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultSourceRoot = path.resolve(__dirname, '..');

const SKIP_NAMES = new Set([
  'node_modules',
  '.git',
  '.env',
  '.env.local',
  '.env.production',
  'credentials.json',
  'secrets.json',
]);

const OWNED_HINT_FILES = [
  ['.cursor/product-skills.md', '# Cursor + product-skills\n\nRead `/AGENTS.md` and any `AGENTS.product-skills.md` first. Analyze the project, then load only required skills from `/skills` using `/skills/index.yaml`.\n'],
  ['.claude/product-skills.md', '# Claude Code + product-skills\n\nRead `/AGENTS.md` and any `AGENTS.product-skills.md` first. Canonical skills live under `/skills`.\n'],
  ['.codex/product-skills.md', '# Codex + product-skills\n\nRead `/AGENTS.md` and any `AGENTS.product-skills.md` first. Use `manifest.yaml` / `skills/index.yaml` to discover skills.\n'],
];

const COPIES = [
  ['AGENTS.md', 'AGENTS.md'],
  ['CLAUDE.md', 'CLAUDE.md'],
  ['manifest.yaml', 'manifest.yaml'],
  ['skills/index.yaml', 'skills/index.yaml'],
  ['skills/product', 'skills/product'],
  ['skills/delivery', 'skills/delivery'],
  ['skills/quality', 'skills/quality'],
  ['rules', 'rules'],
  ['templates', 'templates'],
  ['workflows', 'workflows'],
  ['.ai-review', '.ai-review'],
];

// Top-level instruction files: on conflict, write sidecar instead of overwriting.
const SIDECAR_ON_CONFLICT = new Set(['AGENTS.md', 'CLAUDE.md']);

function parseArgs(argv) {
  const out = {
    target: process.cwd(),
    sourceRoot: defaultSourceRoot,
    force: false,
  };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--target') out.target = path.resolve(argv[++i] || '');
    else if (arg === '--source') out.sourceRoot = path.resolve(argv[++i] || '');
    else if (arg === '--force') out.force = true;
  }
  return out;
}

function isInside(parent, child) {
  const rel = path.relative(parent, child);
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

function readText(file) {
  return fs.readFileSync(file);
}

function sameFile(a, b) {
  try {
    return readText(a).equals(readText(b));
  } catch {
    return false;
  }
}

function ensureParent(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

function installFile(from, to, targetRoot, report, force) {
  if (!isInside(targetRoot, to)) {
    report.errors.push(`blocked path traversal: ${to}`);
    return;
  }
  if (!fs.existsSync(to)) {
    ensureParent(to);
    fs.copyFileSync(from, to);
    report.added.push(path.relative(targetRoot, to).split(path.sep).join('/'));
    return;
  }
  if (sameFile(from, to)) {
    report.unchanged.push(path.relative(targetRoot, to).split(path.sep).join('/'));
    return;
  }
  if (force) {
    fs.copyFileSync(from, to);
    report.updated.push(path.relative(targetRoot, to).split(path.sep).join('/'));
    return;
  }

  const rel = path.relative(targetRoot, to).split(path.sep).join('/');
  if (SIDECAR_ON_CONFLICT.has(path.basename(to)) && path.dirname(to) === targetRoot) {
    const sidecar = path.join(targetRoot, path.basename(to, path.extname(to)) + '.product-skills.md');
    if (!fs.existsSync(sidecar) || !sameFile(from, sidecar) || force) {
      fs.copyFileSync(from, sidecar);
      report.sidecars.push(`${rel} -> ${path.basename(sidecar)}`);
    } else {
      report.unchanged.push(path.basename(sidecar));
    }
    report.conflicts.push(`${rel} preserved; Product-Skills copy written to ${path.basename(sidecar)}`);
    return;
  }

  report.conflicts.push(`${rel} exists and differs; left unchanged`);
}

function installDir(src, dest, targetRoot, report, force) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP_NAMES.has(entry.name)) continue;
    if (entry.name.startsWith('.env')) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (!isInside(targetRoot, to)) {
      report.errors.push(`blocked path traversal: ${to}`);
      continue;
    }
    if (entry.isSymbolicLink()) {
      report.errors.push(`skipped symlink: ${from}`);
      continue;
    }
    if (entry.isDirectory()) installDir(from, to, targetRoot, report, force);
    else if (entry.isFile()) installFile(from, to, targetRoot, report, force);
  }
}

function writeOwnedHints(target, report, force) {
  for (const [rel, contents] of OWNED_HINT_FILES) {
    const to = path.join(target, rel);
    if (!isInside(target, to)) continue;
    ensureParent(to);
    if (!fs.existsSync(to)) {
      fs.writeFileSync(to, contents);
      report.added.push(rel);
      continue;
    }
    const current = fs.readFileSync(to, 'utf8');
    if (current === contents) {
      report.unchanged.push(rel);
      continue;
    }
    if (force) {
      fs.writeFileSync(to, contents);
      report.updated.push(rel);
    } else {
      // Owned helper files may be refreshed safely.
      fs.writeFileSync(to, contents);
      report.updated.push(rel);
    }
  }
}

export function installProductSkills({ target, sourceRoot = defaultSourceRoot, force = false } = {}) {
  const report = {
    target,
    sourceRoot,
    added: [],
    updated: [],
    unchanged: [],
    conflicts: [],
    sidecars: [],
    errors: [],
  };

  if (!target || !fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
    throw new Error('Target directory not found. Use --target <path>.');
  }
  if (!sourceRoot || !fs.existsSync(sourceRoot)) {
    throw new Error(`Source root not found: ${sourceRoot}`);
  }

  const resolvedTarget = path.resolve(target);
  const resolvedSource = path.resolve(sourceRoot);
  if (resolvedTarget === resolvedSource) {
    throw new Error('Refusing to install Product-Skills into its own source root.');
  }

  for (const [fromRel, toRel] of COPIES) {
    const from = path.join(resolvedSource, fromRel);
    const to = path.join(resolvedTarget, toRel);
    if (!fs.existsSync(from)) continue;
    if (fs.statSync(from).isDirectory()) installDir(from, to, resolvedTarget, report, force);
    else installFile(from, to, resolvedTarget, report, force);
  }

  writeOwnedHints(resolvedTarget, report, force);
  return report;
}

function printReport(report) {
  console.log(`product-skills install -> ${report.target}`);
  console.log(`added: ${report.added.length}`);
  console.log(`updated: ${report.updated.length}`);
  console.log(`unchanged: ${report.unchanged.length}`);
  console.log(`conflicts: ${report.conflicts.length}`);
  console.log(`sidecars: ${report.sidecars.length}`);
  if (report.conflicts.length) {
    console.log('conflicts:');
    for (const item of report.conflicts) console.log(`  - ${item}`);
  }
  if (report.sidecars.length) {
    console.log('sidecars:');
    for (const item of report.sidecars) console.log(`  - ${item}`);
  }
  if (report.errors.length) {
    console.log('errors:');
    for (const item of report.errors) console.log(`  - ${item}`);
  }
  console.log('Safe install complete. Existing project files were preserved on conflict.');
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  try {
    const args = parseArgs(process.argv);
    const report = installProductSkills(args);
    printReport(report);
    if (report.errors.length) process.exitCode = 1;
  } catch (error) {
    console.error(error.message || error);
    process.exit(1);
  }
}
