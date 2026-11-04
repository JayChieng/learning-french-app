import fs from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
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
  title: "Lesson 48: Asking for Directions",
  category: "Directions",
  content:
    "Learn how to ask where places are, understand basic directions, and explain where you are going. Estimated study time: 25–30 minutes.",
  order: 48,
};

const lessonDetail = {
  lessonId: "lesson-48",
  summary:
    "Learn essential words for asking where places are and understanding directions such as left, right, and straight ahead.",
  dialogues: [
    {
      id: "lesson-48-dialogue-1",
      title: "Finding the intersection",
      lines: [
        {
          speaker: "A",
          french: "Bonjour, excusez-moi. Où est le carrefour ?",
          english: "Hello, excuse me. Where is the intersection?",
        },
        {
          speaker: "B",
          french: "Allez tout droit dans la rue.",
          english: "Go straight ahead along the street.",
        },
        {
          speaker: "A",
          french: "Le carrefour est près d’ici ?",
          english: "Is the intersection near here?",
        },
        {
          speaker: "B",
          french: "Oui, il est près du feu rouge.",
          english: "Yes, it is near the traffic light.",
        },
        {
          speaker: "A",
          french: "Le coin est à gauche ou à droite ?",
          english: "Is the corner to the left or to the right?",
        },
        {
          speaker: "B",
          french: "Le coin est à gauche.",
          english: "The corner is on the left.",
        },
        {
          speaker: "A",
          french: "La rue est loin d’ici ?",
          english: "Is the street far from here?",
        },
        {
          speaker: "B",
          french: "Non, elle est ici, à droite.",
          english: "No, it is here, on the right.",
        },
        {
          speaker: "A",
          french: "Où est le feu rouge ?",
          english: "Where is the traffic light?",
        },
        {
          speaker: "B",
          french: "Il est là, près du carrefour.",
          english: "It is there, near the intersection.",
        },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-48-explanation-1",
      title: "Ask where a place is",
      body:
        "Use où to ask “where”: Où est le carrefour ? means “Where is the intersection?” Ici means “here,” and là means “there.”",
    },
    {
      id: "lesson-48-explanation-2",
      title: "Give simple directions",
      body:
        "Use à gauche for “to the left,” à droite for “to the right,” and tout droit for “straight ahead.” These expressions can guide someone along a street or toward a landmark.",
    },
    {
      id: "lesson-48-explanation-3",
      title: "Describe how close a place is",
      body:
        "Use près de to mean “near” and loin de to mean “far from.” Before a vowel sound, de can contract to d’: près d’ici means “near here,” and loin d’ici means “far from here.”",
    },
    {
      id: "lesson-48-explanation-4",
      title: "Name streets and landmarks",
      body:
        "La rue means “the street,” le coin means “the corner,” le carrefour means “the intersection,” and le feu rouge means “the traffic light.”",
    },
  ],
};

const words = [
  {
    id: "vocab-519",
    french: "où",
    ipa: "/u/",
    english: "where",
    order: 520,
  },
  {
    id: "vocab-520",
    french: "ici",
    ipa: "/i.si/",
    english: "here",
    order: 521,
  },
  {
    id: "vocab-521",
    french: "là",
    ipa: "/la/",
    english: "there",
    order: 522,
  },
  {
    id: "vocab-522",
    french: "à gauche",
    ipa: "/a ɡoʃ/",
    english: "to the left",
    order: 523,
  },
  {
    id: "vocab-523",
    french: "à droite",
    ipa: "/a dʁwat/",
    english: "to the right",
    order: 524,
  },
  {
    id: "vocab-524",
    french: "tout droit",
    ipa: "/tu dʁwa/",
    english: "straight ahead",
    order: 525,
  },
  {
    id: "vocab-525",
    french: "près de",
    ipa: "/pʁɛ də/",
    english: "near",
    order: 526,
  },
  {
    id: "vocab-526",
    french: "loin de",
    ipa: "/lwɛ̃ də/",
    english: "far from",
    order: 527,
  },
  {
    id: "vocab-527",
    french: "la rue",
    ipa: "/la ʁy/",
    english: "the street",
    order: 528,
  },
  {
    id: "vocab-528",
    french: "le coin",
    ipa: "/lə kwɛ̃/",
    english: "the corner",
    order: 529,
  },
  {
    id: "vocab-529",
    french: "le carrefour",
    ipa: "/lə kaʁ.fuʁ/",
    english: "the intersection",
    order: 530,
  },
  {
    id: "vocab-530",
    french: "le feu rouge",
    ipa: "/lə fø ʁuʒ/",
    english: "the traffic light",
    order: 531,
  },
].map((word) => ({ ...word, lessonId: "lesson-48" }));

async function seedLessonFortyEight() {
  await db.collection("lessons").doc("lesson-48").set(lesson, { merge: true });
  await db.collection("lessonDetails").doc("lesson-48").set(lessonDetail, { merge: true });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: word.lessonId,
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

  console.log("Lesson 48 seed completed via Firebase Admin SDK.");
}

seedLessonFortyEight().catch((error) => {
  console.error("Failed to seed lesson 48:", error);
  process.exitCode = 1;
});
