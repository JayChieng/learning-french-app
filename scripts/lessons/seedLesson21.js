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
  title: "Lesson 21: Talking About Where You Go",
  category: "Everyday Life",
  content: "Ask where someone is going and talk about places you go.",
  order: 21,
};

const lessonDetail = {
  lessonId: "lesson-21",
  summary: "Learn to ask where someone is going and name common destinations.",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-197", french: "Tu vas où ?", ipa: "/ty va u/", english: "Where are you going?", order: 187 },
  { id: "vocab-198", french: "Je vais à Toronto.", ipa: "/ʒə vɛ a tɔ.ʁɔ̃.to/", english: "I'm going to Toronto.", order: 188 },
  { id: "vocab-199", french: "Je vais au travail.", ipa: "/ʒə vɛ o tʁa.vaj/", english: "I'm going to work.", order: 189 },
  { id: "vocab-200", french: "Je vais à l'école.", ipa: "/ʒə vɛ a le.kɔl/", english: "I'm going to school.", order: 190 },
  { id: "vocab-201", french: "Je vais au restaurant.", ipa: "/ʒə vɛ o ʁɛs.to.ʁɑ̃/", english: "I'm going to the restaurant.", order: 191 },
  { id: "vocab-202", french: "Je vais chez moi.", ipa: "/ʒə vɛ ʃe mwa/", english: "I'm going home.", order: 192 },
];

async function seedLessonTwentyOne() {
  await db.collection("lessons").doc("lesson-21").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-21").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-21",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 21 seed completed via Firebase Admin SDK.");
}

seedLessonTwentyOne().catch((error) => {
  console.error("Failed to seed lesson 21:", error);
  process.exitCode = 1;
});