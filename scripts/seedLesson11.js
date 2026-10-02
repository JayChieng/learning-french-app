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
  title: "Lesson 11: Asking Someone's Age",
  category: "Introduce Yourself",
  content: "Ask someone's age and say how old someone is using avoir.",
  order: 11,
};

const lessonDetail = {
  lessonId: "lesson-11",
  summary: "Learn to ask and answer questions about age using avoir.",
  dialogues: [],
  explanations: [],
};

const words = [
  {
    id: "vocab-103",
    french: "Tu as quel âge ?",
    ipa: "/ty a kɛl aʒ/",
    english: "How old are you?",
    order: 93,
  },
  {
    id: "vocab-104",
    french: "J'ai 25 ans.",
    ipa: "/ʒe vɛ̃t sɛ̃k ɑ̃/",
    english: "I am 25 years old.",
    order: 94,
  },
  {
    id: "vocab-105",
    french: "Il a quel âge ?",
    ipa: "/il a kɛl aʒ/",
    english: "How old is he?",
    order: 95,
  },
  {
    id: "vocab-106",
    french: "Il a 30 ans.",
    ipa: "/il a tʁɑ̃t ɑ̃/",
    english: "He is 30 years old.",
    order: 96,
  },
  {
    id: "vocab-107",
    french: "Elle a quel âge ?",
    ipa: "/ɛl a kɛl aʒ/",
    english: "How old is she?",
    order: 97,
  },
  {
    id: "vocab-108",
    french: "Elle a 22 ans.",
    ipa: "/ɛl a vɛ̃t.dø ɑ̃/",
    english: "She is 22 years old.",
    order: 98,
  },
  {
    id: "vocab-109",
    french: "Nous avons quel âge ?",
    ipa: "/nu.z‿a.vɔ̃ kɛl aʒ/",
    english: "How old are we?",
    order: 99,
  },
  {
    id: "vocab-110",
    french: "Nous avons 28 ans.",
    ipa: "/nu.z‿a.vɔ̃ vɛ̃t.ɥit ɑ̃/",
    english: "We are 28 years old.",
    order: 100,
  },
  {
    id: "vocab-111",
    french: "Vous avez quel âge ?",
    ipa: "/vu.z‿a.ve kɛl aʒ/",
    english: "How old are you?",
    order: 101,
  },
  {
    id: "vocab-112",
    french: "Vous avez 40 ans.",
    ipa: "/vu.z‿a.ve ka.ʁɑ̃t ɑ̃/",
    english: "You are 40 years old.",
    order: 102,
  },
  {
    id: "vocab-113",
    french: "Ils ont quel âge ?",
    ipa: "/il.z‿ɔ̃ kɛl aʒ/",
    english: "How old are they?",
    order: 103,
  },
  {
    id: "vocab-114",
    french: "Ils ont 25 ans.",
    ipa: "/il.z‿ɔ̃ vɛ̃t sɛ̃k ɑ̃/",
    english: "They are 25 years old.",
    order: 104,
  },
  {
    id: "vocab-115",
    french: "Elles ont quel âge ?",
    ipa: "/ɛl.z‿ɔ̃ kɛl aʒ/",
    english: "How old are they?",
    order: 105,
  },
  {
    id: "vocab-116",
    french: "Elles ont 23 ans.",
    ipa: "/ɛl.z‿ɔ̃ vɛ̃tʁwa ɑ̃/",
    english: "They are 23 years old.",
    order: 106,
  },
];

async function seedLessonEleven() {
  await db.collection("lessons").doc("lesson-11").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-11").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-11",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 11 seed completed via Firebase Admin SDK.");
}

seedLessonEleven().catch((error) => {
  console.error("Failed to seed lesson 11:", error);
  process.exitCode = 1;
});