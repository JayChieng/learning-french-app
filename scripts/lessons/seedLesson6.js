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
  title: "Lesson 6: Describing Other People with ÊTRE",
  category: "Grammar",
  content: "Describe people using the present-tense forms of être.",
  order: 6,
};

const lessonDetail = {
  lessonId: "lesson-6",
  summary: "Learn to describe other people using forms of être (to be).",
  dialogues: [],
  explanations: [],
};

const words = [
  {
    id: "vocab-59",
    french: "Tu es étudiant.",
    ipa: "/ty ɛ e.ty.djɑ̃/",
    english: "You are a student.",
    order: 49,
  },
  {
    id: "vocab-60",
    french: "Il est étudiant.",
    ipa: "/il ɛ e.ty.djɑ̃/",
    english: "He is a student.",
    order: 50,
  },
  {
    id: "vocab-61",
    french: "Elle est étudiante.",
    ipa: "/ɛl ɛ e.ty.djɑ̃t/",
    english: "She is a student.",
    order: 51,
  },
  {
    id: "vocab-62",
    french: "Nous sommes étudiants.",
    ipa: "/nu sɔm e.ty.djɑ̃/",
    english: "We are students.",
    order: 52,
  },
  {
    id: "vocab-63",
    french: "Vous êtes français.",
    ipa: "/vu zɛt fʁɑ̃.sɛ/",
    english: "You are French.",
    order: 53,
  },
  {
    id: "vocab-64",
    french: "Ils sont fatigués.",
    ipa: "/il sɔ̃ fa.ti.ɡe/",
    english: "They are tired.",
    order: 54,
  },
  {
    id: "vocab-65",
    french: "Elles sont vietnamiennes.",
    ipa: "/ɛl sɔ̃ vjɛt.na.mjɛn/",
    english: "They are Vietnamese.",
    order: 55,
  },
];

async function seedLessonSix() {
  await db.collection("lessons").doc("lesson-6").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-6").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-6",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 6 seed completed via Firebase Admin SDK.");
}

seedLessonSix().catch((error) => {
  console.error("Failed to seed lesson 6:", error);
  process.exitCode = 1;
});