# PROJECT: THE EYES — V3 KATSINA STATE ADMIN CORRECTION

## IMPLEMENTATION MODE

Work directly inside the existing THE EYES project. This is a correction and completion pass for the existing Katsina State Administrator module. Do not rebuild the application from scratch, replace the established premium interface, or disturb working election modules.

First inspect the repository, current routing, authentication/session implementation, state persistence, fixtures, tests and existing Admin screens. Preserve all correct functionality and implement only the corrections below.

## NON-NEGOTIABLE BOUNDARIES

- Preserve the existing dark premium visual design, layout, typography, responsive behaviour and navigation structure.
- Preserve the existing State → LGA → Ward → Polling Unit canonical hierarchy and its existing spellings/codes.
- Do not fabricate polling units, wards, results, evidence, users, incidents or audit events.
- Do not change protected Presidential, Senatorial, House of Representatives or Gubernatorial calculations, result totals or working dashboards unless a change below explicitly requires it.
- Keep all prototype-only or simulated functions clearly labelled.
- All sensitive actions must remain human-controlled, permission-scoped and auditable.
- Never silently claim success. A successful toast must correspond to a real state change that can be verified on the destination screen and remains after navigation/re-authentication.
- Preserve existing user changes and unrelated files.

## 1. ADMINISTRATOR IDENTITY CORRECTION

Replace the Katsina State Administrator identity everywhere:

- Old name: `Amina Lawal`
- New name: `Aminu Abubakar`
- Old initials/avatar: `AL`
- New initials/avatar: `AA`
- Keep User ID: `KSA-0001`
- Keep role: `Katsina State Administrator`

Update every interface label, authentication fixture, profile record, header, session record, incident actor display, approval record, audit record, test fixture, snapshot, generated download and export field. Search the entire repository and ensure `Amina Lawal` and the old `AL` identity do not remain where they refer to this administrator.

## 2. CRITICAL CREDENTIAL-EXPOSURE CORRECTION

The current application exposes `userId`, plaintext `password` and `deviceId` in the browser URL/query string, history and route, for example:

`?userId=KSA-0001&password=...&deviceId=THE-EYES-DEMO-CONSOLE#/katsina-admin/...`

Correct this immediately:

- Never place passwords, OTPs, device identifiers, session secrets or authentication payloads in a URL, query string, hash, browser history, referrer, console log or analytics event.
- Submit authentication through application state/API-style handlers.
- Store only the minimum safe session information using the project’s established secure session mechanism.
- After successful authentication, remove any legacy credential-bearing query parameters using route replacement so Back/Forward/history cannot reveal them.
- Sanitize direct links containing old query parameters without echoing secrets.
- Mask sensitive values in errors and logs.
- Add automated tests proving credentials never appear in the URL before, during or after login, OTP verification, navigation and re-authentication.

## 3. SESSION PRESERVATION AND ROUTE-GUARD CORRECTION

An active Admin session is repeatedly lost when opening protected actions/routes. This occurred when opening Submitted Result Review, an Agent Intimidation incident and Approval Queue, even though Security and Access showed one active session, a 15-minute inactivity timeout and an eight-hour maximum session.

Implement one consistent session source of truth:

- Preserve the authenticated Admin session across every Admin route and sensitive-detail route.
- Normal navigation and button actions must not trigger re-login while the session is valid.
- Touch/activity must correctly extend the configured inactivity timeout.
- Re-authentication must occur only for a genuine timeout, revoked session, invalid device/session, maximum-session expiry or an explicitly configured step-up action.
- When genuine re-authentication is required, preserve and safely restore the intended destination after login.
- Do not destroy feature state merely because step-up authentication occurs.
- Avoid guard/remount loops and inconsistent local/session storage keys.
- Add navigation tests covering all Katsina Admin sidebar routes and detail screens in one continuous authenticated session.

## 4. DURABLE PROTOTYPE STATE

Approval requests, operational audit events and other actions disappeared after re-login. Introduce a durable prototype data layer appropriate to the existing architecture so authorised state survives route changes, refresh and re-authentication.

At minimum preserve:

