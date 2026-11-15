# THE EYES V3 — KATSINA STATE ADMIN MASTER SPECIFICATION

## 1. Purpose and scope

Build a dedicated administration system for THE EYES V3, restricted permanently to Katsina State. It must manage the existing four election modules without rebuilding or regressing them:

- Presidential
- Senatorial
- House of Representatives
- Gubernatorial

The canonical operational hierarchy is:

**Katsina State → 34 LGAs → 361 Wards/Registration Areas → 6,651 currently integrated Polling Unit records**

All counts must be audited from the application dataset and must not be blindly hardcoded. Missing canonical records must be reported, not fabricated.

The Admin system must remain separate from Situation Room monitoring. It may configure, review and control authorized processes, but it must never silently rewrite original result submissions.

## 2. Administrative roles

Implement least-privilege role-based access for:

1. **Katsina State Administrator** — complete Katsina Admin oversight, election configuration, user control, sensitive approvals and backup supervision.
2. **Result Review Officer** — reviews E-Forms, calculations, accreditation and result-validation flags.
3. **Evidence Review Officer** — examines election forms, images, video and duplicate copies.
4. **Agent Assignment Officer** — registers users and manages geographic/election assignments.
5. **Read-only Auditor** — views authorized records, histories and audit reports but cannot modify them.

Situation Room Commanders remain monitoring users and are not general administrators.

No role may delete audit history or silently alter original result records.

## 3. Two-person approvals

Require two separately authenticated authorized users for:

- reopening a locked election;
- approving an amendment to verified results;
- replacing an agent during active reporting;
- importing corrected canonical geography;
- restoring a backup;
- changing administrator permissions;
- exporting complete sensitive election records.

The requester cannot act as the second approver. Record request, evidence, reason, requester, approver and timestamps.

## 4. Authentication and session security

Admin login must support:

- unique Admin/User ID;
- password;
- one-time verification code;
- registered-device identification;
- first-login password change;
- optional facial/identity verification placeholder for prototype.

Provide secure account lockout, inactivity timeout, session expiration, logout from all devices, suspicious-session revocation, multiple-device warnings and protection against reopening authenticated pages after logout.

Never display stored passwords. Prototype-only authentication must be clearly identified and must not be presented as production security.

## 5. Admin dashboard

Show:

- user and role identity;
- Katsina-only scope;
- system and synchronization status;
- total users, active/inactive/suspended/locked accounts;
- 34 LGAs, 361 Wards and audited PU count;
- submissions, awaiting reports, verified, flagged, disputed and rejected records;
- election-specific reporting progress;
- recent critical activity;
- unresolved security/operational alerts;
- last successful backup status.

Provide four protected election cards with existing icons and correct routes. Admin views must respect the completed election structures:

- Presidential: State → LGA → Ward → PU
- Senatorial: Zone → LGA → Ward → PU
- House: Constituency → LGA → Ward → PU
- Gubernatorial: State → LGA → Ward → PU

## 6. Main navigation

Provide:

- Dashboard Overview
- Election Management
- Political Parties and Candidates
- User and Agent Management
- Geography Management
- Assignment Management
- Submitted Results
- Evidence Management
- Verification and Disputes
- AI Agent Review Centre
- Notifications and Alerts
- Audit Logs
- Security and Access
- Import and Export
- Backup and Recovery
- System Settings
- User Profile
- Log Out

Navigation and data must be filtered by the authenticated role.

## 7. User and agent management

Manage:

- Polling Unit Agents
- Ward Collation Agents
- LGA Collation Agents
- State Collation Agents
- Situation Room Commanders
- Result Review Officers
- Evidence Review Officers
- Assignment Officers
- Katsina State Administrators
- Read-only Auditors

Profiles may include photograph, full name, gender, phone, alternative phone, email, identity reference, address, role, election assignment, account/verification status, canonical LGA/Ward/PU assignment, last login, last activity, device information, submission history and assignment history.

Dependent geography fields must enforce LGA → Ward → PU membership. Prevent duplicate IDs, phone/identity conflicts and incompatible roles. Do not permanently delete users through the normal interface; use deactivation and preserve history.

## 8. Agent assignments

Enforce scope:

