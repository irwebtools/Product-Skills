# Decisions

Only durable, verified decisions about the Product-Skills repository itself belong here.

## D-001 — Root skills are canonical

All reusable skill content lives under `/skills`. Runtime-specific directories must not duplicate canonical skills.

## D-002 — Harness is cross-cutting, not a folder

The harness is the combination of instructions, skills, context, memory, tools/MCP, execution behavior, subagents, guardrails, and verification.

## D-003 — Fast path is default

Subagents, review, data infrastructure, and hardening are conditional. Happy-path work should remain fast.

## D-004 — Preview and developer-ready are different gates

`PREVIEW_READY` optimizes for stakeholder feedback. `DEV_READY` adds engineering hardening in the same repository.

## D-005 — FSD is the greenfield frontend architecture contract

Greenfield React follows Feature-Sliced Design v2.1. Start with `app/`, `pages/`, and `shared/`; extract `features/` or `entities/` only for demonstrated current reuse. Provider/backend infrastructure follows FSD placement rather than a forced feature folder.

## D-006 — Project memory is not common harness policy

`memory/` stores verified context for the current repository/project only. Common reusable behavior belongs in `AGENTS.md`, `skills/`, `rules/`, workflows, and deterministic tools. Generated/adopted projects initialize their own project memory from `templates/memory/` when useful.

## D-007 — Product feature inventory tracks current capability truth

For existing products, `memory/FEATURES.md` may track active product capabilities and intentional removals. Agents classify meaningful changes as `ADD`, `CHANGE`, `REMOVE`, or `NONE`, then update the inventory after verification. Product features are distinct from the FSD `features/` architectural layer.
