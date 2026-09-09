#!/usr/bin/env node
/**
 * Safe self-bootstrap for Product-Skills.
 *
 * Retrieves the official HTTPS repository into a temporary directory,
 * verifies the source, then runs the safe installer into --target.
 *
 * Does NOT execute arbitrary scripts from the downloaded repository.
 * Only invokes install/install.mjs via Node.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const OFFICIAL_HTTPS = 'https://github.com/irwebtools/Product-Skills.git';
const OFFICIAL_HTTPS_ALT = 'https://github.com/irwebtools/Product-Skills';

function parseArgs(argv) {
  const out = { target: process.cwd(), force: false, source: null };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === '--target') out.target = path.resolve(argv[++i] || '');
    else if (argv[i] === '--force') out.force = true;
    else if (argv[i] === '--source') out.source = path.resolve(argv[++i] || '');
  }
  return out;
}

function looksInstalled(target) {
  return (
    fs.existsSync(path.join(target, 'skills', 'product', 'product-discovery', 'SKILL.md')) &&
    fs.existsSync(path.join(target, 'skills', 'index.yaml')) &&
    (fs.existsSync(path.join(target, 'AGENTS.md')) || fs.existsSync(path.join(target, 'AGENTS.product-skills.md')))
  );
}

function assertOfficialRemote(cwd) {
  const result = spawnSync('git', ['-C', cwd, 'remote', 'get-url', 'origin'], {
    encoding: 'utf8',
    shell: false,
  });
  if (result.status !== 0) throw new Error('Unable to verify git remote of downloaded Product-Skills.');
  const url = (result.stdout || '').trim().replace(/\.git$/, '');
  const allowed = [OFFICIAL_HTTPS.replace(/\.git$/, ''), OFFICIAL_HTTPS_ALT];
  if (!allowed.includes(url)) {
    throw new Error(`Refusing non-official Product-Skills source: ${url}`);
  }
}

function cloneOfficial(tempRoot) {
  fs.mkdirSync(tempRoot, { recursive: true });
  const dest = path.join(tempRoot, 'Product-Skills');
  const clone = spawnSync(
    'git',
    ['clone', '--depth', '1', '--single-branch', OFFICIAL_HTTPS, dest],
    { encoding: 'utf8', shell: false },
  );
  if (clone.status !== 0) {
    throw new Error(`Failed to clone official Product-Skills over HTTPS.\n${clone.stderr || clone.stdout || ''}`);
  }
  assertOfficialRemote(dest);
  return dest;
}

function rmrf(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

async function main() {
  const args = parseArgs(process.argv);
  if (!fs.existsSync(args.target) || !fs.statSync(args.target).isDirectory()) {
    throw new Error('Target directory not found. Use --target <path>.');
  }

  if (looksInstalled(args.target) && !args.force) {
    console.log('Product-Skills guidance already looks available in the target project.');
    console.log('Skipping bootstrap. Re-run with --force to refresh safely.');
    return;
  }

  let sourceRoot = args.source;
  let tempRoot = null;
  if (!sourceRoot) {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'product-skills-bootstrap-'));
    console.log(`Retrieving official Product-Skills from ${OFFICIAL_HTTPS}`);
    sourceRoot = cloneOfficial(tempRoot);
  }

  const installPath = path.join(sourceRoot, 'install', 'install.mjs');
  if (!fs.existsSync(installPath)) {
    throw new Error('Downloaded repository is missing install/install.mjs');
  }

  // Import installer from verified source and call the safe API directly.
  // Do not execute any other scripts from the downloaded repository.
  const mod = await import(pathToFileURL(installPath).href);
  const report = mod.installProductSkills({
    target: args.target,
    sourceRoot,
    force: args.force,
  });

  console.log('Bootstrap complete.');
  console.log(`added=${report.added.length} updated=${report.updated.length} conflicts=${report.conflicts.length}`);
  if (report.conflicts.length) {
    console.log('Conflicts preserved existing project files:');
    for (const item of report.conflicts) console.log(`  - ${item}`);
  }
  if (report.sidecars.length) {
    console.log('Sidecars written:');
    for (const item of report.sidecars) console.log(`  - ${item}`);
  }

  if (tempRoot) rmrf(tempRoot);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
