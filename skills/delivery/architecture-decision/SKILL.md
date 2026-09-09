---
name: architecture-decision
description: Record React FSD placement and ownership before POC coding.
---

# architecture-decision

## When to use

Use when the task matches: architecture-decision, ADR, FSD placement.

## Purpose

Produce an Architecture Decision Record for Feature-Sliced Design work.

## Inputs

- Agreed scope
- UX flow
- Current architecture if existing

## Process

1. Name the feature slice and exact location.
2. List allowed dependencies and rejected dumping folders.
3. Record alternatives considered.
4. Do not start coding until the record exists for the change.

## Outputs

- Architecture Decision Record
- Exact FSD locations
- Allowed dependencies

## Verification

- Confirm each output exists and is reviewable.
- Keep Product validation and engineering verification distinct.
- Do not claim completion without evidence.

## Restrictions

- React + TypeScript + FSD only.
- Do not authorize multi-framework structure.
- Do not broaden refactor scope without explicit approval.
