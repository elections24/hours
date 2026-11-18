const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { initializeApp, getApps } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

// The default Admin app runs in backup-f52ef (where callable auth is verified).
const backupApp = getApps().find(a => a.name === '[DEFAULT]') || initializeApp();
const backupDb = getFirestore(backupApp);

// The backup-f52ef Functions runtime service account must be granted
// roles/datastore.user in the election-8e790 project.
const geoApp = getApps().find(a => a.name === 'election-geography') || initializeApp(
  { projectId: 'election-8e790' },
  'election-geography'
);
const geoDb = getFirestore(geoApp);

const ALLOWED = new Set([
  'geographyStates',
  'geographySenatorialZones',
  'geographyFederalConstituencies',
  'geographyLGAs',
  'geographyWards',
  'geographyPollingUnits'
]);

function cleanData(value) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new HttpsError('invalid-argument', 'Invalid numeric value.');
    return value;
  }
  if (Array.isArray(value)) return value.map(cleanData);
  if (typeof value === 'object') {
    const out = {};
    for (const [key, item] of Object.entries(value)) {
      if (key.startsWith('__') || key === 'createdBy' || key === 'createdAt' || key === 'updatedAt') continue;
      out[key] = cleanData(item);
    }
    return out;
  }
  throw new HttpsError('invalid-argument', 'Unsupported geography field value.');
}

function plain(value) {
  if (value === null || value === undefined) return value ?? null;
  if (value && typeof value.toDate === 'function') return value.toDate().toISOString();
  if (Array.isArray(value)) return value.map(plain);
  if (typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, plain(v)]));
  return value;
}

exports.geographyBridge = onCall({ region: 'us-central1', maxInstances: 10 }, async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Please sign in again.');
  const uid = request.auth.uid;
  const profileSnap = await backupDb.collection('users').doc(uid).get();
  const profile = profileSnap.exists ? profileSnap.data() : null;
  if (!profile || profile.role !== 'super_admin' || profile.active === false || profile.status === 'disabled') {
    throw new HttpsError('permission-denied', 'An active Super Admin account is required.');
  }

  const { action, collection, id } = request.data || {};
  if (!ALLOWED.has(collection)) throw new HttpsError('invalid-argument', 'Geography collection is not allowed.');
  const col = geoDb.collection(collection);

  if (action === 'list') {
    const snap = await col.get();
    if (snap.size > 10000) throw new HttpsError('resource-exhausted', 'This collection is too large for this dashboard list operation. Use a filtered query endpoint.');
    return snap.docs.map(d => ({ id: d.id, ...plain(d.data()) }));
  }

  if (typeof id !== 'string' || !id.trim() || id.length > 300 || /[\/]/.test(id)) {
    throw new HttpsError('invalid-argument', 'A valid geography document ID is required.');
  }
  const ref = col.doc(id);

  if (action === 'get') {
    const snap = await ref.get();
    return snap.exists ? { id: snap.id, ...plain(snap.data()) } : null;
  }

  if (action === 'create') {
    const data = cleanData(request.data.data || {});
    const bytes = Buffer.byteLength(JSON.stringify(data), 'utf8');
    if (bytes > 700000) throw new HttpsError('invalid-argument', 'Geography record is too large.');
    await backupDb.runTransaction(async tx => {
      const existing = await tx.get(ref);
      if (existing.exists) throw new HttpsError('already-exists', 'This geography record ID already exists.');
      tx.create(ref, { ...data, createdBy: uid, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
    });
    return { ok: true, id };
  }

  if (action === 'update') {
    const data = cleanData(request.data.data || {});
    if (Object.keys(data).length !== 1 || typeof data.name !== 'string' || !data.name.trim()) {
      throw new HttpsError('invalid-argument', 'Only a non-empty record name can be edited through this dashboard.');
    }
    await ref.update({ name: data.name.trim(), updatedAt: FieldValue.serverTimestamp() });
    return { ok: true, id };
  }

  if (action === 'delete') {
    await ref.delete();
    return { ok: true, id };
  }

  throw new HttpsError('invalid-argument', 'Unknown geography action.');
});
