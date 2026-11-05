THE EYES Super Admin Dashboard — Dropdown Fix

File to upload/replace:
super-admin-dashboard.html

This revision:
- Normalizes document IDs and imported code fields when populating dropdowns.
- Uses stateCode/parentCode consistently for LGA filtering.
- Adds actionable messages when LGAs, wards, or polling units are missing.
- Preserves existing dashboard pages and Firebase project configuration (election-8e790).

Important:
The dropdowns can only display records that exist in Firestore. Import States first, then LGAs, Wards, and actual individual Polling Units through Geographical Administration. The previously supplied Zamfara data contains expected polling-unit counts, not actual individual polling-unit records, so PU options will remain empty until actual PU records are imported.
