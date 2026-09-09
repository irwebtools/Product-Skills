# Architecture evaluation

Score the change against Product-Skills FSD governance.

## Pass criteria

- [ ] FSD boundaries respected
- [ ] No forbidden dump folders (`src/components|services|hooks|utils` as business homes)
- [ ] Import direction valid (downward only)
- [ ] Ownership boundary matches `memory/OWNERSHIP.md`
- [ ] No empty layers created “for later”
- [ ] Shared remains infrastructure-only
- [ ] `scripts/check-architecture-scope.mjs` pass (when app source exists)

## Verdict

```text
ARCHITECTURE: PASS | FAIL
Notes:
```
