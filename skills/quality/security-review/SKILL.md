---
name: security-review
description: Review secrets, unsafe commands, dependency risk, and permission scope.
---

# security-review

## When to use

Use when the task matches: security-review, secrets, permissions.

## Purpose

Apply Product-Skills security governance before handoff or risky changes.

## Inputs

- Change scope
- Changed files
- Auth or data touchpoints

## Process

1. Scan for secrets and unsafe environment files.
2. Check command safety and uncontrolled dependencies.
3. Review auth, permissions, and data exposure for the change.
4. Follow rules/security.md and related security rules.

## Outputs

- Security review notes
- Blockers
- Follow-ups

## Verification

- Confirm each output exists and is reviewable.
- Keep Product validation and engineering verification distinct.
- Do not claim completion without evidence.

## Restrictions

- Do not store or print secret values.
- Do not approve release solely from this review.
- Do not bypass least-privilege tool access.
