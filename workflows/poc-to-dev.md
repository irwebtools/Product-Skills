# From product review to developer handoff

Use this after Product has tried the POC and accepted the demonstrated behavior.

## Product confirms

- Which feature and user problem were reviewed.
- Which business rules and acceptance criteria passed.
- Who reviewed which version, and when.
- Remaining feedback and what is deliberately outside scope.

You do not need to write technical handoff notes. Ask the AI to assemble them from the work already completed.

## AI prepares the handoff

Use [developer-handoff](../skills/delivery/developer-handoff/SKILL.md) and the [handoff template](../templates/handoff/developer-handoff.md). Include two readable sections:

| Product summary | Developer continuation |
| --- | --- |
| Feature definition and business rules | Source location and revision |
| UX flow and working prototype | FSD structure and architecture decision |
| Review feedback and accepted behavior | Run instructions and verification result |
| Known limitations | Integration gaps, risk, and follow-up owners |

Do not create a replacement application. Keep accepted behavior and implementation context together. If feedback changes behavior or code, verify the affected journey again.

## Development Team reviews

Developers confirm setup is reproducible, code ownership is clear, and verification evidence is sufficient. They assess security, error handling, tests, logging, integration, and deployment impact. Missing evidence or blocking gaps are reported instead of marking the handoff complete.

DEV_READY means ready for developer continuation. Development Team still owns production architecture, security, scalability, and release approval. See [full lifecycle](product-to-production.md) for gate details.
