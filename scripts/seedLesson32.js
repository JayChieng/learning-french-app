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
  title: "Lesson 32: POURQUOI - Why?",
  category: "Question Words",
  content: "Ask why something happens and answer with parce que (because).",
  order: 32,
};

const lessonDetail = {
  lessonId: "lesson-32",
  summary: "Learn common questions using pourquoi and answers using parce que.",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-261", french: "Pourquoi ?", ipa: "/puʁ.kwa/", english: "Why?", order: 251 },
  { id: "vocab-262", french: "Pourquoi tu apprends le français ?", ipa: "/puʁ.kwa ty a.pʁɑ̃ lə fʁɑ̃.sɛ/", english: "Why are you learning French?", order: 252 },
  { id: "vocab-263", french: "Pourquoi tu es fatigué ?", ipa: "/puʁ.kwa ty ɛ fa.ti.ɡe/", english: "Why are you tired?", order: 253 },
  { id: "vocab-264", french: "Pourquoi tu travailles aujourd'hui ?", ipa: "/puʁ.kwa ty tʁa.vaj o.ʒuʁ.dɥi/", english: "Why are you working today?", order: 254 },
  { id: "vocab-265", french: "Parce que...", ipa: "/paʁs kə/", english: "Because...", order: 255 },
  { id: "vocab-266", french: "Parce que j'aime le français.", ipa: "/paʁs kə ʒɛm lə fʁɑ̃.sɛ/", english: "Because I like French.", order: 256 },
];

async function seedLessonThirtyTwo() {
  await db.collection("lessons").doc("lesson-32").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-32").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-32",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 32 seed completed via Firebase Admin SDK.");
}

seedLessonThirtyTwo().catch((error) => {
  console.error("Failed to seed lesson 32:", error);
  process.exitCode = 1;
});