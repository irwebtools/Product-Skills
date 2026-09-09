---
description: Feature-Sliced Design governance and dependency rules
alwaysApply: true
---

# FSD Governance

Feature-Sliced Design is mandatory for Product-Skills React prototypes.

## Before coding

Identify:

```text
Page:
Feature:
Entity:
Shared:
```

Every new feature requires an **architecture location decision**
([`templates/architecture/architecture-decision.md`](../templates/architecture/architecture-decision.md)).

Decision order:

```text
Capability
    ↓
Ownership boundary
    ↓
FSD location
    ↓
Implementation
```

## Allowed structure

```text
src/
  app/
  pages/
  shared/
  features/   # only when reuse exists
  entities/   # only when reuse exists
```

## Never create as business dumping grounds

```text
src/components/
src/services/
src/hooks/
src/utils/
```

in new React prototypes. Existing non-FSD code is handled through an explicitly scoped improvement plan.

## Import rule

```text
app → pages → features → entities → shared
```

Downward only. No `shared` → `features`. No `features` → `pages`. No `entities` → `features`.

## Existing projects

Preserve established architecture unless migration is explicitly authorized. For an agreed migration, document incremental boundaries and verify regressions; never rewrite the system as an incidental feature change.

## Related

- [`react-anti-patterns.md`](./react-anti-patterns.md)
- [`change-scope.md`](./change-scope.md)
- [`skills/delivery/architecture-decision/SKILL.md`](../skills/delivery/architecture-decision/SKILL.md)
- [`skills/delivery/react-fsd-poc/SKILL.md`](../skills/delivery/react-fsd-poc/SKILL.md)
- [`docs/ARCHITECTURE-GOVERNANCE.md`](../docs/ARCHITECTURE-GOVERNANCE.md)
- [`scripts/check-architecture-scope.mjs`](../scripts/check-architecture-scope.mjs)

## Automated profile

Run `node scripts/check-fsd-boundary.mjs` (or pass explicit source roots). The platform profile uses the five layers above. Sibling slices in pages/features/entities cannot import each other; compose in a higher layer. Custom aliases require the adopting project's architecture tooling. See [platform checks](../docs/PLATFORM.md).
