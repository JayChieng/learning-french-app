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
  title: "Lesson 27: QUI - Who?",
  category: "Question Words",
  content: "Learn to ask who someone is and who someone is with.",
  order: 27,
};

const lessonDetail = {
  lessonId: "lesson-27",
  summary: "Learn common questions using qui (who).",
  dialogues: [],
  explanations: [],
};

const words = [
  { id: "vocab-236", french: "Qui ?", ipa: "/ki/", english: "Who?", order: 226 },
  { id: "vocab-237", french: "Qui est-ce ?", ipa: "/ki ɛs/", english: "Who is it? / Who is that?", order: 227 },
  { id: "vocab-238", french: "Qui est ton ami ?", ipa: "/ki ɛ tɔ̃ na.mi/", english: "Who is your friend?", order: 228 },
  { id: "vocab-239", french: "Qui est cette personne ?", ipa: "/ki ɛ sɛt pɛʁ.sɔn/", english: "Who is this person?", order: 229 },
  { id: "vocab-240", french: "Tu es avec qui ?", ipa: "/ty ɛ a.vɛk ki/", english: "Who are you with?", order: 230 },
];

async function seedLessonTwentySeven() {
  await db.collection("lessons").doc("lesson-27").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-27").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-27",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 27 seed completed via Firebase Admin SDK.");
}

seedLessonTwentySeven().catch((error) => {
  console.error("Failed to seed lesson 27:", error);
  process.exitCode = 1;
});