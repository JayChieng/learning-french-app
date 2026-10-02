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
  title: "Lesson 5: Je suis",
  category: "Introduce Yourself",
  content: "Use je suis to describe yourself in French.",
  order: 5,
};

const lessonDetail = {
  lessonId: "lesson-5",
  summary: "Learn to describe yourself using je suis (I am).",
  dialogues: [],
  explanations: [],
};

const words = [
  {
    id: "vocab-54",
    french: "Je suis étudiant.",
    ipa: "/ʒə sɥi e.ty.djɑ̃/",
    english: "I am a student.",
    order: 44,
  },
  {
    id: "vocab-55",
    french: "Je suis vietnamien.",
    ipa: "/ʒə sɥi vjɛt.na.mjɛ̃/",
    english: "I am Vietnamese.",
    order: 45,
  },
  {
    id: "vocab-56",
    french: "Je suis canadien.",
    ipa: "/ʒə sɥi ka.na.djɛ̃/",
    english: "I am Canadian.",
    order: 46,
  },
  {
    id: "vocab-57",
    french: "Je suis prêt.",
    ipa: "/ʒə sɥi pʁɛ/",
    english: "I am ready.",
    order: 47,
  },
  {
    id: "vocab-58",
    french: "Je suis fatigué.",
    ipa: "/ʒə sɥi fa.ti.ɡe/",
    english: "I am tired.",
    order: 48,
  },
];

async function seedLessonFive() {
  await db.collection("lessons").doc("lesson-5").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-5").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-5",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 5 seed completed via Firebase Admin SDK.");
}

seedLessonFive().catch((error) => {
  console.error("Failed to seed lesson 5:", error);
  process.exitCode = 1;
});