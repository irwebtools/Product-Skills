# Bug fix

Entry: [bug report](../templates/product/bug-report.md) with problem, impact, expected/actual behavior, priority.

1. Reproduce using the reported environment, input, role, and steps. Sanitize sensitive data. If blocked, record missing evidence rather than asserting a cause.
2. Trace the failing path and distinguish root cause from symptoms. Identify owning module and affected neighboring behavior.
3. Record a fix proposal in [change scope](../templates/change-scope.md): root cause evidence, expected files, excluded files, reason, regression coverage, rollback. Clarify ambiguous expected business behavior with Product Team.
4. Implement the minimal fix in the existing architecture. Document location before coding; do not combine with broad refactoring or dependency upgrades without demonstrated need.
5. Repeat the original reproduction and confirm expected behavior. Add a focused regression test when risk warrants it, run relevant project checks, exercise affected nearby paths.
6. Report cause, fix, changed files, before/after observations, limitations. Product Team validates behavior; Development Team reviews engineering quality. Release only through the authorized process.

An untested proposal is not a verified fix. Use VERIFY_BLOCKED or VERIFY_FAILED when appropriate.
