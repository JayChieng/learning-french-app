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
  title: "Lesson 8: Yes / No Questions with être",
  category: "Grammar",
  content: "Ask and answer yes/no questions using forms of être.",
  order: 8,
};

const lessonDetail = {
  lessonId: "lesson-8",
  summary: "Learn to ask and answer yes/no questions with être.",
  dialogues: [],
  explanations: [],
};

const words = [
  {
    id: "vocab-73",
    french: "Tu es",
    ipa: "/ty ɛ/",
    english: "You are",
    order: 63,
  },
  {
    id: "vocab-74",
    french: "Tu es vietnamien ?",
    ipa: "/ty ɛ vjɛt.na.mjɛ̃/",
    english: "Are you Vietnamese?",
    order: 64,
  },
  {
    id: "vocab-75",
    french: "Oui, je suis vietnamien.",
    ipa: "/wi ʒə sɥi vjɛt.na.mjɛ̃/",
    english: "Yes, I am Vietnamese.",
    order: 65,
  },
  {
    id: "vocab-76",
    french: "Non, je ne suis pas vietnamien.",
    ipa: "/nɔ̃ ʒə nə sɥi pa vjɛt.na.mjɛ̃/",
    english: "No, I am not Vietnamese.",
    order: 66,
  },
  {
    id: "vocab-77",
    french: "Il est fatigué ?",
    ipa: "/il ɛ fa.ti.ɡe/",
    english: "Is he tired?",
    order: 67,
  },
  {
    id: "vocab-78",
    french: "Oui, il est fatigué.",
    ipa: "/wi il ɛ fa.ti.ɡe/",
    english: "Yes, he is tired.",
    order: 68,
  },
  {
    id: "vocab-79",
    french: "Elle est contente ?",
    ipa: "/ɛl ɛ kɔ̃.tɑ̃t/",
    english: "Is she happy?",
    order: 69,
  },
  {
    id: "vocab-80",
    french: "Oui, elle est contente.",
    ipa: "/wi ɛl ɛ kɔ̃.tɑ̃t/",
    english: "Yes, she is happy.",
    order: 70,
  },
  {
    id: "vocab-81",
    french: "Ils sont prêts ?",
    ipa: "/il sɔ̃ pʁɛ/",
    english: "Are they ready?",
    order: 71,
  },
  {
    id: "vocab-82",
    french: "Oui, ils sont prêts.",
    ipa: "/wi il sɔ̃ pʁɛ/",
    english: "Yes, they are ready.",
    order: 72,
  },
  {
    id: "vocab-83",
    french: "Elles sont occupées ?",
    ipa: "/ɛl sɔ̃.z‿ɔ.ky.pe/",
    english: "Are they busy?",
    order: 73,
  },
  {
    id: "vocab-84",
    french: "Oui, elles sont occupées.",
    ipa: "/wi ɛl sɔ̃.z‿ɔ.ky.pe/",
    english: "Yes, they are busy.",
    order: 74,
  },
];

async function seedLessonEight() {
  await db.collection("lessons").doc("lesson-8").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-8").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-8",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 8 seed completed via Firebase Admin SDK.");
}

seedLessonEight().catch((error) => {
  console.error("Failed to seed lesson 8:", error);
  process.exitCode = 1;
});