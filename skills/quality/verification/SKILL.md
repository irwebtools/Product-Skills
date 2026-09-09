---
name: verification
description: Verify requirements, FSD boundaries, checks, and readiness evidence.
---

# verification

## When to use

Use when the task matches: verification, PREVIEW_READY, evidence.

## Purpose

Prove engineering and product evidence before gates, separate from Product validation.

## Inputs

- Acceptance criteria
- Runnable implementation
- Change scope
- Architecture decision

## Process

1. Check product requirement still matches the change.
2. Observe acceptance journeys; do not rely on code reading alone.
3. Run applicable checks: architecture/FSD, typecheck, lint, tests, build, runtime journeys, Preview when supported.
4. For each check, record one of: passed, failed, or **NOT RUN** (with reason).
5. Record VERIFY_FAILED or VERIFY_BLOCKED honestly.
6. Never invent test results, build results, Preview URLs, or security outcomes.
7. Never say "everything works" unless the relevant checks actually ran and passed.

## Outputs

- Verification evidence (including NOT RUN items)
- Gate verdict
- Open risks
- Preview URL only when a Preview was actually created and verified

## Verification

- Confirm each output exists and is reviewable.
- Keep Product validation and engineering verification distinct.
- Do not claim completion without evidence.

## Restrictions

- Do not claim completion without evidence.
- Do not skip FSD or security review for prototype only.
- Do not replace Product validation with this skill.
- Do not fabricate Preview URLs or deployment status.
