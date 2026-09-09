# Architecture Governance

Product-Skills is an AI Product Engineering Platform. Its coding harness provides the execution rules and verification controls.

```text
Agent = Model + Harness
```

Architecture governance exists so agents deliver the requested capability with the **smallest correct change**, without degrading React/FSD structure.

## Why Feature-Sliced Design exists

FSD gives every piece of UI code a clear home:

| Layer | Owns |
| --- | --- |
| `app/` | bootstrap, providers, routing |
| `pages/` | route/page composition and single-use product logic |
| `features/` | reusable user interactions (only when reuse exists) |
| `entities/` | reusable domain models (only when reuse exists) |
| `shared/` | infrastructure without business meaning |

Imports flow downward only:

```text
app → pages → features → entities → shared
```

Without this, AI agents often invent `components/`, `services/`, `hooks/`, and `utils/` dumping grounds and spread one feature across the whole tree.

## Why minimal change matters

A request like “Add approval button” should not rewrite:

```text
components/ + services/ + hooks/ + utils/ + routing/ + unrelated features
```

Large opportunistic edits create:

- review noise;
- regression risk;
- unclear ownership;
- architecture drift.

Governance rule:

```text
correctness > minimal change > elegance
```

A feature request is not permission to redesign the repository.

## How agents should decide file changes

Before implementation, run **Architecture Impact Analysis**:

```text
Capability affected:
Existing architecture:
Target location:
Files expected to change:
Files explicitly not changed:
Risk:
```

Then:

1. Find the owning page/feature/entity.
2. Change only that ownership boundary when possible.
3. Touch `shared/` or `app/` only when the capability requires it.
4. Explain every changed file in the completion report.

### Good change

Request: add an approve action on the order review screen.

```text
Changed:
- src/pages/order-review/ui/OrderReviewPage.tsx
- src/pages/order-review/model/use-order-review.ts

Why:
- page owns the single-screen behavior
- model holds the local approve interaction state

Not changed:
- unrelated pages
- shared API client
- routing config
```

### Bad change

Same request, but agent also:

- creates `src/components/ApprovalButton.tsx`;
- creates `src/services/orderService.ts`;
- rewrites `src/hooks/useOrders.ts`;
- reformats unrelated utils;
- renames folders “for consistency”.

This expands blast radius without capability need.

## Incremental migration

Existing applications retain their established architecture unless migration is explicitly authorized. When agreed, document the migration scope, incremental boundaries, regression checks, and rollback. Never treat a feature request as implicit rewrite approval.

## Related harness files

- [`AGENTS.md`](../AGENTS.md) — AI boot sequence
- [`rules/agent-behavior.md`](../rules/agent-behavior.md) — forbidden opportunistic edits
- [`rules/change-scope.md`](../rules/change-scope.md) — minimal change / blast radius
- [`rules/react-anti-patterns.md`](../rules/react-anti-patterns.md) — forbidden dump folders
- [`memory/OWNERSHIP.md`](../memory/OWNERSHIP.md) — capability → owner map
- [`templates/`](../templates/) — reasoning playbooks (not app demos)
- [`evaluations/`](../evaluations/) — architecture / security / quality scoring
- [`skills/delivery/architecture-decision/SKILL.md`](../skills/delivery/architecture-decision/SKILL.md) — Architecture Decision Record before coding
- [`scripts/check-architecture-scope.mjs`](../scripts/check-architecture-scope.mjs) — deterministic checks
