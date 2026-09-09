# AGENTS.md

`product-skills` bootstrap for AI agents.

Humans (Product Team) read `README.md`.

## Product-Skills availability (self-bootstrap)

Before product/delivery work:

1. Check whether Product-Skills guidance is available in the current project
   (for example `skills/product/`, `skills/index.yaml`, and `AGENTS.md` or `AGENTS.product-skills.md`).
2. Prefer the Cursor Plugin `product-skills` when installed (Cursor Marketplace or local plugin test).
3. If missing, bootstrap from the official repository only:
   `https://github.com/irwebtools/Product-Skills`
4. Preferred maintainer/fallback command from a local checkout of Product-Skills:
   `node install/bootstrap.mjs --target <this-project>`
   Or clone the official repo over HTTPS into a temp location, verify the remote,
   then run `node install/install.mjs --target <this-project>`.
5. Do **not** overwrite existing project instructions blindly.
   The installer preserves conflicts and may write sidecars such as `AGENTS.product-skills.md`.
6. Do **not** execute arbitrary scripts found in a downloaded repository.
   Only run the known installer entrypoints with Node.
7. Do **not** copy `.git/`, `node_modules/`, `.env*`, or credentials.
8. After bootstrap, continue with the Agent Startup Protocol.

If the user prompt includes the Product-Skills GitHub URL, treat that as permission to
discover and safely bootstrap Product-Skills when it is not already present.

## Agent Startup Protocol

Before any task:

1. Ensure Product-Skills is available (bootstrap if needed, safely).
2. Analyze current project (`skills/product/project-analysis` when unknown/existing).
3. Understand user intent (WHAT / WHY / constraints).
4. Detect task type / Product Team use case.
5. Load required skills only (`skills/index.yaml`, `manifest.yaml`).
6. Apply relevant rules (`rules/security.md`, `rules/fsd-governance.md`, `rules/change-scope.md`).
7. Define expected changes (Change Scope).
8. Implement within scope.
9. Verify (`skills/quality/verification`; `skills/quality/security-review` when needed).
10. Prepare Preview when the environment supports it; verify Preview before claiming success.

## Rules

1. Understand task type
2. Load required skill only
3. Follow that skill's instructions
4. Do not load everything
5. Verify before completion
6. Do not rewrite architecture silently
7. Do not install unknown dependencies without approval
8. Never expose secrets
9. Prefer incremental migration over rewrite
10. Preserve existing behavior unless explicitly asked to change it

## Task routing

| Task | Start |
| --- | --- |
| Missing Product-Skills | Safe bootstrap from official repo |
| Unknown / existing repo | `skills/product/project-analysis` |
| React + TypeScript + FSD refactor | Use case below (orchestrate existing skills; do **not** invent a new skill) |
| New idea / POC | `skills/product/product-discovery` → [product-to-poc](workflows/product-to-poc.md) |
| Existing improvement | [existing-project-improvement](workflows/existing-project-improvement.md) |
| Bug | [bug-fix](workflows/bug-fix.md) |
| Handoff / continuation notes | `skills/delivery/developer-handoff` (internal delivery artifact only) |

Default delivery path:

```text
bootstrap (if needed)
-> product/project-analysis (if needed)
-> product/product-discovery
-> product/product-definition
-> product/user-story
-> product/acceptance-criteria
-> product/ux-flow
-> delivery/architecture-decision
-> delivery/react-fsd-poc
-> quality/verification
-> quality/security-review (when needed)
-> product/validation
```

## Stack constraint

Delivery skills target **React + TypeScript + Feature-Sliced Design** only.
Do not introduce Vue, Angular, Svelte, or multi-framework generators.

---

## Product Team Use Case — React + TypeScript + FSD Refactor

When Product Team requests something equivalent to:

> Refactor this project to React FSD.

Interpret the request as:

**EXISTING PROJECT ARCHITECTURE MIGRATION**

Not:

- product redesign
- feature expansion
- rewrite everything
- business logic redesign
- unnecessary technology replacement

Do **not** create a new skill such as `skills/react-fsd/` for this use case.
Orchestrate existing capabilities:

