# Guardrail Checks

Product-Skills is runtime-neutral, so this directory contains deterministic checks that can be called from runtimes/CI rather than pretending every coding agent supports identical hook APIs.

Recommended checks:

- `check-secrets.mjs` before commit/deploy;
- `ship-gate.mjs` before declaring PREVIEW_READY/DEV_READY.

Runtime-specific hook wiring belongs in `.claude/`, `.codex/`, or `.cursor/` only when that runtime supports it.
