# Product-Skills Agent Guide

Product-Skills helps PMs and BAs turn business ideas into deployable React experiences quickly while preserving a codebase developers can continue toward production.

The core harness is runtime-agnostic. Use native runtime configuration when available, but never assume a task must run in Claude Code, Codex, Cursor, ChatGPT, or any other named agent.

Keep the harness lightweight. Prefer the shortest path that can produce verified evidence.

## Read order

1. Read this file.
2. For an existing project, read the **nearest scoped project's** `memory/PROJECT.md` when present. In a monorepo or nested app, prefer `app/memory/`, `packages/<name>/memory/`, or the memory nearest the code being changed instead of unrelated repository-root memory.
3. If the task changes product behavior, read that same project's `memory/FEATURES.md` when present.
4. Read only the skill(s) relevant to the current task.
5. Read only relevant specs and source files.
6. Retrieve project decisions or harness lessons only when the task touches them.

Do not load every skill or every memory file by default.

`memory/` is **project-specific context**, not a second copy of common Product-Skills policy. Common reusable behavior belongs in `AGENTS.md`, `skills/`, `rules/`, workflows, and deterministic tooling. New projects may initialize lightweight memory from `templates/memory/`.

Cross-project mistakes that should influence future runs belong in `rules/lessons.md`, not in a generated project's memory.

## Capability bootstrap — run before implementation

PM/BA users may not know how to configure tools or MCP servers. The coding agent owns capability setup.

Before implementation:

1. Inspect the task and identify the capabilities required to complete it end-to-end.
2. Check whether those capabilities are already available through local tools or the runtime's configured MCP/tool integrations.
3. If a required capability needs authentication or connection, request that specific connection immediately before starting implementation.
4. Resume automatically once the user completes the connection.
5. Do not ask the user to manually inspect settings or pre-connect unrelated services.

Examples:

- Figma URL / design inspection → require Figma access before implementation.
- GitHub push / PR / remote repository work → require GitHub connection before implementation.
- Vercel deployment / preview / logs → require Vercel connection before implementation.
- Supabase backend work → require Supabase connection only when a backend is actually needed.

Local filesystem, shell, git, package-manager commands, and local browser tooling do not require remote authentication.

## Default path

`definition → ux-ui → react → verify → delivery`

Conditional capabilities:

- use `supabase` only when a backend materially improves the experience;
- use `debugger` only after an observed failure with an unclear cause;
- use `explorer` only when an existing repository is unfamiliar;
- use `reviewer` for large/risky/cross-feature work or before `DEV_READY`;
- use subagents only when context isolation or independent evidence adds value.

## Product feature inventory

For an existing product, a small `memory/FEATURES.md` may record the current product capability map.

This is **not** the same thing as the FSD `features/` layer. Product features describe observable user/business capability; the FSD layer is an architectural extraction used only when interaction reuse justifies it.

Before changing behavior, classify the requested delta for affected capabilities:

- `ADD` — new capability;
- `CHANGE` — existing capability changes behavior, rules, states, or access;
- `REMOVE` — capability intentionally disappears;
- `NONE` — implementation/refactor only.

After verification, update the inventory to the resulting current truth. Do not append every historical change. Git history is the detailed changelog. Intentional removals that must not be accidentally restored should reference a durable entry in `memory/DECISIONS.md`.

## Non-negotiable rules

