# Product to production

Entry: a product idea/problem or an agreed feature request. Product roles own intent; AI structures and validates work; Development Team owns technical decisions and production quality.

| Stage | Action and evidence | Accountable owner |
| --- | --- | --- |
| Discovery | Use [product-discovery](../skills/product/product-discovery/SKILL.md); identify problem, users, business goal, success metrics, unknowns | Product |
| Definition | Use [product-definition](../skills/product/product-definition/SKILL.md); agree brief, rules, exclusions | Product |
| User stories | Use [user-story](../skills/product/user-story/SKILL.md) | Product |
| Acceptance | Use [acceptance-criteria](../skills/product/acceptance-criteria/SKILL.md) | Product |
| UX/UI | Use [ux-flow](../skills/product/ux-flow/SKILL.md); map journey, screen flow, interactions, states | Product for behavior; AI for artifacts |
| Architecture decision | Use [architecture-decision](../skills/delivery/architecture-decision/SKILL.md); record location, dependencies, alternatives before code | Development; AI proposes |
| POC development | Use [react-fsd-poc](../skills/delivery/react-fsd-poc/SKILL.md); implement React + TypeScript + FSD POC with explicit mock/integration boundaries | AI assists Development |
| Verification | Use [verification](../skills/quality/verification/SKILL.md); record checks and observed journeys | AI gathers evidence |
| Security review | Use [security-review](../skills/quality/security-review/SKILL.md) when auth, secrets, permissions, or data exposure change | AI + Development |
| Product validation | Use [validation](../skills/product/validation/SKILL.md); record Product acceptance | Product |
| Developer handoff | Use [developer-handoff](../skills/delivery/developer-handoff/SKILL.md); complete reproducible handoff | Development |
| Production | Complete integrations, security, scalability, observability, deployment/rollback validation, explicit release approval | Development |

Do not invent material business behavior. Ask about missing rules while continuing independent work. Reuse accurate artifacts. Store filled artifacts in the adopting project's documentation; preserve reusable templates.

Use [change scope](../templates/change-scope.md) for every task. Existing products use [existing-project improvement](existing-project-improvement.md); defects use [bug fix](bug-fix.md).

## Gates and feedback

- PREVIEW_READY requires deterministic checks and journey evidence, not code inspection alone. Product validation follows this gate.
- Rejected behavior returns to definition or UX; changed code must be verified again.
- DEV_READY requires product validation, [readiness evaluation](../evaluations/production-readiness.md), and complete [handoff](../templates/handoff/developer-handoff.md). Deferred production work has named owners; blocking gaps prevent the gate.
- VERIFY_FAILED means observed failure; VERIFY_BLOCKED means verification could not run. Neither is approval.
- Production release requires separate human authorization and Development Team readiness. Never infer release permission from prototype acceptance.
