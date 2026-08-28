# Features

Current product capability map for the Admin Settings App. This is current truth, not a full changelog.

Product features here are business/user capabilities. They are not the same thing as the FSD `features/` architectural layer.

## Active

### F-001 — Authentication
Status: active

Capabilities:
- Sign in with email/password.
- Sign up with email/password.
- Handle Supabase email-confirmation semantics when enabled.
- Restore an authenticated session after refresh.
- Protect the admin/settings experience from unauthenticated access.
- Sign out.

Code:
- `src/pages/login/`
- `src/shared/auth/`

### F-002 — System Settings
Status: active

Capabilities:
- View the System Settings experience.
- Navigate settings groups/tabs.
- Edit settings controls.
- Save/reset the current in-memory settings state.
- Use the dashboard responsively on mobile and desktop.

Code:
- `src/pages/settings/`
- `src/shared/ui/`

### F-003 — Settings Presets
Status: active

Capabilities:
- Create a preset from current settings.
- List the signed-in user's presets.
- Apply a preset to the settings UI.
- Rename a preset.
- Delete a preset.
- Persist presets across refresh through Supabase.
- Isolate preset ownership per user with RLS.

Code:
- `src/pages/settings/`
- `src/shared/api/`

Backend:
- `../supabase/migrations/`

## Planned

None currently accepted.

## Removed by decision

None currently recorded.

## Update rule

Before implementing an existing-product request, classify affected capabilities as:

- ADD — new capability
- CHANGE — existing capability changes behavior
- REMOVE — capability intentionally disappears
- NONE — refactor/implementation only

After verification, update this file to the resulting current truth. Use git history for detailed chronology. If a removal must not be restored accidentally, record the rationale in `DECISIONS.md` and reference its decision ID here.
