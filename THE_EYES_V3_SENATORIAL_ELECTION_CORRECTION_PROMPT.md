# PROJECT: THE EYES — V3 SITUATION ROOM SYSTEM

## SENATORIAL ELECTION MODULE — COMPLETE CORRECTION AND FUNCTIONALITY IMPLEMENTATION

### Reference image

Use the attached Senatorial Election map image as the visual reference. Its filename in the THE EYES project folder must be `1000676131.jpg`. This cleaner image replaces the earlier map screenshot and is now the authoritative visual reference.

The reference image shows Katsina State divided into exactly three Senatorial Districts:

1. Katsina Central Senatorial District — Katsina Zone
2. Katsina South Senatorial District — Funtua Zone
3. Katsina North Senatorial District — Daura Zone

## Critical scope instruction

This task concerns **only the Senatorial Election section under the Situation Room Commander dashboard**.

The Presidential Election correction has already been completed successfully. Do not damage, redesign, delete, or functionally change it. Use the corrected Presidential Election dashboard as the internal design and interaction reference for:

- Dashboard layout and styling
- Chart sizing and responsiveness
- Back-button and breadcrumb behaviour
- Election hierarchy navigation
- LGA, Ward, and Polling Unit drill-down
- Ask Eyes AI
- Loading, empty, and error states
- Vote-margin presentation
- Typography, spacing, cards, colours, and accessibility

Do not redesign the entire application, replace the existing architecture, or build a disconnected demonstration page. Implement the corrections directly inside the existing Senatorial Election module and connect them to the existing Situation Room Commander navigation and data structure.

Before editing, inspect the existing implementation and identify the actual Senatorial dashboard, components, routes, map, selectors, candidate data, party/result data, charts, AI panel, navigation logic, canonical Katsina hierarchy, shared Presidential components, and validation commands. Do not assume filenames or create duplicates before checking what already exists.

---

## 1. Correct the Senatorial map

Replace or correct the current map so it follows the attached reference image. It must preserve the recognizable geographical shape of Katsina State and visibly divide it into:

- Katsina Central
- Katsina North
- Katsina South

Put a readable label inside each area. Do not represent the districts as ordinary rectangular cards pretending to be a map.

Reuse the existing SVG, GeoJSON, map component, or mapping library where possible. Do not add a large dependency unless necessary.

The map must:

- Fit and remain centred inside its container
- Preserve aspect ratio and avoid cropping/overflow
- Display clear internal zone boundaries
- Be responsive on desktop, tablet, and mobile
- Support hover, focus, active, and selected states
- Be mouse-, touch-, and keyboard-interactive
- Show a pointer cursor on selectable zones
- Visually distinguish the selected zone
- Preserve party-result colouring when supported
- Use a neutral awaiting-results colour where appropriate

Clicking a zone on the map must perform the same action as choosing it through “View Election by Zone.” Both controls must share the same selected-zone state.

---

## 2. Live Results Party Ranking must be zone-specific

Do not combine all three contests into one misleading statewide ranking. Each zone must have its own ranking:

- Katsina Central Senatorial District
- Katsina South Senatorial District
- Katsina North Senatorial District

With no selected zone, show either a clearly labelled statewide summary containing three separate contests or three compact ranking sections. Never present a sum of all three zones as though Katsina State were one Senate constituency.

After selecting a zone, show only that zone’s ranking. Calculate it from results belonging to the active geographical scope, in descending vote order. Do not hard-code ranking order when totals exist.

Where supported, each row should show:

- Rank
- Party
- Candidate
- Total votes
- Vote percentage
- Difference from the leader
- Reporting progress
- LGAs, Wards, and Polling Units reporting

The ranking must update at Zone, LGA, Ward, and Polling Unit levels.

---

## 3. Replace all Senatorial candidate data

Use one canonical candidate-data source keyed by canonical Senatorial District ID and party ID. Maintain these candidates everywhere: rankings, charts, margins, AI context, district/LGA/Ward/PU screens, tooltips, details, search, and exports where present.

### Katsina Central Senatorial District — Katsina Zone

- **APC — All Progressives Congress:** Sen. AbdulAziz Musa Yar’adua — Confirmed consensus nominee
- **PDP — Peoples Democratic Party:** Alhaji Hamisu Gambo-Danlawan — Affirmed party flagbearer
- **NNPP — New Nigeria People’s Party:** Gambo Abubakar Jalli — Active candidate platform
- **SDP — Social Democratic Party:** Mohammed Mustapha Kurfi — Active candidate platform
- **PRP — People’s Redemption Party:** Aminu Gide — Active candidate platform

### Katsina South Senatorial District — Funtua Zone

