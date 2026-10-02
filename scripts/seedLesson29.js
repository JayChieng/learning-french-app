import fs from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT ||
  path.resolve(__dirname, "../serviceAccountKey.json");

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
  title: "Lesson 29: OÙ - Where?",
  category: "Question Words",
  content: "Learn to ask where someone lives, goes, or works.",
  order: 29,
};

const lessonDetail = {
  lessonId: "lesson-29",
  summary: "Learn common questions using où (where).",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-246", french: "Où ?", ipa: "/u/", english: "Where?", order: 236 },
  { id: "vocab-247", french: "Tu habites où ?", ipa: "/ty a.bit u/", english: "Where do you live?", order: 237 },
  { id: "vocab-248", french: "Tu vas où ?", ipa: "/ty va u/", english: "Where are you going?", order: 238 },
  { id: "vocab-249", french: "Tu travailles où ?", ipa: "/ty tʁa.vaj u/", english: "Where do you work?", order: 239 },
  { id: "vocab-250", french: "Où est le restaurant ?", ipa: "/u ɛ lə ʁɛs.tɔ.ʁɑ̃/", english: "Where is the restaurant?", order: 240 },
];

async function seedLessonTwentyNine() {
  await db.collection("lessons").doc("lesson-29").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-29").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-29",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 29 seed completed via Firebase Admin SDK.");
}

seedLessonTwentyNine().catch((error) => {
  console.error("Failed to seed lesson 29:", error);
  process.exitCode = 1;
});