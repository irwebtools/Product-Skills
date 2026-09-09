---
description: Limit changes to the requested product scope
alwaysApply: true
---

# Change Scope Rules

Every task must optimize for:

```text
correctness
  >
minimal change
  >
elegance
```

Agents must avoid opportunistic cleanup.

**A feature request is not permission to redesign the repository.**

## Minimal Change Principle

1. Change the smallest surface area that correctly delivers the requested capability.
2. Prefer editing an existing owning file over creating new folders or abstractions.
3. Touch shared infrastructure only when the capability cannot be completed inside the owning page/feature.
4. Leave formatting, naming, and unrelated refactors for an explicitly scoped cleanup task.

## Blast radius control

Before coding, identify:

- the capability affected;
- the owning page/feature/entity;
- the expected files to change;
- the files that must **not** change;
- residual risk.

Do not expand into unrelated features, global routing/config unless required, broad renames, or architecture migration unless the task explicitly includes migration.

## Required change report

Before coding, record expected files. After coding, compare actual files.

```text
Before:
Expected files:
- file — why needed

After:
Changed files:
- file — why needed

Reason:
- short summary
```

Also:

```text
Not changed:
- intentionally untouched areas

Risk:
- possible impact
```

Mirror the summary into `.ai-review/change-summary.md` for human review.

Every changed file must have a clear ownership reason. If a file change cannot be justified against the requested capability, remove it from the change set.

## File ownership defaults

| Kind of change | Preferred location |
| --- | --- |
| Single-screen product behavior | owning `pages/<slice>/` |
| Reused user interaction | `features/<slice>/` only when reuse exists |
| Reused domain model | `entities/<slice>/` only when reuse exists |
| Provider/client/UI primitive | `shared/*` infrastructure segments only |
| App bootstrap/routing | `app/` only when routing/providers must change |

Prefer `memory/OWNERSHIP.md` over guessing.

## Required artifact

Use [change scope](../templates/change-scope.md) to record impact analysis, expected files, actual changed files, not changed files, and reasons for every task.
