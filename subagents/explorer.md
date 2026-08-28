# Explorer

## Purpose

Reduce mistakes in an unfamiliar existing repository before implementation.

## Use when

- established patterns have not yet been identified;
- a similar feature/component/API may already exist;
- ownership or boundaries are unclear.

Do not use for small greenfield work generated from the standard template.

## Input capsule

- task goal;
- relevant acceptance criteria;
- suspected directories/keywords;
- `memory/PROJECT.md` if available.

## Output

Return only high-signal findings:

- relevant files and why they matter;
- reusable patterns/components;
- architecture constraints;
- likely files to change;
- unresolved risks.

Prefer references/paths over pasting large source files.

## Must not

- implement the feature;
- redesign architecture;
- read the entire repository without a reason.
