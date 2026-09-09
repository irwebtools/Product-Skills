---
description: Security baseline for Product-Skills work
alwaysApply: true
---

# Security Rules

Security is a first-class harness capability. Follow this file together with [`docs/SECURITY-MODEL.md`](../docs/SECURITY-MODEL.md).

## Secrets

Never:

- commit secrets;
- print credentials in logs, chat, or docs;
- store tokens in documentation or fixtures;
- expose privileged / service-role keys in browser bundles.

Allowed:

- environment variables;
- secret managers;
- runtime-injected credentials.

Run `node scripts/check-secrets.mjs` before claiming completion on harness or product changes that may touch secrets. Pattern scanning is incomplete; human review is still required.

## Authentication

Agents must understand:

```text
Authentication  ≠  Authorization
```

| Term | Question |
| --- | --- |
| Authentication | Who are you? |
| Authorization | What are you allowed to do? |

Review identity, token scope, expiration, and ownership separately whenever auth is in scope.

## Authorization

Apply **least privilege**.

Good:

- GitHub: repository read + pull-request write when that is enough

Bad:

- GitHub: organization admin “just in case”

Prefer:

```text
read-only  >  scoped write  >  admin access
```

## MCP Security

External tools require review before use.

Before enabling or calling MCP:

1. Identify the provider.
2. Check permission scope.
3. Understand what repository/data can be read.
4. Understand whether writes/deletes are possible.
5. Request only the connection required by the current outcome.

Do not pre-connect unrelated services.

## Database Security

Never:

- bypass RLS for convenience;
- expose service-role keys to clients;
- run destructive migrations without explicit approval.

When user/role isolation matters, verify both allowed and denied access.

## Production Safety

Require explicit human approval before:

- production deployment;
- database deletion or irreversible data changes;
- credential rotation that affects shared environments;
- permission / IAM changes;
- force-push or history rewrite on shared protected branches (except an explicitly approved destination cleanup).

## Completion

Before claiming success, complete [`evaluations/security/security-checklist.md`](../evaluations/security/security-checklist.md) when security-relevant work occurred (auth, secrets, MCP, database, deploy, permissions).

## Supporting controls

Apply [command safety](command-safety.md), [dependency security](dependency-security.md), and the [threat model](../docs/security/THREAT-MODEL.md). Run `node scripts/check-security.mjs` alongside the existing secret hook.
