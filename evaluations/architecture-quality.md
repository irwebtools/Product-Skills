# Architecture Quality

For each criterion record PASS / FAIL / BLOCKED / N/A, evidence, reviewer, and date. N/A needs a concrete reason. Missing evidence is BLOCKED, not PASS.

- ADR records exact locations, ownership, dependencies, alternatives, and review status before code.
- New React code uses the five-layer FSD profile without business dumping folders.
- Existing architecture is preserved unless migration is authorized.
- Expected and actual files match scope; deviations have reasons.
- FSD/project architecture checks and affected regression evidence are recorded.

Blocking failures prevent the relevant gate. DEV_READY permits explicitly owned production follow-up, but never substitutes for production approval. Production release additionally requires Development Team validation of real integrations, security, capacity, monitoring, rollout/rollback, and explicit release authorization.