- **APC — All Progressives Congress:** Sen. Muntari Muhammad Dandutse — Confirmed consensus nominee
- **PDP — Peoples Democratic Party:** Nura Khalil — The 2023 NNPP governorship nominee who formally switched and secured the PDP ticket
- **PRP — People’s Redemption Party:** Mamuda Ibrahim — Main local opposition ticket
- **SDP — Social Democratic Party:** Abba Mustapha — Main local opposition ticket
- **NNPP — New Nigeria People’s Party:** Yandoma Sen. Abdu Umar — Active alternative platform

### Katsina North Senatorial District — Daura Zone

- **APC — All Progressives Congress:** Rt. Hon. Nasiru Yahaya Daura
- **PDP — Peoples Democratic Party:** Aliyu Abdulmumin-Abdullahi
- **ADC — African Democratic Congress:** Abdulhafiz Sa’idu — Retained foundational zone structure
- **NNPP — New Nigeria People’s Party:** Shehu Garba Abubakar — Main alternative challenger
- **NRM — National Rescue Movement:** Ibrahim Babangida

Candidate rules:

- Never mix candidates between zones.
- Remove old candidate names from all active Senatorial UI data.
- Do not replace names with descriptions.
- Do not invent descriptions when none are provided.
- Preserve spelling, apostrophes, and party associations.
- Ensure apostrophes do not break JavaScript/TypeScript strings.
- Candidate data must survive navigation and refresh.

---

## 4. Activate “View Election by Zone”

Make the control fully clickable and functional. Its dropdown must contain exactly:

- Katsina Central Senatorial District — Katsina Zone
- Katsina South Senatorial District — Funtua Zone
- Katsina North Senatorial District — Daura Zone

Use the placeholder `Select a Senatorial District`.

It must work by mouse, touch, and keyboard; display the current selection; close appropriately; remain above nearby cards; avoid clipping; and work on mobile.

Selecting a zone must update the map, title, candidate list, ranking, bar chart, vote margin, accreditation trend, LGA selector, and Ask Eyes AI context. It must update the underlying scope, not only visible text.

---

## 5. Resize the bar chart

Make the Senatorial bar chart match the corrected Presidential chart. Reuse the Presidential component/configuration safely where possible.

It must fit inside its card, avoid excessive empty space, use balanced bar height and spacing, preserve party colours, show clear titles/totals/tooltips, support long candidate names, and respond correctly to Zone/LGA/Ward/PU selection. Never retain another zone’s results after selection changes.

---

## 6. Professional Accreditation Trend line chart

Replace the existing Senatorial accreditation visualization with a professional responsive line chart matching the Presidential standard.

Where data exists, include time/reporting interval on the X-axis, accredited voters on the Y-axis, a clear line, visible points, tooltips, labels, proper number formatting, subtle grid lines, loading state, empty state, and error state.

The chart must respond to the selected Zone, LGA, Ward, or Polling Unit. Do not generate random values inside the component or present invented values as real results. If the prototype uses fixtures, follow the existing fixture-data architecture.

---

## 7. Make Ask Eyes AI identical to Presidential

Reuse the corrected Presidential Ask Eyes AI component and styling where possible, including its open/close behaviour, input, send action, quick prompts, conversation view, loading/error handling, responsiveness, and accessibility.

Provide the active Senatorial context:

- Election type
- Selected zone, LGA, Ward, and Polling Unit
- Correct candidates
- Party rankings and vote totals
- Vote margin
- Accreditation and reporting progress
- Available incidents/evidence

It must never answer about one zone using another zone’s candidates. Suggested questions may include who is leading, the vote margin, reporting completion, outstanding wards, party comparisons, accreditation versus votes, and unusual patterns.

---

## 8. Activate “View Election by Local Government”

After a zone is selected, activate this selector and show only LGAs canonically belonging to that Senatorial District. Use the application’s existing State → Senatorial District → LGA → Ward → Polling Unit hierarchy. Do not guess membership alphabetically or create a competing hierarchy.

Without a selected zone, disable it with: `Select a Senatorial District first`.

After selecting an LGA:

- Retain the selected zone and its candidates
- Update the heading, rankings, totals, margin, trend, and AI context
- Show only wards under that LGA
- Update breadcrumbs

Candidates do not change at LGA level; only the geographical result scope changes.

---

## 9. Add functional Back buttons throughout

Match the corrected Presidential styling and implement hierarchical navigation:

- Polling Unit → Ward
- Ward → Local Government Area
- Local Government Area → Senatorial District
- Senatorial District → Senatorial Election overview
- Senatorial Election overview → Situation Room Commander

