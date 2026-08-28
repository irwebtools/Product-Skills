---
name: supabase
description: Optionally add a real backend when persistence, authentication, storage, shared data, or server-side behavior materially improves the experience. Use Supabase tools to move quickly while preserving SQL, migrations, policies, types, and API/data contracts developers can continue toward production.
---

# Supabase

Supabase is an **optional backend accelerator**, not a required part of every React experience.

PM/BA should not need to write SQL or backend code manually. The coding agent may use Supabase MCP/CLI and project tooling to create the backend, but all durable backend work must remain inspectable, reproducible, and reusable in source control.

## When to use

Use Supabase when the experience benefits from one or more of:

- persistent/shared data;
- authentication or role-aware behavior;
- file/storage workflows;
- relational business data;
- server-side functions or protected operations;
- realistic backend behavior needed for stakeholder validation.

For UI-only work, prefer mock data and skip Supabase.

## Production-continuation contract

When Supabase is used, preserve in the repository as applicable:

- `supabase/migrations/` and SQL;
- RLS policies and authorization assumptions;
- seed/demo **application data** that is safe to share;
- generated database types;
- frontend API/data contracts;
- Edge Functions or other server-side logic;
- environment variable requirements;
- notes for any remote-only resource that cannot be fully represented as code.

These artifacts are developer-owned assets. Developers may keep Supabase for production, harden the implementation, or migrate to another backend while retaining business rules, SQL/data modeling knowledge, API contracts, and frontend boundaries.

## Frontend placement — Feature-Sliced Design

Greenfield Product-Skills React projects follow FSD v2.1.

- Supabase client/provider infrastructure → `shared/api/`.
- Auth session/token/client infrastructure → `shared/auth/`.
- Generic CRUD transport/query functions → `shared/api/`.
- Single-page product logic that consumes Supabase stays in the owning `pages/<page>/` slice.
- Extract a reusable interaction to `features/` only when it is currently reused across multiple pages.
- Extract stable reusable domain models to `entities/` only when current reuse justifies the boundary.
- Never put business rules into `shared/` merely because they touch the backend.

Do not call Supabase directly from page UI components. Page/feature model code should consume a focused lower-layer API boundary.

## Auth and demo-data rules

- Never commit a real/shared demo password, access token, service-role key, or reusable credential to the repository.
- `.env.example` contains variable names or obvious placeholders only. Browser-safe URLs/project refs are not secrets, but reusable templates should not be unnecessarily bound to one remote project.
- Prefer seed files for application data. Create demo auth users through an explicit local/non-production setup script, Auth API, CLI-supported workflow, or user sign-up rather than treating Supabase internal auth tables as a portable application seed contract.
- Email/password sign-up must handle both Supabase outcomes: an immediate session when confirmation is disabled, or `session = null` with a clear **check your email** state when confirmation is enabled.
- Do not assume an account can sign in immediately after `signUp`.

## RLS verification

Writing policies is not proof that authorization works.

When RLS protects user- or role-sensitive data, verify at least:

1. the authorized principal can perform the intended operation;
2. another authenticated principal cannot read/change the protected row;
3. unauthenticated access is rejected when the feature requires authentication.

For CRUD, exercise the business-critical operations against the real policy boundary. Do not mark RLS verified because the SQL looks correct.

## Safety

- Use browser-safe/publishable credentials only in frontend code.
- Never expose service-role or other privileged keys to the browser.
- Add RLS for user/role-sensitive access when relevant.
- Never make remote MCP changes the only record of a schema or backend change.
- Destructive or production-impact changes require explicit approval.
- Surface Supabase security/advisor warnings. A non-critical hardening warning may be deferred for `PREVIEW_READY`, but production-relevant warnings must be resolved or explicitly recorded before `DEV_READY`.

## Tool policy

Use whichever path is fastest **without losing reproducibility**:

- Supabase MCP for remote project/database context and supported actions;
- Supabase CLI for local development, migrations, linking, and reproducible workflows;
- version-controlled SQL/migrations as the durable source of truth.

A repository may keep Supabase MCP read-only by default and enable scoped write access for a non-production project when useful.

## Suggested repository shape

```text
supabase/
├── config.toml
├── migrations/
├── functions/       # only when server-side functions are needed
└── seed.sql          # optional application data only
```

Frontend example:

```text
src/
├── app/
├── pages/
└── shared/
    ├── api/          # Supabase client + generic CRUD transport
    └── auth/         # session/auth infrastructure
```

## Completion

Before sharing, verify the required backend journey actually works. When auth/RLS matters, include negative authorization evidence rather than only happy-path CRUD. FSD architecture validation must also pass. Before `DEV_READY`, verify a developer can understand/reproduce the data model and backend logic from repository artifacts rather than relying on hidden remote state.
