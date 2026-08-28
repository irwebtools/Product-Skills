# Workflow: Idea to Preview

Use the shortest path that produces a credible stakeholder experience.

## 0. Capability bootstrap

Before implementation, inspect the requested outcome and identify required capabilities.

Connect/authenticate only what the task requires, but do it before coding begins so a PM/BA is not surprised by setup near delivery.

Examples:

- Figma/design source in scope → design/Figma access;
- GitHub push/PR in scope → GitHub connection;
- Vercel preview in scope → Vercel connection;
- real backend in scope → Supabase connection when selected.

The coding agent owns this setup conversation. Do not tell the PM/BA to inspect runtime settings manually.

## Delivery path

`definition → ux-ui → react → verify → delivery → PREVIEW_READY`

Conditional behavior:

- persistence/auth/storage/server behavior materially improves the experience → `supabase`;
- obvious verification failure → fix → verify;
- unclear failure → `debugger` → verify.

## Fast-path rules

- Do not spawn subagents by default.
- Do not create a formal task graph for small greenfield work.
- Do not add Supabase to UI-only work.
- Do not run developer hardening before stakeholder validation.
- Ask PM/BA only about ambiguity that materially changes user behavior or a required service connection.

## Escalation

Use `explorer` in an unfamiliar existing codebase.
Use `reviewer` for large, cross-feature, data/security-sensitive changes or before developer handoff.
Use `verifier` before `PREVIEW_READY`.
Use `debugger` only after an observed failure needs root-cause isolation.
