import fs from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT ||
  path.resolve(__dirname, "../../serviceAccountKey.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`Missing Firebase service account file: ${serviceAccountPath}`);
  console.error(
    "Create a service account key from Firebase Console and set FIREBASE_SERVICE_ACCOUNT or place it at the project root as serviceAccountKey.json."
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf8")
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const lesson = {
  title: "Lesson 30: QUAND - When?",
  category: "Question Words",
  content: "Learn to ask when someone works, arrives, or leaves.",
  order: 30,
};

const lessonDetail = {
  lessonId: "lesson-30",
  summary: "Learn common questions using quand (when).",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-251", french: "Quand ?", ipa: "/kɑ̃/", english: "When?", order: 241 },
  { id: "vocab-252", french: "Tu travailles quand ?", ipa: "/ty tʁa.vaj kɑ̃/", english: "When do you work?", order: 242 },
  { id: "vocab-253", french: "Tu arrives quand ?", ipa: "/ty a.ʁiv kɑ̃/", english: "When are you arriving?", order: 243 },
  { id: "vocab-254", french: "Tu pars quand ?", ipa: "/ty paʁ kɑ̃/", english: "When are you leaving?", order: 244 },
  { id: "vocab-255", french: "Quand est-ce que tu travailles ?", ipa: "/kɑ̃ ɛs kə ty tʁa.vaj/", english: "When do you work?", order: 245 },
];

async function seedLessonThirty() {
  await db.collection("lessons").doc("lesson-30").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-30").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-30",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 30 seed completed via Firebase Admin SDK.");
}

seedLessonThirty().catch((error) => {
  console.error("Failed to seed lesson 30:", error);
  process.exitCode = 1;
});