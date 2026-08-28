#!/usr/bin/env node
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

if (!fs.existsSync('package.json')) {
  console.log('No package.json in current directory; ship gate skipped.');
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const scripts = pkg.scripts || {};
const candidates = ['typecheck', 'lint', 'architecture', 'test', 'build'];

function detectPackageManager() {
  const declared = typeof pkg.packageManager === 'string' ? pkg.packageManager.split('@')[0] : null;
  if (declared && ['pnpm', 'yarn', 'npm'].includes(declared)) return declared;
  if (fs.existsSync('pnpm-lock.yaml')) return 'pnpm';
  if (fs.existsSync('yarn.lock')) return 'yarn';
  if (fs.existsSync('package-lock.json') || fs.existsSync('npm-shrinkwrap.json')) return 'npm';
  return 'pnpm';
}

const manager = detectPackageManager();
const argsFor = (name) => manager === 'npm' ? ['run', name] : [name];
let failed = false;

console.log(`Using package manager: ${manager}`);
for (const name of candidates) {
  if (!scripts[name]) continue;
  console.log(`\n> ${manager} ${argsFor(name).join(' ')}`);
  const result = spawnSync(manager, argsFor(name), {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.status !== 0) {
    failed = true;
    break;
  }
}

if (failed) process.exit(1);
console.log('\nDeterministic ship checks passed. Functional/browser verification is still required for PREVIEW_READY.');
