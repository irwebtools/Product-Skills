#!/usr/bin/env node
/**
 * Optional maintainer utility: run local package scripts before claiming readiness.
 * Not a Cursor runtime hook. Not registered in plugin.json.
 */
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
  return 'npm';
}

const manager = detectPackageManager();
const argsFor = (name) => (manager === 'npm' ? ['run', name] : [name]);
let failed = false;
let ran = 0;

console.log(`Using package manager: ${manager}`);
for (const name of candidates) {
  if (!scripts[name]) {
    console.log(`NOT RUN: ${name} (script missing)`);
    continue;
  }
  ran += 1;
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

if (ran === 0) {
  console.log('No ship-gate scripts found. Functional verification is still required.');
  process.exit(0);
}

if (failed) process.exit(1);
console.log('\nDeterministic ship checks passed. Functional/browser verification is still required.');
