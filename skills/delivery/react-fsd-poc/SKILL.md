---
name: react-fsd-poc
description: Build a React + TypeScript + FSD production-oriented POC.
---

# react-fsd-poc

## When to use

Use when the task matches: react-fsd-poc, POC, React prototype.

## Purpose

Create a reusable prototype with clear ownership for developer continuation.

## Inputs

- Acceptance criteria
- UX flow
- Architecture Decision Record
- Change scope

## Process

1. Implement only inside ADR locations.
2. Use React and TypeScript strictly with FSD ownership.
3. Mark mocks and integration boundaries explicitly.
4. Stop for Product clarification on material business gaps.

## Outputs

- Runnable React POC
- Setup notes
- Mock inventory
- Implementation summary

## Verification

- Confirm each output exists and is reviewable.
- Keep Product validation and engineering verification distinct.
- Do not claim completion without evidence.

## Restrictions

- Forbidden: src/components business dumps, src/utils businessLogic, global dumping folders.
- Do not introduce Vue, Angular, Svelte, or multi-framework generators.
- Do not broad-refactor unrelated code.
