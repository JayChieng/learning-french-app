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
  title: "Lesson 16: Numbers 10-20",
  category: "Numbers",
  content: "Learn to count from ten to twenty in French.",
  order: 16,
};

const lessonDetail = {
  lessonId: "lesson-16",
  summary: "Learn the French numbers from ten to twenty.",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-145", french: "dix", ipa: "/dis/", english: "10", order: 135 },
  { id: "vocab-146", french: "onze", ipa: "/ɔ̃z/", english: "11", order: 136 },
  { id: "vocab-147", french: "douze", ipa: "/duz/", english: "12", order: 137 },
  { id: "vocab-148", french: "treize", ipa: "/tʁɛz/", english: "13", order: 138 },
  { id: "vocab-149", french: "quatorze", ipa: "/ka.tɔʁz/", english: "14", order: 139 },
  { id: "vocab-150", french: "quinze", ipa: "/kɛ̃z/", english: "15", order: 140 },
  { id: "vocab-151", french: "seize", ipa: "/sɛz/", english: "16", order: 141 },
  { id: "vocab-152", french: "dix-sept", ipa: "/di.sɛt/", english: "17", order: 142 },
  { id: "vocab-153", french: "dix-huit", ipa: "/di.zɥit/", english: "18", order: 143 },
  { id: "vocab-154", french: "dix-neuf", ipa: "/diz.nœf/", english: "19", order: 144 },
  { id: "vocab-155", french: "vingt", ipa: "/vɛ̃/", english: "20", order: 145 },
];

async function seedLessonSixteen() {
  await db.collection("lessons").doc("lesson-16").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-16").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-16",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 16 seed completed via Firebase Admin SDK.");
}

seedLessonSixteen().catch((error) => {
  console.error("Failed to seed lesson 16:", error);
  process.exitCode = 1;
});