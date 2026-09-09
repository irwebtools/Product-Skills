---
name: backend
description: Optional skill for API or server-side work that is not covered by the Supabase skill. Use only when the product outcome explicitly needs a backend beyond frontend mocks or Supabase.
---

# Backend (optional)

This skill is **optional**. Most Product-Skills work stays frontend-oriented. Load this skill only when the task needs a non-Supabase API, service, or server boundary.

## When to use

- an existing backend must be integrated;
- the team chose a backend other than Supabase;
- contracts, auth, or server behavior are in scope for the current outcome.

## When not to use

- UI-only or mock-data work;
- Supabase already covers the need — prefer [`supabase`](../supabase/SKILL.md);
- the request is really architecture ownership for Solution Architects — surface that instead of inventing a platform.

## Expectations

1. Keep product UI free of provider leakage.
2. Leave reproducible contracts, types, and setup notes in the repository.
3. Verify the primary backend-dependent journey before delivery.
4. Do not expand into a general DevOps or platform redesign unless asked.

## Standard resources

Use [templates](templates/README.md), [references](references/README.md), and [evaluations](evaluations/README.md) for scope and exit evidence.
