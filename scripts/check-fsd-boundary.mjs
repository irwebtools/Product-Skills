#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const layers = ['app', 'pages', 'features', 'entities', 'shared'];
const extensions = /\.(?:[cm]?[jt]s|[jt]sx)$/;
const errors = [];
const explicit = process.argv.slice(2);
const roots = explicit.length ? explicit : ['src', 'app/src'].filter(p => fs.existsSync(p));

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    if (e.isSymbolicLink() || ['node_modules', 'dist', 'build', '.git'].includes(e.name)) return [];
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : extensions.test(e.name) ? [full] : [];
  });
}

// Preserve strings so comment-like text inside a module specifier is not removed.
function withoutComments(source) {
  return source.replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\/\*[\s\S]*?\*\/|\/\/[^\r\n]*/g,
    (match, literal) => literal ?? match.replace(/[^\r\n]/g, ' '));
}

function imports(source) {
  const clean = withoutComments(source);
  const pattern = /\b(?:import|export)\s+(?:type\s+)?(?:[^;'"`]*?\s+from\s*)?['"]([^'"\r\n]+)['"]|\b(?:import|require)\s*\(\s*['"]([^'"\r\n]+)['"]\s*\)/g;
  return [...clean.matchAll(pattern)].map(m => m[1] ?? m[2]);
}

function location(root, file) {
  const rel = path.relative(root, file);
  if (rel.startsWith(`..${path.sep}`) || rel === '..' || path.isAbsolute(rel)) return null;
  const [layer, slice] = rel.split(path.sep);
  return layers.includes(layer) ? { layer, slice } : null;
}

for (const input of roots) {
  const root = path.resolve(input);
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
    errors.push(`${input}: source root does not exist or is not a directory`);
    continue;
  }
  for (const e of fs.readdirSync(root, { withFileTypes: true })) {
    if (e.isDirectory() && !layers.includes(e.name)) errors.push(`${input}/${e.name}: unsupported FSD root folder`);
  }
  for (const file of walk(root)) {
    const from = location(root, file);
    if (!from) {
      errors.push(`${file}: source code must belong to an FSD layer`);
      continue;
    }
    for (const spec of imports(fs.readFileSync(file, 'utf8'))) {
      let target;
      if (spec.startsWith('.')) target = path.resolve(path.dirname(file), spec);
      else {
        const normalized = spec.replace(/^(?:@\/|~\/|src\/)/, '');
        if (!layers.includes(normalized.split('/')[0])) continue;
        target = path.resolve(root, normalized);
      }
      const to = location(root, target);
      if (!to) continue;
      if (layers.indexOf(to.layer) < layers.indexOf(from.layer)) {
        errors.push(`${file}: upward import '${spec}' (${from.layer} -> ${to.layer})`);
      } else if (from.layer === to.layer && ['pages', 'features', 'entities'].includes(from.layer) && from.slice !== to.slice) {
        errors.push(`${file}: sibling slice import '${spec}' must be composed in a higher layer`);
      }
    }
  }
}

if (errors.length) {
  errors.forEach(e => console.error(e));
  process.exitCode = 1;
} else console.log(roots.length ? 'FSD boundary check passed.' : 'FSD boundary check skipped: no application source found.');
