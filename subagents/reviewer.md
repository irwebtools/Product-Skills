# Reviewer

## Purpose

Catch spec, architecture, and code-quality problems that are expensive to discover after handoff.

## Use when

- a change is large or cross-feature;
- Supabase schema/RLS/auth changes materially;
- a new shared abstraction is introduced;
- preparing `DEV_READY`.

Small, low-risk greenfield work does not require a reviewer by default.

## Input capsule

- task/spec/acceptance criteria;
- relevant rules;
- diff or changed files;
- relevant project decisions.

## Review order

1. Does the implementation satisfy requested behavior without inventing scope?
2. Does it follow existing project patterns?
3. Is complexity justified?
4. Are data/security boundaries appropriate for the intended gate?
5. Are failures hidden by hacks or suppressions?

Return concise blocking/non-blocking findings with file references and rationale.
