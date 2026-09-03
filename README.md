# Product-Skills

> **Product-Skills is a lightweight repository harness for AI Coding Agents. It packages reusable product-delivery skills, project context, rules, workflows, tools, and verification so Product Managers and Business Analysts can turn business intent into verified product work that developers can continue in the same repository.**

Describe the outcome. Your AI Coding Agent reads the harness, selects the relevant skills, performs the work, verifies the result, and keeps useful project context in source control.

## Overview

<p align="center">
  <img src="./docs/assets/architecture-v2.svg" alt="Product-Skills harness overview" width="560" />
</p>

**Product-Skills is the harness around the AI Coding Agent.** The harness contains the reusable capabilities and repository behavior that guide execution:

- **Skills** — product-delivery capabilities.
- **Context & memory** — verified project knowledge.
- **Rules & workflows** — shared execution conventions.
- **Tools** — capabilities used when the task needs them.
- **Verification** — evidence before delivery.

The goal is simple: **business intent → verified product work → developer continuation in the same repository**.

## Responsibility boundary

Product-Skills is designed around a clear handoff between product work and engineering ownership.

| Product team focuses on | Development team / SA owns |
| --- | --- |
| Functional requirements | Non-functional requirements |
| Features and user flows | System architecture |
| Business rules | Scalability and performance |
| UI/UX and interaction states | Security and integrations |
| Acceptance criteria | Data model and technology choices |
| Stakeholder feedback | Coding standards and long-term maintainability |

Product-Skills helps generated code land closer to development expectations, but it does not replace engineering review or architecture ownership.

## Core skills

The [`skills/`](./skills/) directory is the reusable capability library inside the harness.

| Skill | Purpose |
| --- | --- |
| [`definition`](./skills/definition/) | Turn business intent into buildable scope |
| [`ux-ui`](./skills/ux-ui/) | Shape the user journey, states, hierarchy, and responsive behavior |
| [`react`](./skills/react/) | Build the React + TypeScript experience |
| [`supabase`](./skills/supabase/) | Add authentication, persistence, storage, or server behavior when useful |
| [`verify`](./skills/verify/) | Run quality checks and prove the primary journey works |
| [`delivery`](./skills/delivery/) | Publish a verified preview and prepare developer continuation |

A common path is:

<p align="center">
  <img src="./docs/assets/default-flow.svg" alt="Default Product-Skills delivery flow" width="560" />
</p>

**Definition → UX/UI → React → Verify → Delivery**

`supabase` joins the flow when backend behavior is needed. The agent selects only the skills relevant to the task.

## Reuse strategy

The first priority is **frontend reuse**. Product flows, UI states, validation, responsive behavior, and interaction code are closest to the Product team's functional responsibility and have the clearest reuse boundary.

Backend work is optional. It can make a preview credible and preserve useful contracts, migrations, or data assumptions, but reuse should be decided later with the Development team based on the real system context.

---

# Install

Product-Skills is repository-based. Put the harness in the repository where your AI Coding Agent will work.

## New product

Start from Product-Skills:

```bash
git clone https://github.com/Trinhduyet/Product-Skills.git my-product
cd my-product
```

Point the project at your own remote:

```bash
git remote rename origin product-skills-source
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

You can also fork or copy the repository first and use that as your product repository.

## Existing product

Bring the Product-Skills harness into your existing repository:

```text
AGENTS.md
skills/
rules/
workflows/
templates/memory/
```

Optional harness pieces can be added when useful:

```text
subagents/
hooks/
scripts/
```

Then add the configuration for the AI Coding Agent you use.

Initialize project memory from [`templates/memory/`](./templates/memory/):

```text
memory/
├── PROJECT.md
├── FEATURES.md
└── DECISIONS.md
```

Keep the existing project's stack, package manager, and architecture unless the work explicitly calls for a migration.

## AI Coding Agent setup

| Runtime | Repository entry point | Start |
| --- | --- | --- |
| **Claude Code** | `CLAUDE.md`, `.claude/`, `.mcp.json` | run `claude` from the repo root |
| **OpenAI Codex** | `AGENTS.md`, `.codex/config.toml` | run `codex` or open the repo in Codex |
| **Cursor** | `AGENTS.md`, `.cursor/mcp.json` | open the repo and use Agent chat |
| **Other compatible agents** | `AGENTS.md` + `skills/` | use the runtime's native project instruction/tool mechanism |

Start a new agent session after adding Product-Skills so the runtime can read the project instructions cleanly.

See [`docs/RUNTIME-COMPATIBILITY.md`](./docs/RUNTIME-COMPATIBILITY.md) for runtime details.

---

# Use Product-Skills

You normally use Product-Skills by asking for a **product outcome**.

## First request

For example:

> Build a purchase-request application. Employees can create and submit requests. Managers can review, approve, or reject them. Make the main flow work on desktop and mobile. Use a backend if the workflow needs persistence, then deploy a shareable preview when the flow is verified.

Add useful context when you have it: business rules, acceptance criteria, API specs, screenshots, design references, or repository constraints.

## How skills are selected

The harness helps the agent read the task and choose the smallest useful skill path.

```text
New business workflow
→ definition → ux-ui → react → verify → delivery

