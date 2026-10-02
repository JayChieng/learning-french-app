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
  title: "Lesson 7: Describing How You Feel",
  category: "Grammar",
  content: "Describe how you feel using être and common adjectives.",
  order: 7,
};

const lessonDetail = {
  lessonId: "lesson-7",
  summary: "Learn adjectives and phrases for describing how you feel.",
  dialogues: [],
  explanations: [],
};

const words = [
  {
    id: "vocab-66",
    french: "fatigué",
    ipa: "/fa.ti.ɡe/",
    english: "tired",
    order: 56,
  },
  {
    id: "vocab-67",
    french: "heureux",
    ipa: "/ø.ʁø/",
    english: "happy",
    order: 57,
  },
  {
    id: "vocab-68",
    french: "occupé",
    ipa: "/ɔ.ky.pe/",
    english: "busy",
    order: 58,
  },
  {
    id: "vocab-69",
    french: "prêt",
    ipa: "/pʁɛ/",
    english: "ready",
    order: 59,
  },
  {
    id: "vocab-70",
    french: "Je suis heureux.",
    ipa: "/ʒə sɥi ø.ʁø/",
    english: "I am happy.",
    order: 60,
  },
  {
    id: "vocab-71",
    french: "Je suis occupé.",
    ipa: "/ʒə sɥi ɔ.ky.pe/",
    english: "I am busy.",
    order: 61,
  },
  {
    id: "vocab-72",
    french: "Je suis prêt.",
    ipa: "/ʒə sɥi pʁɛ/",
    english: "I am ready.",
    order: 62,
  },
];

async function seedLessonSeven() {
  await db.collection("lessons").doc("lesson-7").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-7").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-7",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 7 seed completed via Firebase Admin SDK.");
}

seedLessonSeven().catch((error) => {
  console.error("Failed to seed lesson 7:", error);
  process.exitCode = 1;
});