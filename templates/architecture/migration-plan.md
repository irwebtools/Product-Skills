# Migration plan playbook

Use when an existing React app must move toward Feature-Sliced Design without a big-bang rewrite.

## Principles

- Do not bypass FSD.
- Migrate incrementally while delivering features.
- Final standard remains FSD-compliant.
- A feature request alone is not permission to redesign the whole tree.

## Current state

```text
Current structure:
Forbidden dump folders present:
Import violations known:
Ownership map status:
```

## Incremental slices

For each step:

```text
Step:
Capability delivered in this step:
Files moved/changed:
Files not touched:
Rollback/risk:
Verification:
```

## Stop conditions

Stop expanding migration when:

- the requested capability is delivered and verified; or
- remaining moves are unrelated cleanup (record as debt instead).
