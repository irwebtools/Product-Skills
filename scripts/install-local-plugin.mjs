#!/usr/bin/env node
/**
 * Install this repository as a local Cursor Plugin for testing.
 * Target: ~/.cursor/plugins/local/product-skills
 * Does not claim Marketplace publication.
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const home = process.env.USERPROFILE || os.homedir();
const dest = path.join(home, '.cursor', 'plugins', 'local', 'product-skills');

const SKIP = new Set(['.git', 'node_modules', '.vercel', '.supabase']);

function copyDir(src, out) {
  fs.mkdirSync(out, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(out, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else if (entry.isFile()) fs.copyFileSync(from, to);
  }
}

if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
copyDir(root, dest);

const manifest = path.join(dest, '.cursor-plugin', 'plugin.json');
if (!fs.existsSync(manifest)) {
  console.error('Failed: .cursor-plugin/plugin.json missing in local install.');
  process.exit(1);
}

console.log(`Installed local Cursor Plugin at:\n${dest}`);
console.log('');
console.log('Next:');
console.log('1. Cursor Command Palette → Developer: Reload Window');
console.log('2. Settings → Plugins → confirm product-skills');
console.log('3. Confirm skills, rules, agents, commands are visible');
console.log('4. Try command: react-fsd-refactor');
