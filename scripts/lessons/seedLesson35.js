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
  title: "Lesson 35: Building Sentences with Avoir, Aimer, Lire, and Regarder",
  category: "Everyday Sentences",
  content:
    "Build natural sentences with everyday objects and practise the present tense of lire (to read).",
  order: 35,
};

const lessonDetail = {
  lessonId: "lesson-35",
  summary:
    "Use avoir, aimer, lire, and regarder to talk about familiar objects and activities. Learn the present-tense forms of lire.",
  dialogues: [
    {
      id: "lesson-35-dialogue-1",
      title: "Talking about what I have and like",
      lines: [
        { speaker: "A", french: "Tu as un téléphone ?", english: "Do you have a phone?" },
        { speaker: "B", french: "Oui, j'ai un téléphone.", english: "Yes, I have a phone." },
        { speaker: "A", french: "Tu aimes le café ?", english: "Do you like coffee?" },
        { speaker: "B", french: "Oui, j'aime le café.", english: "Yes, I like coffee." },
      ],
    },
    {
      id: "lesson-35-dialogue-2",
      title: "Talking about reading and watching",
      lines: [
        { speaker: "A", french: "Qu'est-ce que tu lis ?", english: "What are you reading?" },
        { speaker: "B", french: "Je lis un livre.", english: "I am reading a book." },
        { speaker: "A", french: "Et le soir ?", english: "And in the evening?" },
        { speaker: "B", french: "Je regarde un film.", english: "I watch a film." },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-35-explanation-1",
      title: "Build sentences with everyday articles",
      body:
        "Keep the article with each noun: J'ai un téléphone (I have a phone), J'ai une voiture (I have a car), J'aime le café (I like coffee), Je lis un livre (I read a book), Je regarde un film (I watch a film). Use un with masculine nouns, une with feminine nouns, and le/la when talking about a specific singular thing.",
    },
    {
      id: "lesson-35-explanation-2",
      title: "New verbs",
      body:
        "avoir /a.vwaʁ/ — to have; aimer /e.me/ — to like or love; lire /liʁ/ — to read; regarder /ʁə.ɡaʁ.de/ — to watch or look at.",
    },
    {
      id: "lesson-35-explanation-3",
      title: "Present tense of lire (to read)",
      body:
        "Je lis /ʒə li/ — I read; Tu lis /ty li/ — you read; Il lit /il li/ — he reads; Elle lit /ɛl li/ — she reads; Nous lisons /nu li.zɔ̃/ — we read; Vous lisez /vu li.ze/ — you read; Ils lisent /il liz/ — they read; Elles lisent /ɛl liz/ — they read.",
    },
  ],
};

const words = [
  { id: "vocab-292", french: "avoir", ipa: "/a.vwaʁ/", english: "to have", order: 282 },
  { id: "vocab-293", french: "aimer", ipa: "/e.me/", english: "to like / to love", order: 283 },
  { id: "vocab-294", french: "lire", ipa: "/liʁ/", english: "to read", order: 284 },
  { id: "vocab-295", french: "regarder", ipa: "/ʁə.ɡaʁ.de/", english: "to watch / to look at", order: 285 },
  { id: "vocab-296", french: "J'ai un téléphone.", ipa: "/ʒe œ̃ te.le.fɔn/", english: "I have a phone.", order: 286 },
  { id: "vocab-297", french: "J'ai une voiture.", ipa: "/ʒe yn vwa.tyʁ/", english: "I have a car.", order: 287 },
  { id: "vocab-298", french: "J'aime le café.", ipa: "/ʒɛm lə ka.fe/", english: "I like coffee.", order: 288 },
  { id: "vocab-299", french: "Je lis un livre.", ipa: "/ʒə li œ̃ livʁ/", english: "I read a book.", order: 289 },
  { id: "vocab-300", french: "Je regarde un film.", ipa: "/ʒə ʁə.ɡaʁd œ̃ film/", english: "I watch a film.", order: 290 },
  { id: "vocab-301", french: "Je lis", ipa: "/ʒə li/", english: "I read", order: 291 },
  { id: "vocab-302", french: "Tu lis", ipa: "/ty li/", english: "You read (singular / informal)", order: 292 },
  { id: "vocab-303", french: "Il lit", ipa: "/il li/", english: "He reads", order: 293 },
  { id: "vocab-304", french: "Elle lit", ipa: "/ɛl li/", english: "She reads", order: 294 },
  { id: "vocab-305", french: "Nous lisons", ipa: "/nu li.zɔ̃/", english: "We read", order: 295 },
  { id: "vocab-306", french: "Vous lisez", ipa: "/vu li.ze/", english: "You read (plural / formal)", order: 296 },
  { id: "vocab-307", french: "Ils lisent", ipa: "/il liz/", english: "They read (masculine / mixed)", order: 297 },
  { id: "vocab-308", french: "Elles lisent", ipa: "/ɛl liz/", english: "They read (feminine)", order: 298 },
];

async function seedLessonThirtyFive() {
  await db.collection("lessons").doc("lesson-35").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-35").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-35",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 35 seed completed via Firebase Admin SDK.");
}

seedLessonThirtyFive().catch((error) => {
  console.error("Failed to seed lesson 35:", error);
  process.exitCode = 1;
});