- approval requests and decisions;
- import previews;
- export requests;
- incident call requests and callback notes;
- AI human-review recommendations;
- result and evidence review actions;
- assignment replacement requests;
- backup checkpoints and restore previews;
- operational-mode changes;
- complete audit events.

Use stable unique IDs, timestamps, authenticated actor IDs and deterministic relationships. Do not reset mutable state during component mounting or login. Provide an explicit development-only reset mechanism if needed; never reset silently.

## 5. POLITICAL PARTIES AND CANDIDATES

Repair both controls:

- The election-type dropdown must filter the visible records. Selecting Gubernatorial must not leave Presidential, Senatorial or other unrelated records visible.
- The search field must filter by relevant party/candidate fields, including candidate name. Searching `Dikko` must display only matching records.
- Search and election filters must work together, be case-insensitive, update immediately and provide a clear no-results state.
- Add tests for each election category, exact/partial search, combined filters and clearing filters.

## 6. USER AND AGENT REGISTRATION

The Register User role dropdown is incomplete. Retain the existing roles and add all authorised roles:

- Polling Unit Agent
- Ward Collation Agent
- Local Government Collation Agent
- State Collation Agent
- Katsina State Administrator
- Result Review Officer
- Evidence Review Officer
- Agent Assignment Officer
- Read-only Auditor
- LGA Incident Response Agent

Make the form role-aware. Show and validate only the scope/assignment fields required for the selected role. Enforce least privilege and canonical geographic scope. Prevent duplicate IDs, duplicate active assignments and invalid State/LGA/Ward/PU combinations. Registration must create a real persistent prototype record and a complete audit event.

## 7. GEOGRAPHY MANAGEMENT DRILL-DOWN

LGA selection works, but Ward tiles are display-only. Make every Ward tile keyboard- and pointer-accessible and allow drill-down to its canonical polling-unit records.

The Ward detail must show, where present in the canonical dataset:

- Ward name and canonical code;
- parent LGA and State;
- exact polling-unit count;
- polling-unit names/codes and relevant registration-area information;
- searchable/filterable records;
- a clear Back path retaining the selected LGA and scroll state.

Do not invent boundaries or records. Maintain the distinction between the integrated canonical total of 6,651 and the separately labelled published comparator of 6,652.

## 8. AGENT REPLACEMENT GOVERNANCE

Do not allow an arbitrary replacement request without a documented reason/trigger. Implement this flow:

1. A replacement alert/incident originates from an agent reporting unavailability, system inactivity/offline/failed checks, or an authorised officer.
2. The alert identifies the agent, assignment, LGA/scope, reason, evidence/contact attempts, urgency and creator.
3. The Agent Assignment Officer reviews the alert and requests replacement.
4. A separately authenticated authorised person approves or rejects it; requester cannot approve their own request.
5. The replacement agent’s identity, role, device and geographic scope are verified.
6. Assignment transfer is auditable and preserves the outgoing agent’s history; historical submissions must never be reassigned or rewritten.

Disable or explain the Request Replacement action when no qualifying alert exists. Link eligible alerts to the request and surface the request in Approval Queue. Prevent duplicate pending requests.

## 9. SUBMITTED RESULTS REVIEW

- Preserve session when Review is opened.
- Keep `SUB` as the unique Submission identifier and add accessible help text such as `SUB = Submission` so nontechnical users understand it.
- Ensure every Review button opens the correct submission detail.
- Persist outcome, human review note, actor and timestamp.
- Enforce valid state transitions and permissions.
- Any correction/amendment to a verified result must preserve the immutable original and require separate approval where specified.
- Reflect the saved status immediately in the list and audit ledger.

## 10. EVIDENCE MANAGEMENT

- Repair the evidence search bar so it filters the queue by submission ID and other displayed searchable identifiers.
- Preserve selection and search state during navigation.
- Keep explicit zoom, rotation and audit-download controls functional and accessible.
- A human finding must persist with submission/evidence ID, finding, comment, reviewer, timestamp and audit record.
- Do not treat clicking the image itself as the only zoom mechanism; the explicit controls are canonical.
- Validate unreadable/missing evidence and present clear feedback.

## 11. VERIFICATION AND DISPUTES

The dispute row currently does nothing. Make each row/action open a complete dispute case. The detail must include:

