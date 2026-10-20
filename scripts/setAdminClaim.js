import fs from 'node:fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const [, , uid, rawRole] = process.argv;

if (!uid) {
  console.error(
    'Usage: node scripts/setAdminClaim.js <uid> [admin|super_admin|user]'
  );
  process.exit(1);
}

const role = rawRole || 'admin';
const allowedRoles = ['admin', 'super_admin', 'user'];

if (!allowedRoles.includes(role)) {
  console.error(
    `Invalid role "${role}". Use one of: ${allowedRoles.join(', ')}`
  );
  process.exit(1);
}

const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT ||
  './serviceAccountKey.json';

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, 'utf8')
);

initializeApp({
  credential: cert(serviceAccount),
});

const claims = {
  role,
  admin: role === 'admin' || role === 'super_admin',
};

getAuth()
  .setCustomUserClaims(uid, claims)
  .then(() => {
    return getFirestore().collection('users').doc(uid).get();
  })
  .then((profile) => {
    if (profile.exists) {
      return profile.ref.update({ role });
    }
    return undefined;
  })
  .then(() => {
    console.log(`Role claim set to ${role} for ${uid}`);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });