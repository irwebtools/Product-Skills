---
name: ux-ui
description: Turn a buildable definition into a clear, credible interface direction without adding design ceremony. Use before creating or materially changing screens, navigation, interaction states, responsive behavior, or visual hierarchy.
---

# UX/UI

Design enough to make the experience understandable, credible, responsive, and fast to implement.

## Source-of-truth access

When the user provides a Figma file, screenshot, design system, or other explicit visual source of truth, inspect that source before implementation.

If the required source cannot be accessed:

- do not silently replace it with a generic design or community-template guess;
- surface the access problem before coding;
- ask for the missing permission/export/screenshot, or ask the user to explicitly approve a fallback visual direction;
- once the user approves a fallback, record that the implementation is intentionally not a fidelity validation of the original design.

A task that requires matching an inaccessible design is `BLOCKED`, not successfully verified against that design.

## Start with the journey

For each actor, establish:

1. goal;
2. action sequence;
3. information needed at each step;
4. system feedback after important actions.

Prefer the fewest screens that keep the journey clear.

## Screen thinking

For every required screen identify:

- purpose;
- primary action;
- essential information;
- meaningful secondary actions;
- states that can occur in the acceptance path.

Consider when relevant: **loading, empty, validation, error, success, disabled, permission-limited, confirmation**.

## Visual direction

For greenfield business interfaces, default toward:

- clear hierarchy;
- restrained professional styling;
- consistent spacing and typography;
- mature UI primitives such as shadcn/ui;
- clear primary / secondary / destructive actions;
- familiar interaction patterns before custom novelty.

Do not add decorative complexity that slows implementation or hurts usability.

## Responsive baseline

Smoke-check approximately **375 / 768 / 1024 / 1440**.

Avoid overflow, hidden primary actions, unusable forms, broken navigation, and dense desktop layouts simply squeezed onto mobile.

## Accessibility baseline

At minimum:

- visible keyboard focus;
- proper labels;
- useful validation/error text;
- semantic interactive elements;
- sufficient contrast;
- status not communicated by color alone;
- reduced-motion expectations respected if motion is used.

## Output

Create or update `docs/ui-spec.md` only when the UI is non-trivial:

```markdown
# UI Spec

## Navigation
## Primary flow
## Screens
### <Screen>
- Purpose
- Layout
- Primary action
- Important states

## Design direction
## Responsive notes
## Accessibility notes
```

Inside an existing repository, inspect and reuse the current component language first.

## Avoid

- generic AI-dashboard clutter;
- gradients, glass, charts, or animation without product value;
- a large token system before it is needed;
- screens disconnected from acceptance criteria.
