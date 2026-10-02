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
  title: "Lesson 17: Numbers 20-31",
  category: "Numbers",
  content: "Learn the French numbers from twenty to thirty-one.",
  order: 17,
};

const lessonDetail = {
  lessonId: "lesson-17",
  summary: "Learn the French numbers from twenty to thirty-one.",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-156", french: "vingt", ipa: "/vɛ̃/", english: "20", order: 146 },
  { id: "vocab-157", french: "vingt et un", ipa: "/vɛ̃.te.œ̃/", english: "21", order: 147 },
  { id: "vocab-158", french: "vingt-deux", ipa: "/vɛ̃ dø/", english: "22", order: 148 },
  { id: "vocab-159", french: "vingt-trois", ipa: "/vɛ̃ tʁwa/", english: "23", order: 149 },
  { id: "vocab-160", french: "vingt-quatre", ipa: "/vɛ̃ katʁ/", english: "24", order: 150 },
  { id: "vocab-161", french: "vingt-cinq", ipa: "/vɛ̃ sɛ̃k/", english: "25", order: 151 },
  { id: "vocab-162", french: "vingt-six", ipa: "/vɛ̃ sis/", english: "26", order: 152 },
  { id: "vocab-163", french: "vingt-sept", ipa: "/vɛ̃ sɛt/", english: "27", order: 153 },
  { id: "vocab-164", french: "vingt-huit", ipa: "/vɛ̃.tɥit/", english: "28", order: 154 },
  { id: "vocab-165", french: "vingt-neuf", ipa: "/vɛ̃ nœf/", english: "29", order: 155 },
  { id: "vocab-166", french: "trente", ipa: "/tʁɑ̃t/", english: "30", order: 156 },
  { id: "vocab-167", french: "trente et un", ipa: "/tʁɑ̃.te.œ̃/", english: "31", order: 157 },
];

async function seedLessonSeventeen() {
  await db.collection("lessons").doc("lesson-17").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-17").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-17",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 17 seed completed via Firebase Admin SDK.");
}

seedLessonSeventeen().catch((error) => {
  console.error("Failed to seed lesson 17:", error);
  process.exitCode = 1;
});