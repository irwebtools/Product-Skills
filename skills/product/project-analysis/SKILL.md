---
name: project-analysis
description: Analyze a repository before selecting skills or coding.
---

# project-analysis

## When to use

Use before any coding task when the project is unknown, existing, or being adopted into Product-Skills.

## Purpose

Produce a Project Analysis Report so the agent installs and loads only required skills, and avoids silent architecture changes.

## Inputs

- Repository path or workspace
- User request / product intent
- Access to manifests, source layout, CI, and docs

## Process

1. Read this skill first; prefer read-only inspection.
2. Detect project type, language, framework, and folder structure.
3. Detect architecture pattern (including FSD adoption) and conventions.
4. Detect testing approach, security requirements, and deployment model.
5. Recommend workflow and the minimum skill set from `skills/index.yaml`.
6. List potential risks and what must not be changed without approval.

## Outputs

Project Analysis Report:

```text
Current state:
- project type:
- technology:
- architecture:
- conventions:
- testing:
- security:
- deployment:

Recommended workflow:
- ...

Required skills:
- ...

Potential risks:
- ...
```

Also update `.ai-review/change-summary.md` when analysis informs an adoption plan.

## Verification

- Report is reviewable by Product and Development.
- Recommendations stay within React + TypeScript + FSD for implementation skills.
- No coding or mass file changes happen during analysis alone.

## Restrictions

- Do not rewrite the repository during analysis.
- Do not invent Vue / Angular / Svelte support paths.
- Do not claim FSD compliance without evidence.
- Follow `rules/security.md` for secrets and permissions.
