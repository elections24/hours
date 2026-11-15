# THE EYES V3 — Fixed Election Catalog + Party-Specific Agent Assignment

Firebase project: **election-8e790**

## What changed

- Election categories are fixed in the application: Presidential, Gubernatorial, Senatorial and House of Representatives.
- The 36 Nigerian states plus FCT are bundled in the application; the agent form no longer requires an administrator to create State records first.
- Presidential contest is national. Gubernatorial contest is derived from the selected state. Senatorial contest is derived from the selected state and Senatorial District. House contest is derived from the selected state and Federal Constituency.
- There is no Actual Election creation workflow and no Candidate registration or Candidate dropdown.
- Political party is entered directly on each agent assignment. Multiple agents may be registered for the same contest with different party names.
- Agent registration now separates **Contest Assignment** from **Physical Geographical Coverage**. Contest Assignment is selected first (election type, contest state, Senatorial District or Federal Constituency). Physical Coverage is selected later from the existing Firestore State → LGA → Ward → Polling Unit collections.
- For Gubernatorial, Senatorial and House contests, the coverage state is automatically fixed to the contest state. For Presidential, the contest is nationwide and the administrator chooses any coverage state.
- For Senatorial and House contests, the LGA list is filtered using each LGA record's `senatorialZoneCode` or `federalConstituencyCode` mapping.
- The agent's election contest, party and geographical assignment are stamped onto polling-unit reports, backup requests and vote-buying alerts.
- Firestore rules enforce that a report's contest, party and geography match the authenticated agent's assignment.

## Important geographical-data requirement

The state names and election categories are hardcoded. Senatorial District and Federal Constituency dropdowns read the existing canonical Firestore collections:

- `geographySenatorialZones`
- `geographyFederalConstituencies`

The separate physical coverage dropdowns use:

- `geographyLGAs`
- `geographyWards`
- `geographyPollingUnits`

Those collections must already contain the authoritative records and matching parent codes. In particular, LGA records used for Senatorial and House filtering must include the correct `senatorialZoneCode` and `federalConstituencyCode` values, matching the district/constituency document IDs or codes. This package does **not** invent or fabricate the 109 Senatorial Districts or 360 Federal Constituencies. The existing workbook in this project is a Zamfara source workbook/template and is not a verified nationwide electoral-boundary dataset. If nationwide district/constituency collections are not already populated in Firebase, they must be loaded from a verified canonical national dataset before those dropdowns can show all options.

## Files to upload

Upload the files in this ZIP to the same GitHub Pages repository/root, replacing the matching files:

- `index.html`
- `super-admin-dashboard.html`
- `polling-unit-agent.html`
- `super-admin-login.html`
- `agent-registration.html`
- `geographical.html`
- `firestore.rules` (copy its contents into Firebase Console; GitHub upload does not deploy rules)

Other reference/specification files can remain in the repository.

## Firebase deployment

1. Back up the current Firestore rules.
2. Review `firestore.rules` and merge any unrelated permissions your project still needs.
3. Publish the updated rules in Firebase Console → Firestore Database → Rules.
4. Do not assume GitHub Pages deploys Firestore rules; it does not.
5. Test a new agent in each election category. Confirm contest selection is completed before role/account setup and physical coverage is a separate final section. For Presidential, test coverage in a selected state; for Gubernatorial, confirm coverage state is fixed; for Senatorial and House, confirm the LGA list filters to the selected district/constituency. Also register two agents for the same contest with different party names.
6. Submit each report type and confirm the saved documents carry the assigned contest ID, party name and geography.

## Existing agents

Agents created under the previous candidate/party-specific schema will not automatically have `contestId`, `partyName`, or `assignmentMode: contest_party`. Reassign or migrate those profiles before expecting them to submit reports under the new rules.

## Security note

Agent account creation still uses a secondary Firebase Auth instance in the browser. For production-grade deployment, migrate account creation to a trusted Cloud Function/Admin SDK endpoint. The Firebase web configuration is public by design; Firestore Security Rules and trusted backend controls are the security boundary.
