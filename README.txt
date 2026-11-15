THE EYES Super Admin Dashboard — Geography Forms Cleanup

Replace your existing super-admin-dashboard.html with the HTML in this ZIP.

The Geographical Administration page contains only four separate record-creation forms:
1) Create State / FCT — paste state names; no parent selector.
2) Create Local Government Areas — select State, then paste LGA names.
3) Create Wards — select State, select LGA, then paste ward names.
4) Create Polling Units — select State, select LGA, select Ward, then paste polling-unit names.

The old “Geography setup order” overview container and generic “Create geographical records” combined form are not present in this HTML.

Codes are simple serials (001, 002, 003...) within each parent scope. The dashboard retains the existing records table and other portal sections.

Back up the current HTML before replacing it. Test with a small number of records first. This file has not been verified against live Firestore.