1. Optimize for a working stakeholder experience first.
2. Do not invent business behavior that materially changes the user flow; surface blocking ambiguity.
3. Prefer existing project patterns over introducing new architecture.
4. **Greenfield React must follow Feature-Sliced Design (FSD) v2.1.** Start with `app/`, `pages/`, and `shared/`; add `features/` or `entities/` only for demonstrated reuse. `widgets/` is discouraged and `processes/` is deprecated.
5. FSD imports flow only downward: `app → pages → widgets → features → entities → shared`; slices expose external imports through public `index.ts` APIs.
6. Greenfield React uses TypeScript with strict mode and ESLint as the default code-quality baseline.
7. Greenfield React must expose and pass an `architecture` check, normally `steiger src`, in addition to typecheck/lint/build.
8. Do not suppress type/lint/architecture failures with blanket disables, unsafe `any`, casts, or undocumented boundary exceptions merely to pass checks.
9. Keep reusable infrastructure in `shared/` and business logic out of `shared/`; keep single-use product logic in the owning page until real reuse justifies extraction.
10. Never expose secrets or privileged service credentials in browser code.
11. Persistent schema changes must be reproducible through source-controlled migrations/SQL.
12. Backend tooling must leave reusable contracts/artifacts for developer continuation.
13. Do not add abstraction without demonstrated need.
14. Do not claim success without executing relevant verification.
15. Treat `PREVIEW_READY` and `DEV_READY` as different gates.
16. For meaningful existing-product behavior changes, preserve current capability truth so future agents can distinguish existing, added, changed, and intentionally removed features.

## Package manager policy

Respect the current repository first.

Detect the package manager from `packageManager` metadata and lockfiles. Use `pnpm` for greenfield when no manager is established, but support `npm` and `yarn` without rewriting a project just to standardize tooling.

Never hard-code `npm run` when the selected manager can be detected.

## Tool policy

Use local deterministic tools first: filesystem, shell, `git`, the detected package manager, project checks, Playwright CLI, and Supabase CLI.

Use MCP for remote state/actions when useful:

- GitHub MCP — PRs, issues, remote repository state/actions;
- Vercel MCP — projects, deployments, preview state/logs;
- Supabase MCP — optional backend/database context and actions.

Supabase is not mandatory. For UI-only work, mock data is usually faster. When Supabase is used, preserve migrations/SQL, policies, generated types, API/data contracts, and server-side logic in the repository so developers can keep or migrate the backend later.

Prefer OAuth. Never commit remote-service tokens. Destructive repository/database operations and production-impact changes require explicit human approval.

## Context discipline

A task context should contain only the task/goal, relevant acceptance criteria, relevant project facts, affected product-feature entries when applicable, relevant skill, and relevant source files/interfaces.

Avoid passing full conversation history, every skill, the full feature inventory for an unrelated task, or the entire repository to a subagent.

## Subagent policy

Use the main agent for low-complexity work. Use `explorer` for unfamiliar patterns, `reviewer` for large/risky changes, `verifier` before `PREVIEW_READY`, and `debugger` only for focused root-cause analysis after a real failure.

## Verification

For greenfield React, `typecheck`, `lint`, `architecture`, and `build` are required deterministic gates before `PREVIEW_READY`; use the detected package manager. Lint must be warning-free.

For `PREVIEW_READY`, also verify the primary business journey in the running application, not only a successful build. When a feature is intentionally removed, verify the removed behavior is no longer available when that is material to acceptance.

For `DEV_READY`, additionally verify reproducible setup, relevant tests, documentation, FSD boundaries, and backend artifacts when a backend exists.

## Architecture escalation

FSD does not mean creating every layer up front.

Start simple:

- Level 0 — `app/ + pages/ + shared/`, React + mock data.
- Level 1 — the same FSD baseline + optional backend provider in `shared/api` / `shared/auth`.
- Level 2 — extract stable reused interactions to `features/` and stable reused domain models to `entities/` only when current reuse demonstrates the need.
- Level 3 — dedicated backend/services when production needs require them.

Do not force later-stage architecture into a simple interface.

## Canonical locations

- `skills/` — reusable capability instructions
- `workflows/` — short execution recipes
- `subagents/` — optional isolated role contracts
- `memory/` — small verified memory for this repository/project only
- `templates/memory/` — starter memory contract for generated or adopted projects
- `rules/` — stable invariants and cross-project harness lessons
- `hooks/` / `scripts/` — deterministic checks
- runtime-specific config files/directories — integration only

Never duplicate canonical skill content into runtime-specific configuration or project memory.
