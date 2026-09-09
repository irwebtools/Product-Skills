# Security Evaluation

Before completion, verify security-relevant work against this checklist.

Use with [`rules/security.md`](../../rules/security.md) and [`docs/SECURITY-MODEL.md`](../../docs/SECURITY-MODEL.md).

## Secrets

- [ ] no secrets committed
- [ ] `node scripts/check-secrets.mjs` pass when applicable

## Credentials

- [ ] no tokens exposed in source, docs, fixtures, logs, or chat
- [ ] no privileged / service-role keys in browser bundles

## Permissions

- [ ] least privilege applied
- [ ] no unnecessary admin / org-wide access requested

## Authentication

- [ ] auth reviewed when identity/session is in scope
- [ ] token scope and expiration considered

## Authorization

- [ ] permissions reviewed separately from authentication
- [ ] role/user isolation verified when material

## Database

- [ ] RLS considered when user/role data is involved
- [ ] no RLS bypass for convenience
- [ ] destructive migrations explicitly approved

## Production

- [ ] destructive or production-impacting actions explicitly approved
- [ ] MCP/tool write capabilities justified for the outcome

## Verdict

```text
SECURITY: PASS | FAIL | N/A
Notes:
```
