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
  title: "Lesson 18: Counting by Tens",
  category: "Numbers",
  content: "Learn the French tens from ten to one hundred.",
  order: 18,
};

const lessonDetail = {
  lessonId: "lesson-18",
  summary: "Learn the French numbers ten, twenty, thirty, and so on up to one hundred.",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-168", french: "dix", ipa: "/dis/", english: "10", order: 158 },
  { id: "vocab-169", french: "vingt", ipa: "/vɛ̃/", english: "20", order: 159 },
  { id: "vocab-170", french: "trente", ipa: "/tʁɑ̃t/", english: "30", order: 160 },
  { id: "vocab-171", french: "quarante", ipa: "/ka.ʁɑ̃t/", english: "40", order: 161 },
  { id: "vocab-172", french: "cinquante", ipa: "/sɛ̃.kɑ̃t/", english: "50", order: 162 },
  { id: "vocab-173", french: "soixante", ipa: "/swa.sɑ̃t/", english: "60", order: 163 },
  { id: "vocab-174", french: "soixante-dix", ipa: "/swa.sɑ̃t.dis/", english: "70", order: 164 },
  { id: "vocab-175", french: "quatre-vingts", ipa: "/ka.tʁə.vɛ̃/", english: "80", order: 165 },
  { id: "vocab-176", french: "quatre-vingt-dix", ipa: "/ka.tʁə.vɛ̃.dis/", english: "90", order: 166 },
  { id: "vocab-177", french: "cent", ipa: "/sɑ̃/", english: "100", order: 167 },
];

async function seedLessonEighteen() {
  await db.collection("lessons").doc("lesson-18").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-18").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-18",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 18 seed completed via Firebase Admin SDK.");
}

seedLessonEighteen().catch((error) => {
  console.error("Failed to seed lesson 18:", error);
  process.exitCode = 1;
});