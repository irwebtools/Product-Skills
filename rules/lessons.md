# Harness Lessons

Store only verified cross-project mistakes or recoveries that are likely to recur across Product-Skills runs.

These are harness-level lessons, not product-specific memory. Project-specific facts and decisions belong in that project's `memory/` directory.

## L-001 — Do not invent from an unavailable design source
Symptom: A task referenced a Figma node, access failed, and implementation continued from generic dashboard assumptions.
Root cause: Design access failure was treated as non-blocking even though Figma was the source of truth.
Prevention: If a referenced design is authoritative and inaccessible, request access or explicit approval for a fallback before implementation.

## L-002 — Warning-free means zero warnings
Symptom: ESLint exited successfully while React warnings remained, and the result was reported as clean.
Root cause: Process exit code was treated as the whole quality signal.
Prevention: Greenfield lint must run with a zero-warning policy and must not be reported clean while warnings remain.

## L-003 — Give PM/BA one preview link
Symptom: Delivery reported a production/alias URL, immutable deployment URL, and Vercel inspector as if they were three previews.
Root cause: Technical deployment metadata was mixed with stakeholder-facing delivery output.
Prevention: Report exactly one primary Share URL to PM/BA. Keep deployment ID, immutable URL, and inspector under optional technical metadata.

## L-004 — Demo backend setup must be safe and reproducible
Symptom: A demo password was committed and Supabase auth seed logic depended on internal auth tables.
Root cause: Demo convenience was allowed to override credential hygiene and portability.
Prevention: Never commit reusable credentials. Seed application data only; create demo identities through explicit non-production setup/Auth flows. Verify RLS with both allowed and denied principals.

## L-005 — README diagrams should be editorial, not UI mockups
Symptom: Diagram canvases blended into README backgrounds, nested rounded cards added chrome, rainbow borders diluted hierarchy, and decorative motion added noise.
Root cause: Documentation diagrams were styled like dashboard UI instead of editorial technical figures.
Prevention: Prefer a clean warm-neutral paper, hairline rules, small radius, one focal accent, static output by default, low density, and no outer card unless framing materially helps comprehension.
