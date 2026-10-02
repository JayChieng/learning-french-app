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
  title: "Lesson 25: Saying What You Like",
  category: "Everyday Life",
  content: "Ask what someone likes and talk about things you like.",
  order: 25,
};

const lessonDetail = {
  lessonId: "lesson-25",
  summary: "Learn to ask what someone likes and name common interests.",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-227", french: "Tu aimes quoi ?", ipa: "/ty ɛm kwa/", english: "What do you like?", order: 217 },
  { id: "vocab-228", french: "J'aime le français.", ipa: "/ʒɛm lə fʁɑ̃.sɛ/", english: "I like French.", order: 218 },
  { id: "vocab-229", french: "J'aime le football.", ipa: "/ʒɛm lə fut.bɔl/", english: "I like football / soccer.", order: 219 },
  { id: "vocab-230", french: "J'aime la musique.", ipa: "/ʒɛm la my.zik/", english: "I like music.", order: 220 },
  { id: "vocab-231", french: "J'aime les films.", ipa: "/ʒɛm le film/", english: "I like movies.", order: 221 },
  { id: "vocab-232", french: "J'aime le café.", ipa: "/ʒɛm lə ka.fe/", english: "I like coffee.", order: 222 },
];

async function seedLessonTwentyFive() {
  await db.collection("lessons").doc("lesson-25").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-25").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-25",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 25 seed completed via Firebase Admin SDK.");
}

seedLessonTwentyFive().catch((error) => {
  console.error("Failed to seed lesson 25:", error);
  process.exitCode = 1;
});