---
description: Dependency and supply-chain safety
alwaysApply: false
---

# Dependency security

Add or update dependencies only when needed for the requested outcome. Inspect the project's manifest, package manager, lockfile, and existing alternatives first.

- Verify package identity and upstream source; review maintenance and relevant advisories using authoritative sources when selecting or updating a dependency.
- Inspect lifecycle/install scripts and their privileges before execution when risk warrants it.
- Preserve the lockfile and use the project's reproducible installation method.
- Run applicable audit tools; triage findings with affected version, reachable behavior, severity, mitigation, and owner. Do not auto-apply broad force upgrades.
- Review license and supply-chain implications for the intended distribution.
- Record dependency changes and test affected behavior. Escalate unresolved blocking vulnerabilities before readiness.

No dependency installation is required for this repository's built-in Node validation scripts. An audit pass is not proof that dependencies are safe.
