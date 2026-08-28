# Runtime Compatibility

Product-Skills has a **runtime-agnostic core**. The canonical skills, rules, workflows, memory conventions, and engineering contracts are not tied to a specific AI coding vendor.

A coding runtime can use Product-Skills when it can reasonably:

- read repository instructions and relevant skills;
- inspect/edit files;
- run project commands;
- use browser/tool access required by the task;
- preserve project state in the repository.

## Preconfigured runtimes

The repository currently includes native project configuration for:

- Claude Code;
- OpenAI Codex;
- Cursor.

ChatGPT can use repository context and connected tools when available. Other coding agents may use the canonical content through their own project instruction/tool configuration.

**Preconfigured does not mean exclusive.** Adding a runtime must not require changing canonical skill semantics.

## Canonical content

`skills/`, `subagents/`, `memory/`, `rules/`, and `workflows/` are runtime-neutral sources.

Runtime-specific files should contain only the minimum integration needed by that runtime and should point back to canonical content rather than copy it.

## Current project configuration

- Claude Code — `CLAUDE.md`, `.claude/`, root `.mcp.json`.
- OpenAI Codex — `AGENTS.md`, `.codex/config.toml`.
- Cursor — `AGENTS.md`, `.cursor/mcp.json` and other Cursor-only configuration when needed.
- Other runtimes — use `AGENTS.md` + `/skills` through their native mechanism.

## Runtime addition rule

When adding another coding agent:

1. keep `/skills` as the canonical capability source;
2. add only thin runtime-specific configuration;
3. do not copy shared skill bodies;
4. preserve the same default workflow and quality gates;
5. expose only the tools needed for typical Product-Skills delivery.

See [`TOOLS-AND-MCP.md`](./TOOLS-AND-MCP.md) for tool configuration policy.