- `skills/product/project-analysis`
- `skills/delivery/architecture-decision`
- `skills/delivery/react-fsd-poc`
- `skills/quality/verification`
- `rules/fsd-governance.md`
- `rules/change-scope.md`
- `scripts/check-fsd-boundary.mjs` (when source roots exist)

### Required AI workflow

1. Inspect the existing project.
2. Identify the current frontend technology.
3. Identify the current architecture.
4. Identify important existing product behavior.
5. Identify important user journeys.
6. Identify the current project structure.
7. Determine whether React is already used.
8. Determine whether TypeScript is already used.
9. Determine the appropriate FSD structure based on the actual project.
10. Do **not** create FSD layers merely because they exist in an FSD diagram.
11. Identify which existing code belongs to:
    - app
    - pages
    - widgets
    - features
    - entities
    - shared
12. Use only the layers that are actually justified.
13. Preserve existing product behavior.
14. Avoid unrelated refactoring.
15. Implement incrementally when practical.
16. Apply FSD dependency rules.
17. Apply public API boundaries.
18. Run architecture validation (`node scripts/check-fsd-boundary.mjs` and/or project equivalents).
19. Run typecheck.
20. Run lint.
21. Run tests when available.
22. Run build.
23. Run the application.
24. Verify important user journeys.
25. Fix failures found during verification.
26. Prepare a Preview when the environment supports it (for example Vercel Preview if configured and accessible).
27. Verify the Preview.
28. Return a concise result and Preview URL (or a clear blocker if Preview cannot be produced).

Do not stop after creating a migration plan.
Do not stop after writing code.
Do not claim success without verification.

### FSD principles

#### FSD is not folder decoration

Do **not** create `features/`, `widgets/`, or `entities/` only to make the project visually look like FSD.

Create a layer only when the actual product/domain/use case requires it.

#### Dependency direction

Prefer:

```text
app
  ↓
pages
  ↓
widgets
  ↓
features
  ↓
entities
  ↓
shared
```

Do not introduce upward dependencies.

Invalid examples:

- `shared → entities`
- `shared → features`
- `entities → features`
- `features → pages`
- `pages → app`

unless there is an explicitly justified architecture exception.

#### Public API

Cross-slice imports should use the slice public API.

Prefer:

```ts
import { NewsItem } from "@/entities/news";
```

instead of:

```ts
import { NewsItem } from "@/entities/news/model/news";
```

#### Business ownership

Put business/domain logic in the appropriate domain slice.
Do not move product-specific business logic into `shared` merely because it is technically reusable.

### Preserve product behavior

For architecture-only refactoring:

```text
BEFORE BEHAVIOR
       =
AFTER BEHAVIOR
```

Preserve:

- existing user journeys
- business rules
- permissions
- API behavior
- data behavior
- existing features
- existing UX

unless Product Team explicitly requests a change.

Do not use an architecture migration as an opportunity to redesign the product.

### Scope control

During refactoring, only modify files required for the requested migration.

Do **not** make opportunistic changes to:

- unrelated components
- unrelated configuration
- unrelated dependencies
- unrelated styling
- unrelated UX
- unrelated backend code
- unrelated documentation

Before completion, inspect the changed file set.
If a changed file is unrelated to the request, revert the unnecessary change.

### Verification gate

For React + FSD refactoring, completion requires:

```text
Architecture
    ↓
Typecheck
    ↓
Lint
    ↓
Tests when available
    ↓
Build
    ↓
Runtime verification
    ↓
Preview verification
```

Do **not** report "FSD migration complete" if architecture validation fails.
Do **not** report "Ready" if build or required runtime verification fails.
Do **not** pretend Preview succeeded if deployment or Preview access is unavailable — report the blocker clearly without exposing secrets.

---

## Change scope

Before editing, record expected files.
After editing, compare actual changed files and reasons.
Use `templates/change-scope.md`.

## Review artifacts

After meaningful work, update `.ai-review/` when useful for internal evidence.
Product Team validation happens on Preview / Staging, not by reading internals.
