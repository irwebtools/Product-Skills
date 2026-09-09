# Architecture review playbook

Use before implementation or before expanding scope.

## Impact analysis

```text
Capability affected:
Existing architecture:
Target FSD location:
Ownership boundary:
Files expected to change:
Files explicitly not changed:
Risk:
```

## Checks

- [ ] No forbidden dump folders (`src/components|services|hooks|utils` as business homes)
- [ ] Imports flow downward only
- [ ] No empty `features/` / `entities/` “for later”
- [ ] Shared stays infrastructure-only
- [ ] Migration (if any) is incremental toward FSD

## Decision

```text
Architecture Review: PASS | BLOCKED
Change Scope Approval: PASS | BLOCKED
Reason:
```
