BOTAS PHOTO — TWO-FIREBASE PROJECT SETUP
========================================

WHAT THIS PACKAGE CHANGES
-------------------------
1. The dashboard signs Super Admin in through Firebase project backup-f52ef.
2. Agent Authentication accounts and the users/electionAgents/candidates documents are stored in backup-f52ef.
3. The six existing geography collections remain in election-8e790:
   - geographyStates
   - geographySenatorialZones
   - geographyFederalConstituencies
   - geographyLGAs
   - geographyWards
   - geographyPollingUnits
4. The dashboard reads and manages those geography collections through a callable Cloud Function. The function checks the signed-in backup-f52ef user's users/{uid} profile and requires role=super_admin and an active account.
5. The function uses its server-side service identity to access election-8e790. No service-account private key is placed in the HTML or ZIP.

IMPORTANT: THE BACKEND IS SOURCE CODE, NOT A DEPLOYED SERVICE
-------------------------------------------------------------
I cannot sign in to your Google/Firebase projects or deploy cloud resources from this chat. The bridge must be deployed by you (or your Firebase administrator) before geography features can work in the updated dashboard. Until deployment and IAM setup are complete, geography calls will return a function/network error. Authentication and ordinary application records already point to backup-f52ef.

PART A — GIVE THE BACKUP PROJECT FUNCTION IDENTITY ACCESS TO THE OLD GEOGRAPHY PROJECT
--------------------------------------------------------------------------------------
1. Open Google Cloud Console and select project election-8e790:
   https://console.cloud.google.com/iam-admin/iam?project=election-8e790
2. In a separate tab, select backup-f52ef and open:
   https://console.cloud.google.com/iam-admin/iam?project=backup-f52ef
3. Identify the runtime service account used by Cloud Functions in backup-f52ef. For the default Compute Engine service account it is:
   BACKUP_PROJECT_NUMBER-compute@developer.gserviceaccount.com
   Find the actual project number in Google Cloud Console → project selector / Project settings. Do not guess the number.
4. In election-8e790 → IAM → Grant access, add that exact service-account email as a principal and grant the role:
   Cloud Datastore User (roles/datastore.user)
5. Save. This role lets the backend use Firestore in the old project. It does not expose the old database to browser clients.
6. Ensure the Cloud Firestore API is enabled in election-8e790.

PART B — DEPLOY THE FUNCTION INTO backup-f52ef
------------------------------------------------
Prerequisites: Node.js 20+, Firebase CLI, and a Google account that has permission to deploy Functions in backup-f52ef.

1. Extract this ZIP on a computer with Node.js/Firebase CLI. The Firebase CLI deployment is much easier on a computer than an Android phone.
2. Open a terminal in the extracted folder (the folder containing firebase.json).
3. Run:
   npm install -g firebase-tools
   firebase login
   firebase use --add
   Select backup-f52ef and give it the alias backup.
   cd functions
   npm install
   cd ..
   firebase deploy --only functions:geographyBridge --project backup-f52ef
4. If Google asks to enable required APIs or create a service account, review and approve the Firebase/Google Cloud deployment prompts.
5. Confirm the deployed function is named geographyBridge and its region is us-central1.

PART C — FIRESTORE RULES IN backup-f52ef
----------------------------------------
The dashboard requires the signed-in Super Admin to read their own users/{uid} profile. Super Admin also needs read/write access to users, electionAgents, and candidates. Agents need to read their own profile records. Merge rules equivalent to the following into your EXISTING backup-f52ef rules; do not blindly replace rules for other collections used by your app:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() { return request.auth != null; }
    function isSelf(uid) { return signedIn() && request.auth.uid == uid; }
    function isSuperAdmin() {
      return signedIn()
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'super_admin'
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.active == true
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.status == 'active';
    }

    match /users/{uid} {
      allow get: if isSelf(uid) || isSuperAdmin();
      allow list: if isSuperAdmin();
      allow create, update, delete: if isSuperAdmin();
    }
    match /electionAgents/{uid} {
      allow get: if isSelf(uid) || isSuperAdmin();
      allow list: if isSuperAdmin();
      allow create, update, delete: if isSuperAdmin();
    }
    match /candidates/{candidateId} {
      allow read, write: if isSuperAdmin();
    }
  }
}

This is a starting rules block for the collections used by this dashboard, not a complete ruleset for any other app collections. Preserve and merge your other required matches. Test rules in the Firebase Rules Playground before production use.

PART D — TEST IN THIS ORDER
---------------------------
1. Confirm the Auth user sup@gmail.com exists in backup-f52ef.
2. Confirm backup-f52ef / users / DveBULc8niWQSERWoSHb4eCWIFk1 has:
   uid = DveBULc8niWQSERWoSHb4eCWIFk1
   email = sup@gmail.com
   role = super_admin
   active = true (boolean)
   status = active
3. Deploy the geographyBridge function and grant the cross-project IAM role first.
4. Upload super-admin-dashboard.html to your hosting location and open it.
5. Sign in with the backup-f52ef account.
6. Test dashboard/agent/candidate reads before creating a test agent.
7. Test geography read first. Only after confirming reads, test a harmless geography edit/create if needed.
8. Do not delete, migrate, or overwrite any old geography documents as part of this setup.

ROLLBACK
--------
Keep your original HTML backup and the old Super Admin account. If the updated dashboard has a problem, restore the old HTML file. This package does not delete or migrate any Firestore data.

SECURITY NOTES
--------------
- Never put a service-account JSON/private key in the HTML, GitHub Pages, or this ZIP.
- Firebase web config is client configuration, not a service-account secret.
- The callable bridge authorizes only active Super Admin profiles in backup-f52ef and allowlists the six geography collections.
- This bridge is for this dashboard's Super Admin geography administration. It does not automatically authenticate agents in the old project or migrate any other app's authentication.
- The agent account creation flow remains client-side in this dashboard and should later be moved to a protected callable function/Admin SDK before wide public production use.
