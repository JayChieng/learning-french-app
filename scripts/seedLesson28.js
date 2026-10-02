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
  title: "Lesson 28: QUOI - What?",
  category: "Question Words",
  content: "Learn to ask what someone is doing, liking, watching, or wanting.",
  order: 28,
};

const lessonDetail = {
  lessonId: "lesson-28",
  summary: "Learn common questions using quoi (what).",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-241", french: "Quoi ?", ipa: "/kwa/", english: "What?", order: 231 },
  { id: "vocab-242", french: "Tu fais quoi ?", ipa: "/ty fɛ kwa/", english: "What are you doing?", order: 232 },
  { id: "vocab-243", french: "Tu aimes quoi ?", ipa: "/ty ɛm kwa/", english: "What do you like?", order: 233 },
  { id: "vocab-244", french: "Tu regardes quoi ?", ipa: "/ty ʁə.ɡaʁd kwa/", english: "What are you watching?", order: 234 },
  { id: "vocab-245", french: "Tu veux quoi ?", ipa: "/ty vø kwa/", english: "What do you want?", order: 235 },
];

async function seedLessonTwentyEight() {
  await db.collection("lessons").doc("lesson-28").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-28").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-28",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 28 seed completed via Firebase Admin SDK.");
}

seedLessonTwentyEight().catch((error) => {
  console.error("Failed to seed lesson 28:", error);
  process.exitCode = 1;
});