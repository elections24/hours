THE EYES V3 — Firebase login and agent account creation

Included files:
- index.html: existing ordinary-agent login, eye logo preserved; seven consecutive double-clicks on the logo opens super-admin-login.html.
- super-admin-login.html: Firebase login and Firestore role verification (role must be super_admin).
- agent-registration.html: Super Admin-only agent account creation.
- polling-unit-agent.html: your supplied dashboard with THE EYES Firebase configuration inserted; demo fallback disabled.
- firestore.rules: starter Firestore rules.
- README_SETUP.txt: setup instructions.

Firebase Authentication / Firestore initial setup:
1. Firebase Console → Authentication → Sign-in method → enable Email/Password.
2. Create Super Admin account in Firebase Authentication manually.
3. Firestore: create users/{SuperAdminAuthUID}; fields: fullName, username, email, role="super_admin", active=true, status="active".
4. Review and deploy firestore.rules in Firestore Rules. Ensure the existing reporting collection schema and permissions are compatible before deploying.
5. Upload these files to the same GitHub Pages repository folder.
6. Visit index.html, double-click the existing eye logo seven times consecutively, then authenticate at super-admin-login.html.
7. Create agents at agent-registration.html. They can sign in through index.html using their email and username.

Agent profile uses the polling-unit-agent dashboard's fields: fullName, username, email, role, state, lga, ward, pollingUnit/pollingUnitName, pollingUnitCode, dashboardUrl, active, status.

Only polling-unit-agent.html is included as an agent dashboard. Ward/LGA/district dashboard HTML files must be added before using those dashboard paths. Geographic assignments are text inputs intentionally; only verified imported geographic data should be treated as official.

Security notes:
- Firebase web config is client-side; never place Firebase Admin SDK service-account credentials in HTML.
- Registration verifies the signed-in Super Admin via Firestore. Firestore rules must enforce permissions too.
- Account creation uses a secondary Firebase app to keep the Super Admin session intact. If Auth creation succeeds but Firestore profile write fails, check Firebase Console Auth and Firestore before retrying.
- The included rules are a starter template; inspect report collection names and field requirements for your live application before production use.
