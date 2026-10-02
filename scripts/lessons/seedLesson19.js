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
  title: "Lesson 19: Numbers 100-1,000",
  category: "Numbers",
  content: "Learn the French hundreds from one hundred to one thousand.",
  order: 19,
};

const lessonDetail = {
  lessonId: "lesson-19",
  summary: "Learn to count by hundreds in French up to one thousand.",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-178", french: "cent", ipa: "/sɑ̃/", english: "100", order: 168 },
  { id: "vocab-179", french: "deux cents", ipa: "/dø sɑ̃/", english: "200", order: 169 },
  { id: "vocab-180", french: "trois cents", ipa: "/tʁwa sɑ̃/", english: "300", order: 170 },
  { id: "vocab-181", french: "quatre cents", ipa: "/katʁ sɑ̃/", english: "400", order: 171 },
  { id: "vocab-182", french: "cinq cents", ipa: "/sɛ̃k sɑ̃/", english: "500", order: 172 },
  { id: "vocab-183", french: "six cents", ipa: "/si sɑ̃/", english: "600", order: 173 },
  { id: "vocab-184", french: "sept cents", ipa: "/sɛt sɑ̃/", english: "700", order: 174 },
  { id: "vocab-185", french: "huit cents", ipa: "/ɥi sɑ̃/", english: "800", order: 175 },
  { id: "vocab-186", french: "neuf cents", ipa: "/nœf sɑ̃/", english: "900", order: 176 },
  { id: "vocab-187", french: "mille", ipa: "/mil/", english: "1000", order: 177 },
];

async function seedLessonNineteen() {
  await db.collection("lessons").doc("lesson-19").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-19").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-19",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 19 seed completed via Firebase Admin SDK.");
}

seedLessonNineteen().catch((error) => {
  console.error("Failed to seed lesson 19:", error);
  process.exitCode = 1;
});