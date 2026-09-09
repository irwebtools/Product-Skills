# Developer handoff

AI fills this from existing artifacts. Product Team confirms the product summary; Development Team reviews the technical continuation.

## Product summary — confirm with Product Team

- Feature intent, user value, business goal:
- Business rules and acceptance criteria (links):
- User journey and UX states (links):
- Product approval: approver, date, revision, accepted criteria:

## Developer continuation — prepared by AI for Development Team

- Prototype code location and revision:
- Implemented behavior and excluded scope:
- Architecture Decision Record, FSD locations, dependencies:
- Development Team reviewer and architecture decision status:
- Change scope: expected files, actual changed files, not changed files, reasons:
- Setup and exact local run/check commands:
- Environment variable names and secure provisioning instructions (no values):
- Data contracts, migrations, API integration, mocks and replacement plan:

## Verification and readiness

- Verification results and reproducible evidence:
- Business rules documented and acceptance criteria exist:
- FSD placement / existing architecture reviewed:
- Security review evidence and unresolved findings:
- Tests considered: coverage, gaps, rationale:
- Error handling and recovery considered:
- Logging considered: useful events, privacy, monitoring:
- Deployment impact considered: configuration, data, rollout, rollback:
- Known limitations, risk, deferred work with owner and acceptance conditions:
- Verdict: DEV_READY / blocked (reason):

## Development Team continuation

- Production integrations, security, scalability, operational work:
- Release owner and separate production approval:

DEV_READY means developer continuation, not production approval. Missing product approval, unrepeatable setup, or unresolved blocking findings prevent this gate.
