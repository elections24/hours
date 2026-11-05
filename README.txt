THE EYES Super Admin Dashboard - Geography Administration update

Replace your existing super-admin-dashboard.html with the included file.

Added:
- Geography creation directly in Super Admin Dashboard (no external Excel importer).
- Bulk paste records, one name per line.
- State, LGA, Ward, Polling Unit, Senatorial Zone and Federal Constituency creation.
- Automatic internal IDs and parent links.
- Senatorial zones are per-state records (e.g. Kwara North/Central/South) and are not hardcoded across all states.
- LGAs can be linked to a selected state and optionally a senatorial zone or federal constituency.
- Existing Firestore collections retained.

Important:
- This writes to the active Firebase project configured in the dashboard (election-8e790).
- Existing Firestore rules must allow active Super Admin create/write operations to the geography collections.
- Codes are internal system codes, not official INEC codes.
- Senatorial-zone coverage requires assigning the relevant LGAs to the zone when creating/updating LGAs. This release supports zone selection when adding an LGA; it does not bulk reassign previously existing LGAs.
- Test with a small number of records before bulk entry.
