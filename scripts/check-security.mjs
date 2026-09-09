#!/usr/bin/env node
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { reviewFiles } from './lib/review-files.mjs';

const hook = fileURLToPath(new URL('./check-secrets.mjs', import.meta.url));
const scan = spawnSync(process.execPath, [hook], { stdio: 'inherit' });
if (scan.error || scan.status !== 0) process.exitCode = 1;
const findings = [];
for (const full of reviewFiles(process.cwd())) {
  const name = path.basename(full);
  if (/^\.env(?:\.|$)/.test(name) && !/\.(?:example|sample|template)$/.test(name)) {
    findings.push(
      `${path.relative(process.cwd(), full)}: environment values must stay outside the review bundle; provide a names-only example`,
    );
  }
}
findings.forEach((f) => console.error(f));
if (findings.length) process.exitCode = 1;
if (!process.exitCode) {
  console.log('Security checks passed for selected patterns; human security and dependency review still required.');
}
