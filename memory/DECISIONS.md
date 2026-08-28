# Decisions

Only durable, verified decisions belong here.

## D-001 — Root skills are canonical

All reusable skill content lives under `/skills`. Runtime-specific directories must not duplicate canonical skills.

## D-002 — Harness is cross-cutting, not a folder

The harness is the combination of instructions, skills, context, memory, tools/MCP, execution behavior, subagents, guardrails, and verification.

## D-003 — Fast path is default

Subagents, review, data infrastructure, and hardening are conditional. Happy-path work should remain fast.

## D-004 — Preview and developer-ready are different gates

`PREVIEW_READY` optimizes for stakeholder feedback. `DEV_READY` adds engineering hardening in the same repository.

## D-005 — Feature boundary before provider abstraction

React features own their UI/data boundary. Supabase or mock providers must not be scattered through page components.
