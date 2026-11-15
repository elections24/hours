# THE EYES V3 — GUBERNATORIAL ELECTION CORRECTION

## FINAL MASTER IMPLEMENTATION PROMPT

Work only inside:

`C:\Users\DAN MASANI\Documents\ChatGPT\THE EYES`

This is the verified recovered V3 prototype. Presidential, Senatorial, House of Representatives, and the shared election-card icons are protected. Do not rebuild the application or modify their routes, renderers, candidates, hierarchy, maps, charts, AI behaviour, navigation, or navigation.

Your assignment is strictly limited to:

**Situation Room Commander → Gubernatorial Election**

## 1. Mandatory read-only audit

Before editing, read completely:

- `AGENTS.md`
- all V3 product and implementation specifications;
- canonical Katsina geography/reporting data;
- the corrected Presidential module;
- the completed Senatorial module;
- the completed House module;
- the existing Gubernatorial implementation;
- shared chart, map, navigation, AI and simulation utilities;
- all relevant automated tests.

Report first:

1. Files controlling Gubernatorial rendering and data.
2. Whether it still uses the generic V3 renderer.
3. The exact corrected Presidential route/state used after Katsina State is selected.
4. The canonical LGA/Ward/PU source and exact available counts.
5. The live-prototype simulation mechanism already present.
6. Files to create or modify.
7. How all completed modules will be protected.

Then continue unless a genuine conflict prevents safe implementation.

## 2. Core visual and behavioural requirement

From the second screen through the final Polling Unit screen, the Gubernatorial section must look and behave exactly like the corrected Presidential dashboard after Katsina State is selected.

Mirror its:

- page structure and spacing;
- typography, colours, cards and tiles;
- Katsina map placement and dimensions;
- LGA overview;
- LGA → Ward tile → Polling Unit tile hierarchy;
- result ranking presentation;
- bar-chart size;
- professional accreditation line chart;
- reporting progress components;
- Vote Margin;
- Ask Eyes AI design and interaction;
- empty/awaiting states;
- Back buttons and navigation;
- responsive desktop, tablet and Android behaviour.

Reuse stable shared components or isolate equivalent Gubernatorial components. Do not copy stale Presidential data or mutate the Presidential renderer.

## 3. Required hierarchy

Implement:

**Situation Room Commander → Gubernatorial Election → Katsina State Overview → LGA tiles → Ward tiles → Polling Unit tiles → Polling Unit detail**

The selected election must remain Gubernatorial throughout. Candidate totals, reporting counts, accreditation history, Vote Margin and AI context must remain scoped to the selected State/LGA/Ward/PU.

## 4. Candidate list

Use exactly these two candidates unless the project owner later supplies additional candidates:

1. **All Progressives Congress (APC) — Gov. Dikko Umaru Radda**
2. **African Democratic Congress (ADC) — Ahmad Babba-Kaita**

Preserve spelling, titles and party labels exactly. Do not add PDP, NNPP, PRP or other candidates. Do not substitute Presidential, Senatorial or House candidates.

## 5. Active live-prototype behaviour

The dashboard must actively update during demonstration, but it is not connected to an authorized live electoral server.

Display prominently:

**LIVE PROTOTYPE SIMULATION — NOT OFFICIAL ELECTION DATA**

Implement a deterministic live-simulation engine that:

- automatically advances reporting events at a controlled interval;
- updates reported-PU counts and percentages;
- updates APC and ADC vote totals;
- updates candidate ranking;
- updates Vote Margin;
- adds accreditation-history points;
- updates LGA, Ward and PU reporting states;
- updates “Last updated” timestamps;
- updates Ask Eyes AI context immediately;
- preserves arithmetic consistency from PU → Ward → LGA → State;
- persists or reconstructs the same deterministic state safely on refresh;
- pauses/stops cleanly when the module is left;
- never starts duplicate timers after rerendering or navigation;
- never causes results to decrease unless a clearly implemented correction event exists;
- never creates votes for canonical PUs marked unavailable.

Provide a clear active simulation/status indicator. If controls already exist, support safe Pause, Resume and Reset-to-demo-baseline behaviour. Reset must affect only Gubernatorial prototype state.

Do not describe simulation as an official live connection. Do not connect to any external election system.

## 6. Canonical data and aggregation

Use the existing integrated Katsina hierarchy:

**State → LGA → Ward → Polling Unit**

Derive counts from canonical records. Audit and report the actual current checkpoint count; do not blindly hardcode 6,651 or 6,652. Do not fabricate missing LGAs, Wards or PUs.

Every simulated PU event must roll up consistently:

- PU totals contribute only to their Ward;
- Ward totals contribute only to their LGA;
- LGA totals contribute only to Katsina State;
- statewide totals equal the sum of reported canonical child records;
- reporting percentage denominator matches the current scope;
- total candidate votes must remain compatible with accreditation/valid-vote rules used by the prototype.

Unreported canonical PUs must show awaiting/zero state rather than invented results.

## 7. State and LGA overview

The Gubernatorial Katsina overview must match the corrected Presidential Katsina screen in layout and feature placement. Show the Katsina map, live party ranking, reporting progress, resized bar chart, accreditation trend, Vote Margin, Ask Eyes AI and interactive LGA tiles.

All 34 canonical Katsina LGAs must be represented where geometry exists. Selecting an LGA must update every scoped component and open its Ward tiles.

