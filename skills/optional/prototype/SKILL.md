---
name: prototype
description: Build a working product prototype — usually React + TypeScript with Feature-Sliced Design. Use after product definition and UX/UI guidance when a runnable experience is required.
---

# Prototype

Produce a **working application**, not mockups alone.

## Path

```text
product/product-discovery -> product/product-definition -> product/user-story -> product/acceptance-criteria -> product/ux-flow -> delivery/architecture-decision -> delivery/react-fsd-poc -> quality/verification -> product/validation -> delivery/developer-handoff
```

## React implementation

Load [`react/SKILL.md`](./react/SKILL.md) for TypeScript, FSD, and architecture impact checks.

Component placement notes: [`component/`](./component/).

## Rules

- Follow [`rules/fsd-governance.md`](../../rules/fsd-governance.md).
- Never invent `src/components`, `src/services`, `src/hooks`, or `src/utils` as business dumping grounds.
- Decide Page / Feature / Entity / Shared **before** coding.
- Smallest correct change only.

## Optional backends

Use `supabase` / `backend` / `database` only when persistence or auth is required for a credible prototype.

## Standard resources

Use [templates](templates/README.md), [references](references/README.md), and [evaluations](evaluations/README.md) for scope and exit evidence.
