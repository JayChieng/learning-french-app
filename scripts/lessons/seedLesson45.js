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
  title: "Lesson 45: Colours",
  category: "Shopping",
  content:
    "Learn common French colour words, their masculine and feminine forms, and how colour adjectives agree. Estimated study time: 25–30 minutes.",
  order: 45,
};

const lessonDetail = {
  lessonId: "lesson-45",
  summary:
    "Learn common colours, shades and colour-adjective agreement without the shopping phrases and clothing combinations in Lesson 46.",
  dialogues: [
    {
      id: "lesson-45-dialogue-1",
      title: "Learning colour words",
      lines: [
        {
          speaker: "Professeur",
          french: "Quelle est votre couleur préférée ?",
          english: "What is your favourite colour?",
        },
        {
          speaker: "Élève",
          french: "Je préfère le bleu.",
          english: "I prefer blue.",
        },
        {
          speaker: "Professeur",
          french: "Et quelle couleur est le contraire de blanc ?",
          english: "And which colour is the opposite of white?",
        },
        {
          speaker: "Élève",
          french: "C’est noir.",
          english: "It’s black.",
        },
        {
          speaker: "Professeur",
          french: "Comment dit-on « green » en français ?",
          english: "How do you say “green” in French?",
        },
        {
          speaker: "Élève",
          french: "On dit vert.",
          english: "You say vert.",
        },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-45-explanation-1",
      title: "Common colours and shades",
      body:
        "Common colours are noir / noire (black), blanc / blanche (white), rouge (red), bleu / bleue (blue), vert / verte (green), gris / grise (grey), jaune (yellow), orange (orange), rose (pink), violet / violette (purple), marron (brown), and beige (beige). Other useful colour words are turquoise (turquoise), bleu marine (navy blue), clair / claire (light), and foncé / foncée (dark).",
    },
    {
      id: "lesson-45-explanation-2",
      title: "Make the colour agree with the noun",
      body:
        "A simple colour adjective usually follows the noun and agrees with it in gender and number: un objet noir /œ̃ nɔ̃.bʁ nwaʁ/, une fleur noire /yn flœʁ nwaʁ/, des objets noirs, des fleurs noires. Notice the irregular feminine forms blanc /blɑ̃/ → blanche /blɑ̃ʃ/, vert /vɛʁ/ → verte /vɛʁt/, violet /vjɔ.lɛ/ → violette /vjɔ.lɛt/, and gris /ɡʁi/ → grise /ɡʁiz/.",
    },
    {
      id: "lesson-45-explanation-3",
      title: "Colours with the same or invariable form",
      body:
        "Colours ending in -e often have the same masculine and feminine form: un objet rouge, une fleur rouge. Orange and marron are generally invariable when used as colour adjectives. Beige agrees normally: un objet beige, des fleurs beiges.",
    },
    {
      id: "lesson-45-explanation-4",
      title: "Light, dark and compound colours",
      body:
        "Use clair / claire for a light shade and foncé / foncée for a dark shade. Compound colour names such as bleu marine are generally invariable when used as colour adjectives. In Lesson 46, practise combining these colour words with clothing vocabulary.",
    },
  ],
};

const words = [
  {
    id: "vocab-451",
    french: "noir / noire",
    ipa: "/nwaʁ/",
    english: "black",
    order: 452,
    imageColor: "#111827",
  },
  {
    id: "vocab-452",
    french: "blanc / blanche",
    ipa: "/blɑ̃/ · /blɑ̃ʃ/",
    english: "white",
    order: 453,
    imageColor: "#ffffff",
  },
  {
    id: "vocab-453",
    french: "rouge",
    ipa: "/ʁuʒ/",
    english: "red",
    order: 454,
    imageColor: "#dc2626",
  },
  {
    id: "vocab-454",
    french: "bleu / bleue",
    ipa: "/blø/",
    english: "blue",
    order: 455,
    imageColor: "#2563eb",
  },
  {
    id: "vocab-455",
    french: "vert / verte",
    ipa: "/vɛʁ/ · /vɛʁt/",
    english: "green",
    order: 456,
    imageColor: "#16a34a",
  },
  {
    id: "vocab-456",
    french: "gris / grise",
    ipa: "/ɡʁi/ · /ɡʁiz/",
    english: "grey",
    order: 457,
    imageColor: "#6b7280",
  },
  {
    id: "vocab-462",
    french: "jaune",
    ipa: "/ʒon/",
    english: "yellow",
    order: 463,
    imageColor: "#facc15",
  },
  {
    id: "vocab-463",
    french: "orange",
    ipa: "/ɔ.ʁɑ̃ʒ/",
    english: "orange",
    order: 464,
    imageColor: "#f97316",
  },
  {
    id: "vocab-464",
    french: "rose",
    ipa: "/ʁoz/",
    english: "pink",
    order: 465,
    imageColor: "#ec4899",
  },
  {
    id: "vocab-465",
    french: "violet / violette",
    ipa: "/vjɔ.lɛ/ · /vjɔ.lɛt/",
    english: "purple / violet",
    order: 466,
    imageColor: "#8b5cf6",
  },
  {
    id: "vocab-466",
    french: "marron",
    ipa: "/ma.ʁɔ̃/",
    english: "brown",
    order: 467,
    imageColor: "#78350f",
  },
  {
    id: "vocab-467",
    french: "beige",
    ipa: "/bɛʒ/",
    english: "beige",
    order: 468,
    imageColor: "#d6c3a1",
  },
  {
    id: "vocab-468",
    french: "turquoise",
    ipa: "/tyʁ.kwaz/",
    english: "turquoise",
    order: 469,
    imageColor: "#14b8a6",
  },
  {
    id: "vocab-469",
    french: "clair / claire",
    ipa: "/klɛʁ/",
    english: "light (colour)",
    order: 470,
    imageColor: "#93c5fd",
  },
  {
    id: "vocab-470",
    french: "foncé / foncée",
    ipa: "/fɔ̃.se/",
    english: "dark (colour)",
    order: 471,
    imageColor: "#1f2937",
  },
  {
    id: "vocab-471",
    french: "bleu marine",
    ipa: "/blø ma.ʁin/",
    english: "navy blue",
    order: 472,
    imageColor: "#1e3a8a",
  },
].map((word) => ({ ...word, lessonId: "lesson-45" }));

async function seedLessonFortyFive() {
  await db.collection("lessons").doc("lesson-45").set(lesson, { merge: true });
  await db.collection("lessonDetails").doc("lesson-45").set(lessonDetail, { merge: true });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: word.lessonId,
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
          imageColor: word.imageColor,
          imageUrl: FieldValue.delete(),
          imageAttribution: FieldValue.delete(),
          imageSourceUrl: FieldValue.delete(),
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 45 colour vocabulary seed completed via Firebase Admin SDK.");
}

seedLessonFortyFive().catch((error) => {
  console.error("Failed to seed lesson 45:", error);
  process.exitCode = 1;
});
