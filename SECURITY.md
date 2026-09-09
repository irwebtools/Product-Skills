# Security

Product-Skills is an open-source Cursor Plugin (MIT) for Product Team workflows.

## What this plugin does

- Packages skills, rules, agents, and commands for Product Team requests
- Guides AI Coding to inspect projects, implement changes, verify results, and prepare a Preview when supported

## What this plugin does not do

- Does not collect Plugin Data or User Content for training or resale
- Does not register Cursor runtime hooks (**intentional design** — Cursor supports hooks; Product-Skills chooses not to ship them)
- Does not ship MCP servers or require GitHub / Vercel / Supabase access (**intentional design** — Cursor supports MCP; Product-Skills remains standalone)
- Does not require npm runtime dependencies

## Privileged maintainer utilities

These scripts are optional maintainer tooling. They are **not** Cursor Plugin hooks.

| Entry | Privilege | Guardrails |
| --- | --- | --- |
| `install/bootstrap.mjs` | Clones official HTTPS repo to temp, installs into `--target` | Official remote verification; does not execute arbitrary downloaded scripts |
| `install/install.mjs` | Copies guidance into a target project | Safe-by-default; preserves conflicts; blocks `.git`, `node_modules`, `.env*` |
| `scripts/ship-gate.mjs` | May run local package scripts | Optional; not Marketplace-wired |
| `scripts/check-secrets.mjs` | Scans for secret-like patterns | Read-only; never prints secret values; **not complete security** |

## Secret scanning limitation

`scripts/check-secrets.mjs` uses pattern matching. Passing does **not** prove the repository is free of secrets.

## Reporting

Report security issues privately to repository maintainers. Do not open public issues that include live secrets.
