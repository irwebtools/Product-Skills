# Admin Settings App

React demo implementing the **Admin Dashboard / System Settings** experience with Supabase auth and persisted **Settings Presets**.

## Stack

- React 19 + TypeScript (strict)
- Vite
- Tailwind CSS v4
- shadcn/ui-style primitives (Radix UI)
- Feature-Sliced Design v2.1 + Steiger
- Supabase Auth + Postgres (RLS)

## Project memory

The app keeps lightweight product-specific memory under `app/memory/`:

- `PROJECT.md` — verified app facts and current constraints
- `FEATURES.md` — current product capability inventory
- `DECISIONS.md` — durable app-specific decisions

Before changing existing product behavior, classify affected capabilities in `FEATURES.md` as **ADD / CHANGE / REMOVE / NONE**. After verification, update the file to the resulting current truth. Git history remains the detailed changelog.

Product features in this inventory are not the same thing as the FSD `features/` architecture layer.

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Set these values in `.env.local`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` (publishable or anon key only)

Apply database migrations from the repository root:

```bash
supabase db push
```

Or run the SQL in `supabase/migrations/` against your Supabase project.

Create demo accounts through the in-app **Sign up** flow. If email confirmation is enabled in Supabase Auth, confirm the address before signing in.

## Scripts

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm architecture
pnpm build
pnpm preview
```

## Structure (FSD v2.1)

```text
src/
├── app/           # providers, routing, initialization
├── pages/
│   ├── login/
│   └── settings/
└── shared/
    ├── api/
    ├── auth/
    ├── config/
    ├── lib/
    └── ui/
```

## Capabilities

Current detail lives in [`memory/FEATURES.md`](./memory/FEATURES.md).

At a glance:

- Email/password sign-in and sign-up (handles email-confirmation when enabled)
- Protected admin/settings area with session restoration
- System Settings controls and responsive admin experience
- `settings_presets` create/list/apply/rename/delete
- Per-user persistence and RLS isolation
- Source-controlled migration in `supabase/migrations/`
