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
  title: "Lesson 49: Giving Directions and Landmarks",
  category: "Directions",
  content:
    "Learn how to give more detailed directions, describe routes, and identify common places around town. Estimated study time: 25–30 minutes.",
  order: 49,
};

const lessonDetail = {
  lessonId: "lesson-49",
  summary:
    "Build on Lesson 48 with verbs for giving directions, phrases for describing routes, and useful town landmarks.",
  dialogues: [
    {
      id: "lesson-49-dialogue-1",
      title: "Getting directions to the station",
      lines: [
        {
          speaker: "A",
          french: "Excusez-moi, comment aller à la gare ?",
          english: "Excuse me, how do I get to the station?",
        },
        {
          speaker: "B",
          french: "Continuez tout droit jusqu’au pont.",
          english: "Continue straight ahead as far as the bridge.",
        },
        {
          speaker: "A",
          french: "Et après le pont ?",
          english: "And after the bridge?",
        },
        {
          speaker: "B",
          french: "Tournez à gauche dans l’avenue.",
          english: "Turn left onto the avenue.",
        },
        {
          speaker: "A",
          french: "Je traverse la place ?",
          english: "Do I cross the square?",
        },
        {
          speaker: "B",
          french: "Oui. Suivez la rue jusqu’au magasin.",
          english: "Yes. Follow the street as far as the store.",
        },
        {
          speaker: "A",
          french: "La gare est en face du magasin ?",
          english: "Is the station opposite the store?",
        },
        {
          speaker: "B",
          french: "Oui, elle est au bout de l’avenue.",
          english: "Yes, it is at the end of the avenue.",
        },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-49-explanation-1",
      title: "Use verbs to give directions",
      body:
        "Continuez means “continue,” tournez means “turn,” traversez means “cross,” prenez means “take,” and suivez means “follow.” These are polite vous commands commonly used when giving directions.",
    },
    {
      id: "lesson-49-explanation-2",
      title: "Describe a route",
      body:
        "Use jusqu’à to say “as far as” or “until,” au bout de for “at the end of,” and en face de for “opposite.” For example, Continuez jusqu’au pont means “Continue as far as the bridge.”",
    },
    {
      id: "lesson-49-explanation-3",
      title: "Places around town",
      body:
        "Le pont means “the bridge,” la place means “the square,” l’avenue means “the avenue,” and le magasin means “the store.” Use these landmarks to make directions more specific.",
    },
    {
      id: "lesson-49-explanation-4",
      title: "Link directions to Lesson 48",
      body:
        "Combine the route verbs in this lesson with à gauche, à droite, tout droit, près de, and loin de from Lesson 48. For example: Tournez à gauche, puis continuez tout droit (Turn left, then continue straight ahead).",
    },
  ],
};

const words = [
  {
    id: "vocab-531",
    french: "tourner",
    ipa: "/tuʁ.ne/",
    english: "to turn",
    order: 532,
  },
  {
    id: "vocab-532",
    french: "traverser",
    ipa: "/tʁa.vɛʁ.se/",
    english: "to cross",
    order: 533,
  },
  {
    id: "vocab-533",
    french: "continuer",
    ipa: "/kɔ̃.ti.nɥe/",
    english: "to continue",
    order: 534,
  },
  {
    id: "vocab-534",
    french: "prendre",
    ipa: "/pʁɑ̃dʁ/",
    english: "to take",
    order: 535,
  },
  {
    id: "vocab-535",
    french: "suivre",
    ipa: "/sɥivʁ/",
    english: "to follow",
    order: 536,
  },
  {
    id: "vocab-536",
    french: "le pont",
    ipa: "/lə pɔ̃/",
    english: "the bridge",
    order: 537,
  },
  {
    id: "vocab-537",
    french: "la place",
    ipa: "/la plas/",
    english: "the square",
    order: 538,
  },
  {
    id: "vocab-538",
    french: "l’avenue",
    ipa: "/la.və.ny/",
    english: "the avenue",
    order: 539,
  },
  {
    id: "vocab-539",
    french: "le magasin",
    ipa: "/lə ma.ɡa.zɛ̃/",
    english: "the store",
    order: 540,
  },
  {
    id: "vocab-540",
    french: "au bout de",
    ipa: "/o bu də/",
    english: "at the end of",
    order: 541,
  },
  {
    id: "vocab-541",
    french: "en face de",
    ipa: "/ɑ̃ fas də/",
    english: "opposite",
    order: 542,
  },
  {
    id: "vocab-542",
    french: "jusqu’à",
    ipa: "/ʒys.ka/",
    english: "until; as far as",
    order: 543,
  },
].map((word) => ({ ...word, lessonId: "lesson-49" }));

async function seedLessonFortyNine() {
  await db.collection("lessons").doc("lesson-49").set(lesson, { merge: true });
  await db.collection("lessonDetails").doc("lesson-49").set(lessonDetail, { merge: true });

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

  console.log("Lesson 49 seed completed via Firebase Admin SDK.");
}

seedLessonFortyNine().catch((error) => {
  console.error("Failed to seed lesson 49:", error);
  process.exitCode = 1;
});
