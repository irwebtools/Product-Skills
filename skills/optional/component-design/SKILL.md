---
name: component-design
description: Design React components with clear FSD ownership and public APIs.
---

# component-design

## When to use

Use when splitting UI into reusable React components inside an FSD slice.

## Purpose

Keep components owned by the correct layer and avoid cross-feature dumping.

## Input

- UX flow states and interactions
- Architecture Decision Record
- Existing shared UI primitives (if any)

## Process

1. Place business UI in the owning feature/entity slice.
2. Extract truly shared primitives to `shared/ui` only when reused.
3. Expose public API through the slice index/public file.
4. Prefer composition over global utility helpers for business logic.
5. Keep TypeScript props explicit and stable.

## Output

- Component ownership map
- Public API notes
- Reuse decisions

## Verification

- Components live under ADR locations.
- No business feature dumped into `src/components`.
- Shared extraction is justified by reuse, not convenience.

## Restrictions

- React + TypeScript + FSD only.
- Do not create global component warehouses for business features.
- Do not bypass architecture decision for "faster demo".
