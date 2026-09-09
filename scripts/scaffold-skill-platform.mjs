#!/usr/bin/env node
/**
 * Scaffold / refresh product-skills Agent Skill folders.
 * Packs: product/, delivery/, quality/
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('skills');

const skills = {
  'product/product-discovery': {
    description: 'Convert product ideas into clear problems, users, goals, and success metrics.',
    purpose: 'Turn vague requests into a shared problem statement Product roles can verify.',
    trigger: ['product-discovery', 'idea', 'problem framing'],
    inputs: ['Plain-language idea or request', 'Known users and constraints'],
    outputs: ['Problem statement', 'Users in scope', 'Business goal', 'Success metrics', 'Open questions'],
    process: [
      'Restate the request as a customer/user problem.',
      'Identify who is affected and in which context.',
      'Capture the business goal and observable success measures.',
      'List unknowns; stop for Product answers when material.',
      'Do not design screens or write code in this skill.',
    ],
    restrictions: [
      'Do not invent business rules to fill gaps.',
      'Do not jump to React/FSD implementation.',
      'Do not load delivery skills during discovery.',
    ],
    dependencies: [],
  },
  'product/product-definition': {
    description: 'Create an implementation-ready product definition and scope boundary.',
    purpose: 'Produce a feature brief Product and Development can execute without guessing intent.',
    trigger: ['product-definition', 'feature brief', 'scope'],
    inputs: ['Discovery outputs', 'Known business rules and constraints'],
    outputs: ['Feature brief', 'Scope boundary', 'Business rules summary', 'Links to stories and acceptance'],
    process: [
      'Write a feature brief in Product language.',
      'Capture business rules and explicit exclusions.',
      'Point to user-story and acceptance-criteria skills for detail.',
      'Confirm scope boundary before UX or coding.',
    ],
    restrictions: [
      'Do not expand scope without Product confirmation.',
      'Do not replace UX journey work.',
      'Do not invent compliance or legal rules.',
    ],
    dependencies: ['product/product-discovery'],
  },
  'product/user-story': {
    description: 'Write role-based user stories from an agreed product definition.',
    purpose: 'Break product intent into stories Development and AI can implement.',
    trigger: ['user-story', 'user stories', 'as a user'],
    inputs: ['Feature brief', 'Users in scope', 'Business rules'],
    outputs: ['User stories', 'Story priority notes', 'Out-of-scope story list'],
    process: [
      'Write stories as role + need + outcome.',
      'Keep one primary outcome per story.',
      'Mark priority and dependencies between stories.',
      'Exclude technical tasks disguised as stories.',
    ],
    restrictions: [
      'Do not encode architecture choices inside stories.',
      'Do not invent personas without Product agreement.',
      'Do not skip acceptance-criteria linkage.',
    ],
    dependencies: ['product/product-definition'],
  },
  'product/acceptance-criteria': {
    description: 'Define testable acceptance criteria for Product validation.',
    purpose: 'Make success observable for Product review before developer handoff.',
    trigger: ['acceptance-criteria', 'AC', 'definition of done'],
    inputs: ['User stories', 'Business rules', 'Scope boundary'],
    outputs: ['Acceptance criteria per story', 'Negative cases', 'Demo checklist'],
    process: [
      'Write criteria Product can demonstrate without reading code.',
      'Include happy path and important failure cases.',
      'Align criteria with validation and verification skills.',
      'Mark deferred criteria explicitly.',
    ],
    restrictions: [
      'Do not use vague criteria such as user-friendly.',
      'Do not treat developer unit tests as Product acceptance.',
      'Do not add hidden scope through criteria.',
    ],
    dependencies: ['product/user-story'],
  },
  'product/ux-flow': {
    description: 'Define user journey, screens, states, and interactions before coding.',
    purpose: 'Agree experience behavior so POC implementation follows Product intent.',
    trigger: ['ux-flow', 'user journey', 'screen flow'],
    inputs: ['Feature brief', 'User stories', 'Acceptance criteria'],
    outputs: ['User journey', 'Screen flow', 'States', 'Interactions'],
    process: [
      'Map the primary user journey end to end.',
      'List screens or steps in order.',
      'Define loading, empty, error, success, and permission states.',
      'Confirm journey with Product before architecture or POC.',
    ],
    restrictions: [
      'Do not start React coding in this skill.',
      'Do not invent a full design system without need.',
      'Do not skip Product confirmation on ambiguous flows.',
    ],
    dependencies: ['product/acceptance-criteria'],
  },
  'product/validation': {
    description: 'Validate POC behavior with Product against acceptance criteria.',
    purpose: 'Record Product acceptance or rejection of demonstrated behavior.',
    trigger: ['validation', 'product acceptance', 'preview review'],
    inputs: ['Runnable POC', 'Acceptance criteria', 'UX flow'],
    outputs: ['Validation record', 'Accepted criteria', 'Rejected feedback', 'Revision requests'],
    process: [
      'Walk acceptance criteria with Product using the POC.',
      'Record who reviewed which revision and when.',
      'Separate Product validation from engineering verification.',
      'Send rejected behavior back to definition or UX as needed.',
    ],
    restrictions: [
      'Do not treat PREVIEW_READY as production release.',
      'Do not skip Product review by substituting automated tests.',
      'Do not claim acceptance without named reviewer evidence.',
    ],
    dependencies: ['product/acceptance-criteria', 'delivery/react-fsd-poc'],
  },
  'delivery/architecture-decision': {
    description: 'Record React FSD placement and ownership before POC coding.',
    purpose: 'Produce an Architecture Decision Record for Feature-Sliced Design work.',
    trigger: ['architecture-decision', 'ADR', 'FSD placement'],
    inputs: ['Agreed scope', 'UX flow', 'Current architecture if existing'],
    outputs: ['Architecture Decision Record', 'Exact FSD locations', 'Allowed dependencies'],
    process: [
      'Name the feature slice and exact location.',
      'List allowed dependencies and rejected dumping folders.',
      'Record alternatives considered.',
      'Do not start coding until the record exists for the change.',
    ],
    restrictions: [
      'React + TypeScript + FSD only.',
      'Do not authorize multi-framework structure.',
      'Do not broaden refactor scope without explicit approval.',
    ],
    dependencies: ['product/ux-flow'],
  },
  'delivery/react-fsd-poc': {
    description: 'Build a React + TypeScript + FSD production-oriented POC.',
    purpose: 'Create a reusable prototype with clear ownership for developer continuation.',
    trigger: ['react-fsd-poc', 'POC', 'React prototype'],
    inputs: ['Acceptance criteria', 'UX flow', 'Architecture Decision Record', 'Change scope'],
    outputs: ['Runnable React POC', 'Setup notes', 'Mock inventory', 'Implementation summary'],
    process: [
      'Implement only inside ADR locations.',
      'Use React and TypeScript strictly with FSD ownership.',
      'Mark mocks and integration boundaries explicitly.',
      'Stop for Product clarification on material business gaps.',
    ],
    restrictions: [
      'Forbidden: src/components business dumps, src/utils businessLogic, global dumping folders.',
      'Do not introduce Vue, Angular, Svelte, or multi-framework generators.',
      'Do not broad-refactor unrelated code.',
    ],
    dependencies: ['delivery/architecture-decision'],
  },
  'delivery/developer-handoff': {
    description: 'Package accepted product work for Development Team continuation.',
    purpose: 'Give developers intent, structure, limitations, and next production steps.',
    trigger: ['developer-handoff', 'DEV_READY', 'handoff'],
    inputs: ['Validated definition and UX', 'POC and verification evidence', 'Architecture decision'],
    outputs: ['Product intent', 'Implemented features', 'FSD structure', 'Changed files', 'Known limitations', 'Production next steps'],
    process: [
      'Summarize product intent in Product language.',
      'Document FSD structure, changed files, and run setup.',
      'List known limitations and owners for deferred work.',
      'Do not grant production release permission.',
    ],
    restrictions: [
      'Do not rewrite the app during handoff.',
      'Do not omit mocks as if they were real integrations.',
      'Do not treat DEV_READY as production authorization.',
    ],
    dependencies: ['product/validation', 'quality/verification'],
  },
  'quality/verification': {
    description: 'Verify requirements, FSD boundaries, checks, and readiness evidence.',
    purpose: 'Prove engineering and product evidence before gates, separate from Product validation.',
    trigger: ['verification', 'PREVIEW_READY', 'evidence'],
    inputs: ['Acceptance criteria', 'Runnable implementation', 'Change scope', 'Architecture decision'],
    outputs: ['Verification evidence', 'Gate verdict', 'Open risks'],
    process: [
      'Check product requirement still matches the change.',
      'Observe acceptance journeys; do not rely on code reading alone.',
      'Check FSD boundary, tests considered, and security considered.',
      'Record VERIFY_FAILED or VERIFY_BLOCKED honestly.',
    ],
    restrictions: [
      'Do not claim completion without evidence.',
      'Do not skip FSD or security review for prototype only.',
      'Do not replace Product validation with this skill.',
    ],
    dependencies: ['delivery/react-fsd-poc'],
  },
  'quality/security-review': {
    description: 'Review secrets, unsafe commands, dependency risk, and permission scope.',
    purpose: 'Apply Product-Skills security governance before handoff or risky changes.',
    trigger: ['security-review', 'secrets', 'permissions'],
    inputs: ['Change scope', 'Changed files', 'Auth or data touchpoints'],
    outputs: ['Security review notes', 'Blockers', 'Follow-ups'],
    process: [
      'Scan for secrets and unsafe environment files.',
      'Check command safety and uncontrolled dependencies.',
      'Review auth, permissions, and data exposure for the change.',
      'Follow rules/security.md and related security rules.',
    ],
    restrictions: [
      'Do not store or print secret values.',
      'Do not approve release solely from this review.',
      'Do not bypass least-privilege tool access.',
    ],
    dependencies: [],
  },
};

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeIfMissingOrForce(file, contents, force = true) {
  if (!force && fs.existsSync(file)) return;
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, contents);
}

for (const [rel, meta] of Object.entries(skills)) {
  const dir = path.join(root, rel);
  const name = path.basename(rel);
  ensureDir(dir);
  for (const sub of ['templates', 'examples', 'verification']) {
    ensureDir(path.join(dir, sub));
    writeIfMissingOrForce(path.join(dir, sub, 'README.md'), `# ${name} ${sub}\n`);
  }

  const skillMd = `---
name: ${name}
description: ${meta.description}
---

# ${name}

## When to use

Use when the task matches: ${meta.trigger.join(', ')}.

## Purpose

${meta.purpose}

## Inputs

${meta.inputs.map((i) => `- ${i}`).join('\n')}

## Process

${meta.process.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## Outputs

${meta.outputs.map((o) => `- ${o}`).join('\n')}

## Verification

- Confirm each output exists and is reviewable.
- Keep Product validation and engineering verification distinct.
- Do not claim completion without evidence.

## Restrictions

${meta.restrictions.map((r) => `- ${r}`).join('\n')}
`;

  writeIfMissingOrForce(path.join(dir, 'SKILL.md'), skillMd);

  const depsBlock = meta.dependencies.length
    ? `dependencies:\n${meta.dependencies.map((d) => `  - ${d}`).join('\n')}`
    : 'dependencies: []';
  const manifest = `name: ${name}
purpose: ${meta.purpose}
trigger:
${meta.trigger.map((t) => `  - ${t}`).join('\n')}
inputs:
${meta.inputs.map((i) => `  - ${i}`).join('\n')}
outputs:
${meta.outputs.map((o) => `  - ${o}`).join('\n')}
${depsBlock}
verification:
  - verification/README.md
`;
  writeIfMissingOrForce(path.join(dir, 'manifest.yaml'), manifest);
  console.log(`refreshed ${rel}`);
}

console.log(`Scaffolded ${Object.keys(skills).length} product-skills.`);
