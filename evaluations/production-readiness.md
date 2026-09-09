# Production Readiness

For each criterion record PASS / FAIL / BLOCKED / N/A, evidence, reviewer, and date. N/A needs a concrete reason. Missing evidence is BLOCKED, not PASS.

- Business rules are documented and acceptance criteria exist.
- Product approval references the verified revision.
- FSD placement or established architecture has review evidence.
- Security reviewed with findings and dispositions.
- Tests considered with results and justified gaps.
- Error handling considered with recovery behavior.
- Logging considered with privacy and operational needs.
- Deployment impact considered with configuration, migration, and rollback.
- Handoff includes reproducible setup, prototype code, ADR, verification, limitations, and deferred work owners.

Blocking failures prevent the relevant gate. DEV_READY permits explicitly owned production follow-up, but never substitutes for production approval. Production release additionally requires Development Team validation of real integrations, security, capacity, monitoring, rollout/rollback, and explicit release authorization.
