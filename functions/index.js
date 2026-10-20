import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { HttpsError, onCall } from "firebase-functions/v2/https";

initializeApp();

const auth = getAuth();
const firestore = getFirestore();

export const setAccountDisabled = onCall(async (request) => {
  const callerRole = request.auth?.token.role;
  const isAdmin = callerRole === "admin" || callerRole === "super_admin" || request.auth?.token.admin === true;
  if (!request.auth || !isAdmin) {
    throw new HttpsError("permission-denied", "Only admins can manage member accounts.");
  }

  const callerProfile = await firestore.collection("users").doc(request.auth.uid).get();
  if (callerProfile.get("disabled") === true) {
    throw new HttpsError("permission-denied", "Disabled accounts cannot manage member accounts.");
  }

  const caller = await auth.getUser(request.auth.uid);
  if (caller.disabled) {
    throw new HttpsError("permission-denied", "Disabled accounts cannot manage member accounts.");
  }

  const uid = request.data?.uid;
  const disabled = request.data?.disabled;
  if (typeof uid !== "string" || uid.length === 0 || typeof disabled !== "boolean") {
    throw new HttpsError("invalid-argument", "A member ID and a boolean account status are required.");
  }
  if (uid === request.auth.uid) {
    throw new HttpsError("failed-precondition", "You cannot disable or re-enable your own account.");
  }

  let target;
  try {
    target = await auth.getUser(uid);
  } catch (error) {
    if (error?.code === "auth/user-not-found") {
      throw new HttpsError("not-found", "The member account does not exist.");
    }
    throw new HttpsError("internal", "Could not load the member account.");
  }

  const targetRole = target.customClaims?.role;
  const isSuperAdmin = callerRole === "super_admin";
  if (!isSuperAdmin && (targetRole === "admin" || targetRole === "super_admin" || target.customClaims?.admin === true)) {
    throw new HttpsError("permission-denied", "Only a Super Admin can manage another admin account.");
  }
  if (targetRole === "super_admin") {
    throw new HttpsError("failed-precondition", "Super Admin accounts cannot be disabled from this screen.");
  }

  const profileRef = firestore.collection("users").doc(uid);
  const profileSnapshot = await profileRef.get();
  if (!profileSnapshot.exists) {
    throw new HttpsError("not-found", "The member profile does not exist.");
  }
  const previousDisabled = profileSnapshot.get("disabled") === true;
  await profileRef.set(
    {
      disabled,
      disabledAt: disabled ? FieldValue.serverTimestamp() : FieldValue.delete(),
    },
    { merge: true }
  );

  try {
    await auth.updateUser(uid, { disabled });
    if (disabled) {
      await auth.revokeRefreshTokens(uid);
    }
  } catch (error) {
    await profileRef.set(
      {
        disabled: previousDisabled,
        disabledAt: previousDisabled ? profileSnapshot.get("disabledAt") : FieldValue.delete(),
      },
      { merge: true }
    );
    console.error("Failed to update Firebase Auth account status.", error);
    throw new HttpsError("internal", "Firebase could not update the member account.");
  }

  return { disabled };
});
