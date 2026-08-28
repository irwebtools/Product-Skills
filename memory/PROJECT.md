# Project Memory

Keep this file short and factual. It should be cheap enough to load frequently.

## Product

- Purpose: lightweight AI coding harness for PMs/BAs to create deployable React experiences that developers can continue toward production.
- Core is runtime-agnostic; runtime-specific config is additive.

## Default frontend stack

- React + TypeScript + Vite
- TypeScript strict mode for greenfield
- ESLint required for greenfield React; lint must be warning-free
- Feature-Sliced Design (FSD) v2.1 is mandatory for greenfield React
- Steiger architecture validation is required for greenfield (`architecture` script, normally `steiger src`)
- Tailwind CSS + shadcn/ui
- package manager: respect existing; prefer pnpm for greenfield; npm/yarn supported
- optional backend: Supabase when persistence/auth/storage/server behavior is useful
- Vercel for preview delivery

## Architecture

- FSD starts with `app/`, `pages/`, and `shared/`.
- Add `features/` and `entities/` only for demonstrated current reuse; `widgets/` is discouraged and `processes/` is deprecated.
- Imports flow downward: `app → pages → widgets → features → entities → shared`.
- Slices expose public APIs through `index.ts`.
- Generic API/CRUD transport belongs in `shared/api`; auth/session infrastructure in `shared/auth`; business logic does not belong in `shared/`.
- Do not force DDD/Clean Architecture layers into simple frontend work.
- Backend artifacts must remain reproducible in source control.

## Quality gates

Greenfield React must pass `typecheck`, warning-free `lint`, `architecture`, and `build` before sharing, plus browser verification of the main journey.

## Core path

`definition → ux-ui → react → verify → delivery`

Conditional: `supabase`, `explorer`, `reviewer`, `debugger`.

## Runtime compatibility

Any capable coding agent may use the canonical harness. Project configuration is currently provided for Claude Code, OpenAI Codex, and Cursor; ChatGPT and other agents can integrate through their own repository/tool mechanisms.
