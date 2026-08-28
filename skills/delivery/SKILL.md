---
name: delivery
description: Publish a verified React experience to Vercel and, when requested, harden the same repository for developer continuation. Use after verification or when preparing the accepted preview for engineering handoff.
---

# Delivery

Delivery has two depths: stakeholder preview and developer-ready handoff.

## Tool policy

Use local `git` for deterministic repository operations. Use GitHub MCP when remote PR/issue/repository state is needed.

Use Vercel MCP for remote project/deployment state and Vercel CLI when a deterministic local deployment command is the shorter path.

Prefer OAuth-based authentication. Do not commit GitHub PATs, Vercel tokens, or other remote-service credentials.

## Preview delivery

Before deployment:

1. run relevant deterministic checks;
2. validate required environment variables;
3. ensure secrets are not in browser/source control;
4. deploy to Vercel;
5. confirm the share URL is reachable;
6. exercise the main acceptance journey against that deployed URL.

A successful deployment alone is not `PREVIEW_READY`.

### URL reporting contract

PM/BA output must lead with exactly **one `Share URL`** — the URL stakeholders should open.

Do not present every Vercel URL as if each were a separate preview.

Classify additional values only when useful:

- **Share URL** — canonical URL for stakeholder testing. For a preview deployment, prefer the preview/branch alias. For an intentional production deployment, use the production alias.
- **Deployment URL** — immutable deployment-specific URL; technical metadata, useful for debugging/history.
- **Inspector / Dashboard URL** — Vercel management page; internal metadata, not an application URL.

Do not deploy to production merely to obtain a stable-looking URL. A stakeholder preview should remain a preview unless the user explicitly asks for production promotion.

## Developer-ready depth

After stakeholder acceptance, harden the same repository rather than creating a replacement implementation.

Check:

- feature boundaries and data access remain understandable;
- TypeScript/build/lint checks pass cleanly;
- important business behavior has proportionate tests;
- Supabase migrations/RLS/auth are reproducible and reviewed when relevant;
- `.env.example` and local setup are accurate;
- known deferred work and architecture decisions are visible;
- unnecessary demo hacks, dead mocks, hidden credentials, and temporary bypasses are removed.

Return `DEV_READY` only when the repository is genuinely understandable and runnable by a developer who did not author the preview.