Back buttons must be visible, accessible, touch-friendly, preserve correct parent selections, and never send users to an unrelated screen. Do not hard-code every Back button to the same route.

Correct interactive breadcrumbs where supported, for example:

Situation Room Commander → Senatorial Election → Katsina North → Daura LGA → Ward → Polling Unit

---

## 10. Make Ward tiles interactive

Every valid Ward tile must open its Polling Unit view and filter polling units by the active Zone, LGA, and Ward.

Add pointer, hover, focus, pressed, keyboard, and touch states. Where data permits, show Ward name/code, PU count, reporting count/percentage, leading party, total votes, and status.

The Polling Unit view should show available PU name/code, Registration Area, reporting/election status, accreditation, votes, party results, leader, margin, submission time, evidence, and verification status.

If no PU data exists, show: `No polling-unit records are currently available for this ward.` Do not crash or leak records from another ward.

---

## 11. Add Votes Margin

Add Vote Margin to the Senatorial dashboard and relevant drill-down screens, matching the corrected Presidential design.

Show:

- Leading candidate and party
- Leader’s votes
- Second-place candidate and party
- Second-place votes
- Numerical difference
- Percentage-point difference where calculable

Formula:

`Vote margin = votes of leading candidate − votes of second-place candidate`

Calculate it from the active Zone/LGA/Ward/PU scope. Never compare candidates from different zones or use stale selections. If fewer than two candidates have valid data, show a professional awaiting-data state.

---

## Required state and navigation flow

Situation Room Commander → Senatorial Election Overview → District → LGA → Ward → Polling Unit

At every level, update the heading, scope, candidates, ranking, chart, trend, margin, statistics, AI context, breadcrumb, and Back destination.

When changing zones, clear prior LGA/Ward/PU selections. When changing LGA, clear prior Ward/PU selections. When changing Ward, clear the prior PU selection. Preserve all valid parent selections.

---

## Responsive design and accessibility

Verify desktop, laptop, tablet, and Android mobile views. The reference is a narrow screenshot; reproduce the intended design, not its cropped text.

Ensure no uncontrolled horizontal overflow; maps/charts resize; dropdowns remain in the viewport; candidate names remain readable; tables scroll only within their containers; Back buttons remain visible; Ward tiles are touch-friendly; and Ask Eyes AI works on mobile.

Use semantic buttons, labelled controls, keyboard-accessible map zones and tiles, visible focus indicators, adequate contrast, non-colour selection indicators, chart summaries, accessible icons, and suitable touch targets.

---

## Implementation safety

Do not damage Presidential Election, Polling Unit Agent, Ward Collation Agent, other election modules, valid routes, canonical geography, secrets, or existing architecture. Do not invent results, mix zones, leave fake-active controls, create dead ends, or add conflicting state management.

Prefer shared components, props, design tokens, canonical IDs, existing chart libraries, and existing navigation utilities.

---

## Acceptance tests

The task is complete only when:

1. Senatorial Election opens from Situation Room Commander without errors.
2. The Katsina map shows and labels all three zones.
3. Every map zone is mouse-, touch-, and keyboard-clickable.
4. Map selection and zone dropdown remain synchronized.
5. Each zone shows only its assigned candidates.
6. No old candidate names remain in active Senatorial data.
7. Rankings are independent per zone and ordered by votes.
8. The bar chart matches Presidential sizing and updates with scope.
9. Accreditation Trend is a professional line chart.
10. Ask Eyes AI matches Presidential and receives correct context.
11. LGA selection activates only after a zone is selected.
12. Only LGAs belonging to the selected zone appear.
13. LGA selection retains the zone’s candidate names.
14. Ward tiles are interactive and display their Polling Units.
15. Polling Units do not leak between wards.
16. Vote Margin is present and recalculates at each level.
17. Every hierarchical Back action works correctly.
18. Changing scope clears stale child selections.
19. Desktop/mobile layouts remain usable.
20. Existing lint, type-check, test, and production-build commands pass.
21. The corrected Presidential module still works.

---

## Final verification report

After implementation, run the project’s linting, type checking, automated tests, and production build. Manually test the full Senatorial workflow, verify Presidential regression safety, search for old Senatorial candidate names, inspect the browser console, and test mobile/desktop layouts.

In the final response report:

- Summary of corrections
- Exact files changed
- Candidate-data source
- Map implementation
- Zone-to-LGA filtering
- Ward-to-Polling-Unit navigation
- Vote Margin calculation
- Ask Eyes AI context flow
- Commands and tests run
- Build result
- Remaining limitations or missing canonical data

Do not claim a feature works unless it was implemented and verified.

Begin with the audit, then make the corrections directly in the existing application.
