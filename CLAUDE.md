# Claude Code entrypoint

Read `AGENTS.md` first.

Canonical Product-Skills capabilities live in `/skills`.
Use only the skill(s) relevant to the current task.

Project MCP servers are declared in `/.mcp.json`; authenticate them with `/mcp` when remote GitHub, Vercel, or Supabase state is needed.

Runtime-specific files under `.claude/` must not duplicate canonical skill instructions.
