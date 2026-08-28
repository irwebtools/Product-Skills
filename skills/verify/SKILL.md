---
name: verify
description: Independently prove that the main user journey works before a preview is shared. Use after implementation and before delivery to run deterministic checks plus acceptance verification in the running application.
---

# Verify

A successful build is necessary but not sufficient.

## Deterministic checks

Inspect project scripts first and use the detected package manager.

For greenfield React projects, `typecheck`, `lint`, `architecture`, and `build` are required gates. `architecture` validates Feature-Sliced Design boundaries, normally with `steiger src`. Run relevant tests when they exist or when risk justifies them.

For a greenfield project, **lint-clean means zero errors and zero warnings** unless the repository explicitly documents an accepted warning budget. Do not report `lint` as clean while warnings remain.

FSD validation must not be skipped because the app builds. Do not silence Steiger/FSD violations merely to make the gate pass; fix the boundary or document an intentional project-specific exception with a concrete reason.

Prefer enforcing warning/architecture policy in deterministic scripts rather than relying on the agent to interpret console output.

For an existing repository, preserve its established check commands and architecture unless migration to FSD is explicitly in scope.

Do not invent commands and do not hide failures with blanket TypeScript/ESLint/architecture suppression.

## Acceptance verification

Exercise the primary journey in the running application. Check observable behavior such as:

- navigation reaches the intended screen;
- forms validate meaningful required inputs;
- primary actions complete;
- state/status changes appear correctly;
- data persists when persistence is required;
- role-specific behavior works when roles matter.

## UX/UI smoke

For important screens verify:

- the primary action is understandable and visible;
- no obvious overflow or clipping;
- relevant loading/error/empty feedback works;
- mobile and desktop are usable;
- labels and keyboard focus are not obviously broken.

Recommended widths: **375 / 768 / 1024 / 1440**.

Do not turn this into visual-regression infrastructure unless requested.

## Independence

When a verifier subagent is available, give it only the acceptance criteria, running URL/environment, and demo identity/data if required. Do not preload the implementer's reasoning or confidence claims.

## Verdict

Return one of:

- `PREVIEW_READY` — typecheck, warning-free lint, FSD architecture validation, build, and the primary journey are verified;
- `VERIFY_FAILED` — observed failure with concise evidence;
- `VERIFY_BLOCKED` — environment/tool issue prevents meaningful verification.

Never return `PREVIEW_READY` because the code merely looks correct.
