# Features

Current product capability map. Keep this as current truth, not a full changelog.

Use product-feature language here. This is separate from the FSD `features/` architectural layer.

## Active

### F-001 — <Feature name>
Status: active

Capabilities:
- <observable user capability>

Code:
- <owning page/slice/module>

## Planned

Add only accepted near-term capability that is not implemented yet.

## Removed by decision

Record only intentional removals that are important enough to prevent an agent from restoring them accidentally. Put the reason in `DECISIONS.md` and reference the decision ID here.

### F-XXX — <Removed feature>
Status: removed
Decision: D-XXX

## Update rule

For every existing-product task, determine the requested delta before implementation:

- ADD — new capability
- CHANGE — existing capability changes behavior
- REMOVE — capability intentionally disappears
- NONE — implementation-only change, no product capability delta

After verification, update this file to the resulting current truth. Git history remains the detailed changelog.
