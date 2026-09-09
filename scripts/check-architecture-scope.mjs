#!/usr/bin/env node
/**
 * Deterministic architecture-scope checks for Product-Skills React apps.
 *
 * Detects:
 * - forbidden dump folders under src/ (components, services, hooks, utils)
 * - deprecated processes/ layer
 * - invalid FSD layer imports (shared→features, features→pages, entities→features, …)
 * - shared segments that look like business dumping grounds
 *
 * When no React application source is present, the check skips successfully.
 */
import fs from 'node:fs';
import path from 'node:path';

const FORBIDDEN_ROOT_DIRS = new Set(['components', 'services', 'hooks', 'utils']);
const FSD_LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];
const LAYER_RANK = Object.fromEntries(FSD_LAYERS.map((layer, index) => [layer, index]));
const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mts', '.cts']);

const repoRoot = process.cwd();
const errors = [];
const warnings = [];

function existsDir(dirPath) {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

function walkFiles(dirPath, out = []) {
  if (!existsDir(dirPath)) return out;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'build' || entry.name === '.git') {
      continue;
    }
    const full = path.join(dirPath, entry.name);
    if (entry.isDirectory()) walkFiles(full, out);
    else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function findAppRoots() {
  const candidates = [path.join(repoRoot, 'src'), path.join(repoRoot, 'app', 'src')];
  const roots = [];
  for (const candidate of candidates) {
    if (!existsDir(candidate)) continue;
    const hasFsdLayer = FSD_LAYERS.some((layer) => existsDir(path.join(candidate, layer)));
    const hasForbidden = [...FORBIDDEN_ROOT_DIRS].some((name) => existsDir(path.join(candidate, name)));
    const hasPackageNearby =
      fs.existsSync(path.join(path.dirname(candidate), 'package.json')) ||
      fs.existsSync(path.join(candidate, 'package.json'));
    if (hasFsdLayer || hasForbidden || hasPackageNearby) roots.push(candidate);
  }
  return [...new Set(roots)];
}

function relativePosix(from, to) {
  return path.relative(from, to).split(path.sep).join('/');
}

function layerOfFile(appRoot, filePath) {
  const rel = relativePosix(appRoot, filePath);
  const top = rel.split('/')[0];
  return FSD_LAYERS.includes(top) ? top : null;
}

function resolveImportTarget(appRoot, fromFile, specifier) {
  if (!specifier || specifier.startsWith('node:') || specifier.startsWith('http:') || specifier.startsWith('https:')) {
    return null;
  }

  // Alias-style imports: @/features/..., ~/shared/..., src/pages/...
  const aliasMatch = specifier.match(/^(?:@\/|~\/|src\/)(app|pages|widgets|features|entities|shared)(?:\/|$)/);
  if (aliasMatch) {
    return { layer: aliasMatch[1], kind: 'alias' };
  }

  // Bare FSD-ish imports sometimes used in docs/examples: features/x, shared/ui
  const bareMatch = specifier.match(/^(app|pages|widgets|features|entities|shared)(?:\/|$)/);
  if (bareMatch && !specifier.includes(':')) {
    return { layer: bareMatch[1], kind: 'bare' };
  }

  if (!specifier.startsWith('.')) return null;

  const fromDir = path.dirname(fromFile);
  const unresolved = path.resolve(fromDir, specifier);
  const candidates = [
    unresolved,
    `${unresolved}.ts`,
    `${unresolved}.tsx`,
    `${unresolved}.js`,
    `${unresolved}.jsx`,
    path.join(unresolved, 'index.ts'),
    path.join(unresolved, 'index.tsx'),
    path.join(unresolved, 'index.js'),
  ];

  for (const candidate of candidates) {
    if (!fs.existsSync(candidate) || fs.statSync(candidate).isDirectory()) continue;
    if (!candidate.startsWith(appRoot)) return null;
    const layer = layerOfFile(appRoot, candidate);
    if (layer) return { layer, kind: 'relative', target: candidate };
  }

  // Even if the file does not exist yet, classify by path segment under appRoot.
  if (unresolved.startsWith(appRoot)) {
    const layer = layerOfFile(appRoot, unresolved);
    if (layer) return { layer, kind: 'relative-missing' };
  }
  return null;
}

function extractImports(source) {
  const specs = [];
  const patterns = [
    /import\s+(?:type\s+)?[\s\S]*?\s+from\s+['"]([^'"]+)['"]/g,
    /export\s+(?:type\s+)?[\s\S]*?\s+from\s+['"]([^'"]+)['"]/g,
    /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) specs.push(match[1]);
  }
  return specs;
}

function checkForbiddenFolders(appRoot) {
  for (const name of FORBIDDEN_ROOT_DIRS) {
    const dir = path.join(appRoot, name);
    if (existsDir(dir)) {
      errors.push(
        `${relativePosix(repoRoot, dir)}: forbidden dump folder. Prefer FSD pages/features/entities/shared instead of src/${name}/.`,
      );
    }
  }
  const processes = path.join(appRoot, 'processes');
  if (existsDir(processes)) {
    errors.push(`${relativePosix(repoRoot, processes)}: deprecated FSD processes/ layer must not be introduced.`);
  }
}

function checkSharedBusinessDump(appRoot) {
  const sharedRoot = path.join(appRoot, 'shared');
  if (!existsDir(sharedRoot)) return;
  for (const name of ['services', 'features', 'pages', 'entities', 'hooks']) {
    const dir = path.join(sharedRoot, name);
    if (existsDir(dir)) {
      errors.push(
        `${relativePosix(repoRoot, dir)}: shared must not host business dumping grounds (${name}/). Keep product logic in pages/features/entities.`,
      );
    }
  }

  for (const file of walkFiles(sharedRoot)) {
    const base = path.basename(file);
    if (/Service\.(t|j)sx?$/.test(base) || /UseCase\.(t|j)sx?$/.test(base)) {
      warnings.push(
        `${relativePosix(repoRoot, file)}: shared file looks like business orchestration; confirm it is infrastructure-only.`,
      );
    }
  }
}

function checkImportDirection(appRoot) {
  for (const file of walkFiles(appRoot)) {
    const fromLayer = layerOfFile(appRoot, file);
    if (!fromLayer) continue;
    const source = fs.readFileSync(file, 'utf8');
    for (const spec of extractImports(source)) {
      const target = resolveImportTarget(appRoot, file, spec);
      if (!target?.layer) continue;
      const fromRank = LAYER_RANK[fromLayer];
      const toRank = LAYER_RANK[target.layer];
      if (toRank < fromRank) {
        errors.push(
          `${relativePosix(repoRoot, file)}: invalid FSD import '${spec}' (${fromLayer} → ${target.layer}). Imports must flow downward only.`,
        );
      }
    }
  }
}

const appRoots = findAppRoots();
if (appRoots.length === 0) {
  console.log('Architecture scope check skipped: no React application source found.');
  process.exit(0);
}

for (const appRoot of appRoots) {
  console.log(`Checking architecture scope in ${relativePosix(repoRoot, appRoot) || '.'}`);
  checkForbiddenFolders(appRoot);
  checkSharedBusinessDump(appRoot);
  checkImportDirection(appRoot);
}

for (const warning of warnings) console.warn(`warning: ${warning}`);
if (errors.length > 0) {
  for (const error of errors) console.error(`error: ${error}`);
  process.exit(1);
}

console.log('Architecture scope check passed.');
