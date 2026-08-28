# Product-Skills Repository Memory

This file is memory for the **Product-Skills repository itself**. It is not a template and must not be copied as policy into generated product projects.

Keep it short and factual. Common reusable behavior belongs in `AGENTS.md`, `skills/`, `rules/`, workflows, and deterministic tooling.

## Product

- Purpose: lightweight AI coding harness for PMs/BAs to create deployable React experiences that developers can continue toward production.
- Core is runtime-agnostic; runtime-specific configuration is additive.
- Canonical reusable skills live under `/skills`.

## Current repository conventions

- Greenfield frontend policy is defined by `skills/react/SKILL.md` and `rules/engineering.md`; Feature-Sliced Design v2.1 is the current architecture standard.
- Optional backend guidance is defined by `skills/supabase/SKILL.md`.
- Verification and delivery gates are defined by `skills/verify/` and `skills/delivery/`.
- Runtime/project configuration is currently committed for Claude Code, OpenAI Codex, and Cursor.
- Cross-project failure lessons live in `rules/lessons.md`.
- Starter project memory contracts live in `templates/memory/`.

## Core path

`definition → ux-ui → react → verify → delivery`

Conditional capabilities include `supabase`, `explorer`, `reviewer`, and `debugger`.

If this memory disagrees with source/config or canonical skills/rules, source/config and canonical instructions win.
