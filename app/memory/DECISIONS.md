# Decisions

Only durable app-specific decisions whose rationale matters across future sessions belong here.

## D-001 — Supabase is the Phase 2 backend provider

Context:
- Phase 2 needs real authentication, persistence, and authorization behavior.

Decision:
- Use Supabase Auth + Postgres/RLS for the current preview implementation.

Consequences:
- Keep migrations, RLS policies, database types, and environment requirements reproducible in source control.
- Frontend provider access stays behind FSD shared infrastructure so a future backend can replace Supabase without rewriting page UI.

Related features:
- F-001
- F-003

## D-002 — Presets are user-owned

Context:
- Settings presets are personal saved configurations.

Decision:
- A signed-in user may access only their own presets.

Consequences:
- RLS ownership must be verified with both allowed and denied principals.

Related features:
- F-003
