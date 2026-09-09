# Ownership map

| Capability | Owning files |
| --- | --- |
| Human onboarding | README.md, docs/GETTING-STARTED.md |
| Agent boot | AGENTS.md |
| Product skills | `skills/product/` (includes `project-analysis`) |
| Skill selection | `skills/index.yaml` |
| Human review artifacts | `.ai-review/` |
| Delivery skills | `skills/delivery/` |
| Quality skills | `skills/quality/` |
| Capability discovery | `manifest.yaml` |
| Installation | `install/` |
| Delivery paths | workflows/ |
| Reusable artifacts | templates/ |
| Architecture and scope | rules/fsd-governance.md, rules/change-scope.md, scripts/check-fsd-boundary.mjs |
| Security | docs/security/, rules/security.md, rules/command-safety.md, rules/dependency-security.md, scripts/check-security.mjs, scripts/check-secrets.mjs |
| Platform validation | scripts/ and scripts/tests/ |
| Gate rubrics | evaluations/ |

Adopting applications initialize their own capability ownership from templates/memory/OWNERSHIP.md. Do not treat platform owners as application facts.
