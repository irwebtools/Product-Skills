# Platform contributor guide

`product-skills` is an AI Product Team Skill Platform. The coding harness is its internal execution mechanism.

## Layout

- `README.md`: Product onboarding; `AGENTS.md`: lightweight agent bootstrap and routing.
- `manifest.yaml`: capability discovery for AI agents.
- `install/`: install skills into Cursor / Claude Code / Codex workspaces.
- `skills/product/`: Product-owned skills (discovery through validation).
- `skills/delivery/`: architecture decision, React FSD POC, developer handoff.
- `skills/quality/`: verification and security review.
- `skills/optional/`: non-default helpers (not Product-Skills public capabilities).
- `workflows/`: new-product, existing-project, defect, handoff paths.
- `templates/`: product, architecture, scope, handoff forms.
- `rules/` and `docs/security/`: engineering enforcement kept separate from Product skills.
- `evaluations/`: evidence-based gate rubrics.
- `memory/`: verified project facts for this repository.
- `scripts/`: deterministic checks, not proof of product acceptance.

Each platform skill contains `SKILL.md`, `manifest.yaml`, `templates/`, `examples/`, and `verification/`. `SKILL.md` sections: When to use, Purpose, Inputs, Process, Outputs, Verification, Restrictions. See [catalog](../skills/README.md).

## Checks

Run from the repository root:

```bash
node scripts/init.mjs
node scripts/validate-skills.mjs
node scripts/check-fsd-boundary.mjs
node scripts/check-security.mjs
node scripts/check-encoding.mjs
node scripts/check-architecture-scope.mjs
node scripts/check-secrets.mjs
node --test scripts/tests/platform-checks.test.mjs
git diff --check
```

Initialization is read-only and idempotent. No React application is included, so FSD checks explicitly skip here; fixtures test valid and invalid source layouts.

The FSD checker enforces this platform's five-layer profile, downward imports, and sibling slice isolation for static imports/re-exports, literal dynamic imports, and require calls. It recognizes relative paths and `@/`, `~/`, `src/`, or layer-prefixed imports. Custom aliases and computed imports need application tooling and review. It is not a TypeScript parser or a replacement for full project architecture tooling.

Security checks inspect tracked and new non-ignored files, detecting selected secret patterns and unsafe environment files. Ignored local secrets stay outside the review bundle; tracked secrets remain scanned. Secret scanning skips files larger than 1 MiB. They cannot prove absence of credentials, validate runtime authorization, or replace dependency/security review. Gate evaluations require evidence beyond scripts.
