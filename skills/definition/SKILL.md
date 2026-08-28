---
name: definition
description: Turn a business idea or requested product change into the minimum buildable definition for a credible interface. Use when work is new, ambiguous, or missing a clear primary journey, feature delta, rules, screens, or acceptance criteria.
---

# Definition

Capture only the product and BA thinking needed to build the first credible experience or safely change an existing one.

## Goal

Produce a concise definition that answers:

- What outcome matters?
- Who is the primary actor?
- What is the main journey?
- Which product capabilities already exist when this is an existing product?
- Is the requested delta an **ADD**, **CHANGE**, **REMOVE**, or **NONE** for each affected capability?
- What rules materially change behavior?
- Which screens are required?
- What must be demonstrably true when the work is done?

## Existing-product feature inventory

When `memory/FEATURES.md` exists for the scoped project, read it before proposing implementation. In a monorepo or nested app, use the nearest relevant project memory such as `app/memory/FEATURES.md` or `packages/<name>/memory/FEATURES.md`. Treat it as the concise current capability map, then verify relevant claims against source/config when needed.

Do not confuse a **product feature** with the FSD `features/` layer. A product may have many capabilities while correctly using only `app/`, `pages/`, and `shared/` in FSD.

For each affected capability classify the requested change:

- `ADD` — a new observable product capability;
- `CHANGE` — an existing capability changes behavior, rules, states, or access;
- `REMOVE` — an existing capability intentionally disappears;
- `NONE` — implementation/refactor work with no product capability change.

Before coding, make the delta explicit enough that the agent does not duplicate an existing feature or accidentally restore an intentionally removed one.

After successful verification, update the scoped project's `memory/FEATURES.md` to the resulting **current truth**. Do not turn it into a chronological changelog; git history already records detailed history. For an intentional removal whose rationale matters across sessions, also record a durable decision in `memory/DECISIONS.md` and reference that decision from the feature inventory.

If an existing product has no feature inventory yet, create one only when the task is substantial enough that preserving capability state will help future work. Use `templates/memory/FEATURES.md` as the lightweight contract.

## Method

1. State the product outcome in one short paragraph.
2. For existing products, inspect the current feature inventory and relevant source; identify `ADD / CHANGE / REMOVE / NONE` before implementation.
3. Identify primary and secondary actors only when they affect behavior.
4. Write the shortest end-to-end journey.
5. Extract only business rules that change UI state, validation, permissions, or transitions.
6. Derive the minimum screen set from that journey.
7. Write observable acceptance criteria, including evidence for removed behavior when removal matters.
8. Surface only blocking ambiguity to the human; make reversible implementation choices yourself.

## Output

Prefer a small `docs/definition.md` or an equivalent section in an existing project document:

```markdown
# Definition

## Goal
## Actors
## Feature delta
- ADD:
- CHANGE:
- REMOVE:
- NONE:
## Primary journey
## Business rules
## Screens
## Acceptance criteria
## Open decisions
```

Do not create a long PRD unless explicitly requested.

## Quality bar

A developer should be able to start implementation without guessing the core journey or whether a capability is new, changed, or intentionally removed. Acceptance criteria must be observable in the running interface.