- dispute ID and linked submission ID;
- reason and current status;
- preserved original result and evidence;
- duplicate/comparison evidence where applicable;
- review findings and full status history;
- owner and assignment history;
- human comments/notes;
- escalation controls and timestamps;
- authorised decision options;
- closure reason and closure history;
- immutable audit trail.

Use human verification for allegations. Enforce role isolation and prevent the same person from performing incompatible request/approval duties.

## 12. AI AGENT REVIEW CENTRE

Preserve all seven advisory agents and the human-authority boundary. `Create human review task` must create a durable, uniquely identified review task that is visible in the appropriate human queue after navigation/re-login.

- Prevent duplicate tasks from repeated clicks.
- Link each task to its supporting record and originating advisory agent.
- Preserve confidence, conclusion, reasons and limitations.
- AI remains advisory only and cannot verify/reject results, alter geography, replace agents, approve requests or perform other human-authority actions.
- Use clear confirmation that names the created task/reference instead of a generic toast.

## 13. INCIDENTS, ALERTS AND LGA RESPONSE

Preserve the existing combined functionality under Technical & Field Incidents. For clearer navigation, rename the sidebar/page to `Incident Response Centre` or `LGA Incident Response Centre`, while retaining technical and field incidents within it.

Preserve working incident types and tiered support. Correct and complete these behaviours:

- Investigate from Notifications and Alerts must open the exact linked incident detail directly, not merely the general queue.
- Opening any incident detail must preserve the valid session.
- Detail must show incident ID, allegation/incident type, severity, affected LGA, Ward/PU where applicable, assigned primary LGA responder, state escalation threshold, status, evidence, notes, acknowledgements, containment/recovery, event timeline and complete audit history.
- Clearly label allegations as unverified until a human verifies them.
- Request Call must create a real prototype call request linked to the assigned responder.
- Disable/debounce the button while processing and prevent duplicate identical requests; if another request is appropriate, require confirmation/reason.
- Continue to state clearly that no external telephone service is connected in the prototype.
- Callback notes must persist with actor/time and update the incident timeline.
- Enforce role-based access and escalation rules.

## 14. APPROVAL QUEUE AND TWO-PERSON CONTROL

Repair the Approval Queue so every eligible sensitive request is actually created, retained and displayed, including:

- election reopen requests;
- agent replacement requests;
- authorised/full export requests;
- restore requests;
- verified-result amendments and any other configured sensitive actions.

Each row must show approval ID, sensitive action, target, requester, reason/evidence, creation time, status and decision controls. Enforce:

- requester and approver are different authenticated people;
- requester cannot approve their own request;
- approval/rejection requires an authorised role and recorded reason where appropriate;
- duplicate pending requests are prevented;
- decisions persist and update the source feature;
- every transition is audit logged.

Never show a success toast unless the request exists in this queue.

## 15. AUDIT LOG COMPLETENESS AND EXPORT

The audit search works and must be preserved. Expand the tamper-evident ledger so it records every security- or operations-relevant event, including authentication, OTP, access, configuration, evidence, result review, dispute action, AI recommendation, incident/call/callback, import preview, export request, approval, assignment change, checkpoint and restore preview.

Every event must have:

- stable event ID;
- authenticated actor and role;
- action;
- linked record/target;
- outcome;
- UTC timestamp plus appropriate display timezone;
- chain/hash metadata where the prototype represents hash chaining;
- sanitized metadata with no passwords, OTPs or secrets.

Events must survive navigation, refresh and re-authentication. The existing `Export authorized audit view` button currently adds an event but downloads no file. Repair it so it creates a genuine, least-data authorised audit export/download in an explicit supported format. The downloaded content must match the current authorised filtered view, include provenance metadata, and exclude secrets. If export requires approval, create the queue request first and enable download only after approval; make that state clear.

## 16. IMPORT AND EXPORT

Preserve the working local validation preview and its non-mutation safeguard. Complete the workflow:

