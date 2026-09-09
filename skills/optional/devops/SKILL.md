---
name: devops
description: Optional skill for authorized environment, preview, or deployment work. Use only when delivery requires ops or environment changes beyond normal app verification.
---

# DevOps (optional)

This skill is **optional**. Product-Skills is not a general DevOps platform. Load this skill only for authorized environment or deployment tasks.

## When to use

- preview or staging deployment is part of the requested outcome;
- environment variables, health checks, or release steps are required;
- the user explicitly authorized the target environment.

## When not to use

- local verification is enough for the request;
- production changes without explicit human authorization;
- inventing CI/CD or infrastructure as a new product scope.

## Expectations

1. Prefer the project's existing deploy path.
2. Request only the connections needed (for example GitHub or Vercel).
3. Verify health and the acceptance journey after deploy when deployment is in scope.
4. Never treat Product-Skills as a replacement for production operations ownership.

## Standard resources

Use [templates](templates/README.md), [references](references/README.md), and [evaluations](evaluations/README.md) for scope and exit evidence.
