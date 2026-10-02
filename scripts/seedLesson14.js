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
  title: "Lesson 14: Common Expressions with AVOIR",
  category: "Grammar",
  content: "Learn common expressions where French uses avoir for feelings and sensations.",
  order: 14,
};

const lessonDetail = {
  lessonId: "lesson-14",
  summary: "Learn common avoir expressions for hunger, thirst, temperature, fear, and sleepiness.",
  dialogues: [],
  explanations: [],
};

const words = [
  {
    id: "vocab-129",
    french: "J'ai faim.",
    ipa: "/ʒe fɛ̃/",
    english: "I am hungry.",
    order: 119,
  },
  {
    id: "vocab-130",
    french: "J'ai soif.",
    ipa: "/ʒe swaf/",
    english: "I am thirsty.",
    order: 120,
  },
  {
    id: "vocab-131",
    french: "J'ai chaud.",
    ipa: "/ʒe ʃo/",
    english: "I am hot.",
    order: 121,
  },
  {
    id: "vocab-132",
    french: "J'ai froid.",
    ipa: "/ʒe fʁwa/",
    english: "I am cold.",
    order: 122,
  },
  {
    id: "vocab-133",
    french: "J'ai peur.",
    ipa: "/ʒe pœʁ/",
    english: "I am afraid.",
    order: 123,
  },
  {
    id: "vocab-134",
    french: "J'ai sommeil.",
    ipa: "/ʒe sɔ.mɛj/",
    english: "I am sleepy.",
    order: 124,
  },
];

async function seedLessonFourteen() {
  await db.collection("lessons").doc("lesson-14").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-14").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-14",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 14 seed completed via Firebase Admin SDK.");
}

seedLessonFourteen().catch((error) => {
  console.error("Failed to seed lesson 14:", error);
  process.exitCode = 1;
});