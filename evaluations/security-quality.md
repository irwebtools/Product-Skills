# Security Quality

For each criterion record PASS / FAIL / BLOCKED / N/A, evidence, reviewer, and date. N/A needs a concrete reason. Missing evidence is BLOCKED, not PASS.

- No credentials or production keys in committed files, output, or client code.
- Permissions are scoped and sensitive actions have explicit authorization.
- Authentication, authorization, input handling, and data isolation are reviewed where relevant.
- Dependencies and lockfile changes are reviewed; findings have owners.
- Threats and mitigation evidence are recorded; unresolved blockers prevent readiness.

Blocking failures prevent the relevant gate. DEV_READY permits explicitly owned production follow-up, but never substitutes for production approval. Production release additionally requires Development Team validation of real integrations, security, capacity, monitoring, rollout/rollback, and explicit release authorization.
