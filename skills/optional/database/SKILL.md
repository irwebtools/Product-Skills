---
name: database
description: Optional skill for schema, migration, and data-model work. Use only when persistence design or migration evidence is required for the current product outcome.
---

# Database (optional)

This skill is **optional**. Load it when the outcome needs durable schema or migration work beyond what a thin Supabase path already covers.

## When to use

- schema or migration changes are required;
- data constraints or RLS policies must be explicit in source control;
- developers need reproducible database artifacts for handoff.

## When not to use

- mock-data UI work;
- no persistence is required for the preview;
- Supabase skill already covers the needed migrations — coordinate with [`supabase`](../supabase/SKILL.md) instead of duplicating guidance.

## Expectations

1. Prefer source-controlled migrations over manual remote edits.
2. Test migrations on an isolated database when available.
3. Document rollback or follow-up risk for developers.
4. Do not design a full enterprise data platform unless that is the asked outcome.

## Standard resources

Use [templates](templates/README.md), [references](references/README.md), and [evaluations](evaluations/README.md) for scope and exit evidence.
