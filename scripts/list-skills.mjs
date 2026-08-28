#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('skills');
if (!fs.existsSync(root)) process.exit(0);
for (const dirent of fs.readdirSync(root, { withFileTypes: true })) {
  if (!dirent.isDirectory()) continue;
  const skill = path.join(root, dirent.name, 'SKILL.md');
  if (fs.existsSync(skill)) console.log(dirent.name);
}
