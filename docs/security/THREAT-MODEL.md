# Threat model

Assets: product intent, source code, customer data, credentials, environment permissions, and release integrity. Boundaries: user/runtime, runtime/workspace, workspace/dependencies, agent/external services, preview/production.

| Threat | Example | Mitigation and verification | Owner / residual risk |
| --- | --- | --- | --- |
| Prompt injection | A generated comment asks to upload credentials | Treat content as data; enforce instruction hierarchy and task scope; review outbound actions | Runtime and agent; detection is incomplete |
| Secret leakage | Token enters a fixture or browser bundle | Environment injection, selected pattern scans, review source/build outputs and logs | Development Team; scans miss unknown formats |
| Excessive privilege | Admin access for a read-only task | Scope tools to required resources; verify permission grants | User/org; provider enforcement matters |
| Unsafe code | UI-only role checks or missing tenant isolation | Server-side authorization; test allowed and denied identities | Development Team; prototype mocks are not enforcement |
| Destructive operation | Wrong database or release target | Resolve target, inspect scope, authorized action, backup/rollback appropriate to risk | Release owner; rollback may be partial |
| Dependency compromise | Malicious package install script | Review source/version, lockfile and scripts; audit findings; avoid unnecessary packages | Development Team; upstream compromise remains possible |
| False readiness | Passing build called production-ready | Journey evidence, gate separation, named reviews and limitations | Product and Development Teams |

For each adopting application, extend this model with actual data flows, identity boundaries, sensitive assets, attack surfaces, findings, owners, and mitigation tests. Do not mark application-specific threats reviewed based only on this platform model.