If an LGA has geometry but no canonical Ward/PU reporting records, show a truthful unavailable-data message.

## 8. Ward and Polling Unit tiles

Use the corrected Presidential tile format.

Ward tiles must be clickable and keyboard accessible and show canonical Ward name/code, LGA, PU count, reporting progress, leader/awaiting state and Vote Margin where valid.

Selecting a Ward must show only its canonical Polling Unit tiles. PU tiles should show canonical name/code, Ward, LGA, reporting status, accreditation/result state, leader/awaiting state and Vote Margin where valid.

Selecting a PU opens the Gubernatorial PU detail view. No geography or result data may leak between LGAs or Wards.

## 9. Live Results Party Ranking

Rank the two candidates by the current deterministic Gubernatorial totals. Show:

- position/rank;
- party name and abbreviation;
- candidate name;
- vote total;
- percentage where supported;
- leading indicator;
- current scope;
- most recent update time.

Rankings must update visibly as simulation events advance without requiring a manual refresh.

## 10. Vote Margin

Calculate:

**leader votes − runner-up votes**

Show the leader, runner-up, numerical margin, percentage-point difference where valid, scope and update time. Update at State, LGA, Ward and PU levels. Never show stale state, negative values, `NaN` or `undefined`.

## 11. Charts

Match the corrected Presidential bar chart size and proportions. Keep labels/values readable, colours consistent, containers responsive and current scope synchronized.

Implement Accreditation Trend as the same professional line-chart experience as Presidential. As live simulation advances, append deterministic history points and update the chart. If fewer than two points exist, show:

**Insufficient accreditation history to display a trend.**

Avoid fabricated historical data merely to populate the chart.

## 12. Ask Eyes AI

Match Presidential Ask Eyes AI exactly in placement, visual design, opening/closing, loading, response layout, responsive behaviour and return-to-origin behaviour.

Its context must be Gubernatorial-specific and include both candidates, current State/LGA/Ward/PU scope, live simulated totals, reporting progress, accreditation, Vote Margin and last update time.

It must clearly distinguish canonical geography from simulated results and must say the results are not official. It must never mention candidates from another election.

## 13. Back navigation

Implement functional Back navigation:

- PU detail → PU tiles
- PU tiles → selected Ward
- Ward → selected LGA
- LGA → Katsina Gubernatorial overview
- Gubernatorial overview → Situation Room Commander election selection

Preserve previous selection and simulation state. Visible and browser Back must not conflict. Ask Eyes AI must close to its exact originating screen.

## 14. Responsive and accessible behaviour

Verify at desktop 1280px, tablet 768–1024px and Android approximately 390×844. Ensure no page-level horizontal overflow; readable map, cards, candidate names and charts; touch-sized controls; visible focus; keyboard selection; accessible status labels; and visible Back navigation.

## 15. Required automated tests

Add regression tests for:

1. Exact two-candidate list and spelling.
2. Dedicated Gubernatorial renderer/route.
3. All 34 canonical LGAs where applicable.
4. LGA → Ward → PU isolation.
5. Deterministic live progression.
6. No duplicate simulation timers.
7. Monotonic reporting counts.
8. Correct aggregation at every level.
9. Reporting percentage denominators.
10. Candidate ranking updates.
11. Vote Margin arithmetic.
12. Accreditation history and fewer-than-two-points state.
13. Last-updated timestamp progression.
14. Pause/resume/reset if controls exist.
15. Ask Eyes AI scope and simulation disclosure.
16. Complete Back navigation.
17. Invalid geographical paths fail safely.
18. No invented results for unavailable PUs.
19. Presidential regression protection.
20. Senatorial regression protection.
21. House regression protection.
22. Election-card icons/routes remain functional.

Run all project checks, tests and production build.

## 16. Mandatory browser verification

Do not stop at syntax or unit tests. Launch the exact project and exercise the real UI.

Test Gubernatorial:

- overview immediately after entry;
- visible live-simulation disclosure/status;
- multiple timed simulation updates;
- changing totals, ranking, Vote Margin, reporting percentage, accreditation chart and timestamp;
- Katsina → Funtua → Dandutse → one canonical PU → detail → Ask Eyes AI → full Back;
- another LGA/Ward path to prove isolation;
- Pause/Resume/Reset if implemented;
- desktop, tablet and Android widths;
- browser console warnings/errors.

Regression-test Presidential, all three Senatorial zones, House constituency flow, and all four election-card icons/routes.

## 17. Final report

Report audit findings; exact files created/modified; isolated renderer; canonical coverage; exact candidates; simulation architecture and interval; aggregation validation; hierarchy; ranking; Vote Margin; charts; Ask Eyes AI; Back navigation; responsive checks; console status; automated-test/build results; regression results; and all remaining limitations.

## Final acceptance conditions

Completion requires a dedicated Gubernatorial renderer that matches the corrected Presidential Katsina flow from the second screen onward; exact two-candidate data; clear live-prototype disclosure; visibly active deterministic updates; consistent PU-to-State aggregation; working LGA/Ward/PU tiles; resized bar chart; active professional accreditation line chart; correct Vote Margin; Gubernatorial-scoped Ask Eyes AI; full Back navigation; responsive browser verification; passing tests/build; and no regression to Presidential, Senatorial, House or election-card icons.

Do not make a cosmetic-only correction. Do not claim completion until every click-level and live-update acceptance condition has been exercised.
