# Verification checklist — fixed election catalog / party assignment

- [ ] Confirm Firebase Authentication Email/Password is enabled in `election-8e790`.
- [ ] Confirm Super Admin UID has `users/{uid}.role = super_admin` and active status.
- [ ] Confirm the application displays all 36 states plus FCT without requiring `geographyStates` records.
- [ ] Confirm existing canonical LGA, Ward and Polling Unit records remain selectable using their parent IDs.
- [ ] Confirm `geographySenatorialZones` and `geographyFederalConstituencies` contain verified nationwide records and matching `stateCode` values.
- [ ] Confirm Presidential produces one national contest identifier.
- [ ] Confirm Gubernatorial contest identifier changes by state.
- [ ] Confirm Senatorial contest identifier changes by state and district.
- [ ] Confirm House contest identifier changes by state and federal constituency.
- [ ] Confirm no Actual Election or Candidate creation is required or shown in the agent workflow.
- [ ] Register two agents for the same contest with different party names; confirm both profiles save separately.
- [ ] Confirm both `users/{uid}` and `electionAgents/{uid}` store the same `contestId`, `electionType`, `partyName`, `assignmentMode: contest_party`, and geography.
- [ ] Sign in as each test agent and confirm assigned contest and party appear in the profile.
- [ ] Submit a polling-unit report, backup request and vote-buying alert; verify each stores the assigned contest, party and geography.
- [ ] Attempt a forged report using another contest, party or geography; Firestore must reject it.
- [ ] Reassign legacy agents before requiring them to submit under the new rules.
- [ ] Test the dashboard at mobile and desktop widths.
