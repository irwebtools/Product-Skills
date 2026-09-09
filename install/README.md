# Maintainer install utilities

These scripts are **not** the Product Team installation path.

Product Team installs the **product-skills** Cursor Plugin from the Cursor Marketplace (or a local plugin test path).

## What these scripts are for

Maintainers and AI Coding environments that need to copy Product-Skills guidance into another repository without using the Cursor Plugin package.

| Script | Purpose |
| --- | --- |
| `bootstrap.mjs` | Clone official HTTPS repo to temp, verify remote, run safe install |
| `install.mjs` | Copy guidance into `--target` without blindly overwriting |
| `init.mjs` | Light analysis banner + install |
| `cli.mjs` | Optional Node entry for maintainer commands |

## Safety rules

- Do not execute arbitrary downloaded scripts
- Do not overwrite existing project instructions blindly
- Do not copy `.git/`, `node_modules/`, or `.env*`
- Do not write outside the target project
- Do not expose secrets

Official source: `https://github.com/irwebtools/Product-Skills`