- PU Agent → one assigned canonical PU
- Ward Agent → one canonical Ward and its PUs
- LGA Agent → one canonical LGA
- State Agent → Katsina State according to permission
- Review Officer → explicit review scope

Detect duplicate active primary agents, missing assignments, suspended agents still assigned and invalid parent relationships. Backup agents must be explicitly marked and cannot submit while the primary agent is active unless authorized activation is recorded.

Reassignment must record previous/new assignment, reason, authorizer and effective time. Historical submissions remain attributed to the original submitter.

## 9. Geography management

Treat existing geography as canonical. Provide searchable tree, tile and map views. Show IDs/codes, parent relationships, coverage, zone and Federal Constituency mappings, assigned agents and record completeness.

Canonical corrections require proposal, current/new value, reason, supporting document, approval status and immutable revision history. Do not permit casual ID changes or silent overwrite.

Senatorial zone and House constituency membership must be derived from canonical LGA mappings and synchronized with all completed dashboards.

## 10. Controlled imports

Support CSV, Excel or JSON imports for authorized workflows with:

1. downloadable template;
2. file validation;
3. preview;
4. column/type checking;
5. duplicate and parent-relationship checks;
6. proposed additions/corrections/conflicts;
7. explicit confirmation and required approvals;
8. atomic commit or safe partial rejection policy;
9. detailed import report;
10. audit record.

Invalid rows must not enter silently.

## 11. Election management

Election statuses:

- Draft
- Configured
- Ready
- Reporting Open
- Reporting Paused
- Collation in Progress
- Reporting Closed
- Results Locked
- Archived

Authorized users may configure election date/window, applicable geography, forms/evidence requirements, parties/candidates, verification rules, simulation settings and visibility. Election type cannot change after submissions begin.

Before closing/locking, show awaiting PUs, unresolved disputes, flagged submissions and missing evidence. Locking prevents ordinary amendment.

## 12. Parties and candidates

Party records: name, abbreviation, official logo, dashboard colour, status, elections, candidates and audit history. Prevent duplicates.

Candidate records: exact name, photograph where authorized, party, election, contest scope, Senatorial zone or Federal Constituency where applicable, display order, verification status and data classification.

Candidate statuses include Draft, Pending Verification, Verified, Simulated Prototype, Suspended, Withdrawn and Archived. Simulated candidates must always display **SIMULATED PROTOTYPE CANDIDATE**.

Never allow candidates to leak between election types, Senatorial zones or House constituencies.

## 13. Submission review

Provide filters by election, zone, constituency, LGA, Ward, PU, agent, time, election status and verification status.

Each submission detail must preserve:

- immutable submission reference and original version;
- election/geographic context;
- agent identity;
- device and synchronization metadata;
- submission time;
- election status;
- candidate votes and accreditation values;
- uploaded EC8A/EC40G or applicable form;
- E-Form;
- pictures/video;
- duplicate copy;
- validation findings;
- review, dispute and amendment history.

## 14. Evidence review

Authorized reviewers may zoom/rotate images, play video, compare original/duplicate forms with E-Form figures, flag unreadable evidence and record comments. Original files must be immutable and content-addressed/checksummed. Viewing or downloading sensitive evidence must be audited.

## 15. Automated deterministic validation

Before human review check:

- required fields and files;
- numeric/non-negative votes;
- arithmetic consistency;
- valid votes versus accreditation;
- accreditation versus registered voters;
- agent-to-PU assignment;
- duplicate submissions;
- timestamp/reporting window;
- content checksums;
- scope relationships.

Automated checks flag; they do not alter or finally adjudicate records.

Verification statuses:

- Awaiting Submission
- Submitted
- Pending Review
- Verified
- Flagged
- Disputed
- Correction Requested
- Rejected

## 16. Amendments and disputes

Never overwrite original values. Every amendment creates a new version linked to the original with changed fields, reason, evidence, requester, approver and timestamps. Preserve the full chain.

Provide dispute creation, assignment, review notes, evidence comparison, escalation, decision and closure. Verified-result amendment requires two-person approval.

## 17. Advisory AI/Codex-style agents

Integrate specialized OpenAI-powered administrative agents as advisory services; use Codex to develop and test them, but do not embed a personal Codex desktop session as the production runtime.

Agents:

