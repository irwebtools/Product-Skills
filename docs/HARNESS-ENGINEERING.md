# Harness Engineering

Product-Skills is an **AI Product Delivery System**. Internally it uses:

```text
Agent = Model + Harness
```

The harness is the delivery engine behind the product layer — not a `harness/` directory.

## Components inside the harness

These parts work together. They are **not** three equal top-level layers such as “Harness / Skills / Tools”.

1. **Skills** — reusable capabilities in `skills/`
2. **Rules** — durable engineering constraints in `rules/`
3. **Workflows** — short repeatable recipes in `workflows/`
4. **Context & memory** — verified project knowledge in `memory/`
5. **Tools** — local tools and remote integrations used only when needed
6. **Verification** — evidence before preview or developer handoff

## Operating loop

```text
implement → verify → fix only on failure → verify again
```

Subagents are optional isolation tools, not mandatory pipeline stages.

## Scope

Optimize for:

```text
Product idea → UX → Frontend POC → Developer handoff
```

Do not expand Product-Skills into a general DevOps platform, backend framework, or full software-engineering OS.

## Design principle

The harness succeeds when the happy path feels fast and the difficult path becomes safer.
