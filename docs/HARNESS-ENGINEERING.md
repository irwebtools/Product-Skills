# Harness Engineering

Product-Skills uses the definition:

```text
Agent = Model + Harness
```

The harness is cross-cutting behavior, not a repository directory.

## Components

### Instructions

`AGENTS.md`, `CLAUDE.md`, and runtime-specific rules describe persistent operating constraints.

### Skills

`skills/` provides reusable procedures. Only relevant skills should be loaded.

### Context

The agent should receive the minimum useful context capsule: task, acceptance criteria, project facts, relevant skill, and relevant files.

### Memory

`memory/PROJECT.md`, `DECISIONS.md`, and `LESSONS.md` preserve small verified knowledge without replaying the full conversation.

### Tools and MCP

Use local tools for deterministic filesystem/git/npm/test work. Use MCP/connectors for remote systems such as GitHub, Vercel, or Supabase when available.

### Execution loop

The default loop is implement → verify → fix/debug only on failure → verify.

### Subagents

Subagents are conditional context-isolation tools, not mandatory pipeline stages.

### Guardrails

Rules and deterministic checks prevent secrets, unsafe data handling, and premature success claims.

### Observability

Build output, test evidence, browser behavior, and deployment status provide the evidence used by verification.

## Design principle

The harness succeeds when the happy path feels fast and the difficult path becomes safer.
