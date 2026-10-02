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
  title: "Lesson 4: The verb ÊTRE",
  category: "Grammar",
  content: "Learn the present-tense forms of the French verb être (to be).",
  order: 4,
};

const lessonDetail = {
  lessonId: "lesson-4",
  summary: "Learn how to conjugate être (to be) in the present tense.",
  dialogues: [],
  explanations: [],
};

const words = [
  {
    id: "vocab-46",
    french: "Je suis",
    ipa: "/ʒə sɥi/",
    english: "I am",
    order: 36,
  },
  {
    id: "vocab-47",
    french: "Tu es",
    ipa: "/ty ɛ/",
    english: "You are",
    order: 37,
  },
  {
    id: "vocab-48",
    french: "Il est",
    ipa: "/il ɛ/",
    english: "He is",
    order: 38,
  },
  {
    id: "vocab-49",
    french: "Elle est",
    ipa: "/ɛl ɛ/",
    english: "She is",
    order: 39,
  },
  {
    id: "vocab-50",
    french: "Nous sommes",
    ipa: "/nu sɔm/",
    english: "We are",
    order: 40,
  },
  {
    id: "vocab-51",
    french: "Vous êtes",
    ipa: "/vu zɛt/",
    english: "You are",
    order: 41,
  },
  {
    id: "vocab-52",
    french: "Ils sont",
    ipa: "/il sɔ̃/",
    english: "They are",
    order: 42,
  },
  {
    id: "vocab-53",
    french: "Elles sont",
    ipa: "/ɛl sɔ̃/",
    english: "They are",
    order: 43,
  },
];

async function seedLessonFour() {
  await db.collection("lessons").doc("lesson-4").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-4").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-4",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 4 seed completed via Firebase Admin SDK.");
}

seedLessonFour().catch((error) => {
  console.error("Failed to seed lesson 4:", error);
  process.exitCode = 1;
});