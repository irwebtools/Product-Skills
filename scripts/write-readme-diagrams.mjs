#!/usr/bin/env node
/**
 * Write Product Team README diagram SVGs as clean UTF-8 (no BOM).
 * Labels stay ASCII for GitHub + encoding-check safety.
 * Optional Vietnamese glyph check uses code points only.
 */
import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'docs', 'diagrams');
fs.mkdirSync(dir, { recursive: true });

const fontStyle = `
    <style type="text/css"><![CDATA[
      .sans { font-family: system-ui, -apple-system, 'Segoe UI', 'Noto Sans', 'Helvetica Neue', Arial, sans-serif; }
      .mono { font-family: ui-monospace, 'Cascadia Mono', 'Segoe UI Mono', 'Noto Sans Mono', Consolas, monospace; }
    ]]></style>`;

const files = {
  'product-team-flow.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="260" viewBox="0 0 960 260" role="img" aria-labelledby="t d">
  <title id="t">Product-Skills hero flow</title>
  <desc id="d">Product Team describes a request, AI Coding builds and verifies, then a working Preview is reviewed by Product Team.</desc>
  <defs>
    <marker id="m" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 1.5 L8 5 L0 8.5 Z" fill="#5a6578"/>
    </marker>
    ${fontStyle}
  </defs>
  <rect width="960" height="260" fill="#f7f6f3"/>
  <text class="mono" x="40" y="36" fill="#8a93a3" font-size="11" letter-spacing="0.18em">PRODUCT EXPERIENCE</text>
  <text class="sans" x="40" y="64" fill="#1f2430" font-size="22" font-weight="600">Describe / Build / Review</text>
  <rect x="40" y="100" width="200" height="100" fill="#ffffff" stroke="rgba(31,36,48,0.12)" stroke-width="1"/>
  <text class="mono" x="56" y="126" fill="#8a93a3" font-size="10" letter-spacing="0.14em">01</text>
  <text class="sans" x="56" y="152" fill="#1f2430" font-size="16" font-weight="600">Product Team</text>
  <text class="sans" x="56" y="176" fill="#5a6578" font-size="13">What do you want?</text>
  <path d="M250 150 H290" stroke="#5a6578" stroke-width="1.25" fill="none" marker-end="url(#m)"/>
  <text class="mono" x="255" y="140" fill="#8a93a3" font-size="9" letter-spacing="0.08em">request</text>
  <rect x="300" y="100" width="200" height="100" fill="#ffffff" stroke="rgba(31,36,48,0.12)" stroke-width="1"/>
  <text class="mono" x="316" y="126" fill="#8a93a3" font-size="10" letter-spacing="0.14em">02</text>
  <text class="sans" x="316" y="152" fill="#1f2430" font-size="16" font-weight="600">AI Coding</text>
  <text class="sans" x="316" y="176" fill="#5a6578" font-size="13">Build + verify</text>
  <path d="M510 150 H550" stroke="#5a6578" stroke-width="1.25" fill="none" marker-end="url(#m)"/>
  <text class="mono" x="512" y="140" fill="#8a93a3" font-size="9" letter-spacing="0.08em">deliver</text>
  <rect x="560" y="100" width="200" height="100" fill="rgba(235,108,54,0.08)" stroke="#eb6c36" stroke-width="1.5"/>
  <text class="mono" x="576" y="126" fill="#eb6c36" font-size="10" letter-spacing="0.14em">03</text>
  <text class="sans" x="576" y="152" fill="#1f2430" font-size="16" font-weight="600">Working Preview</text>
  <text class="sans" x="576" y="176" fill="#5a6578" font-size="13">Review the product</text>
  <path d="M770 150 H810" stroke="#5a6578" stroke-width="1.25" fill="none" marker-end="url(#m)"/>
  <text class="mono" x="772" y="140" fill="#8a93a3" font-size="9" letter-spacing="0.08em">review</text>
  <rect x="820" y="100" width="100" height="100" fill="#ffffff" stroke="rgba(31,36,48,0.12)" stroke-width="1"/>
  <text class="mono" x="836" y="136" fill="#8a93a3" font-size="10" letter-spacing="0.1em">04</text>
  <text class="sans" x="836" y="162" fill="#1f2430" font-size="13" font-weight="600">You</text>
  <text class="sans" x="836" y="182" fill="#5a6578" font-size="12">Feedback</text>
</svg>
`,

  'product-team-journey.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="320" viewBox="0 0 960 320" role="img" aria-labelledby="t d">
  <title id="t">Product Team journey</title>
  <desc id="d">Five grouped stages: Request, Build, Verify, Review, and Iterate.</desc>
  ${fontStyle}
  <rect width="960" height="320" fill="#f7f6f3"/>
  <text class="mono" x="40" y="36" fill="#8a93a3" font-size="11" letter-spacing="0.18em">USER JOURNEY</text>
  <text class="sans" x="40" y="64" fill="#1f2430" font-size="22" font-weight="600">From request to review</text>
  <line x1="56" y1="148" x2="904" y2="148" stroke="rgba(31,36,48,0.12)" stroke-width="1"/>
  <circle cx="120" cy="148" r="7" fill="#1f2430"/>
  <text class="mono" x="120" y="112" text-anchor="middle" fill="#8a93a3" font-size="10" letter-spacing="0.16em">REQUEST</text>
  <text class="sans" x="120" y="188" text-anchor="middle" fill="#1f2430" font-size="14" font-weight="600">Open project</text>
  <text class="sans" x="120" y="210" text-anchor="middle" fill="#5a6578" font-size="12">Describe outcome</text>
  <text class="sans" x="120" y="232" text-anchor="middle" fill="#8a93a3" font-size="11">Your existing app</text>
  <circle cx="310" cy="148" r="7" fill="#1f2430"/>
  <text class="mono" x="310" y="112" text-anchor="middle" fill="#8a93a3" font-size="10" letter-spacing="0.16em">BUILD</text>
  <text class="sans" x="310" y="188" text-anchor="middle" fill="#1f2430" font-size="14" font-weight="600">AI inspects</text>
  <text class="sans" x="310" y="210" text-anchor="middle" fill="#5a6578" font-size="12">AI implements</text>
  <text class="sans" x="310" y="232" text-anchor="middle" fill="#8a93a3" font-size="11">You wait for work</text>
  <circle cx="500" cy="148" r="7" fill="#1f2430"/>
  <text class="mono" x="500" y="112" text-anchor="middle" fill="#8a93a3" font-size="10" letter-spacing="0.16em">VERIFY</text>
  <text class="sans" x="500" y="188" text-anchor="middle" fill="#1f2430" font-size="14" font-weight="600">Checks pass</text>
  <text class="sans" x="500" y="210" text-anchor="middle" fill="#5a6578" font-size="12">Failures fixed</text>
  <text class="sans" x="500" y="232" text-anchor="middle" fill="#8a93a3" font-size="11">Architecture + runtime</text>
  <circle cx="690" cy="148" r="9" fill="#eb6c36"/>
  <text class="mono" x="690" y="112" text-anchor="middle" fill="#eb6c36" font-size="10" letter-spacing="0.16em">REVIEW</text>
  <text class="sans" x="690" y="188" text-anchor="middle" fill="#1f2430" font-size="14" font-weight="600">Open Preview</text>
  <text class="sans" x="690" y="210" text-anchor="middle" fill="#5a6578" font-size="12">Review the product</text>
  <text class="sans" x="690" y="232" text-anchor="middle" fill="#8a93a3" font-size="11">Working application</text>
  <circle cx="860" cy="148" r="7" fill="#1f2430"/>
  <text class="mono" x="860" y="112" text-anchor="middle" fill="#8a93a3" font-size="10" letter-spacing="0.16em">ITERATE</text>
  <text class="sans" x="860" y="188" text-anchor="middle" fill="#1f2430" font-size="14" font-weight="600">Give feedback</text>
  <text class="sans" x="860" y="210" text-anchor="middle" fill="#5a6578" font-size="12">Natural language</text>
  <text class="sans" x="860" y="232" text-anchor="middle" fill="#8a93a3" font-size="11">New Preview follows</text>
  <text class="sans" x="40" y="290" fill="#5a6578" font-size="13">You describe WHAT. AI determines HOW. You review the Preview.</text>
</svg>
`,

  'react-fsd-migration.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="300" viewBox="0 0 960 300" role="img" aria-labelledby="t d">
  <title id="t">React TypeScript FSD migration</title>
  <desc id="d">Existing application inspected, migrated to React TypeScript and Feature-Sliced Design with behavior preserved, then verified and reviewed on Preview.</desc>
  <defs>
    <marker id="ma" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 1.5 L8 5 L0 8.5 Z" fill="#5a6578"/>
    </marker>
    ${fontStyle}
  </defs>
  <rect width="960" height="300" fill="#f7f6f3"/>
  <text class="mono" x="40" y="36" fill="#8a93a3" font-size="11" letter-spacing="0.18em">USE CASE</text>
  <text class="sans" x="40" y="64" fill="#1f2430" font-size="22" font-weight="600">Refactor without changing the product</text>
  <rect x="40" y="100" width="140" height="120" fill="#ffffff" stroke="rgba(31,36,48,0.12)"/>
  <text class="mono" x="52" y="124" fill="#8a93a3" font-size="10" letter-spacing="0.12em">BEFORE</text>
  <text class="sans" x="52" y="152" fill="#1f2430" font-size="14" font-weight="600">Existing app</text>
  <text class="sans" x="52" y="174" fill="#5a6578" font-size="12">Current frontend</text>
  <text class="sans" x="52" y="196" fill="#8a93a3" font-size="11">Keep behavior</text>
  <path d="M188 160 H214" stroke="#5a6578" stroke-width="1.25" fill="none" marker-end="url(#ma)"/>
  <rect x="220" y="100" width="140" height="120" fill="#ffffff" stroke="rgba(31,36,48,0.12)"/>
  <text class="mono" x="232" y="124" fill="#8a93a3" font-size="10" letter-spacing="0.12em">INSPECT</text>
  <text class="sans" x="232" y="152" fill="#1f2430" font-size="14" font-weight="600">AI analyzes</text>
  <text class="sans" x="232" y="174" fill="#5a6578" font-size="12">Structure + journeys</text>
  <text class="sans" x="232" y="196" fill="#8a93a3" font-size="11">No guesswork</text>
  <path d="M368 160 H394" stroke="#5a6578" stroke-width="1.25" fill="none" marker-end="url(#ma)"/>
  <rect x="400" y="100" width="150" height="120" fill="#ffffff" stroke="rgba(31,36,48,0.12)"/>
  <text class="mono" x="412" y="124" fill="#8a93a3" font-size="10" letter-spacing="0.12em">MIGRATE</text>
  <text class="sans" x="412" y="152" fill="#1f2430" font-size="14" font-weight="600">React + TS + FSD</text>
  <text class="sans" x="412" y="174" fill="#5a6578" font-size="12">Architecture only</text>
  <text class="sans" x="412" y="196" fill="#8a93a3" font-size="11">Incremental when useful</text>
  <path d="M558 160 H584" stroke="#5a6578" stroke-width="1.25" fill="none" marker-end="url(#ma)"/>
  <rect x="590" y="100" width="150" height="120" fill="rgba(235,108,54,0.08)" stroke="#eb6c36" stroke-width="1.5"/>
  <text class="mono" x="602" y="124" fill="#eb6c36" font-size="10" letter-spacing="0.12em">VERIFY</text>
  <text class="sans" x="602" y="152" fill="#1f2430" font-size="14" font-weight="600">FSD + runtime</text>
  <text class="sans" x="602" y="174" fill="#5a6578" font-size="12">Build + journeys</text>
  <text class="sans" x="602" y="196" fill="#8a93a3" font-size="11">Then Preview check</text>
  <path d="M748 160 H774" stroke="#5a6578" stroke-width="1.25" fill="none" marker-end="url(#ma)"/>
  <rect x="780" y="100" width="140" height="120" fill="#ffffff" stroke="rgba(31,36,48,0.12)"/>
  <text class="mono" x="792" y="124" fill="#8a93a3" font-size="10" letter-spacing="0.12em">REVIEW</text>
  <text class="sans" x="792" y="152" fill="#1f2430" font-size="14" font-weight="600">You review</text>
  <text class="sans" x="792" y="174" fill="#5a6578" font-size="12">Vercel Preview</text>
  <text class="sans" x="792" y="196" fill="#8a93a3" font-size="11">Product, not code</text>
  <text class="sans" x="40" y="270" fill="#5a6578" font-size="13">Before behavior = after behavior. You review the working Preview, not folders or diffs.</text>
</svg>
`,

  'feedback-loop.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="720" height="520" viewBox="0 0 720 520" role="img" aria-labelledby="t d">
  <title id="t">Product feedback loop</title>
  <desc id="d">A reinforcing loop centered on Product Review: feedback, AI Coding, fix or improve, new Preview, then review again.</desc>
  <defs>
    <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 1.5 L8 5 L0 8.5 Z" fill="#5a6578"/>
    </marker>
    <marker id="ar-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 1.5 L8 5 L0 8.5 Z" fill="#eb6c36"/>
    </marker>
    ${fontStyle}
  </defs>
  <rect width="720" height="520" fill="#f7f6f3"/>
  <text class="mono" x="40" y="36" fill="#8a93a3" font-size="11" letter-spacing="0.18em">FEEDBACK LOOP</text>
  <text class="sans" x="40" y="64" fill="#1f2430" font-size="22" font-weight="600">Review / Feedback / Improve</text>
  <circle cx="360" cy="290" r="150" fill="none" stroke="rgba(31,36,48,0.08)" stroke-width="1" stroke-dasharray="4 6"/>
  <rect x="260" y="246" width="200" height="88" fill="rgba(235,108,54,0.10)" stroke="#eb6c36" stroke-width="1.75"/>
  <text class="mono" x="360" y="278" text-anchor="middle" fill="#eb6c36" font-size="10" letter-spacing="0.16em">CENTER</text>
  <text class="sans" x="360" y="304" text-anchor="middle" fill="#1f2430" font-size="16" font-weight="600">Product Review</text>
  <text class="sans" x="360" y="324" text-anchor="middle" fill="#5a6578" font-size="12">Working Preview</text>
  <rect x="280" y="100" width="160" height="56" fill="#ffffff" stroke="rgba(31,36,48,0.12)"/>
  <text class="sans" x="360" y="124" text-anchor="middle" fill="#1f2430" font-size="14" font-weight="600">Feedback</text>
  <text class="sans" x="360" y="144" text-anchor="middle" fill="#5a6578" font-size="12">Natural language</text>
  <rect x="520" y="262" width="150" height="56" fill="#ffffff" stroke="rgba(31,36,48,0.12)"/>
  <text class="sans" x="595" y="286" text-anchor="middle" fill="#1f2430" font-size="14" font-weight="600">AI Coding</text>
  <text class="sans" x="595" y="306" text-anchor="middle" fill="#5a6578" font-size="12">Fix / improve</text>
  <rect x="280" y="424" width="160" height="56" fill="#ffffff" stroke="rgba(31,36,48,0.12)"/>
  <text class="sans" x="360" y="448" text-anchor="middle" fill="#1f2430" font-size="14" font-weight="600">New Preview</text>
  <text class="sans" x="360" y="468" text-anchor="middle" fill="#5a6578" font-size="12">Verified again</text>
  <rect x="50" y="262" width="150" height="56" fill="#ffffff" stroke="rgba(31,36,48,0.12)"/>
  <text class="sans" x="125" y="286" text-anchor="middle" fill="#1f2430" font-size="14" font-weight="600">You review</text>
  <text class="sans" x="125" y="306" text-anchor="middle" fill="#5a6578" font-size="12">Open Preview</text>
  <path d="M360 156 L360 246" stroke="#eb6c36" stroke-width="1.2" stroke-dasharray="4 4" fill="none" opacity="0.7"/>
  <path d="M520 290 L460 290" stroke="#eb6c36" stroke-width="1.2" stroke-dasharray="4 4" fill="none" opacity="0.7"/>
  <path d="M360 424 L360 334" stroke="#eb6c36" stroke-width="1.2" stroke-dasharray="4 4" fill="none" opacity="0.7"/>
  <path d="M200 290 L260 290" stroke="#eb6c36" stroke-width="1.2" stroke-dasharray="4 4" fill="none" opacity="0.7"/>
  <path d="M440 128 C510 128 560 180 580 250" stroke="#5a6578" stroke-width="1.25" fill="none" marker-end="url(#ar)"/>
  <path d="M595 318 C595 380 520 430 440 452" stroke="#5a6578" stroke-width="1.25" fill="none" marker-end="url(#ar)"/>
  <path d="M280 452 C200 430 125 380 125 318" stroke="#5a6578" stroke-width="1.25" fill="none" marker-end="url(#ar)"/>
  <path d="M125 262 C125 200 200 128 280 128" stroke="#5a6578" stroke-width="1.25" fill="none" marker-end="url(#ar-accent)"/>
</svg>
`,

  'responsibility-model.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="340" viewBox="0 0 960 340" role="img" aria-labelledby="t d">
  <title id="t">Product Team versus AI responsibilities</title>
  <desc id="d">Product Team owns What, Why, Constraints, and Feedback. AI Coding owns How, Implementation, Architecture, Verification, and Preview.</desc>
  <defs>
    <marker id="md" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 1.5 L8 5 L0 8.5 Z" fill="#5a6578"/>
    </marker>
    ${fontStyle}
  </defs>
  <rect width="960" height="340" fill="#f7f6f3"/>
  <text class="mono" x="40" y="36" fill="#8a93a3" font-size="11" letter-spacing="0.18em">RESPONSIBILITY MODEL</text>
  <text class="sans" x="40" y="64" fill="#1f2430" font-size="22" font-weight="600">You decide WHAT. AI decides HOW.</text>
  <rect x="40" y="96" width="300" height="180" fill="#ffffff" stroke="rgba(31,36,48,0.12)"/>
  <rect x="40" y="96" width="6" height="180" fill="#1f2430"/>
  <text class="mono" x="64" y="126" fill="#8a93a3" font-size="10" letter-spacing="0.16em">PRODUCT TEAM</text>
  <text class="sans" x="64" y="158" fill="#1f2430" font-size="18" font-weight="600">WHAT</text>
  <text class="sans" x="64" y="186" fill="#5a6578" font-size="14">WHY / CONSTRAINTS</text>
  <text class="sans" x="64" y="214" fill="#5a6578" font-size="14">EXPECTED RESULT</text>
  <text class="sans" x="64" y="242" fill="#5a6578" font-size="14">FEEDBACK</text>
  <path d="M350 186 H390" stroke="#5a6578" stroke-width="1.25" fill="none" marker-end="url(#md)"/>
  <text class="mono" x="352" y="176" fill="#8a93a3" font-size="9" letter-spacing="0.08em">prompt</text>
  <rect x="400" y="96" width="300" height="180" fill="#ffffff" stroke="rgba(31,36,48,0.12)"/>
  <rect x="400" y="96" width="6" height="180" fill="#5a6578"/>
  <text class="mono" x="424" y="126" fill="#8a93a3" font-size="10" letter-spacing="0.16em">AI CODING</text>
  <text class="sans" x="424" y="158" fill="#1f2430" font-size="18" font-weight="600">HOW</text>
  <text class="sans" x="424" y="186" fill="#5a6578" font-size="14">IMPLEMENTATION</text>
  <text class="sans" x="424" y="214" fill="#5a6578" font-size="14">ARCHITECTURE</text>
  <text class="sans" x="424" y="242" fill="#5a6578" font-size="14">VERIFICATION</text>
  <path d="M710 186 H750" stroke="#5a6578" stroke-width="1.25" fill="none" marker-end="url(#md)"/>
  <text class="mono" x="712" y="176" fill="#8a93a3" font-size="9" letter-spacing="0.08em">deliver</text>
  <rect x="760" y="96" width="160" height="180" fill="rgba(235,108,54,0.08)" stroke="#eb6c36" stroke-width="1.5"/>
  <text class="mono" x="780" y="126" fill="#eb6c36" font-size="10" letter-spacing="0.14em">RESULT</text>
  <text class="sans" x="780" y="168" fill="#1f2430" font-size="16" font-weight="600">Preview</text>
  <text class="sans" x="780" y="196" fill="#5a6578" font-size="13">Working app</text>
  <text class="sans" x="780" y="224" fill="#5a6578" font-size="13">You review</text>
  <text class="sans" x="780" y="252" fill="#8a93a3" font-size="12">Not source code</text>
  <text class="sans" x="40" y="316" fill="#5a6578" font-size="13">Technical complexity stays with AI Coding. Product Team stays with product judgment.</text>
</svg>
`,
};

for (const [name, content] of Object.entries(files)) {
  const out = path.join(dir, name);
  fs.writeFileSync(out, content, { encoding: 'utf8' });
  console.log('wrote', name, Buffer.byteLength(content, 'utf8'), 'bytes');
}
