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
  title: "Lesson 42: Mini Conversation at a Restaurant",
  category: "Food and Drink",
  content:
    "Practise ordering a drink and a meal politely, responding to the server, and asking for the bill.",
  order: 42,
};

const lessonDetail = {
  lessonId: "lesson-42",
  summary:
    "Follow a short restaurant conversation: ask for water, order chicken with rice, say that is all, and request the bill.",
  dialogues: [
    {
      id: "lesson-42-dialogue-1",
      title: "At a restaurant",
      lines: [
        {
          speaker: "Serveur",
          french: "Bonjour ! Vous désirez quelque chose à boire ?",
          english: "Hello! Would you like something to drink?",
        },
        {
          speaker: "Client",
          french: "Oui, je voudrais de l’eau, s’il vous plaît.",
          english: "Yes, I would like some water, please.",
        },
        {
          speaker: "Serveur",
          french: "Et pour manger ?",
          english: "And to eat?",
        },
        {
          speaker: "Client",
          french: "Je voudrais du poulet avec du riz.",
          english: "I would like chicken with rice.",
        },
        {
          speaker: "Serveur",
          french: "Très bien. Autre chose ?",
          english: "Very good. Anything else?",
        },
        {
          speaker: "Client",
          french: "Non, merci. C’est tout.",
          english: "No, thank you. That’s all.",
        },
        {
          speaker: "Client",
          french: "L’addition, s’il vous plaît.",
          english: "The bill, please.",
        },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-42-explanation-1",
      title: "Order politely with je voudrais",
      body:
        "Je voudrais /ʒə vu.dʁɛ/ means “I would like…” and is a polite way to order. Use it for both a drink and a meal: Je voudrais de l’eau (I would like some water) and Je voudrais du poulet avec du riz (I would like chicken with rice).",
    },
    {
      id: "lesson-42-explanation-2",
      title: "Useful restaurant expressions",
      body:
        "Vous désirez quelque chose à boire ? means “Would you like something to drink?” Autre chose ? means “Anything else?” Say C’est tout (That’s all) when you have finished ordering, then L’addition, s’il vous plaît (The bill, please) to ask to pay.",
    },
  ],
};

const words = [
  {
    id: "vocab-404",
    french: "Bonjour ! Vous désirez quelque chose à boire ?",
    ipa: "/bɔ̃.ʒuʁ | vu de.zi.ʁe kɛlk ʃoz a bwaʁ/",
    english: "Hello! Would you like something to drink?",
    order: 394,
  },
  {
    id: "vocab-405",
    french: "Oui, je voudrais de l’eau, s’il vous plaît.",
    ipa: "/wi | ʒə vu.dʁɛ də lo sil vu plɛ/",
    english: "Yes, I would like some water, please.",
    order: 395,
  },
  {
    id: "vocab-406",
    french: "Et pour manger ?",
    ipa: "/e puʁ mɑ̃.ʒe/",
    english: "And to eat?",
    order: 396,
  },
  {
    id: "vocab-407",
    french: "Je voudrais du poulet avec du riz.",
    ipa: "/ʒə vu.dʁɛ dy pu.lɛ a.vɛk dy ʁi/",
    english: "I would like chicken with rice.",
    order: 397,
  },
  {
    id: "vocab-408",
    french: "Très bien. Autre chose ?",
    ipa: "/tʁɛ bjɛ̃ | otʁ ʃoz/",
    english: "Very good. Anything else?",
    order: 398,
  },
  {
    id: "vocab-409",
    french: "Non, merci. C’est tout.",
    ipa: "/nɔ̃ mɛʁ.si | sɛ tu/",
    english: "No, thank you. That’s all.",
    order: 399,
  },
  {
    id: "vocab-410",
    french: "L’addition, s’il vous plaît.",
    ipa: "/la.di.sjɔ̃ sil vu plɛ/",
    english: "The bill, please.",
    order: 400,
  },
].map((word) => ({ ...word, lessonId: "lesson-42" }));

async function seedLessonFortyTwo() {
  await db.collection("lessons").doc("lesson-42").set(lesson, { merge: true });
  await db.collection("lessonDetails").doc("lesson-42").set(lessonDetail, { merge: true });

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

  console.log("Lesson 42 seed completed via Firebase Admin SDK.");
}

seedLessonFortyTwo().catch((error) => {
  console.error("Failed to seed lesson 42:", error);
  process.exitCode = 1;
});
