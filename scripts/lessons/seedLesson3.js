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
  title: "Lesson 3: Introduce yourself - Languages & Personal Information",
  category: "Introduce Yourself",
  content:
    "Talk about your nationality, the languages you speak, the language you are learning, and your student status.",
  order: 3,
};

const lessonDetail = {
  lessonId: "lesson-3",
  summary:
    "Learn how to talk about your nationality, the languages you speak, the language you are learning, and your student status.",
  dialogues: [],
  explanations: [],
};

const words = [
  {
    id: "vocab-26",
    french: "Je suis",
    ipa: "/ʒə sɥi/",
    english: "I am",
    order: 16,
  },
  {
    id: "vocab-27",
    french: "vietnamien",
    ipa: "/vjɛt.na.mjɛ̃/",
    english: "Vietnamese (masculine)",
    order: 17,
  },
  {
    id: "vocab-28",
    french: "parler",
    ipa: "/paʁ.le/",
    english: "to speak",
    order: 18,
  },
  {
    id: "vocab-29",
    french: "Je parle...",
    ipa: "/ʒə paʁl/",
    english: "I speak...",
    order: 19,
  },
  {
    id: "vocab-30",
    french: "anglais",
    ipa: "/ɑ̃.ɡlɛ/",
    english: "English",
    order: 20,
  },
  {
    id: "vocab-31",
    french: "Je parle anglais.",
    ipa: "/ʒə paʁl ɑ̃.ɡlɛ/",
    english: "I speak English.",
    order: 21,
  },
  {
    id: "vocab-32",
    french: "français",
    ipa: "/fʁɑ̃.sɛ/",
    english: "French",
    order: 22,
  },
  {
    id: "vocab-33",
    french: "Je parle français.",
    ipa: "/ʒə paʁl fʁɑ̃.sɛ/",
    english: "I speak French.",
    order: 23,
  },
  {
    id: "vocab-34",
    french: "apprendre",
    ipa: "/a.pʁɑ̃dʁ/",
    english: "to learn",
    order: 24,
  },
  {
    id: "vocab-35",
    french: "J'apprends",
    ipa: "/ʒa.pʁɑ̃/",
    english: "I am learning / I learn",
    order: 25,
  },
  {
    id: "vocab-36",
    french: "le français",
    ipa: "/lə fʁɑ̃.sɛ/",
    english: "French language",
    order: 26,
  },
  {
    id: "vocab-37",
    french: "J'apprends le français.",
    ipa: "/ʒa.pʁɑ̃ lə fʁɑ̃.sɛ/",
    english: "I'm learning French.",
    order: 27,
  },
  {
    id: "vocab-38",
    french: "vietnamienne",
    ipa: "/vjɛt.na.mjɛn/",
    english: "Vietnamese (feminine)",
    order: 28,
  },
  {
    id: "vocab-39",
    french: "canadien",
    ipa: "/ka.na.djɛ̃/",
    english: "Canadian (masculine)",
    order: 29,
  },
  {
    id: "vocab-40",
    french: "canadienne",
    ipa: "/ka.na.djɛn/",
    english: "Canadian (feminine)",
    order: 30,
  },
  {
    id: "vocab-41",
    french: "française",
    ipa: "/fʁɑ̃.sɛz/",
    english: "French (feminine)",
    order: 31,
  },
  {
    id: "vocab-42",
    french: "Je suis vietnamien.",
    ipa: "/ʒə sɥi vjɛt.na.mjɛ̃/",
    english: "I'm Vietnamese.",
    order: 32,
  },
  {
    id: "vocab-43",
    french: "Je suis étudiant.",
    ipa: "/ʒə sɥi e.ty.djɑ̃/",
    english: "I'm a student.",
    order: 33,
  },
  {
    id: "vocab-44",
    french: "étudiant",
    ipa: "/e.ty.djɑ̃/",
    english: "male student",
    order: 34,
  },
  {
    id: "vocab-45",
    french: "étudiante",
    ipa: "/e.ty.djɑ̃t/",
    english: "female student",
    order: 35,
  },
];

async function seedLessonThree() {
  await db.collection("lessons").doc("lesson-3").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-3").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-3",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 3 seed completed via Firebase Admin SDK.");
}

seedLessonThree().catch((error) => {
  console.error("Failed to seed lesson 3:", error);
  process.exitCode = 1;
});