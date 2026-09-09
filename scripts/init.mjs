#!/usr/bin/env node
import fs from 'node:fs';

// Read-only bootstrap: never replace an adopting application's context.
const required = ['AGENTS.md', 'skills', 'rules', 'templates/product/product-brief.md',
  'workflows/product-to-production.md', 'workflows/existing-project-improvement.md', 'workflows/bug-fix.md'];
const missing = required.filter(p => !fs.existsSync(p));
if (missing.length) {
  console.error(`Incomplete platform bundle: ${missing.join(', ')}`);
  process.exitCode = 1;
} else {
  console.log('Product-Skills initialized: platform bundle found; no files overwritten.');
  console.log('Start with templates/product/product-brief.md and workflows/product-to-production.md.');
  console.log('Existing applications: workflows/existing-project-improvement.md; defects: workflows/bug-fix.md.');
  console.log('Adoption: initialize application context from templates/memory/; do not reuse platform facts.');
}
