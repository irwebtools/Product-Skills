import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

// Scan the reviewable Git bundle, including new files but excluding local ignored
// secrets. Tracked ignored files remain included. Standalone fixtures use a walk.
export function reviewFiles(root) {
  const git = spawnSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { cwd: root, encoding: 'utf8' });
  if (git.status === 0) return [...new Set(git.stdout.split('\0').filter(Boolean))]
    .map(p => path.resolve(root, p)).filter(p => fs.existsSync(p) && fs.lstatSync(p).isFile());
  const ignored = new Set(['.git', 'node_modules', 'dist', 'build', '.next', 'coverage']);
  function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
      if (e.isSymbolicLink() || ignored.has(e.name)) return [];
      const full = path.join(dir, e.name);
      return e.isDirectory() ? walk(full) : [full];
    });
  }
  return walk(root);
}
