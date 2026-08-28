# Cursor configuration

Canonical skills remain in `/skills` and shared behavior remains in `/AGENTS.md`.

`.cursor/mcp.json` preconfigures project-scoped GitHub, Vercel, and Supabase MCP servers.

## Capability bootstrap

Before implementation, Cursor must inspect the requested outcome and determine which tools/MCP servers are required to finish the task end-to-end.

If a required capability needs authentication, request that connection immediately before coding starts, then resume automatically after authorization.

Examples:

- Figma/design URL in scope → require design/Figma access first;
- GitHub push/PR in scope → require GitHub first;
- Vercel deployment in scope → require Vercel first;
- Supabase backend in scope → require Supabase first.

Do not ask the PM/BA to open Settings and inspect connections manually. Do not require unrelated services.

Keep other Cursor-specific rules/hooks/agent wrappers here only when needed. Do not duplicate canonical skill instructions.
