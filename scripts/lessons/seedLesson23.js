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
  title: "Lesson 23: Everyday Activities with FAIRE",
  category: "Everyday Life",
  content: "Talk about common everyday activities using faire.",
  order: 23,
};

const lessonDetail = {
  lessonId: "lesson-23",
  summary: "Learn to ask what someone is doing and describe common activities.",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-212", french: "Tu fais quoi ?", ipa: "/ty fɛ kwa/", english: "What are you doing?", order: 202 },
  { id: "vocab-213", french: "Je fais du sport.", ipa: "/ʒə fɛ dy spɔʁ/", english: "I exercise / I'm exercising", order: 203 },
  { id: "vocab-214", french: "Je fais du football.", ipa: "/ʒə fɛ dy fut.bɔl/", english: "I play football / I'm playing football", order: 204 },
  { id: "vocab-215", french: "Je fais la cuisine.", ipa: "/ʒə fɛ la kɥi.zin/", english: "I cook / I'm cooking", order: 205 },
  { id: "vocab-216", french: "Je fais mes devoirs.", ipa: "/ʒə fɛ me də.vwaʁ/", english: "I do my homework / I'm doing my homework", order: 206 },
  { id: "vocab-217", french: "Je fais une promenade.", ipa: "/ʒə fɛ yn pʁɔ.mə.nad/", english: "I take a walk / I'm taking a walk", order: 207 },
];

async function seedLessonTwentyThree() {
  await db.collection("lessons").doc("lesson-23").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-23").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-23",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 23 seed completed via Firebase Admin SDK.");
}

seedLessonTwentyThree().catch((error) => {
  console.error("Failed to seed lesson 23:", error);
  process.exitCode = 1;
});