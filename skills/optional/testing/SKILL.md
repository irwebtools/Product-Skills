---
name: testing
description: Plan and record checks and acceptance journey evidence for React FSD work.
---

# testing

## When to use

Use when code changed and evidence is needed for verification or handoff.

## Purpose

Ensure checks and Product Team journeys are considered before completion.

## Input

- Acceptance criteria
- Changed files and ownership
- Existing project test commands

## Process

1. Identify the smallest checks that prove the change.
2. Prefer project-native test runners and scripts.
3. Exercise the acceptance journey Product Team will try.
4. Add focused regression coverage when bug risk warrants it.
5. Record skipped or blocked checks honestly.

## Output

- Test plan
- Executed check results
- Journey evidence notes

## Verification

- Results match what was actually run.
- Failed checks are not ignored.
- Product acceptance remains separate from automated green builds.

## Restrictions

- Do not invent a parallel test framework without need.
- Do not claim journey pass from unit tests alone when UX changed.
- Do not skip security-sensitive path checks when auth/permissions changed.
