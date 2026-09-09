#!/usr/bin/env node
/**
 * Product-Skills Marketplace preflight.
 *
 * Answers: is this repository ready for HUMAN submission to Cursor Marketplace?
 * Does NOT claim Cursor approval, publication, or security certification.
 *
 * Design note: Cursor supports hooks and MCP. Product-Skills intentionally does
 * not ship them in the Marketplace package to keep the Product Team surface
 * minimal and predictable.
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const errors = [];
const warnings = [];
const info = [];
const results = {
  manifest: 'FAIL',
  components: 'FAIL',
  readme: 'FAIL',
  security: 'FAIL',
  secrets: 'FAIL',
  license: 'FAIL',
  encoding: 'FAIL',
  tests: 'FAIL',
  cursorLocal: 'BLOCKED',
};

function fail(msg) {
  errors.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}
function note(msg) {
  info.push(msg);
}
function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}
function readJson(rel) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
  } catch (error) {
    fail(`${rel}: invalid JSON (${error.message})`);
    return null;
  }
}
function assertRelativeSafe(value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    fail(`${label}: path must be a non-empty string`);
    return false;
  }
  if (path.isAbsolute(value) || value.includes('..') || value.includes('\\')) {
    fail(`${label}: invalid path "${value}" (relative, no .., use /)`);
    return false;
  }
  return true;
}
function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) fields[m[1]] = m[2].trim();
  }
  return fields;
}
function runNode(script) {
  const full = path.join(root, script);
  if (!fs.existsSync(full)) return { ok: false, missing: true };
  const result = spawnSync(process.execPath, [full], { cwd: root, encoding: 'utf8' });
  return {
    ok: result.status === 0,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
  };
}

const COPYLEFT = /\b(?:GPL|AGPL|LGPL|SSPL|Commons Clause)\b/i;
const CORE_PREFIX = /^(skills\/(?:product|delivery|quality)\b)/;
const manifestPath = '.cursor-plugin/plugin.json';
let plugin = null;
let componentOk = true;

// --- Manifest ---
if (!exists(manifestPath)) {
  fail('missing .cursor-plugin/plugin.json');
} else {
  plugin = readJson(manifestPath);
  if (plugin) {
    let manifestOk = true;
    if (plugin.name !== 'product-skills') {
      fail(`name must be product-skills, got "${plugin.name}"`);
      manifestOk = false;
    }
    if (!/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/.test(plugin.name || '')) {
      fail('name must be lowercase Marketplace-safe identifier');
      manifestOk = false;
    }
    if (!plugin.version || !/^\d+\.\d+\.\d+$/.test(plugin.version)) {
      fail('version must be semver X.Y.Z');
      manifestOk = false;
    }
    if (!plugin.description || plugin.description.length < 40) {
      fail('description missing or too short');
      manifestOk = false;
    }
    if (!/Product Team/i.test(plugin.description || '')) {
      fail('description must mention Product Team');
      manifestOk = false;
    }
    if (!plugin.author?.name) {
      fail('author.name required');
      manifestOk = false;
    }
    if (plugin.license !== 'MIT') {
      fail('license must be MIT');
      manifestOk = false;
    }
    if (plugin.repository !== 'https://github.com/irwebtools/Product-Skills') {
      fail('repository URL must match official GitHub repository');
      manifestOk = false;
    }
    if (plugin.homepage && !/^https:\/\//.test(plugin.homepage)) {
      fail('homepage must be https URL');
      manifestOk = false;
    }
    if (!plugin.logo || !assertRelativeSafe(plugin.logo, 'logo') || !exists(plugin.logo)) {
      fail('logo missing or invalid');
      manifestOk = false;
    }

    // Intentional Product-Skills packaging choice (Cursor itself supports hooks/MCP).
    if (plugin.hooks) {
      fail(
        'Product-Skills intentionally does not ship runtime hooks in plugin.json. Remove hooks or justify a real use case.',
      );
      manifestOk = false;
    } else {
      note('INFO: Cursor supports hooks; Product-Skills intentionally ships none.');
    }
    if (plugin.mcpServers) {
      fail(
        'Product-Skills intentionally does not ship MCP servers in plugin.json. Remove mcpServers or justify a core requirement.',
      );
      manifestOk = false;
    } else {
      note('INFO: Cursor supports MCP; Product-Skills intentionally ships none (standalone Product Team plugin).');
    }

    if (manifestOk) results.manifest = 'PASS';

    const skillPaths = Array.isArray(plugin.skills) ? plugin.skills : plugin.skills ? [plugin.skills] : [];
    if (!skillPaths.length) {
      fail('skills must be declared');
      componentOk = false;
    }
    for (const rel of skillPaths) {
      if (!assertRelativeSafe(rel, 'skills')) {
        componentOk = false;
        continue;
      }
      if (!CORE_PREFIX.test(rel)) {
        fail(`non-core skill declared in plugin.json: ${rel}`);
        componentOk = false;
      }
      const skillFile = path.join(rel, 'SKILL.md');
      if (!exists(skillFile)) {
        fail(`missing skill: ${skillFile}`);
        componentOk = false;
        continue;
      }
      const fm = parseFrontmatter(fs.readFileSync(path.join(root, skillFile), 'utf8'));
      const folder = path.basename(rel);
      if (!fm?.name || !fm?.description) {
        fail(`${skillFile}: missing name/description frontmatter`);
        componentOk = false;
      } else if (fm.name !== folder) {
        fail(`${skillFile}: name "${fm.name}" must match folder "${folder}"`);
        componentOk = false;
      }
    }

    for (const [field, defaultPath] of [
      ['rules', 'rules'],
      ['agents', 'agents'],
      ['commands', 'commands'],
    ]) {
      const configured = plugin[field];
      const paths = Array.isArray(configured)
        ? configured
        : configured
          ? [configured]
          : field === 'rules' || field === 'agents' || field === 'commands'
            ? [defaultPath]
            : [];
      for (const rel of paths) {
        if (!assertRelativeSafe(rel, field)) {
          componentOk = false;
          continue;
        }
        const full = path.join(root, rel);
        if (!fs.existsSync(full)) {
          fail(`missing ${field} path: ${rel}`);
          componentOk = false;
          continue;
        }
        const files = fs.readdirSync(full).filter((f) => /\.(md|mdc|markdown|txt)$/i.test(f));
        if (!files.length) {
          fail(`no files in ${rel}`);
          componentOk = false;
        }
        for (const file of files) {
          const fm = parseFrontmatter(fs.readFileSync(path.join(full, file), 'utf8'));
          if (field === 'rules') {
            if (!fm?.description || !('alwaysApply' in (fm || {}))) {
              fail(`${rel}/${file}: missing description/alwaysApply frontmatter`);
              componentOk = false;
            }
          } else if (!fm?.name || !fm?.description) {
            fail(`${rel}/${file}: missing name/description frontmatter`);
            componentOk = false;
          }
        }
      }
    }

    if (!skillPaths.includes('skills/delivery/react-fsd-poc')) {
      fail('core React FSD delivery skill missing from plugin.json');
      componentOk = false;
    }
    if (!exists('commands/react-fsd-refactor.md') || !exists('commands/product-request.md')) {
      fail('required Product Team commands missing');
      componentOk = false;
    }
    if (exists('subagents')) {
      fail('obsolete subagents/ directory remains; use agents/ only');
      componentOk = false;
    }
    if (componentOk) results.components = 'PASS';
  }
}

// --- Intentional absence of shipped MCP/runtime hooks ---
if (exists('mcp.json') || exists('.mcp.json') || exists(path.join('.cursor', 'mcp.json'))) {
  fail('MCP config files must not ship in this package (optional integrations stay outside the plugin).');
}
if (exists(path.join('hooks', 'hooks.json'))) {
  fail('hooks/hooks.json present — Product-Skills intentionally ships no runtime hooks.');
}
if (exists('hooks') && fs.readdirSync(path.join(root, 'hooks')).length) {
  warn('hooks/ directory exists; prefer scripts/ for validation utilities, not Cursor runtime hooks');
}

// --- License / package ---
let licenseOk = true;
if (!exists('LICENSE')) {
  fail('LICENSE missing');
  licenseOk = false;
} else {
  const license = fs.readFileSync(path.join(root, 'LICENSE'), 'utf8');
  if (!/MIT License/i.test(license) || COPYLEFT.test(license)) {
    fail('LICENSE must be MIT and non-copyleft');
    licenseOk = false;
  }
}
const pkg = readJson('package.json');
if (pkg) {
  if (pkg.dependencies && Object.keys(pkg.dependencies).length) {
    fail('runtime dependencies are not allowed for this lightweight Marketplace package');
    licenseOk = false;
  }
  if (pkg.devDependencies && Object.keys(pkg.devDependencies).length) {
    warn('devDependencies present — ensure permissive licenses only');
  }
  if (pkg.bin) warn('package.json bin present — maintainer utility only');
}
if (licenseOk && errors.filter((e) => /LICENSE|runtime dependencies/i.test(e)).length === 0) {
  results.license = 'PASS';
}

// --- README ---
let readmeOk = true;
if (!exists('README.md')) {
  fail('README.md missing');
  readmeOk = false;
} else {
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  if (/┌|└|│/.test(readme)) {
    fail('README still contains ASCII box-drawing diagrams');
    readmeOk = false;
  }
  if (!/Product Team/i.test(readme)) {
    fail('README must address Product Team');
    readmeOk = false;
  }
  if (!/Cursor Marketplace/i.test(readme)) {
    fail('README must document Cursor Marketplace install as primary path');
    readmeOk = false;
  }
  if (!/Ready for Cursor Marketplace submission/i.test(readme)) {
    warn('README should say "Ready for Cursor Marketplace submission" before publication');
  }
  if (!/React \+ TypeScript \+ FSD|Feature-Sliced Design/i.test(readme)) {
    fail('README must document React + TypeScript + FSD example');
    readmeOk = false;
  }
  if (/Available on Cursor Marketplace|Verified by Cursor|Cursor approved/i.test(readme)) {
    fail('README must not claim Marketplace publication or Cursor verification');
    readmeOk = false;
  }
  if (/Cursor AI|Cursor Code/i.test(readme)) {
    fail('README must use official product name Cursor');
    readmeOk = false;
  }
  for (const img of readme.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
    const src = img[1];
    if (/^https?:\/\//i.test(src)) continue;
    if (!exists(src)) {
      fail(`README broken image: ${src}`);
      readmeOk = false;
    }
  }
  for (const name of [
    'docs/diagrams/product-team-flow.svg',
    'docs/diagrams/product-team-journey.svg',
    'docs/diagrams/react-fsd-migration.svg',
    'docs/diagrams/feedback-loop.svg',
  ]) {
    if (!exists(name)) {
      fail(`diagram missing: ${name}`);
      readmeOk = false;
    }
  }
}
if (readmeOk) results.readme = 'PASS';

// --- Secrets / encoding / skills / tests ---
const secrets = runNode('scripts/check-secrets.mjs');
if (secrets.missing) fail('scripts/check-secrets.mjs missing');
else if (!secrets.ok) {
  fail('secret scan failed');
  if (secrets.stdout) process.stdout.write(secrets.stdout);
  if (secrets.stderr) process.stderr.write(secrets.stderr);
} else results.secrets = 'PASS';

const security = runNode('scripts/check-security.mjs');
if (security.missing) fail('scripts/check-security.mjs missing');
else if (!security.ok) fail('security check failed');
else results.security = 'PASS';

const encoding = runNode('scripts/check-encoding.mjs');
if (encoding.missing) fail('scripts/check-encoding.mjs missing');
else if (!encoding.ok) fail('encoding check failed');
else results.encoding = 'PASS';

const skills = runNode('scripts/validate-skills.mjs');
if (skills.missing) fail('scripts/validate-skills.mjs missing');
else if (!skills.ok) fail('skill validation failed');

const testResult = spawnSync(
  process.execPath,
  ['--test', 'scripts/tests/platform-checks.test.mjs'],
  { cwd: root, encoding: 'utf8' },
);
if (testResult.status !== 0) {
  fail('platform tests failed');
  if (testResult.stdout) process.stdout.write(testResult.stdout);
  if (testResult.stderr) process.stderr.write(testResult.stderr);
} else results.tests = 'PASS';

// --- Local Cursor plugin package check (structure only; UI load needs human Reload Window) ---
const localRoots = [
  path.join(os.homedir(), '.cursor', 'plugins', 'local', 'product-skills'),
];
if (process.env.USERPROFILE) {
  localRoots.push(
    path.join(process.env.USERPROFILE, '.cursor', 'plugins', 'local', 'product-skills'),
  );
}
const localPlugin = [...new Set(localRoots)].find((dir) =>
  fs.existsSync(path.join(dir, '.cursor-plugin', 'plugin.json')),
);
if (localPlugin) {
  try {
    const local = JSON.parse(
      fs.readFileSync(path.join(localPlugin, '.cursor-plugin', 'plugin.json'), 'utf8'),
    );
    const required = [
      'skills/product/project-analysis/SKILL.md',
      'rules/product-skills-protocol.mdc',
      'agents/verifier.md',
      'commands/react-fsd-refactor.md',
      'assets/logo.svg',
    ];
    const missing = required.filter((rel) => !fs.existsSync(path.join(localPlugin, rel)));
    if (local.name === 'product-skills' && missing.length === 0) {
      results.cursorLocal = 'BLOCKED';
      note(
        `INFO: Local plugin package found at ${localPlugin}. Structure looks valid, but Cursor Settings UI load was not confirmed in this environment (Reload Window required).`,
      );
    } else {
      warn(`Local plugin package incomplete at ${localPlugin}`);
      results.cursorLocal = 'BLOCKED';
    }
  } catch {
    results.cursorLocal = 'BLOCKED';
    warn('Local plugin package present but unreadable');
  }
} else {
  results.cursorLocal = 'BLOCKED';
  note(
    'INFO: BLOCKED — ACTUAL CURSOR INSTALLATION NOT AVAILABLE (no ~/.cursor/plugins/local/product-skills package detected).',
  );
}

console.log('');
console.log('Product-Skills Marketplace preflight');
console.log('');
console.log(`Manifest ........ ${results.manifest}`);
console.log(`Components ...... ${results.components}`);
console.log(`README .......... ${results.readme}`);
console.log(`Security ........ ${results.security}`);
console.log(`Secrets ......... ${results.secrets}`);
console.log(`License ......... ${results.license}`);
console.log(`Encoding ........ ${results.encoding}`);
console.log(`Tests ........... ${results.tests}`);
console.log(`Cursor local test ${results.cursorLocal}`);
console.log('');
for (const line of info) console.log(line);
for (const w of warnings) console.warn(`WARN: ${w}`);

if (errors.length) {
  for (const e of errors) console.error(`ERROR: ${e}`);
  console.log('');
  console.log('NOT READY FOR SUBMISSION');
  process.exit(1);
}

console.log('');
if (results.cursorLocal === 'BLOCKED') {
  console.log('READY FOR HUMAN SUBMISSION');
  console.log('(Cursor local UI confirmation still BLOCKED — reload Cursor and verify Plugins before submitting.)');
} else {
  console.log('READY FOR HUMAN SUBMISSION');
}
console.log('This does not mean Cursor approved, published, or certified the plugin.');
