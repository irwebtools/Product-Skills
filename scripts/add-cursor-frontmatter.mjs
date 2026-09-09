#!/usr/bin/env node
/**
 * One-shot: add Cursor-compatible YAML frontmatter to rules and agents.
 */
import fs from 'node:fs';
import path from 'node:path';

const ruleMeta = {
  'agent-behavior.md': {
    description: 'Core agent behavior for Product-Skills work',
    alwaysApply: true,
  },
  'change-scope.md': {
    description: 'Limit changes to the requested product scope',
    alwaysApply: true,
  },
  'command-safety.md': {
    description: 'Safe shell and command execution practices',
    alwaysApply: false,
  },
  'delivery.md': {
    description: 'Delivery expectations for React FSD product work',
    alwaysApply: false,
  },
  'dependency-security.md': {
    description: 'Dependency and supply-chain safety',
    alwaysApply: false,
  },
  'documentation.md': {
    description: 'Documentation expectations for product delivery',
    alwaysApply: false,
  },
  'engineering.md': {
    description: 'Engineering quality expectations for Product-Skills delivery',
    alwaysApply: false,
  },
  'fsd-governance.md': {
    description: 'Feature-Sliced Design governance and dependency rules',
    alwaysApply: true,
  },
  'lessons.md': {
    description: 'Captured lessons to avoid repeating product delivery mistakes',
    alwaysApply: false,
  },
  'react-anti-patterns.md': {
    description: 'React anti-patterns to avoid in Product-Skills work',
    alwaysApply: false,
    globs: '**/*.{tsx,jsx,ts,js}',
  },
  'security.md': {
    description: 'Security baseline for Product-Skills work',
    alwaysApply: true,
  },
};

const agents = {
  'debugger.md': {
    name: 'debugger',
    description: 'Investigate failures with evidence before proposing fixes',
  },
  'explorer.md': {
    name: 'explorer',
    description: 'Map unfamiliar repositories quickly and safely',
  },
  'reviewer.md': {
    name: 'reviewer',
    description: 'Review product and architecture changes for scope and quality',
  },
  'verifier.md': {
    name: 'verifier',
    description: 'Independently verify acceptance journeys and Preview readiness',
  },
};

function hasFrontmatter(text) {
  return text.startsWith('---\n') || text.startsWith('---\r\n');
}

for (const [file, meta] of Object.entries(ruleMeta)) {
  const full = path.join('rules', file);
  const text = fs.readFileSync(full, 'utf8');
  if (hasFrontmatter(text)) {
    console.log('skip rule', file);
    continue;
  }
  const lines = ['---', `description: ${meta.description}`, `alwaysApply: ${meta.alwaysApply}`];
  if (meta.globs) lines.push(`globs: ${meta.globs}`);
  lines.push('---', '', text);
  fs.writeFileSync(full, lines.join('\n'));
  console.log('frontmatter', file);
}

for (const [file, meta] of Object.entries(agents)) {
  const full = path.join('agents', file);
  const text = fs.readFileSync(full, 'utf8');
  if (hasFrontmatter(text)) {
    console.log('skip agent', file);
    continue;
  }
  fs.writeFileSync(
    full,
    `---\nname: ${meta.name}\ndescription: ${meta.description}\n---\n\n${text}`,
  );
  console.log('frontmatter agent', file);
}
