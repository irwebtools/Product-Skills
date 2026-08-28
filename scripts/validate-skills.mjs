#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const skillsDir = path.resolve('skills');
let failed = false;
for (const dirent of fs.readdirSync(skillsDir, { withFileTypes: true })) {
  if (!dirent.isDirectory()) continue;
  const file = path.join(skillsDir, dirent.name, 'SKILL.md');
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  if (!text.startsWith('---\n')) {
    console.error(`${dirent.name}: missing YAML frontmatter`);
    failed = true;
  }
  if (!/\nname:\s*[^\n]+/.test(text) || !/\ndescription:\s*/.test(text)) {
    console.error(`${dirent.name}: frontmatter must include name and description`);
    failed = true;
  }
}
if (failed) process.exit(1);
console.log('Skill validation passed.');
