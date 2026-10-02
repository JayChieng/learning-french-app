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
  title: "Lesson 13: Asking 'Do You Have...?'",
  category: "Grammar",
  content: "Ask questions with tu as and answer using avoir in the negative or affirmative.",
  order: 13,
};

const lessonDetail = {
  lessonId: "lesson-13",
  summary: "Learn to ask whether someone has something and how to answer.",
  dialogues: [],
  explanations: [],
};

const words = [
  {
    id: "vocab-122",
    french: "Tu as... ?",
    ipa: "/ty a/",
    english: "Do you have...?",
    order: 112,
  },
  {
    id: "vocab-123",
    french: "Tu as un téléphone ?",
    ipa: "/ty a œ̃ te.le.fɔn/",
    english: "Do you have a phone?",
    order: 113,
  },
  {
    id: "vocab-124",
    french: "Oui, j'ai un téléphone.",
    ipa: "/wi ʒe œ̃ te.le.fɔn/",
    english: "Yes, I have a phone.",
    order: 114,
  },
  {
    id: "vocab-125",
    french: "Tu as une voiture ?",
    ipa: "/ty a yn vwa.tyʁ/",
    english: "Do you have a car?",
    order: 115,
  },
  {
    id: "vocab-126",
    french: "Non, je n'ai pas de voiture.",
    ipa: "/nɔ̃ ʒə ne pa də vwa.tyʁ/",
    english: "No, I don't have a car.",
    order: 116,
  },
  {
    id: "vocab-127",
    french: "Tu as un frère ?",
    ipa: "/ty a œ̃ fʁɛʁ/",
    english: "Do you have a brother?",
    order: 117,
  },
  {
    id: "vocab-128",
    french: "Oui, j'ai un frère.",
    ipa: "/wi ʒe œ̃ fʁɛʁ/",
    english: "Yes, I have a brother.",
    order: 118,
  },
];

async function seedLessonThirteen() {
  await db.collection("lessons").doc("lesson-13").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-13").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-13",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 13 seed completed via Firebase Admin SDK.");
}

seedLessonThirteen().catch((error) => {
  console.error("Failed to seed lesson 13:", error);
  process.exitCode = 1;
});