1. **Submission Validation Agent** — explains arithmetic, completeness, scope and duplicate issues.
2. **Evidence Review Agent** — assists OCR/comparison and evidence-quality review.
3. **Election Integrity Agent** — detects anomalous access, reporting and result patterns.
4. **Geography and Assignment Agent** — finds hierarchy and assignment conflicts.
5. **Situation Room Intelligence Agent** — answers permission-scoped operational questions.
6. **Audit and Compliance Agent** — prepares audit/activity summaries.
7. **Backup Verification Agent** — checks backup completeness and recoverability.

Every recommendation must show conclusion, reasons, supporting record references, confidence, limitations, proposed action and required human approver.

AI must not independently edit votes, verify/reject final results, delete evidence, suspend/reassign users, change candidates/geography, open/close/lock elections, restore backups or delete audit records.

Protect agents against malicious instructions embedded in uploaded documents. Apply tool allowlists, least privilege, permission-scoped retrieval, structured outputs, rate/cost limits, redaction and complete AI action logs. The core election workflow must function when AI is unavailable.

## 18. Technical incident and continuity plan

Implement/administer operational states:

- Normal
- Degraded
- Offline Queue
- Read-only
- Recovery

Offline-first submissions must be encrypted locally, uniquely identified and idempotently synchronized later. Clearly display saved/synchronized/conflict state.

Production planning must include multiple connectivity options, power redundancy, spare devices, primary and standby application services, replicated database, separate evidence storage, health monitoring, point-in-time recovery, protected offline backups and tested restoration.

Device replacement must revoke the compromised session, verify/reassign safely and preserve earlier submissions. Conflicts preserve all versions for review.

AI outages must not stop submission, collation, dashboards or human review.

## 19. Incident management

Provide severity levels:

- P0 Critical: statewide reporting/security/data-integrity outage
- P1 High: major LGA/multi-user impact
- P2 Medium: isolated workflow degradation
- P3 Low: cosmetic/non-blocking issue

Track incident reference, detection time, reporter, affected scope, severity, owner, status, containment, workaround, recovery, evidence, timeline and post-incident review.

Use tiered support: field/agent support, LGA support, State technical team, platform/cloud/security engineering. Maintain an offline contact tree and tested runbooks.

## 20. Audit logs

Audit authentication, role/user changes, assignments, geography/candidate/election configuration, submissions, evidence access, reviews, amendments, disputes, simulation controls, exports, backups, restores, AI recommendations and approvals.

Each event includes actor, role, action, affected record, old/new values where applicable, reason, time, session/device and outcome. Logs must be searchable, exportable by authorization, tamper-evident and read-only in the normal UI.

## 21. Alerts

Alert on repeated failed logins, suspicious devices, cross-scope access, duplicate/conflicting submissions, unusual result changes, excessive evidence downloads, unauthorized unlock attempts, failed imports, backup failures and stalled reporting. Prototype alerts must be labelled simulated unless produced by real activity.

## 22. Backup and recovery

Backups cover users, roles, geography, election configuration, candidates, submissions/versions, evidence references, reviews/disputes, notifications, audit logs and configuration.

Support full, incremental, configuration-only, election-specific, evidence-index, pre-election and final-archive checkpoints. Production backups must be encrypted, access-controlled and include protected offline/immutable copies.

Restore requires integrity validation, impact preview, reason, two-person approval, pre-restore safety backup, restoration validation and complete audit history.

## 23. Export controls

Authorized exports include agent assignments, geography, reporting summaries, verification/dispute reports, evidence indexes and audit records. Record export reference, requester, time, filters, row count, classification and approval. Apply least data necessary and role-based download controls.

## 24. Premium global-standard UI/UX, typography and accessibility

The Admin section must have an exceptionally polished, premium interface comparable to a modern global enterprise technology, cybersecurity operations and election-intelligence platform. It must not look like a generic template, unfinished prototype, ordinary CRUD panel or collection of disconnected tables.

Before implementation, audit the existing THE EYES visual language and define a coherent Admin design system that extends it without restyling or regressing the completed election modules.

Required design qualities:

