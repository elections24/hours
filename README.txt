THE EYES — Geography Master System (UPDATED WITH YOUR WORKBOOK)

This ZIP now includes the Zamfara geography records from the Excel workbook you uploaded.

CONTENTS
- geographical.html — Super Admin Firebase importer and State → LGA → Ward → Polling Unit cascade test.
- geographical-upload-template.xlsx — importer-compatible workbook populated with Zamfara States/LGAs/Wards.
- geographical-master-data.json — structured master data and data-quality notes.
- geographical-data.json — Firestore collection schema.
- EYES_V3_Zamfara_Consolidated_LGAs_Wards_Master_UPDATED_Zurmi-1.xlsx — your original workbook retained unchanged.
- FIRESTORE_RULES_ADDON.txt — geographical security rules add-on.
- DATA_VALIDATION_REPORT.txt — source data findings and limitations.

CURRENT DATA FROM YOUR WORKBOOK
- 1 State: Zamfara
- 15 LGA summary rows (source includes Kaura and Kaura Namoda with the same source LGA code 036008)
- 147 named ward records in Geographical Data
- 151 rows in Ward PU Counts (discrepancy with the 147 named wards)
- 0 individual polling unit records. PU numbers/counts are estimates or expected counts, not individual PU names/codes.

IMPORTANT DATA INTEGRITY NOTES
1) The source workbook assigns LGA code 036008 to both Kaura and Kaura Namoda. The normalized upload workbook uses distinct generated internal IDs for these LGA records and retains 036008 in source/officialCode fields. Please verify which source code/name is correct before treating it as an official code.
2) Many source ward codes repeat for multiple ward names inside an LGA (e.g. 036001001). To avoid Firestore document ID collisions, normalized records use generated internal ward IDs such as NG-ZA-ANKA-W001. Original source ward code is retained separately. These generated IDs are internal only, not official INEC codes.
3) The uploaded workbook's own Read Me says the codes are proposed internal numeric codes and NOT verified official INEC codes. The normalized data remains verificationStatus='pending'.
4) Polling-unit counts/placeholders are preserved as counts only. No individual polling unit documents are fabricated.
5) The import interface currently checks users/{uid}.role='super_admin' and active=true. Firestore rules must enforce Super Admin-only writes too. Do not place service-account private keys in HTML.
6) Import States first, then LGAs, then Wards. Importing Polling Units must wait until you provide actual PU names/codes.
7) Before using this data for live election registration, reconcile the duplicate/missing code issues against your official source.

LATER UPDATES
Send me this ZIP or your updated Excel workbook with new data. I will merge new records into the master while preserving existing records, and return an updated ZIP. If a later file corrects an existing record, I will identify the correction rather than silently overwriting the history.
