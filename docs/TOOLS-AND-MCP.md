# Tools & MCP

Product-Skills follows one rule: **the coding agent owns capability setup; PM/BA users should not need to understand MCP configuration.**

The tool surface stays small, but required capabilities must be resolved before implementation starts.

## Capability bootstrap

Before implementation, the coding agent must inspect the task and determine the capabilities required to complete it end-to-end.

Then:

1. reuse local tools that are already available;
2. identify required remote MCP/tool integrations;
3. if a required remote capability is not authenticated or connected, request that connection immediately;
4. wait only for the specific required connection;
5. resume the same task automatically after connection;
6. never ask the PM/BA to manually inspect settings or connect unrelated services.

Examples:

- Figma URL/design source → require Figma/design access before implementation;
- GitHub push/PR/repository delivery → require GitHub before implementation;
- Vercel deployment/preview/logs → require Vercel before implementation;
- Supabase backend work → require Supabase only when backend behavior is in scope.

If a requested deliverable explicitly includes GitHub push and Vercel deployment, both are required capabilities and should be connected before coding begins rather than discovered near the end.

## Local tool baseline

- filesystem / shell;
- git;
- package manager selected by the project;
- TypeScript/build/lint/test commands;
- Playwright CLI when browser verification is useful;
- Supabase CLI when a Supabase backend is used.

### Package manager

Respect the existing repository first:

1. `packageManager` metadata when present;
2. `pnpm-lock.yaml` → pnpm;
3. `yarn.lock` → yarn;
4. `package-lock.json` or `npm-shrinkwrap.json` → npm.

For a greenfield project with no established manager, prefer **pnpm**. npm and yarn remain supported. Harness scripts must not hard-code npm.

## Remote MCP baseline

The repository currently preconfigures where supported:

- GitHub MCP — repository/PR/issue and remote source-control state;
- Vercel MCP — projects/deployments/logs/preview state;
- Supabase MCP — optional backend/database context and supported actions.

Other capabilities such as Figma may be required by a task. A runtime should use its native MCP/tool integration for that capability and request connection during capability bootstrap.

Preconfigured does not mean always used. Required-by-task does mean connected before implementation.

## Supabase: optional backend accelerator

Supabase is optional. For a frontend-only experience, mock data is usually faster.

When a real backend is valuable, the coding agent may use Supabase MCP and CLI so the PM/BA does not have to write backend code or SQL manually. Speed does not remove the requirement for a reusable handoff.

Preserve durable backend assets in the repository:

- migrations and SQL;
- policies/auth assumptions;
- generated types;
- feature API/data contracts;
- Edge Functions/server-side logic when used;
- environment requirements;
- safe seed/demo data when useful.

A developer team can then keep Supabase, harden it, or replace the provider while retaining business/data knowledge and frontend boundaries.

Remote MCP state must never be the only source of truth for schema/backend behavior.

## Authentication and safety

Prefer OAuth where supported. Never commit PATs, access tokens, service-role keys, or other privileged credentials.

Connection/authentication is task-driven, but it happens during capability bootstrap before implementation when that capability is required by the requested outcome.

Write-capable remote tools should be scoped to the smallest useful environment. Destructive database/repository operations and production-impact actions require explicit human approval.

## Runtime configuration

- Claude Code: root `.mcp.json`.
- OpenAI Codex: `.codex/config.toml`.
- Cursor: `.cursor/mcp.json`.
- Other coding agents: configure equivalent servers through their own native MCP/tool mechanism.

These files are thin runtime-specific configuration, not a definition of which AI coding agents Product-Skills supports.
