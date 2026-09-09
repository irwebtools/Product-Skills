import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scripts = fileURLToPath(new URL('../', import.meta.url));
function fixture(t, files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'product-skills-check-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const [name, content] of Object.entries(files)) {
    const file = path.join(root, name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
  return root;
}
function run(script, cwd, args = []) {
  const result = spawnSync(process.execPath, [path.join(scripts, script), ...args], { cwd, encoding: 'utf8' });
  assert.ifError(result.error);
  return { status: result.status, output: result.stdout + result.stderr };
}

test('FSD accepts downward imports and same-slice relative paths', t => {
  const root = fixture(t, {
    'src/app/index.ts': "import { page } from '@/pages/home';\n",
    'src/pages/home/index.ts': "export { action } from '~/features/approve';\n",
    'src/features/approve/index.ts': "import './model';\nimport { user } from 'entities/user';\n",
    'src/features/approve/model.ts': "export const model = 1;\n",
    'src/entities/user/index.ts': "const x = require('shared/lib');\n",
    'src/shared/lib/index.ts': "export const x = 1;\n",
  });
  assert.equal(run('check-fsd-boundary.mjs', root).status, 0);
});
for (const [name, file, source] of [
  ['shared to features', 'src/shared/ui/a.ts', "import { x } from '@/features/a';"],
  ['entities to features', 'src/entities/user/a.ts', "export { x } from '~/features/a';"],
  ['features to pages', 'src/features/a/index.ts', "const x = import('src/pages/a');"],
  ['side-effect import', 'src/shared/ui/a.ts', "import '@/features/a';"],
  ['relative require', 'src/features/a/index.ts', "const x = require('../../pages/a');"],
  ['sibling slice', 'src/features/a/index.ts', "import '../b';"],
  ['unsupported root', 'src/components/business.ts', 'export const x = 1;'],
]) test(`FSD rejects ${name}`, t => {
  const root = fixture(t, { [file]: source });
  assert.equal(run('check-fsd-boundary.mjs', root).status, 1);
});
test('FSD ignores commented imports and supports explicit monorepo roots', t => {
  const root = fixture(t, { 'packages/ui/src/shared/a.ts': "// import '@/features/a';\n/* export { a } from 'pages/a'; */\nexport const a = 1;\n" });
  assert.equal(run('check-fsd-boundary.mjs', root, ['packages/ui/src']).status, 0);
  assert.equal(run('check-fsd-boundary.mjs', root, ['missing/src']).status, 1);
});
test('FSD reports no-source skip explicitly', t => {
  const root = fixture(t, {});
  const result = run('check-fsd-boundary.mjs', root);
  assert.equal(result.status, 0);
  assert.match(result.output, /skipped/);
});
test('security detects credentials without printing their values', t => {
  const secret = 'gh' + 'p_' + 'A'.repeat(36);
  const root = fixture(t, { 'config.txt': secret });
  const result = run('check-security.mjs', root);
  assert.equal(result.status, 1);
  assert.match(result.output, /config.txt/);
  assert.ok(!result.output.includes(secret));
});
test('security rejects private environment files and allows names-only examples', t => {
  const root = fixture(t, { '.env.example': 'API_KEY=\n' });
  assert.equal(run('check-security.mjs', root).status, 0);
  fs.writeFileSync(path.join(root, '.env.production'), 'API_KEY=example\n');
  assert.equal(run('check-security.mjs', root).status, 1);
});
test('security excludes ignored local secrets but rejects them when tracked', t => {
  const root = fixture(t, { '.gitignore': '.env\n', '.env': 'gh' + 'p_' + 'B'.repeat(36) + '\n' });
  const git = args => {
    const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
  };
  git(['init', '--quiet']);
  assert.equal(run('check-security.mjs', root).status, 0);
  git(['add', '--force', '.env']);
  assert.equal(run('check-security.mjs', root).status, 1);
});
for (const [name, contents] of [
  ['invalid UTF-8', Buffer.from([0xc3, 0x28])],
  ['BOM', '\uFEFFtext\n'],
  ['CRLF', 'text\r\n'],
  ['missing newline', 'text'],
  ['mojibake', String.fromCodePoint(0xc3, 0xa9) + '\n'],
  ['replacement character', '\uFFFD\n'],
]) test(`encoding rejects ${name}`, t => {
  const root = fixture(t, { 'text.md': contents });
  assert.equal(run('check-encoding.mjs', root).status, 1);
});
test('encoding accepts UTF-8 multilingual text with LF and EOF newline', t => {
  const root = fixture(t, { 'text.md': 'Tiếng Việt → 日本語\n' });
  assert.equal(run('check-encoding.mjs', root).status, 0);
});
function skillFiles() {
  const body = [
    '---',
    'name: example',
    'description: A bounded example skill.',
    '---',
    '',
    '# example',
    '',
    '## When to use',
    '',
    'Use for fixture validation.',
    '',
    '## Purpose',
    '',
    'Exercise the skill validator.',
    '',
    '## Inputs',
    '',
    '- scope',
    '',
    '## Process',
    '',
    '1. Follow the fixture.',
    '',
    '## Outputs',
    '',
    '- evidence',
    '',
    '## Verification',
    '',
    '- check output',
    '',
    '## Restrictions',
    '',
    '- stay in pack',
    '',
  ].join('\n');
  return {
    'skills/product/example/SKILL.md': body,
    'skills/product/example/manifest.yaml': 'name: example\npurpose: example purpose\ntrigger:\n  - example\ninputs:\n  - scope\noutputs:\n  - evidence\ndependencies: []\nverification:\n  - check output\n',
    'skills/product/example/templates/README.md': 'Template\n',
    'skills/product/example/examples/README.md': 'Example\n',
    'skills/product/example/verification/README.md': 'Verification\n',
  };
}
test('skill validation accepts full structure and rejects missing fields', t => {
  const files = skillFiles();
  const root = fixture(t, files);
  assert.equal(run('validate-skills.mjs', root).status, 0);
  fs.writeFileSync(path.join(root, 'skills/product/example/manifest.yaml'), files['skills/product/example/manifest.yaml'].replace('inputs:\n  - scope\n', ''));
  assert.equal(run('validate-skills.mjs', root).status, 1);
});
test('skill validation rejects unknown dependencies and empty resources', t => {
  const files = skillFiles();
  files['skills/product/example/manifest.yaml'] = files['skills/product/example/manifest.yaml'].replace('dependencies: []', 'dependencies:\n  - missing');
  const root = fixture(t, files);
  assert.equal(run('validate-skills.mjs', root).status, 1);
  fs.writeFileSync(path.join(root, 'skills/product/example/manifest.yaml'), skillFiles()['skills/product/example/manifest.yaml']);
  fs.unlinkSync(path.join(root, 'skills/product/example/verification/README.md'));
  assert.equal(run('validate-skills.mjs', root).status, 1);
});
test('init is repeatable and preserves project context', t => {
  const root = fixture(t, {
    'AGENTS.md': 'Existing instructions\n', 'skills/example.txt': '', 'rules/example.txt': '',
    'templates/product/product-brief.md': '', 'workflows/product-to-production.md': '',
    'workflows/existing-project-improvement.md': '', 'workflows/bug-fix.md': '',
    'memory/PROJECT.md': 'Existing context\n',
  });
  assert.equal(run('init.mjs', root).status, 0);
  assert.equal(run('init.mjs', root).status, 0);
  assert.equal(fs.readFileSync(path.join(root, 'memory/PROJECT.md'), 'utf8'), 'Existing context\n');
  assert.equal(fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8'), 'Existing instructions\n');
});
