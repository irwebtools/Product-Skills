# Workflow: Product Discovery

For Product roles before building.

```text
Product Input
    |
    v
AI Definition
    |
    v
Clarified scope + acceptance
```

## Steps

1. Capture problem/who/why with [`templates/product/product-brief.md`](../templates/product/product-brief.md).
2. Load [`product-discovery`](../skills/product/product-discovery/SKILL.md), then [`product-definition`](../skills/product/product-definition/SKILL.md) when intent is understood.
3. Continue with [`user-story`](../skills/product/user-story/SKILL.md) and [`acceptance-criteria`](../skills/product/acceptance-criteria/SKILL.md).
4. Update or create `memory/FEATURES.md` delta classification (ADD/CHANGE/REMOVE/NONE).
5. Stop for Product confirmation before UX/prototype when ambiguity is material.
