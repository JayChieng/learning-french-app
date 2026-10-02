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
  title: "Lesson 10: The Verb AVOIR",
  category: "Grammar",
  content: "Learn avoir, one of the two most important French verbs.",
  order: 10,
};

const lessonDetail = {
  lessonId: "lesson-10",
  summary: "Learn the present-tense forms of avoir (to have).",
  dialogues: [],
  explanations: [],
};

const words = [
  {
    id: "vocab-94",
    french: "avoir",
    ipa: "/a.vwaʁ/",
    english: "to have",
    order: 84,
  },
  {
    id: "vocab-95",
    french: "J'ai",
    ipa: "/ʒe/",
    english: "I have",
    order: 85,
  },
  {
    id: "vocab-96",
    french: "Tu as",
    ipa: "/ty a/",
    english: "You have",
    order: 86,
  },
  {
    id: "vocab-97",
    french: "Il a",
    ipa: "/il a/",
    english: "He has",
    order: 87,
  },
  {
    id: "vocab-98",
    french: "Elle a",
    ipa: "/ɛl a/",
    english: "She has",
    order: 88,
  },
  {
    id: "vocab-99",
    french: "Nous avons",
    ipa: "/nu.z‿a.vɔ̃/",
    english: "We have",
    order: 89,
  },
  {
    id: "vocab-100",
    french: "Vous avez",
    ipa: "/vu.z‿a.ve/",
    english: "You have",
    order: 90,
  },
  {
    id: "vocab-101",
    french: "Ils ont",
    ipa: "/il.z‿ɔ̃/",
    english: "They have",
    order: 91,
  },
  {
    id: "vocab-102",
    french: "Elles ont",
    ipa: "/ɛl.z‿ɔ̃/",
    english: "They have",
    order: 92,
  },
];

async function seedLessonTen() {
  await db.collection("lessons").doc("lesson-10").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-10").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-10",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 10 seed completed via Firebase Admin SDK.");
}

seedLessonTen().catch((error) => {
  console.error("Failed to seed lesson 10:", error);
  process.exitCode = 1;
});