# Existing-project improvement

Use for feature enhancement, workflow changes, UI modernization, incremental migration, and behavior-preserving refactoring.

1. Optionally run [project-analysis](../skills/product/project-analysis/SKILL.md) when stack or ownership is unclear.
2. Capture goal, users, expected result, acceptance criteria with the [feature request](../templates/product/feature-request.md). For refactoring, identify behavior that must remain invariant and the concrete maintenance problem.
3. Inspect architecture, entry points, tests, data contracts, and ownership. Establish baseline checks; distinguish pre-existing failures from regressions.
4. Complete [change scope](../templates/change-scope.md): impact, expected files, excluded files, reason, regression plan, rollback. Record an [architecture decision](../templates/architecture/architecture-decision.md) before code, proportional to the change. Use [architecture-decision](../skills/delivery/architecture-decision/SKILL.md) for React FSD placement.
5. Reuse current boundaries. Never rewrite or migrate architecture without explicit authorization. Requested migrations use the [migration plan](../templates/architecture/migration-plan.md) with incremental checkpoints.
6. Implement the smallest coherent change with [react-fsd-poc](../skills/delivery/react-fsd-poc/SKILL.md) when a prototype path applies. Refactoring preserves public APIs, business behavior, persistence semantics, and integrations unless explicitly included.
7. Run [verification](../skills/quality/verification/SKILL.md) and project checks; exercise the changed journey plus affected neighboring behavior. Compare with baseline; record failures and unavailable checks honestly. Use [security-review](../skills/quality/security-review/SKILL.md) when the change touches auth, secrets, or permissions.
8. Product validates behavior via [validation](../skills/product/validation/SKILL.md); Development reviews technical changes. Complete [handoff](../templates/handoff/developer-handoff.md) via [developer-handoff](../skills/delivery/developer-handoff/SKILL.md) when preparing DEV_READY.

Small improvements reuse definition and UX artifacts, but still require scope, architecture location, and verification evidence. Production deployment remains a separate authorized action.
