---
description: Engineering quality expectations for Product-Skills delivery
alwaysApply: false
---

# Engineering Rules

- Optimize for the smallest working experience that preserves a clean continuation path.
- Follow [agent-behavior](agent-behavior.md), [change-scope](change-scope.md), [fsd-governance](fsd-governance.md), and [react-anti-patterns](react-anti-patterns.md).
- See [architecture governance](../docs/ARCHITECTURE-GOVERNANCE.md) for deep reference.
- Prefer existing repository conventions, but do not invent a permanent architecture that replaces the Product-Skills React standard.
- **Greenfield React must follow Feature-Sliced Design (FSD) v2.1.**
- **Existing React projects retain established architecture unless migration is explicitly authorized.** Agreed migrations use incremental boundaries and regression checks.
- Start FSD with only `app/`, `pages/`, and `shared/`; add `features/` and `entities/` only for demonstrated current reuse. The platform profile excludes `widgets/` and `processes/`; compose screens in `pages/`.
- FSD imports flow downward only: `app → pages → features → entities → shared`.
- Slices expose external imports through `index.ts`; do not bypass another slice's public API.
- Keep reusable infrastructure without business logic in `shared/`; keep single-use product behavior in its owning page until real reuse justifies extraction.
- Put generic API/CRUD transport in `shared/api`, auth/session infrastructure in `shared/auth`, reusable UI primitives in `shared/ui`, and app providers/router in `app`.
- Treat **product features/capabilities** separately from the FSD `features/` layer. When `memory/FEATURES.md` exists, preserve its current truth across meaningful behavior changes.
- Before existing-product behavior changes, classify affected capabilities as `ADD`, `CHANGE`, `REMOVE`, or `NONE`; after verification update the feature inventory rather than relying on agent memory.
- Intentional removals that must not be restored accidentally should reference a durable project decision.
- Greenfield React uses TypeScript strict mode and ESLint.
- Greenfield projects expose `typecheck`, `lint`, `architecture`, and `build`; `architecture` normally runs `steiger src`.
- `typecheck`, warning-free `lint`, `architecture`, and `build` must pass before `PREVIEW_READY`.
- Do not hide type/lint/architecture failures with blanket disables, unsafe `any`, casts, or undocumented exceptions used only to silence checks.
- Add architectural layers only when current complexity or reuse demonstrates a need.
- Do not bury business-critical logic inside giant page components, but do not extract single-use code merely for cosmetic file size reduction.
- Do not create shared abstractions used by only one consumer without a concrete reason.
- Never commit reusable demo passwords, access tokens, privileged keys, or other credentials.
- Auth flows must handle the provider's real confirmation/session semantics instead of assuming immediate sign-in.
- RLS/authorization is verified with both allowed and denied access evidence when user or role isolation matters.
- Reusable templates and examples should avoid unnecessary coupling to one remote project/environment.
- Run actual checks before claiming success.
