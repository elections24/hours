# THE EYES V3 — HOUSE OF REPRESENTATIVES ELECTION CORRECTION

## FINAL MASTER IMPLEMENTATION PROMPT

Work only inside:

`C:\Users\DAN MASANI\Documents\ChatGPT\THE EYES`

This is an existing recovered V3 prototype. The completed Presidential and Senatorial modules are protected. Do not rebuild the application or change their routes, renderers, candidates, hierarchy, charts, AI, styling, or navigation.

Your assignment is strictly limited to:

**Situation Room Commander → House of Representatives Election**

## 1. Mandatory read-only audit

Before editing, read `AGENTS.md`, all V3 specifications, canonical geography files, the completed Presidential and Senatorial modules, the existing House of Representatives implementation, tests, and `1000678335.jpg` (the authoritative visual map reference).

Report before implementation:

1. Files controlling House of Representatives.
2. Whether it uses the old generic renderer.
3. Existing route/navigation chain.
4. Canonical geography source and exact available LGA/Ward/PU coverage.
5. Files to create or modify.
6. How Presidential and Senatorial will be protected.

Then continue unless a genuine data conflict prevents safe work.

## 2. Isolated architecture

Use a dedicated House of Representatives renderer and data module. Keep Presidential on its recovered renderer and Senatorial on its completed renderer. Do not change login, Situation Room Commander entry, shared canonical IDs, or other elections. Reuse shared components only with backward-compatible interfaces.

## 3. Required hierarchy

Implement:

**Situation Room Commander → House of Representatives → Federal Constituency → LGA → Ward tiles → Polling Unit tiles → Polling Unit detail**

The election and geographical context must remain correctly scoped. No candidates, LGAs, wards, polling units, totals, charts, Vote Margin, or AI context may leak from another constituency or election.

## 4. Authoritative constituency structure

Create exactly 15 Katsina Federal Constituencies covering all 34 LGAs exactly once:

1. **Katsina** — Katsina LGA. APC: Hon. Sani Aliyu Danlami.
2. **Batagarawa/Rimi/Charanchi** — Batagarawa, Rimi, Charanchi. APC: Hon. Hamza Dalhatu Batagarawa. PDP: Salisu Yusuf Majigiri.
3. **Mani/Bindawa** — Mani, Bindawa. APC: Hon. Ahmed Yusuf Doro.
4. **Daura/Sandamu/Mai’Adua** — Daura, Sandamu, Mai’Adua. APC: Hon. Aminu Jamo Daura.
5. **Kaita/Jibia** — Kaita, Jibia. APC: Hon. Sada Soli.
6. **Malumfashi/Kafur** — Malumfashi, Kafur. APC: Hon. Babangida Ibrahim.
7. **Bakori/Danja** — Bakori, Danja. APC: Hon. Abdullahi Balarabe Dabai.
8. **Funtua/Dandume** — Funtua, Dandume. APC: Hon. Mohammed Abubakar.
9. **Faskari/Kankara/Sabuwa** — Faskari, Kankara, Sabuwa. APC: Hon. Shehu Dalhatu Tafoki.
10. **Dutsin-Ma/Kurfi** — Dutsin-Ma, Kurfi. APC: Hon. Aminu Balele.
11. **Batsari/Safana/Dan Musa** — Batsari, Safana, Dan Musa. APC: Hon. Abdullahi Ahmed.
12. **Musawa/Matazu** — Musawa, Matazu. APC: Hon. Abdullahi Aliyu.
13. **Mashi/Dutsi** — Mashi, Dutsi. APC: Hon. Salisu Yusuf.
14. **Kankia/Ingawa/Kusada** — Kankia, Ingawa, Kusada. APC: Hon. Abubakar Yahya Kusada.
15. **Zango/Baure** — Zango, Baure. APC: Hon. Nasiru Sani Zangon-Daura.

Preserve canonical internal LGA IDs/spellings. Use an explicit alias table for display punctuation where needed. Validate 15 constituencies, 34 unique LGAs, no duplicate assignments, and no missing LGA.

## 5. Simulated prototype candidates

Preserve every real candidate name supplied above exactly. For PDP, ADC, PRP, NNPP, or other parties without a supplied real candidate, use deterministic labels such as:

`PDP Prototype Candidate — Katsina Federal Constituency`

Every added candidate must visibly carry:

**SIMULATED PROTOTYPE CANDIDATE**

Do not invent realistic personal names or present simulated candidates/results as genuine. Display a prominent disclosure that this is prototype demonstration data and no live electoral system is connected.

## 6. Deterministic result fixtures and Vote Margin

Use fixed constituency-specific prototype fixtures; never generate new random totals during rendering. Rank candidates highest to lowest and show rank, party, name, votes, percentage, and leader. Keep arithmetic consistent across constituency, LGA, Ward, and PU scopes. Preserve truthful zero/awaiting-report states; do not fabricate PU results.

Add Vote Margin throughout meaningful result screens:

`leader votes − runner-up votes`

Show leader, runner-up, vote difference, percentage-point difference where valid, and current scope. Never display stale values, negative margins, `NaN`, or `undefined`.

## 7. Interactive map

Use `1000678335.jpg` as the authoritative visual reference. Preserve Katsina’s recognizable outline and represent all 15 constituency groupings. Prefer grouping existing canonical LGA GeoJSON rather than drawing false geometry. Provide professional colours, readable labels, hover/focus/selected states, pointer and keyboard selection, synchronized dropdown selection, responsive behaviour, and no page-level horizontal overflow. Do not damage Presidential or Senatorial maps.

## 8. Constituency selector

Activate **View Election by Constituency** with exactly the 15 constituencies above. It must work with mouse, touch, keyboard, Enter/Space, and visible focus. Selection must update the map, candidate ranking, charts, Vote Margin, and LGA screen.

