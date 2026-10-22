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
  title: "Lesson 36: Asking and Answering About Objects",
  category: "Everyday Conversations",
  content:
    "Ask what an object is, name everyday things, and ask and answer simple questions about computers and reading.",
  order: 36,
};

const lessonDetail = {
  lessonId: "lesson-36",
  summary:
    "Practise asking Qu'est-ce que c'est ?, identifying objects with C'est un/une..., and talking about what you have and read.",
  dialogues: [
    {
      id: "lesson-36-dialogue-1",
      title: "Identifying objects",
      lines: [
        { speaker: "A", french: "Qu'est-ce que c'est ?", english: "What is it?" },
        { speaker: "B", french: "C'est un livre.", english: "It's a book." },
        { speaker: "A", french: "Et ça ?", english: "And that?" },
        { speaker: "B", french: "C'est une table.", english: "It's a table." },
      ],
    },
    {
      id: "lesson-36-dialogue-2",
      title: "Talking about computers and reading",
      lines: [
        { speaker: "A", french: "Tu as un ordinateur ?", english: "Do you have a computer?" },
        { speaker: "B", french: "Oui, j'ai un ordinateur.", english: "Yes, I have a computer." },
        { speaker: "A", french: "Tu lis des livres ?", english: "Do you read books?" },
        { speaker: "B", french: "Oui, je lis des livres.", english: "Yes, I read books." },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-36-explanation-1",
      title: "Ask what something is",
      body:
        "Qu'est-ce que c'est ? means What is it? Answer with C'est + an article + noun: C'est un livre (It's a book) or C'est une table (It's a table).",
    },
    {
      id: "lesson-36-explanation-2",
      title: "Ask a yes-or-no question",
      body:
        "In casual spoken French, a question can use the same word order as a statement with rising intonation: Tu as un ordinateur ? (Do you have a computer?). Answer Oui, j'ai... (Yes, I have...).",
    },
    {
      id: "lesson-36-explanation-3",
      title: "Talk about reading in general",
      body:
        "Use des before a plural noun when you mean some or plural items in general: Tu lis des livres ? (Do you read books?) Oui, je lis des livres. (Yes, I read books.)",
    },
  ],
};

const words = [
  { id: "vocab-309", french: "Qu'est-ce que c'est ?", ipa: "/kɛs kə sɛ/", english: "What is it?", order: 299 },
  { id: "vocab-310", french: "C'est un livre.", ipa: "/sɛ tœ̃ livʁ/", english: "It's a book.", order: 300 },
  { id: "vocab-311", french: "C'est une table.", ipa: "/sɛ tyn tabl/", english: "It's a table.", order: 301 },
  { id: "vocab-312", french: "Tu as un ordinateur ?", ipa: "/ty a œ̃ ɔʁ.di.na.tœʁ/", english: "Do you have a computer?", order: 302 },
  { id: "vocab-313", french: "Oui, j'ai un ordinateur.", ipa: "/wi ʒe œ̃ ɔʁ.di.na.tœʁ/", english: "Yes, I have a computer.", order: 303 },
  { id: "vocab-314", french: "Tu lis des livres ?", ipa: "/ty li de livʁ/", english: "Do you read books?", order: 304 },
  { id: "vocab-315", french: "Oui, je lis des livres.", ipa: "/wi ʒə li de livʁ/", english: "Yes, I read books.", order: 305 },
];

async function seedLessonThirtySix() {
  await db.collection("lessons").doc("lesson-36").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-36").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-36",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 36 seed completed via Firebase Admin SDK.");
}

seedLessonThirtySix().catch((error) => {
  console.error("Failed to seed lesson 36:", error);
  process.exitCode = 1;
});
