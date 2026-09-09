---
description: React anti-patterns to avoid in Product-Skills work
alwaysApply: false
globs: **/*.{tsx,jsx,ts,js}
---

# React Anti-Pattern Rules

Product-Skills React work follows Feature-Sliced Design (FSD).
Do not use generic dump folders for product/business logic.

## Forbidden dumping grounds

Do **not** create or grow these as business-logic homes:

```text
src/components/
src/services/
src/hooks/
src/utils/
```

These folders become unmanaged cross-feature bags and destroy ownership boundaries.

### Bad

```text
src/
├── components/
│   └── UserApproval.tsx
├── services/
│   └── UserService.ts
└── hooks/
    └── useApproval.ts
```

Problems:

- no feature ownership;
- easy accidental coupling across domains;
- hard for AI agents and humans to know the blast radius;
- bypasses FSD public APIs and layer rules.

### Good

Keep single-use product behavior in the page that owns it:

```text
src/pages/orders/
├── ui/
├── model/
└── index.ts
```

When the interaction is reused across pages, extract a feature slice:

```text
src/features/user-approval/
├── ui/
├── model/
├── api/
└── index.ts
```

Infrastructure without business meaning stays in shared segments:

```text
src/shared/ui/
src/shared/api/
src/shared/auth/
src/shared/lib/
src/shared/config/
```

## Additional anti-patterns

- Putting approval/order/user domain rules inside `shared/lib` or `shared/utils`.
- Creating empty `features/` or `entities/` “for later”.
- Extracting a hook/component only because a file is large.
- Importing another slice’s internal files instead of its `index.ts`.
- Introducing `src/services/` as a DDD/service layer for simple UI work.
- Keeping a permanent non-FSD tree (`components/services/hooks/utils`) as the project standard.

## Allowed exceptions

- Temporary legacy paths during **incremental FSD migration**, with each change moving toward FSD rather than expanding dump folders.
- Third-party generated folders that are not product architecture.
- True shared UI primitives in `shared/ui` (not feature screens).

If an exception is required, document why in the implementation summary and keep migration direction toward FSD.
