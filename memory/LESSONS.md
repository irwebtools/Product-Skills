# Lessons

Store only verified mistakes or recoveries that are likely to recur.

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

## L-005 — README diagrams need their own visual surface
Symptom: White SVG canvases disappeared into GitHub's white README background; heavy colored borders and repeated moving dots made the diagrams feel noisy.
Root cause: Diagrams were styled as isolated UI mockups instead of embedded documentation visuals.
Prevention: Use a distinct neutral diagram canvas, white internal cards, thin neutral borders, small accent strips, concise labels, and static arrows by default. Avoid decorative animation unless it materially improves comprehension. Keep diagrams mobile-first and aligned with the current architecture contract.