Existing UI change
→ ux-ui → react → verify

Backend behavior needed
→ definition/react → supabase → verify → delivery

Verification-only request
→ verify
```

You can name a skill explicitly when you want to constrain the task, but normal product work does not require manually invoking skills one by one.

## External capabilities

Before implementation, the agent determines whether the outcome needs additional access such as:

- an authoritative design or specification source;
- remote source control;
- preview deployment;
- backend or database access.

Only the capabilities needed for the current outcome should enter the workflow.

## Expected delivery

For a normal product request, the agent should:

1. read project instructions and relevant project memory;
2. select the relevant skills and source files;
3. resolve business ambiguity that materially changes behavior;
4. request any missing capability required to proceed;
5. implement the shortest credible experience;
6. run deterministic checks;
7. exercise the primary user journey;
8. report the result concisely.

A successful delivery should include:

- what was built;
- what was verified;
- one primary **Share URL** when a preview was requested;
- important blockers or deferred work;
- developer continuation notes when relevant.

If verification fails: **fix → verify again**.

## Continue an existing product

When `memory/FEATURES.md` exists, the agent uses it as the current capability map and classifies requested changes as:

- **ADD** — new capability;
- **CHANGE** — existing capability changes behavior;
- **REMOVE** — capability intentionally disappears;
- **NONE** — implementation or refactor only.

After verification, `FEATURES.md` should describe the new current truth. Git remains the detailed history.

## Project memory

```text
memory/
├── PROJECT.md    # verified project facts and conventions
├── FEATURES.md   # current product capabilities
└── DECISIONS.md  # durable product/technical decisions
```

Cross-project lessons belong in [`rules/lessons.md`](./rules/lessons.md).

## Delivery gates

### `PREVIEW_READY`

Ready for stakeholder feedback when the primary journey works and the relevant checks pass.

### `DEV_READY`

Ready for the Development team to continue and review the repository with stable boundaries, proportionate tests, reproducible setup, accurate environment documentation, and visible known debt.

`DEV_READY` is a handoff/readiness signal, not production approval or NFR sign-off.

## Developer continuation

<p align="center">
  <img src="./docs/assets/production-path.svg" alt="React production continuation path" width="560" />
</p>

The main reuse target is the frontend experience. Product code and useful contracts stay in the same repository so the Development team can review, keep, harden, or replace implementation pieces without losing the validated product behavior.

## Improve through real projects

Product-Skills is intended to evolve from real usage rather than trying to define every rule upfront. Feedback from Product and Development teams should improve:

- skills and prompts;
- coding conventions and development rules;
- the boundary between Product-generated and Dev-owned code;
- the amount of frontend and backend code that can be safely reused.

---

# Reference

- [`docs/HARNESS-ENGINEERING.md`](./docs/HARNESS-ENGINEERING.md) — harness behavior, context, memory, subagents, and verification
- [`docs/TOOLS-AND-MCP.md`](./docs/TOOLS-AND-MCP.md) — capability bootstrap, local tools, remote integrations, authentication, and approvals
- [`docs/RUNTIME-COMPATIBILITY.md`](./docs/RUNTIME-COMPATIBILITY.md) — runtime compatibility and repository-specific configuration
- [`skills/`](./skills/) — canonical reusable capability library
- [`rules/engineering.md`](./rules/engineering.md) — engineering invariants and quality expectations

## Repository map

```text
AGENTS.md           shared harness instructions
skills/             reusable capabilities
rules/              engineering/security/delivery invariants
workflows/          short execution recipes
subagents/          optional isolated roles
memory/             memory for this Product-Skills repository
templates/memory/   starter memory for product repositories
hooks/              deterministic safety/ship checks
scripts/            validation helpers
docs/               deeper reference documentation
```

## Principles

- Product-Skills is the repository harness around the AI Coding Agent.
- Start from business intent.
- Product owns functional intent; Development/SA owns system-level technical decisions.
- Prioritize frontend reuse first; evaluate backend reuse from real project experience.
- Let the harness select only the skills and tools the task needs.
- Keep project context small and durable.
- Verify before claiming success.
- Improve the harness from real Product and Development feedback.

## License

MIT
