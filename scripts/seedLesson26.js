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
  title: "Lesson 26: Saying What You Don't Like",
  category: "Grammar",
  content: "Use ne ... pas around aimer to say what you don't like.",
  order: 26,
};

const lessonDetail = {
  lessonId: "lesson-26",
  summary: "Learn to make negative sentences with aimer using ne ... pas.",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-233", french: "Je n'aime pas le café.", ipa: "/ʒə nɛm pa lə ka.fe/", english: "I don't like coffee.", order: 223 },
  { id: "vocab-234", french: "Je n'aime pas le froid.", ipa: "/ʒə nɛm pa lə fʁwa/", english: "I don't like the cold.", order: 224 },
  { id: "vocab-235", french: "Je n'aime pas le football.", ipa: "/ʒə nɛm pa lə fut.bɔl/", english: "I don't like football.", order: 225 },
];

async function seedLessonTwentySix() {
  await db.collection("lessons").doc("lesson-26").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-26").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-26",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 26 seed completed via Firebase Admin SDK.");
}

seedLessonTwentySix().catch((error) => {
  console.error("Failed to seed lesson 26:", error);
  process.exitCode = 1;
});