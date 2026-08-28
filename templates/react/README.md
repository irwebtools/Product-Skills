# React Template Contract

Greenfield Product-Skills interfaces must follow **Feature-Sliced Design (FSD) v2.1**.

Start simple:

```text
src/
├── app/       # providers, routing, initialization
├── pages/     # route-level composition and single-use product logic
└── shared/    # reusable infrastructure only
    ├── api/
    ├── auth/
    ├── config/
    ├── lib/
    └── ui/
```

Add only when current reuse justifies them:

```text
features/     # reusable user interactions used by multiple pages
entities/     # reusable domain models used by multiple consumers
widgets/      # discouraged; do not add by default
```

Do not create empty layers eagerly. The deprecated `processes/` layer must not be introduced.

## FSD architecture contract

- imports flow only downward: `app → pages → widgets → features → entities → shared`;
- no direct cross-imports between slices on the same layer;
- every page/feature/entity slice exposes a public `index.ts`;
- external consumers do not import slice internals directly;
- `shared/` contains infrastructure without business logic;
- single-use product behavior starts in its page;
- extract to `features/` or `entities/` only when real current reuse demonstrates the boundary;
- use domain-based file names instead of catch-all `types.ts`, `utils.ts`, or `helpers.ts` files that mix responsibilities;
- generic CRUD/API transport belongs in `shared/api`;
- auth/session infrastructure belongs in `shared/auth`;
- reusable UI primitives belong in `shared/ui`.

## Required greenfield baseline

- React + TypeScript + Vite
- TypeScript strict mode
- ESLint configured for React + TypeScript
- Feature-Sliced Design v2.1
- `@feature-sliced/steiger` architecture validation
- Tailwind CSS
- shadcn/ui or equivalent mature primitives
- package manager: prefer pnpm when no project convention exists; npm/yarn remain supported

The generated project must expose deterministic scripts named at least:

- `typecheck`
- `lint`
- `architecture` — normally `steiger src`
- `build`

All four checks must pass before the project is considered ready to share. Greenfield lint must be warning-free.

Data can start as mock data. Add Supabase only when a real backend improves the experience. Keep provider client infrastructure below product code, normally in `shared/api` / `shared/auth`, and preserve migrations/SQL, policies, types, API/data contracts, and server-side logic in source control so developers can continue or migrate the backend later.

Existing repositories keep their established architecture unless migration to FSD is explicitly requested or necessary for safe delivery.
