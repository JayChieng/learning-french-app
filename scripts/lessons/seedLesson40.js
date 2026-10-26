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
  title: "Lesson 40: Ordering at a Restaurant",
  category: "Food and Drink",
  content:
    "Order food politely, ask questions at a restaurant, and use vous when speaking to restaurant staff.",
  order: 40,
};

const lessonDetail = {
  lessonId: "lesson-40",
  summary:
    "Learn polite ways to order food and drinks, ask for recommendations and the bill, and speak appropriately to restaurant staff.",
  dialogues: [
    {
      id: "lesson-40-dialogue-1",
      title: "Ordering a meal",
      lines: [
        { speaker: "A", french: "Bonjour. Vous avez le menu ?", english: "Hello. Do you have the menu?" },
        { speaker: "B", french: "Oui, le voici.", english: "Yes, here it is." },
        { speaker: "A", french: "Je voudrais du poulet avec du riz, s’il vous plaît.", english: "I would like chicken with rice, please." },
        { speaker: "B", french: "Bien sûr. Et comme boisson ?", english: "Of course. And to drink?" },
        { speaker: "A", french: "Je voudrais de l’eau, s’il vous plaît.", english: "I would like some water, please." },
      ],
    },
    {
      id: "lesson-40-dialogue-2",
      title: "Asking for a recommendation and the bill",
      lines: [
        { speaker: "A", french: "Qu’est-ce que vous recommandez ?", english: "What do you recommend?" },
        { speaker: "B", french: "Je recommande la salade.", english: "I recommend the salad." },
        { speaker: "A", french: "Je prends la salade. C’est combien ?", english: "I’ll have the salad. How much is it?" },
        { speaker: "B", french: "C’est douze euros.", english: "It’s twelve euros." },
        { speaker: "A", french: "C’était très bon ! L’addition, s’il vous plaît.", english: "It was very good! The bill, please." },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-40-explanation-1",
      title: "Polite ways to order",
      body:
        "Je voudrais… /ʒə vu.dʁɛ/ means “I would like…” and is a polite way to ask for something: Je voudrais un café (I would like a coffee). Je prends… /ʒə pʁɑ̃/ means “I’ll have…” and is also common when ordering: Je prends le poulet (I’ll have the chicken).",
    },
    {
      id: "lesson-40-explanation-2",
      title: "Useful restaurant questions",
      body:
        "Ask Vous avez le menu ? (Do you have the menu?), Qu’est-ce que vous recommandez ? (What do you recommend?), or C’est combien ? (How much is it?). To request water, say Je peux avoir de l’eau, s’il vous plaît ? At the end, ask for L’addition, s’il vous plaît (The bill, please).",
    },
    {
      id: "lesson-40-explanation-3",
      title: "Use vous with restaurant staff",
      body:
        "Tu /ty/ is informal “you,” for friends and people you know well. Vous /vu/ is polite “you” and is appropriate with restaurant staff or strangers. Use vous in questions and requests when speaking to staff.",
    },
  ],
};

const words = [
  { id: "vocab-371", french: "Je voudrais…", ipa: "/ʒə vu.dʁɛ/", english: "I would like…", order: 361 },
  { id: "vocab-372", french: "Je voudrais un café.", ipa: "/ʒə vu.dʁɛ œ̃ ka.fe/", english: "I would like a coffee.", order: 362 },
  { id: "vocab-373", french: "Je voudrais de l’eau, s’il vous plaît.", ipa: "/ʒə vu.dʁɛ də lo sil vu plɛ/", english: "I would like some water, please.", order: 363 },
  { id: "vocab-374", french: "Je voudrais du poulet avec du riz.", ipa: "/ʒə vu.dʁɛ dy pu.lɛ a.vɛk dy ʁi/", english: "I would like chicken with rice.", order: 364 },
  { id: "vocab-375", french: "Je voudrais une salade.", ipa: "/ʒə vu.dʁɛ yn sa.lad/", english: "I would like a salad.", order: 365 },
  { id: "vocab-376", french: "Je prends…", ipa: "/ʒə pʁɑ̃/", english: "I’ll have…", order: 366 },
  { id: "vocab-377", french: "Je prends le poulet.", ipa: "/ʒə pʁɑ̃ lə pu.lɛ/", english: "I’ll have the chicken.", order: 367 },
  { id: "vocab-378", french: "Je prends un café.", ipa: "/ʒə pʁɑ̃ œ̃ ka.fe/", english: "I’ll have a coffee.", order: 368 },
  { id: "vocab-379", french: "Vous avez le menu ?", ipa: "/vu za.ve lə mə.ny/", english: "Do you have the menu?", order: 369 },
  { id: "vocab-380", french: "Qu’est-ce que vous recommandez ?", ipa: "/kɛs kə vu ʁə.kɔ.mɑ̃.de/", english: "What do you recommend?", order: 370 },
  { id: "vocab-381", french: "C’est combien ?", ipa: "/sɛ kɔ̃.bjɛ̃/", english: "How much is it?", order: 371 },
  { id: "vocab-382", french: "Je peux avoir de l’eau, s’il vous plaît ?", ipa: "/ʒə pø a.vwaʁ də lo sil vu plɛ/", english: "Can I have some water, please?", order: 372 },
  { id: "vocab-383", french: "L’addition, s’il vous plaît.", ipa: "/la.di.sjɔ̃ sil vu plɛ/", english: "The bill, please.", order: 373 },
  { id: "vocab-384", french: "C’était très bon !", ipa: "/se.tɛ tʁɛ bɔ̃/", english: "It was very good!", order: 374 },
  { id: "vocab-385", french: "tu", ipa: "/ty/", english: "informal you", order: 375 },
  { id: "vocab-386", french: "vous", ipa: "/vu/", english: "polite you", order: 376 },
];

async function seedLessonForty() {
  await db.collection("lessons").doc("lesson-40").set(lesson, { merge: true });
  await db.collection("lessonDetails").doc("lesson-40").set(lessonDetail, { merge: true });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-40",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 40 seed completed via Firebase Admin SDK.");
}

seedLessonForty().catch((error) => {
  console.error("Failed to seed lesson 40:", error);
  process.exitCode = 1;
});
