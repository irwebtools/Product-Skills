---
description: Documentation expectations for product delivery
alwaysApply: false
---

# Documentation Rules

Keep documentation accurate, short, and aligned with verified behavior.

## Documentation Encoding

All repository documentation must use **UTF-8** (preferably without BOM) and **LF** line endings.

- Avoid copying text from applications that alter encoding (email clients, Word, some terminals).
- Prefer ASCII flow markers (`->`, `|`, `v`) in diagrams when maximum tooling compatibility matters.
- Use Unicode only when it clearly improves readability and remains valid UTF-8.
- Verify GitHub rendering before merge.
- Run `node scripts/check-encoding.mjs` when documentation encoding may have changed.

## Content rules

- Do not duplicate canonical policy across README, AGENTS, and skills.
- Humans read `README.md`; agents boot from `AGENTS.md`.
- Update scoped memory when verified product behavior changes.
- Link to deep reference in `docs/` instead of pasting long explanations into README.
