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
  title: "Lesson 20: The Verb ALLER - To Go",
  category: "Grammar",
  content: "Learn the present-tense forms of aller (to go).",
  order: 20,
};

const lessonDetail = {
  lessonId: "lesson-20",
  summary: "Learn the present-tense forms of aller (to go).",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-188", french: "aller", ipa: "/a.le/", english: "to go", order: 178 },
  { id: "vocab-189", french: "Je vais", ipa: "/ʒə vɛ/", english: "I go / I'm going", order: 179 },
  { id: "vocab-190", french: "Tu vas", ipa: "/ty va/", english: "You go / You're going", order: 180 },
  { id: "vocab-191", french: "Il va", ipa: "/il va/", english: "He goes / He's going", order: 181 },
  { id: "vocab-192", french: "Elle va", ipa: "/ɛl va/", english: "She goes / She's going", order: 182 },
  { id: "vocab-193", french: "Nous allons", ipa: "/nu.z‿a.lɔ̃/", english: "We go / We're going", order: 183 },
  { id: "vocab-194", french: "Vous allez", ipa: "/vu.z‿a.le/", english: "You go / You're going", order: 184 },
  { id: "vocab-195", french: "Ils vont", ipa: "/il vɔ̃/", english: "They go / They're going", order: 185 },
  { id: "vocab-196", french: "Elles vont", ipa: "/ɛl vɔ̃/", english: "They go / They're going", order: 186 },
];

async function seedLessonTwenty() {
  await db.collection("lessons").doc("lesson-20").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-20").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-20",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 20 seed completed via Firebase Admin SDK.");
}

seedLessonTwenty().catch((error) => {
  console.error("Failed to seed lesson 20:", error);
  process.exitCode = 1;
});