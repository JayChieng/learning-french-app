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
  title: "Lesson 12: Things You Have",
  category: "Everyday Objects",
  content: "Talk about common things you have using j'ai.",
  order: 12,
};

const lessonDetail = {
  lessonId: "lesson-12",
  summary: "Learn to say that you have common everyday objects and things.",
  dialogues: [],
  explanations: [],
};

const words = [
  {
    id: "vocab-117",
    french: "J'ai un téléphone.",
    ipa: "/ʒe œ̃ te.le.fɔn/",
    english: "I have a phone.",
    order: 107,
  },
  {
    id: "vocab-118",
    french: "J'ai une voiture.",
    ipa: "/ʒe yn vwa.tyʁ/",
    english: "I have a car.",
    order: 108,
  },
  {
    id: "vocab-119",
    french: "J'ai un ordinateur.",
    ipa: "/ʒe œ̃ ɔʁ.di.na.tœʁ/",
    english: "I have a computer.",
    order: 109,
  },
  {
    id: "vocab-120",
    french: "J'ai un appartement.",
    ipa: "/ʒe œ̃ a.paʁ.tə.mɑ̃/",
    english: "I have an apartment.",
    order: 110,
  },
  {
    id: "vocab-121",
    french: "J'ai un problème.",
    ipa: "/ʒe œ̃ pʁɔ.blɛm/",
    english: "I have a problem.",
    order: 111,
  },
];

async function seedLessonTwelve() {
  await db.collection("lessons").doc("lesson-12").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-12").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-12",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 12 seed completed via Firebase Admin SDK.");
}

seedLessonTwelve().catch((error) => {
  console.error("Failed to seed lesson 12:", error);
  process.exitCode = 1;
});