- sophisticated, trustworthy and operationally serious visual identity;
- clean dark technology theme consistent with THE EYES;
- disciplined use of blue, teal, neutral and status colours;
- clear information hierarchy and calm visual density;
- premium cards, tables, filters, maps, charts, modals, drawers, alerts and empty states;
- consistent spacing, border radii, shadows, dividers and interaction states;
- subtle purposeful motion and transitions without distracting animation;
- no emojis, novelty graphics, excessive gradients or decorative clutter;
- professional outline SVG icons from the existing icon system or a single coherent library;
- no external icon/image URLs that create an election-day dependency.

Typography must use a deliberate scale for display headings, page titles, section titles, body text, labels, captions, table content and numerical metrics. Use a professional highly legible font stack, consistent weights, proper line height, tabular numerals for election figures and clear contrast. Long names, IDs and geographical labels must wrap or truncate safely with accessible full-value viewing.

Dashboard composition must provide:

- premium top navigation and role identity;
- elegant collapsible sidebar with active, hover and focus states;
- high-quality KPI cards with icons, trends and precise labels;
- responsive operational charts and maps;
- professional data tables with sticky headers where useful;
- powerful search, filter and saved-view patterns;
- clear status chips and risk severity indicators;
- well-designed review workspaces for evidence comparison;
- structured AI recommendation cards showing evidence, confidence and human approval controls;
- skeleton loading states, error recovery, empty states and success confirmations;
- confirmation patterns proportionate to action risk;
- breadcrumbs and Back navigation that preserve user context.

Do not prioritize beauty over truth, readability, accessibility or operational speed. Dense data must remain understandable during election pressure. Destructive and sensitive actions must be visually distinct and never triggered by ambiguous controls.

Verify desktop, laptop, tablet and Android widths. Ensure readable cards/tables, responsive charts/maps, minimum touch targets, keyboard access, visible focus, accessible names, screen-reader semantics, non-colour status indicators, sufficient contrast, reduced-motion support, pagination/virtualization for large datasets and no page-level horizontal overflow.

Perform visual browser QA at each target width. Check typography, alignment, spacing, overflow, modal/drawer behaviour, loading/empty/error states, table usability and touch interaction. Capture or describe representative Admin screens in the completion report. The UI/UX requirement is an acceptance gate: passing tests with a visually generic or inconsistent Admin interface is not sufficient for completion.

## 25. Prototype disclosure

Clearly label functions that are simulated because no production backend, official election service, secure OCR/AI service, remote backup system or operational security infrastructure is connected. Never present mock authentication, alerts, backups, AI conclusions or election results as production-active.

## 26. Mandatory implementation controls

Before editing, audit `AGENTS.md`, all V3 specifications, routes, canonical data, completed election renderers, authentication, storage, tests and build scripts. Report the intended files and regression-protection plan.

Implement Admin as isolated modules. Do not refactor protected election modules unless strictly necessary and backward compatible. Do not replace canonical geography with demo arrays.

## 27. Required testing

Test:

- every role and forbidden permission;
- dependent geography selection;
- duplicate/conflicting assignments;
- user lifecycle and historical preservation;
- election status transitions;
- two-person approval separation;
- candidate scope isolation;
- submission validation;
- evidence access controls;
- immutable version/amendment history;
- dispute workflow;
- AI advisory-only restrictions and unavailable fallback;
- audit completeness;
- imports/exports;
- backup/restore safety workflow;
- session/logout protections;
- responsive/accessibility behaviour;
- Presidential, Senatorial, House and Gubernatorial regressions;
- all election-card routes/icons.

Run syntax checks, the full automated test suite and production build.

## 28. Mandatory browser verification

Use the real application to authenticate as each Admin role and verify visible navigation, allowed actions and denied actions. Exercise one full user registration/assignment, one submission review, one evidence comparison, one flagged/dispute flow, one versioned amendment request, AI recommendation review, audit lookup and backup/restore preview.

Test desktop, tablet and Android. Confirm zero unresolved application console errors. Regression-test every completed Situation Room election hierarchy.

## 29. Final completion report

Report audit findings, exact files changed, architecture, all roles/permissions, canonical counts, implemented workflows, AI boundaries, incident/fallback design, security controls, test/build/browser results, protected-module regressions and all remaining prototype limitations.

Do not claim completion until every acceptance condition has been exercised. Do not convert simulated controls into claims of production readiness.
