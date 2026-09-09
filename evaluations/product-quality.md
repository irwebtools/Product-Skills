# Product Quality

For each criterion record PASS / FAIL / BLOCKED / N/A, evidence, reviewer, and date. N/A needs a concrete reason. Missing evidence is BLOCKED, not PASS.

- Problem, target users, business goal, and success metrics are explicit.
- Business rules and observable acceptance criteria cover primary and failure paths.
- User journey, screen flow, states, and interactions match agreed intent.
- Product Team approval identifies the tested revision and accepted behavior.

Blocking failures prevent the relevant gate. DEV_READY permits explicitly owned production follow-up, but never substitutes for production approval. Production release additionally requires Development Team validation of real integrations, security, capacity, monitoring, rollout/rollback, and explicit release authorization.
