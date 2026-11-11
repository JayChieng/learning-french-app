import fs from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { activityLessons } from "./activityLessonData.js";

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

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export async function seedActivityLesson(lessonNumber) {
  const lesson = activityLessons[lessonNumber];
  if (!lesson) {
    throw new Error(`No daily activity lesson data found for lesson ${lessonNumber}.`);
  }

  const lessonId = `lesson-${lessonNumber}`;
  await db.collection("lessons").doc(lessonId).set(
    {
      title: lesson.title,
      category: lesson.category,
      content: lesson.content,
      order: lesson.order,
    },
    { merge: true }
  );
  await db.collection("lessonDetails").doc(lessonId).set(
    {
      lessonId,
      summary: lesson.summary,
      dialogues: lesson.dialogues,
      explanations: lesson.explanations,
    },
    { merge: true }
  );

  await Promise.all(
    lesson.words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId,
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
          imageUrl: FieldValue.delete(),
          imageAttribution: FieldValue.delete(),
          imageSourceUrl: FieldValue.delete(),
        },
        { merge: true }
      )
    )
  );

  console.log(`Lesson ${lessonNumber} seed completed via Firebase Admin SDK.`);
}