## 9. LGA, Ward, and Polling Unit screens

After constituency selection, activate **View Election by Local Government** and show only member LGAs. LGA tiles must use scoped counts and truthful reporting states.

Selecting an LGA opens **View Election by Ward**, using interactive Ward tiles in the corrected Presidential tile format. Each tile should show canonical ward name/code, LGA, constituency, PU count, progress, leading party/awaiting state, and Vote Margin where available.

Selecting a Ward shows only its canonical Polling Unit tiles. Each should show PU name/code, Ward, LGA, constituency, reporting/accreditation/result status, leader/awaiting state, and Vote Margin where available. Selecting a PU opens its scoped detail.

Use the existing integrated State/LGA/Ward/PU dataset. Do not replace it with a demonstration array or fabricate missing records. When canonical Ward/PU records are unavailable, show a clear unavailable-data message.

## 10. Charts

Resize the House bar chart to match the corrected Presidential dashboard: professional proportions, readable values/labels, consistent party colours, responsive containment, correct scope updates, and truthful empty states.

Implement Accreditation Trend as a professional line chart with time on the horizontal axis, accredited voters on the vertical axis, readable ticks/grid/tooltips, responsive layout, and scope-aware data. If fewer than two valid points exist, display: **Insufficient accreditation history to display a trend.**

## 11. Ask Eyes AI

Match the corrected Presidential Ask Eyes AI in placement, design, opening/closing, loading, response layout, Back behaviour, and responsiveness. Its context must be House-specific and include selected constituency, LGA, Ward, PU, candidate set, totals, progress, accreditation, and Vote Margin. It must distinguish canonical geography, supplied names, simulated candidates/results, and unavailable information. It must never mention another constituency’s candidates.

## 12. Back navigation

Implement functional Back navigation:

- PU detail → PU tiles
- PU tiles → selected Ward
- Ward → selected LGA
- LGA → selected constituency
- Constituency → House landing
- House landing → Situation Room Commander election selection

Preserve selections and scroll context where practical. Browser Back and visible Back must not conflict. Ask Eyes AI must close to its exact originating screen.

## 13. Responsive/accessibility requirements

Verify at desktop 1280px, tablet 768–1024px, and Android 390px. Ensure no page-level overflow; readable maps, charts, cards and names; touch-sized controls; visible Back; keyboard interaction; accessible labels/focus; and usable Ask Eyes AI. Colour must not be the sole status/selection indicator.

## 14. Canonical data protection

Treat Federal Constituency as a mapping layer over the existing hierarchy:

**State → Federal Constituency → LGA → Ward → Polling Unit**

Do not duplicate or rewrite canonical geography. Audit the exact number of integrated PUs in this checkpoint instead of blindly hardcoding 6,651. All denominators must be derived from the selected scope.

## 15. Required automated validation

Test:

- 15 constituencies and 34 unique LGA assignments.
- Every exact constituency membership listed above.
- No duplicate/missing LGAs.
- Supplied names preserved.
- Added candidates visibly simulated.
- Constituency-specific candidate isolation.
- Map/dropdown synchronization.
- LGA/Ward/PU filtering and invalid-path safety.
- Vote Margin arithmetic.
- Zero/awaiting states without invented results.
- Accreditation history handling.
- Ask Eyes AI context isolation.
- Complete Back navigation.
- Presidential and Senatorial renderer/route regression protection.

Run all checks, tests, and the production build.

## 16. Mandatory browser verification

Do not stop after syntax/unit tests. Launch the exact recovered project and test the real UI.

Test at least:

1. Katsina → Katsina LGA → canonical Ward → canonical PU → detail → Ask Eyes AI → full Back.
2. Funtua/Dandume → Funtua → canonical Ward → canonical PU → Vote Margin → AI → full Back.
3. Daura/Sandamu/Mai’Adua → Daura → canonical Ward → canonical PU → full Back.

Also test map and dropdown selection, keyboard selection, switching constituencies without stale state, charts, simulation disclosures, desktop/tablet/Android widths, and browser console.

Regression-smoke-test the completed Presidential State → LGA → Ward tile → PU tile flow and all three Senatorial zones. Do not claim completion if either protected module regresses.

## 17. Completion report

Report exact files created/modified; isolated renderer confirmation; 15/34 validation; canonical Ward/PU coverage; candidate simulation method; map method; selector and hierarchy verification; charts; AI; Vote Margin; Back navigation; responsive checks; console status; test/build results; Presidential/Senatorial regression results; and every remaining limitation.

## Final acceptance conditions

Completion requires an isolated House renderer; preserved Presidential and Senatorial flows; interactive 15-constituency map and selector; all 34 LGAs exactly once; working Constituency → LGA → Ward tiles → PU tiles → detail hierarchy; constituency-specific candidates; visible simulation labels; Presidential-sized bar chart; professional accreditation line chart; House-scoped Ask Eyes AI; correct Vote Margin; complete Back navigation; passing tests/build; passing desktop/tablet/Android browser checks; and no unresolved console errors.

Do not make a cosmetic-only correction. Do not report completion until the complete click-level flow and every acceptance condition have been verified.

## Short Codex instruction

Implement this correction in `C:\Users\DAN MASANI\Documents\ChatGPT\THE EYES`. Read this file, `AGENTS.md`, `1000678335.jpg`, relevant V3 specifications, canonical geography, and protected Presidential/Senatorial modules completely. Perform the read-only audit first, then isolate and implement only House of Representatives. Use canonical geography and clearly label every added candidate as simulated. Run automated tests, production build, real desktop/tablet/Android browser testing, and Presidential/Senatorial regression checks. Do not report completion until all acceptance conditions above pass.
