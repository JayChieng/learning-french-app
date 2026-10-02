import fs from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT || path.resolve(__dirname, "../serviceAccountKey.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`Missing Firebase service account file: ${serviceAccountPath}`);
  console.error(
    "Create a service account key from Firebase Console and set FIREBASE_SERVICE_ACCOUNT or place it at the project root as serviceAccountKey.json."
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const lesson = {
  title: "Lesson 1",
  category: "Greetings",
  content: "Basic greetings and polite expressions.",
  order: 1,
};

const lessonDetail = {
  lessonId: "lesson-1",
  summary: "Basic greetings and polite expressions.",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-1", french: "Bonjour", ipa: "/bɔ̃.ʒuʁ/", english: "Hello / Good morning", order: 1 },
  { id: "vocab-2", french: "Salut", ipa: "/sa.ly/", english: "Hi / Hey", order: 2 },
  { id: "vocab-3", french: "Ça va ?", ipa: "/sa va/", english: "How are you?", order: 3 },
  { id: "vocab-4", french: "Ça va bien.", ipa: "/sa va bjɛ̃/", english: "I'm good / I'm doing well.", order: 4 },
  { id: "vocab-5", french: "Bien.", ipa: "/bjɛ̃/", english: "Good.", order: 5 },
  { id: "vocab-6", french: "Très bien.", ipa: "/tʁɛ bjɛ̃/", english: "Very good.", order: 6 },
  { id: "vocab-7", french: "Et toi ?", ipa: "/e twa/", english: "And you?", order: 7 },
  { id: "vocab-8", french: "Ça va bien. Et toi ?", ipa: "/sa va bjɛ̃ e twa/", english: "I'm good. And you?", order: 8 },
  { id: "vocab-9", french: "De rien", ipa: "/də ʁjɛ̃/", english: "You're welcome", order: 9 },
  { id: "vocab-10", french: "Merci beaucoup !", ipa: "/mɛʁ.si bo.ku/", english: "Thank you very much!", order: 10 },
];

async function seedLessonOne() {
  await db.collection("lessons").doc("lesson-1").set(lesson, { merge: true });
  await db.collection("lessonDetails").doc("lesson-1").set(lessonDetail, { merge: true });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-1",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 1 seed completed via Firebase Admin SDK.");
}

seedLessonOne().catch((error) => {
  console.error("Failed to seed lesson 1:", error);
  process.exitCode = 1;
});
