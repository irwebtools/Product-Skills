---
name: react
description: Build or change a React interface quickly while preserving a clean path for developers to continue the same codebase. Use for React/TypeScript implementation, Feature-Sliced Design structure, forms, routing, data seams, and reusable UI composition.
---

# React

Optimize for a working interface first, with boundaries developers can continue toward production.

## Greenfield baseline

Prefer the existing repository stack. If starting fresh, default to:

- React + TypeScript + Vite;
- TypeScript strict mode;
- ESLint with project-appropriate React/TypeScript rules;
- **Feature-Sliced Design (FSD) v2.1** for frontend architecture;
- `@feature-sliced/steiger` for architecture validation;
- Tailwind CSS;
- shadcn/ui or equivalent mature primitives;
- React Hook Form + Zod for non-trivial forms;
- TanStack Query when remote/server state justifies it;
- pnpm when no package manager is already established.

Respect `packageManager` metadata and lockfiles. npm and yarn remain supported; do not migrate an existing project without a concrete reason.

Greenfield projects must expose scripts for at least `typecheck`, `lint`, `architecture`, and `build`. `architecture` must validate FSD boundaries, normally with `steiger src`.

Do not add dependencies without current value.

## Mandatory Feature-Sliced Design rules

Use FSD v2.1 with the principle **start simple, extract when needed**.

Minimal greenfield structure:

```text
src/
├── app/       # app initialization, providers, routing
├── pages/     # route/page-level composition and single-use product logic
└── shared/    # infrastructure only: UI, API client, auth/session, config, lib
```

Add only when current reuse justifies them:

```text
features/     # reusable user interactions used by multiple pages
entities/     # reusable domain models used by multiple consumers
widgets/      # discouraged; keep page-specific composition in pages/
```

Do not create empty layers "just in case". Do not use the deprecated `processes/` layer.

### Layer dependency rule

Imports flow only downward:

`app → pages → widgets → features → entities → shared`

- no upward imports;
- no direct cross-imports between slices on the same layer;
- when two slices need composition, prefer composing them from an upper layer;
- if boundaries are unclear, keep code in the page instead of inventing a reusable slice.

### Public APIs

Every slice in `pages/`, `features/`, or `entities/` exposes external imports through its `index.ts`.

Do not bypass a slice public API by importing internal files from another slice.

`shared/` has no slices. Expose focused public APIs per segment such as `shared/ui`, `shared/api`, `shared/auth`, `shared/lib`, and `shared/config` rather than a single giant `shared/index.ts`.

### Placement rules

- single-page UI, state, validation, and product logic stay in that page slice;
- reusable UI without business meaning → `shared/ui`;
- generic API client and CRUD transport → `shared/api`;
- auth token/session infrastructure → `shared/auth`;
- generic utilities → `shared/lib`;
- app-wide providers/router/theme → `app`;
- extract to `features/` only for a stable user interaction currently reused across multiple pages;
- extract to `entities/` only for a stable business model currently reused across multiple consumers;
- keep business logic out of `shared/`.

Use domain-based file names. Avoid catch-all names such as `types.ts`, `utils.ts`, or `helpers.ts` when they mix unrelated responsibilities.

## Backend/provider seam

FSD placement replaces the old assumption that every data call belongs in a `features/<feature>/api` folder.

For a simple page, prefer:

`page UI/model → shared/api → provider`

When a reusable feature/entity genuinely exists, it may own product-specific orchestration while provider infrastructure remains below it.

Supabase, HTTP, or mock provider details must not leak through page UI. Keep browser-safe client setup in `shared/api` or `shared/auth` as appropriate.

## Clean-code rules

- Keep TypeScript strict for greenfield work.
- ESLint must pass with zero warnings; do not use blanket disables to hide issues.
- FSD architecture validation must pass before `PREVIEW_READY`.
- Avoid `any` unless a boundary truly cannot be typed and the reason is documented.
- Avoid unsafe casts whose only purpose is to silence TypeScript.
- Reuse existing components and patterns before inventing shared abstractions.
- Model loading, empty, validation, error, and success states when the journey can reach them.
- Do not prematurely introduce DDD/service/repository layers for simple UI work.
- Avoid giant page components, but do not extract single-use code merely to make files smaller; extract around clear responsibilities or real reuse.

## Existing repositories

Do not mechanically migrate an established project to FSD during an unrelated change. Preserve its architecture unless the task explicitly requests migration or the current structure blocks safe delivery. New greenfield Product-Skills projects, however, must follow FSD.

## Completion

Implementation is not complete until `typecheck`, `lint`, `architecture`, and `build` pass using the selected package manager and the main acceptance journey is verified in the running application.
