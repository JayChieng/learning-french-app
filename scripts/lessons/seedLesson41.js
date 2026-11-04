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

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const lesson = {
  title: "Lesson 41: Food Quantities and Eating and Drinking",
  category: "Food and Drink",
  content:
    "Use du, de la, de l’, and des for general quantities of food and drink, and practise manger and boire in the present tense.",
  order: 41,
};

const lessonDetail = {
  lessonId: "lesson-41",
  summary:
    "Learn the partitive articles du, de la, de l’, and des with food and drink. Practise manger and boire, learn commander and payer, and notice how partitive articles usually change to de or d’ in negative sentences.",
  dialogues: [
    {
      id: "lesson-41-dialogue-1",
      title: "Talking about food and drink",
      lines: [
        { speaker: "A", french: "Qu’est-ce que tu manges ?", english: "What are you eating?" },
        { speaker: "B", french: "Je mange du pain et de la salade.", english: "I eat bread and some salad." },
        { speaker: "A", french: "Et qu’est-ce que tu bois ?", english: "And what are you drinking?" },
        { speaker: "B", french: "Je bois de l’eau, pas de café.", english: "I drink water, not coffee." },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-41-explanation-1",
      title: "Du, de la, de l’, and des",
      body:
        "For food or drink in a general quantity, learn the article with the noun: du pain /dy pɛ̃/ (some bread), de la salade /də la sa.lad/ (some salad), de l’eau /də lo/ (some water), and des légumes /de le.ɡym/ (some vegetables). Compare Je mange du pain (I eat bread), Je bois de l’eau (I drink water), and Je mange une salade (I eat a salad).",
    },
    {
      id: "lesson-41-explanation-2",
      title: "Conjugate manger and boire",
      body:
        "Manger /mɑ̃.ʒe/ (to eat): je mange /ʒə mɑ̃ʒ/ (I eat), tu manges /ty mɑ̃ʒ/ (you eat), il mange /il mɑ̃ʒ/ (he eats), elle mange /ɛl mɑ̃ʒ/ (she eats), nous mangeons /nu mɑ̃.ʒɔ̃/ (we eat), vous mangez /vu mɑ̃.ʒe/ (you eat), ils mangent /il mɑ̃ʒ/ and elles mangent /ɛl mɑ̃ʒ/ (they eat). Boire /bwaʁ/ (to drink): je bois /ʒə bwa/ (I drink), tu bois /ty bwa/ (you drink), il boit /il bwa/ (he drinks), elle boit /ɛl bwa/ (she drinks), nous buvons /nu by.vɔ̃/ (we drink), vous buvez /vu by.ve/ (you drink), ils boivent /il bwav/ and elles boivent /ɛl bwav/ (they drink).",
    },
    {
      id: "lesson-41-explanation-3",
      title: "Negation and useful verbs",
      body:
        "In a negative sentence, du, de la, de l’, and des generally change to de or d’: Je bois du café (I drink coffee), but Je ne bois pas de café (I don’t drink coffee). Other useful verbs are commander /kɔ.mɑ̃.de/ (to order) and payer /pe.je/ (to pay).",
    },
  ],
};

const words = [
  { id: "vocab-387", french: "du pain", ipa: "/dy pɛ̃/", english: "some bread", order: 377 },
  { id: "vocab-388", french: "de la salade", ipa: "/də la sa.lad/", english: "some salad", order: 378 },
  { id: "vocab-389", french: "de l’eau", ipa: "/də lo/", english: "some water", order: 379 },
  { id: "vocab-390", french: "des légumes", ipa: "/de le.ɡym/", english: "some vegetables", order: 380 },
  { id: "vocab-391", french: "manger", ipa: "/mɑ̃.ʒe/", english: "to eat", order: 381 },
  { id: "vocab-392", french: "boire", ipa: "/bwaʁ/", english: "to drink", order: 382 },
  { id: "vocab-393", french: "commander", ipa: "/kɔ.mɑ̃.de/", english: "to order", order: 383 },
  { id: "vocab-394", french: "payer", ipa: "/pe.je/", english: "to pay", order: 384 },
  { id: "vocab-395", french: "Je mange du pain.", ipa: "/ʒə mɑ̃ʒ dy pɛ̃/", english: "I eat bread.", order: 385 },
  { id: "vocab-396", french: "Je bois du café.", ipa: "/ʒə bwa dy ka.fe/", english: "I drink coffee.", order: 386 },
  { id: "vocab-397", french: "Je ne bois pas de café.", ipa: "/ʒə nə bwa pa də ka.fe/", english: "I don’t drink coffee.", order: 387 },
  { id: "vocab-398", french: "Nous mangeons", ipa: "/nu mɑ̃.ʒɔ̃/", english: "we eat", order: 388 },
  { id: "vocab-399", french: "Vous mangez", ipa: "/vu mɑ̃.ʒe/", english: "you eat", order: 389 },
  { id: "vocab-400", french: "Ils mangent", ipa: "/il mɑ̃ʒ/", english: "they eat", order: 390 },
  { id: "vocab-401", french: "Nous buvons", ipa: "/nu by.vɔ̃/", english: "we drink", order: 391 },
  { id: "vocab-402", french: "Vous buvez", ipa: "/vu by.ve/", english: "you drink", order: 392 },
  { id: "vocab-403", french: "Ils boivent", ipa: "/il bwav/", english: "they drink", order: 393 },
].map((word) => ({ ...word, lessonId: "lesson-41" }));

async function seedLessonFortyOne() {
  await db.collection("lessons").doc("lesson-41").set(lesson, { merge: true });
  await db.collection("lessonDetails").doc("lesson-41").set(lessonDetail, { merge: true });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: word.lessonId,
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 41 seed completed via Firebase Admin SDK.");
}

seedLessonFortyOne().catch((error) => {
  console.error("Failed to seed lesson 41:", error);
  process.exitCode = 1;
});
