#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const commands = ['init.mjs', 'validate-skills.mjs', 'check-fsd-boundary.mjs', 'check-security.mjs',
  'check-encoding.mjs', 'check-architecture-scope.mjs'];
for (const script of commands) {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL(script, import.meta.url))], { stdio: 'inherit' });
  if (result.error || result.status !== 0) process.exit(result.status || 1);
}
for (const [command, args] of [
  [process.execPath, ['--test', fileURLToPath(new URL('tests/platform-checks.test.mjs', import.meta.url))]],
  ['git', ['diff', '--check']],
]) {
  const result = spawnSync(command, args, { stdio: 'inherit' });
  if (result.error || result.status !== 0) process.exit(result.status || 1);
}
console.log('Platform validation passed. Application readiness requires separate journey evidence.');
