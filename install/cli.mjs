#!/usr/bin/env node
/**
 * product-skills CLI
 * Usage:
 *   product-skills init [--target <path>]
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const cmd = args[0] || 'help';

if (cmd === 'init') {
  const result = spawnSync(process.execPath, [path.join(__dirname, 'init.mjs'), ...args.slice(1)], {
    stdio: 'inherit',
    shell: false,
  });
  process.exit(result.status ?? 1);
}

console.log(`product-skills

Commands:
  product-skills init [--target <path>]

Humans: read README.md
AI agents: read AGENTS.md
`);
process.exit(cmd === 'help' || cmd === '--help' || cmd === '-h' ? 0 : 1);
