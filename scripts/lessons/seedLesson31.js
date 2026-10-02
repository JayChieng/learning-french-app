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
  title: "Lesson 31: COMMENT - How?",
  category: "Question Words",
  content: "Learn to ask how someone is, what their name is, and how they do something.",
  order: 31,
};

const lessonDetail = {
  lessonId: "lesson-31",
  summary: "Learn common questions and expressions using comment (how).",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-256", french: "Comment ?", ipa: "/kɔ.mɑ̃/", english: "How?", order: 246 },
  { id: "vocab-257", french: "Comment tu t'appelles ?", ipa: "/kɔ.mɑ̃ ty ta.pɛl/", english: "What's your name?", order: 247 },
  { id: "vocab-258", french: "Comment ça va ?", ipa: "/kɔ.mɑ̃ sa va/", english: "How are you? / How is it going?", order: 248 },
  { id: "vocab-259", french: "Comment tu vas ?", ipa: "/kɔ.mɑ̃ ty va/", english: "How are you doing?", order: 249 },
  { id: "vocab-260", french: "Comment tu fais ça ?", ipa: "/kɔ.mɑ̃ ty fɛ sa/", english: "How do you do that?", order: 250 },
];

async function seedLessonThirtyOne() {
  await db.collection("lessons").doc("lesson-31").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-31").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-31",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 31 seed completed via Firebase Admin SDK.");
}

seedLessonThirtyOne().catch((error) => {
  console.error("Failed to seed lesson 31:", error);
  process.exitCode = 1;
});