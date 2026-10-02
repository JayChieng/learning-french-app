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
  title: "Lesson 22: The Verb FAIRE - To Do / To Make",
  category: "Grammar",
  content: "Learn the present-tense forms of faire (to do / to make).",
  order: 22,
};

const lessonDetail = {
  lessonId: "lesson-22",
  summary: "Learn the present-tense forms of faire (to do / to make).",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-203", french: "faire", ipa: "/fɛʁ/", english: "to do / to make", order: 193 },
  { id: "vocab-204", french: "Je fais", ipa: "/ʒə fɛ/", english: "I do / I make", order: 194 },
  { id: "vocab-205", french: "Tu fais", ipa: "/ty fɛ/", english: "You do / You make", order: 195 },
  { id: "vocab-206", french: "Il fait", ipa: "/il fɛ/", english: "He does / He makes", order: 196 },
  { id: "vocab-207", french: "Elle fait", ipa: "/ɛl fɛ/", english: "She does / She makes", order: 197 },
  { id: "vocab-208", french: "Nous faisons", ipa: "/nu fə.zɔ̃/", english: "We do / We make", order: 198 },
  { id: "vocab-209", french: "Vous faites", ipa: "/vu fɛt/", english: "You do / You make", order: 199 },
  { id: "vocab-210", french: "Ils font", ipa: "/il fɔ̃/", english: "They do / They make", order: 200 },
  { id: "vocab-211", french: "Elles font", ipa: "/ɛl fɔ̃/", english: "They do / They make", order: 201 },
];

async function seedLessonTwentyTwo() {
  await db.collection("lessons").doc("lesson-22").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-22").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-22",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 22 seed completed via Firebase Admin SDK.");
}

seedLessonTwentyTwo().catch((error) => {
  console.error("Failed to seed lesson 22:", error);
  process.exitCode = 1;
});