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
  title: "Lesson 2: Introduce yourself - Age & Origin",
  category: "Introduce Yourself",
  content:
    "Talk about your age, where you are from, and where you live.",
  order: 2,
};

const lessonDetail = {
  lessonId: "lesson-2",
  summary:
    "Learn how to talk about your age, where you are from, and where you live.",
  dialogues: [],
  explanations: [],
};

const words = [
  {
    id: "vocab-11",
    french: "avoir",
    ipa: "/a.vwaʁ/",
    english: "to have",
    order: 1,
  },
  {
    id: "vocab-12",
    french: "J'ai",
    ipa: "/ʒe/",
    english: "I have",
    order: 2,
  },
  {
    id: "vocab-13",
    french: "ans",
    ipa: "/ɑ̃/",
    english: "years old / years",
    order: 3,
  },
  {
    id: "vocab-14",
    french: "J'ai 28 ans.",
    ipa: "/ʒe vɛ̃tɥit ɑ̃/",
    english: "I'm 28 years old.",
    order: 4,
  },
  {
    id: "vocab-15",
    french: "Tu as quel âge ?",
    ipa: "/ty a kɛl aʒ/",
    english: "How old are you?",
    order: 5,
  },
  {
    id: "vocab-16",
    french: "venir",
    ipa: "/və.niʁ/",
    english: "to come",
    order: 6,
  },
  {
    id: "vocab-17",
    french: "Je viens de...",
    ipa: "/ʒə vjɛ̃ də/",
    english: "I'm from... / I come from...",
    order: 7,
  },
  {
    id: "vocab-18",
    french: "Je viens du Canada.",
    ipa: "/ʒə vjɛ̃ dy ka.na.da/",
    english: "I'm from Canada.",
    order: 8,
  },
  {
    id: "vocab-19",
    french: "Je viens du Vietnam.",
    ipa: "/ʒə vjɛ̃ dy vjɛt.nam/",
    english: "I'm from Vietnam.",
    order: 9,
  },
  {
    id: "vocab-20",
    french: "Tu viens d'où ?",
    ipa: "/ty vjɛ̃ du/",
    english: "Where are you from?",
    order: 10,
  },
  {
    id: "vocab-21",
    french: "habiter",
    ipa: "/a.bi.te/",
    english: "to live",
    order: 11,
  },
  {
    id: "vocab-22",
    french: "J'habite",
    ipa: "/ʒa.bit/",
    english: "I live",
    order: 12,
  },
  {
    id: "vocab-23",
    french: "J'habite à Toronto.",
    ipa: "/ʒa.bit a tɔ.ʁɔ̃.to/",
    english: "I live in Toronto.",
    order: 13,
  },
  {
    id: "vocab-24",
    french: "à",
    ipa: "/a/",
    english: "in / at",
    order: 14,
  },
  {
    id: "vocab-25",
    french: "Tu habites où ?",
    ipa: "/ty a.bit u/",
    english: "Where do you live?",
    order: 15,
  },
];

async function seedLessonTwo() {
  await db.collection("lessons").doc("lesson-2").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-2").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-2",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 2 seed completed via Firebase Admin SDK.");
}

seedLessonTwo().catch((error) => {
  console.error("Failed to seed lesson 2:", error);
  process.exitCode = 1;
});