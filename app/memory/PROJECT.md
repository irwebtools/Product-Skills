# Project

## Product

- Name: Admin Settings App
- Purpose: stakeholder-ready System Settings experience with authentication and per-user persisted settings presets.
- Primary users: authenticated admin users.

## Verified project facts

- Frontend: React 19 + TypeScript strict + Vite.
- Architecture: Feature-Sliced Design v2.1 using `app/`, `pages/`, and `shared/`.
- Package manager: pnpm.
- Backend/provider: Supabase Auth + Postgres with RLS.
- Delivery: Vercel preview.

## Current constraints

- Public browser code uses only Supabase publishable/anon credentials.
- Settings preset access is scoped to the signed-in user through RLS.
- Existing System Settings UI should be preserved unless a requested feature delta changes it.

Source/config files outrank this memory if they disagree.