- Continue to parse only supported CSV, XLSX and JSON within the stated size limit.
- Ensure selected format matches parsing behaviour and provide schema/row errors.
- Keep canonical geography unchanged during preview.
- Persist import reports and preview IDs.
- Require explicit confirmation and appropriate approval before applying an authorised import.
- `Download column template` must download a real template.
- `Prepare export request` currently shows `Ready - simulated` but creates no approval request. It must create a durable export approval record with classification, authorised scope/filter note, requester, reason, timestamp and proposed fields.
- Never generate or download a sensitive full export before approval.
- After approval, generate the actual authorised file and audit the download.

## 17. BACKUP AND RECOVERY

Preserve working simulated checkpoint creation, checksums and integrity labels. Complete restore preview:

- `Preview restore` currently displays only a generic confirmation. It must show an actual non-mutating impact report before any approval request.
- Show checkpoint ID/time/type/scope/checksum, affected record categories/counts, dependencies, risks/conflicts, expected recovery point and safety-backup plan.
- Restore must require a separately authenticated approver.
- No restore may run during preview.
- Create the pre-restore safety checkpoint, record the operation, validate restoration and provide a recovery report.
- Keep all prototype simulation labels truthful; do not claim a remote or immutable production backup exists.

## 18. SYSTEM SETTINGS, SECURITY AND PROFILE

Preserve the working Normal/Degraded/Offline Queue/Read-only/Recovery controls and restore default state to Normal after tests. Ensure mode changes persist appropriately and are audited.

Preserve Security and Access session inventory and User Profile. Ensure:

- displayed active-session count matches real prototype session state;
- inactivity and maximum-session rules match actual behaviour;
- Revoke this session invalidates only the current session and returns to login;
- Log out all devices invalidates all sessions for the user;
- revoked sessions cannot regain protected access through browser Back or stale routes;
- actions are audit logged;
- corrected identity `Aminu Abubakar` / `AA` appears consistently.

## 19. USER EXPERIENCE AND ACCESSIBILITY

- Every visible button, tile, row action, search field and filter must perform its stated action.
- Add loading/disabled states to prevent duplicate submissions.
- Use specific success/error messages containing the created/updated reference ID.
- Do not use a success-looking toast for a simulation that created nothing.
- Preserve focus, keyboard operation, labels and adequate contrast.
- Provide meaningful empty states and recovery guidance.
- Preserve responsive behaviour across desktop, tablet and mobile widths.

## 20. TESTING AND ACCEPTANCE GATES

Add or update unit, integration and browser-level tests. Before completion, verify all of the following:

1. Repository syntax/type checks pass.
2. All existing tests continue to pass.
3. Production build passes.
4. No authentication secret appears in any URL, history entry, log or export.
5. Aminu Abubakar and `AA` appear everywhere required; the old identity is absent.
6. One Admin login can navigate through every Admin route/detail without unintended logout.
7. Political-party election filtering and search work separately and together.
8. All required registration roles are available with role-specific validation.
9. Ward tiles open canonical PU records.
10. Replacement requests require a qualifying alert and separate approver.
11. Submitted-result reviews persist.
12. Evidence search and human findings persist.
13. Dispute rows open complete, actionable cases.
14. AI review recommendations create durable human tasks.
15. Alert Investigate opens the exact incident.
16. Incident call requests cannot be accidentally duplicated; callback notes persist.
17. Election reopen, replacement, export and restore requests appear in Approval Queue and survive re-login.
18. Audit Logs contain all relevant actions and survive re-login.
19. Audit export produces a real authorised file or correctly routes through approval before download.
20. Import preview remains non-mutating; import/export approval workflows are real and durable.
21. Restore preview shows an actual impact report and does not mutate data.
22. Checkpoint creation, operating-mode changes and session revocation work and are audited.
23. All six specialised/admin role boundaries remain enforced.
24. Responsive browser QA passes at representative mobile, tablet and desktop widths.

## REQUIRED COMPLETION REPORT

After implementation, provide:

- concise summary of corrections completed;
- exact files changed;
- architecture/data-persistence decisions;
- tests added or updated;
- commands run and exact results;
- confirmation that protected election calculations/modules were not altered;
- confirmation that credential-bearing URLs have been eliminated;
- confirmation that old administrator identity references were removed;
- any genuine remaining prototype limitations, clearly distinguished from completed functionality.

Do not create the final ZIP/checkpoint until every acceptance gate passes and browser retesting confirms the corrections.
