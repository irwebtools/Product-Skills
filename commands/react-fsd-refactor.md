---
name: react-fsd-refactor
description: Architecture-only refactor of an existing project to React + TypeScript + Feature-Sliced Design while preserving product behavior
---

# React + TypeScript + FSD refactor

Use Product-Skills for an **architecture-only** migration of an **existing** project.

This is NOT a product redesign unless Product Team explicitly asks for behavior changes.

## Instructions

1. Inspect the existing project first.
2. Identify the current frontend technology and architecture.
3. Identify important existing product behavior and user journeys.
4. Determine whether React and TypeScript are already used.
5. Determine appropriate FSD boundaries from the real project.
6. Create only justified layers. Do not create fake FSD folders for completeness.
7. Preserve existing behavior, business rules, workflows, permissions, API behavior, data behavior, and UX.
8. Do not add or remove features unless explicitly requested.
9. Implement incrementally when practical.
10. Apply FSD dependency direction and public API boundaries.
11. Verify:
    - FSD architecture
    - typecheck
    - lint
    - tests when available
    - production build
    - important runtime journeys
12. Report each check as passed, failed, or **NOT RUN** with reason.
13. Fix verification failures.
14. If Vercel Preview is supported and access exists, deploy, verify, and return the real Preview URL.
15. If Preview cannot be created, report the blocker. Do not invent a URL.
16. Return what changed, verification status, and Preview URL or blocker.

Do not stop after creating a plan.
Do not stop after writing code.
Do not claim success without verification evidence.
