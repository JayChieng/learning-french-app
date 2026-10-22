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
  title: "Lesson 34: Building Sentences + Articles (Un, Une, Le, La, Les)",
  category: "Articles and Nouns",
  content:
    "Learn to build simple sentences about everyday objects and choose French articles according to noun gender and number.",
  order: 34,
};

const lessonDetail = {
  lessonId: "lesson-34",
  summary:
    "Learn un and une for a/an, le and la for singular the, and les for plural the. Practise remembering nouns with their gender and using them in simple sentences.",
  dialogues: [
    {
      id: "lesson-34-dialogue-1",
      title: "Naming everyday objects",
      lines: [
        { speaker: "A", french: "Qu'est-ce que c'est ?", english: "What is it?" },
        { speaker: "B", french: "C'est un livre.", english: "It is a book." },
        { speaker: "A", french: "Et ça ?", english: "And that?" },
        { speaker: "B", french: "C'est une chaise.", english: "It is a chair." },
      ],
    },
    {
      id: "lesson-34-dialogue-2",
      title: "Talking about objects",
      lines: [
        { speaker: "A", french: "Où est le téléphone ?", english: "Where is the phone?" },
        { speaker: "B", french: "Le téléphone est sur la table.", english: "The phone is on the table." },
        { speaker: "A", french: "Et les livres ?", english: "And the books?" },
        { speaker: "B", french: "Les livres sont ici.", english: "The books are here." },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-34-explanation-1",
      title: "A noun's gender",
      body:
        "French nouns are masculine or feminine. Learn each noun together with its article: un téléphone and une table. The article helps you remember the noun's gender.",
    },
    {
      id: "lesson-34-explanation-2",
      title: "A / an: un and une",
      body:
        "Use un with a masculine singular noun and une with a feminine singular noun: un livre (a book), une chaise (a chair).",
    },
    {
      id: "lesson-34-explanation-3",
      title: "The: le, la, and les",
      body:
        "Use le before a masculine singular noun and la before a feminine singular noun: le téléphone, la table. Use les with plural nouns of either gender: les livres, les voitures.",
    },
    {
      id: "lesson-34-explanation-4",
      title: "Build a simple sentence",
      body:
        "Use C'est + un/une + noun to name one object: C'est un livre (It is a book), C'est une voiture (It is a car). Use le/la/les when talking about a specific object or objects.",
    },
  ],
};

const words = [
  { id: "vocab-275", french: "un", ipa: "/œ̃/", english: "a / an (masculine)", order: 265 },
  { id: "vocab-276", french: "un téléphone", ipa: "/œ̃ te.le.fɔn/", english: "a phone", order: 266 },
  { id: "vocab-277", french: "un livre", ipa: "/œ̃ livʁ/", english: "a book", order: 267 },
  { id: "vocab-278", french: "un ordinateur", ipa: "/œ̃ ɔʁ.di.na.tœʁ/", english: "a computer", order: 268 },
  { id: "vocab-279", french: "une", ipa: "/yn/", english: "a / an (feminine)", order: 269 },
  { id: "vocab-280", french: "une table", ipa: "/yn tabl/", english: "a table", order: 270 },
  { id: "vocab-281", french: "une chaise", ipa: "/yn ʃɛz/", english: "a chair", order: 271 },
  { id: "vocab-282", french: "une voiture", ipa: "/yn vwa.tyʁ/", english: "a car", order: 272 },
  { id: "vocab-283", french: "le", ipa: "/lə/", english: "the (masculine singular)", order: 273 },
  { id: "vocab-284", french: "le téléphone", ipa: "/lə te.le.fɔn/", english: "the phone", order: 274 },
  { id: "vocab-285", french: "la", ipa: "/la/", english: "the (feminine singular)", order: 275 },
  { id: "vocab-286", french: "la table", ipa: "/la tabl/", english: "the table", order: 276 },
  { id: "vocab-287", french: "les", ipa: "/le/", english: "the (plural)", order: 277 },
  { id: "vocab-288", french: "les livres", ipa: "/le livʁ/", english: "the books", order: 278 },
  { id: "vocab-289", french: "les voitures", ipa: "/le vwa.tyʁ/", english: "the cars", order: 279 },
  { id: "vocab-290", french: "C'est un livre.", ipa: "/sɛ tœ̃ livʁ/", english: "It is a book.", order: 280 },
  { id: "vocab-291", french: "C'est une voiture.", ipa: "/sɛ tyn vwa.tyʁ/", english: "It is a car.", order: 281 },
];

async function seedLessonThirtyFour() {
  await db.collection("lessons").doc("lesson-34").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-34").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-34",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 34 seed completed via Firebase Admin SDK.");
}

seedLessonThirtyFour().catch((error) => {
  console.error("Failed to seed lesson 34:", error);
  process.exitCode = 1;
});
