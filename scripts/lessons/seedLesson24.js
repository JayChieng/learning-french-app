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
  title: "Lesson 24: The Verb AIMER - To Like / To Love",
  category: "Grammar",
  content: "Learn the present-tense forms of aimer (to like / to love).",
  order: 24,
};

const lessonDetail = {
  lessonId: "lesson-24",
  summary: "Learn the present-tense forms of aimer (to like / to love).",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-218", french: "aimer", ipa: "/e.me/", english: "to like / to love", order: 208 },
  { id: "vocab-219", french: "J'aime", ipa: "/ʒɛm/", english: "I like", order: 209 },
  { id: "vocab-220", french: "Tu aimes", ipa: "/ty ɛm/", english: "You like", order: 210 },
  { id: "vocab-221", french: "Il aime", ipa: "/il ɛm/", english: "He likes", order: 211 },
  { id: "vocab-222", french: "Elle aime", ipa: "/ɛl ɛm/", english: "She likes", order: 212 },
  { id: "vocab-223", french: "Nous aimons", ipa: "/nu.z‿ɛ.mɔ̃/", english: "We like", order: 213 },
  { id: "vocab-224", french: "Vous aimez", ipa: "/vu.z‿e.me/", english: "You like", order: 214 },
  { id: "vocab-225", french: "Ils aiment", ipa: "/il.z‿ɛm/", english: "They like", order: 215 },
  { id: "vocab-226", french: "Elles aiment", ipa: "/ɛl.z‿ɛm/", english: "They like", order: 216 },
];

async function seedLessonTwentyFour() {
  await db.collection("lessons").doc("lesson-24").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-24").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-24",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 24 seed completed via Firebase Admin SDK.");
}

seedLessonTwentyFour().catch((error) => {
  console.error("Failed to seed lesson 24:", error);
  process.exitCode = 1;
});