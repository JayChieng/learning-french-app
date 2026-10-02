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
  title: "Lesson 33: QUEL / QUELLE - Which / What?",
  category: "Question Words",
  content: "Learn quel and quelle, which agree with the noun and have the same pronunciation.",
  order: 33,
};

const lessonDetail = {
  lessonId: "lesson-33",
  summary: "Learn to ask about age, names, jobs, nationality, and language using quel or quelle.",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-267", french: "quel", ipa: "/kɛl/", english: "which / what? (masculine)", order: 257 },
  { id: "vocab-268", french: "quelle", ipa: "/kɛl/", english: "which / what? (feminine)", order: 258 },
  { id: "vocab-269", french: "Quel âge as-tu ?", ipa: "/kɛl aʒ a.ty/", english: "How old are you?", order: 259 },
  { id: "vocab-270", french: "Tu as quel âge ?", ipa: "/ty a kɛl aʒ/", english: "How old are you?", order: 260 },
  { id: "vocab-271", french: "Quel est ton nom ?", ipa: "/kɛl ɛ tɔ̃ nɔ̃/", english: "What is your name?", order: 261 },
  { id: "vocab-272", french: "Quel est ton travail ?", ipa: "/kɛl ɛ tɔ̃ tʁa.vaj/", english: "What is your job?", order: 262 },
  { id: "vocab-273", french: "Quelle est ta nationalité ?", ipa: "/kɛl ɛ ta na.sjɔ.na.li.te/", english: "What is your nationality?", order: 263 },
  { id: "vocab-274", french: "Quelle est ta langue ?", ipa: "/kɛl ɛ ta lɑ̃ɡ/", english: "What is your language?", order: 264 },
];

async function seedLessonThirtyThree() {
  await db.collection("lessons").doc("lesson-33").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-33").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-33",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 33 seed completed via Firebase Admin SDK.");
}

seedLessonThirtyThree().catch((error) => {
  console.error("Failed to seed lesson 33:", error);
  process.exitCode = 1;
});