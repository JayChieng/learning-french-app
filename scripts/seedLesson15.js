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
  title: "Lesson 15: Numbers 1-10",
  category: "Numbers",
  content: "Learn to count from one to ten in French.",
  order: 15,
};

const lessonDetail = {
  lessonId: "lesson-15",
  summary: "Learn the French numbers from one to ten.",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-135", french: "un", ipa: "/œ̃/", english: "1", order: 125 },
  { id: "vocab-136", french: "deux", ipa: "/dø/", english: "2", order: 126 },
  { id: "vocab-137", french: "trois", ipa: "/tʁwa/", english: "3", order: 127 },
  { id: "vocab-138", french: "quatre", ipa: "/katʁ/", english: "4", order: 128 },
  { id: "vocab-139", french: "cinq", ipa: "/sɛ̃k/", english: "5", order: 129 },
  { id: "vocab-140", french: "six", ipa: "/sis/", english: "6", order: 130 },
  { id: "vocab-141", french: "sept", ipa: "/sɛt/", english: "7", order: 131 },
  { id: "vocab-142", french: "huit", ipa: "/ɥit/", english: "8", order: 132 },
  { id: "vocab-143", french: "neuf", ipa: "/nœf/", english: "9", order: 133 },
  { id: "vocab-144", french: "dix", ipa: "/dis/", english: "10", order: 134 },
];

async function seedLessonFifteen() {
  await db.collection("lessons").doc("lesson-15").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-15").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-15",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 15 seed completed via Firebase Admin SDK.");
}

seedLessonFifteen().catch((error) => {
  console.error("Failed to seed lesson 15:", error);
  process.exitCode = 1;
});