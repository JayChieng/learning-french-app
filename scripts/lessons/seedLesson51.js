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
  title: "Lesson 51: Describing Weather and Temperature",
  category: "Weather",
  content:
    "Learn common French expressions for describing weather conditions, asking about the weather, and talking about temperatures. Estimated study time: 25–30 minutes.",
  order: 51,
};

const lessonDetail = {
  lessonId: "lesson-51",
  summary:
    "Use Il fait, weather verbs, and Il y a to describe conditions, ask about the forecast, and say how warm or cold it is.",
  dialogues: [
    {
      id: "lesson-51-dialogue-1",
      title: "Checking the weather",
      lines: [
        {
          speaker: "A",
          french: "Quel temps fait-il aujourd’hui ?",
          english: "What’s the weather like today?",
        },
        {
          speaker: "B",
          french: "Il fait froid et il y a des nuages.",
          english: "It’s cold and there are clouds.",
        },
        {
          speaker: "A",
          french: "Est-ce qu’il pleut ?",
          english: "Is it raining?",
        },
        {
          speaker: "B",
          french: "Non, mais il y a du vent.",
          english: "No, but it’s windy.",
        },
        {
          speaker: "A",
          french: "Quelle température fait-il ?",
          english: "What’s the temperature?",
        },
        {
          speaker: "B",
          french: "Il fait dix degrés. Il fait très froid !",
          english: "It’s 10 degrees. It’s very cold!",
        },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-51-explanation-1",
      title: "Use Il fait to describe the weather",
      body:
        "Il fait chaud means “It’s hot,” and Il fait froid means “It’s cold.” The phrase is idiomatic, so translate the whole expression rather than translating each word literally. You can also say Il fait beau (The weather is nice), Il fait mauvais (The weather is bad), and Il fait frais (It’s cool).",
    },
    {
      id: "lesson-51-explanation-2",
      title: "Describe weather conditions",
      body:
        "Use Il pleut for “It’s raining” and Il neige for “It’s snowing.” Use Il y a du soleil for “It’s sunny,” Il y a du vent for “It’s windy,” and Il y a des nuages for “There are clouds.” C’est nuageux means “It’s cloudy.”",
    },
    {
      id: "lesson-51-explanation-3",
      title: "Ask what the weather is like",
      body:
        "Ask Quel temps fait-il ? or Il fait quel temps ? to ask “What’s the weather like?” Use Est-ce qu’il fait froid ? to ask “Is it cold?” and Est-ce qu’il pleut ? to ask “Is it raining?” Quelle température fait-il ? asks “What’s the temperature?”",
    },
    {
      id: "lesson-51-explanation-4",
      title: "Talk about temperature",
      body:
        "Say Il fait dix degrés for “It’s 10 degrees” and Il fait vingt degrés for “It’s 20 degrees.” Use moins for below zero: Il fait moins cinq degrés means “It’s minus 5 degrees.” Très means “very,” and un peu means “a little.”",
    },
  ],
};

const words = [
  {
    id: "vocab-555",
    french: "Il fait chaud.",
    ipa: "/il fɛ ʃo/",
    english: "It's hot.",
    order: 556,
  },
  {
    id: "vocab-556",
    french: "Il fait froid.",
    ipa: "/il fɛ fʁwa/",
    english: "It's cold.",
    order: 557,
  },
  {
    id: "vocab-557",
    french: "Il fait beau.",
    ipa: "/il fɛ bo/",
    english: "The weather is nice.",
    order: 558,
  },
  {
    id: "vocab-558",
    french: "Il fait mauvais.",
    ipa: "/il fɛ mo.vɛ/",
    english: "The weather is bad.",
    order: 559,
  },
  {
    id: "vocab-559",
    french: "Il fait frais.",
    ipa: "/il fɛ fʁɛ/",
    english: "It's cool.",
    order: 560,
  },
  {
    id: "vocab-560",
    french: "Il pleut.",
    ipa: "/il plø/",
    english: "It's raining.",
    order: 561,
  },
  {
    id: "vocab-561",
    french: "Il neige.",
    ipa: "/il nɛʒ/",
    english: "It's snowing.",
    order: 562,
  },
  {
    id: "vocab-562",
    french: "Il y a du soleil.",
    ipa: "/il ja dy sɔ.lɛj/",
    english: "It's sunny.",
    order: 563,
  },
  {
    id: "vocab-563",
    french: "Il y a du vent.",
    ipa: "/il ja dy vɑ̃/",
    english: "It's windy.",
    order: 564,
  },
  {
    id: "vocab-564",
    french: "Il y a des nuages.",
    ipa: "/il ja de nɥaʒ/",
    english: "There are clouds.",
    order: 565,
  },
  {
    id: "vocab-565",
    french: "C'est nuageux.",
    ipa: "/sɛ nɥa.ʒø/",
    english: "It's cloudy.",
    order: 566,
  },
  {
    id: "vocab-566",
    french: "Quel temps fait-il ?",
    ipa: "/kɛl tɑ̃ fɛ til/",
    english: "What's the weather like?",
    order: 567,
  },
  {
    id: "vocab-567",
    french: "Il fait quel temps ?",
    ipa: "/il fɛ kɛl tɑ̃/",
    english: "What's the weather like?",
    order: 568,
  },
  {
    id: "vocab-568",
    french: "Est-ce qu'il fait froid ?",
    ipa: "/ɛs kil fɛ fʁwa/",
    english: "Is it cold?",
    order: 569,
  },
  {
    id: "vocab-569",
    french: "Est-ce qu'il pleut ?",
    ipa: "/ɛs kil plø/",
    english: "Is it raining?",
    order: 570,
  },
  {
    id: "vocab-570",
    french: "Quelle température fait-il ?",
    ipa: "/kɛl tɑ̃.pe.ʁa.tyʁ fɛ til/",
    english: "What's the temperature?",
    order: 571,
  },
  {
    id: "vocab-571",
    french: "Il fait dix degrés.",
    ipa: "/il fɛ dis də.ɡʁe/",
    english: "It's 10 degrees.",
    order: 572,
  },
  {
    id: "vocab-572",
    french: "Il fait vingt degrés.",
    ipa: "/il fɛ vɛ̃ də.ɡʁe/",
    english: "It's 20 degrees.",
    order: 573,
  },
  {
    id: "vocab-573",
    french: "Il fait moins cinq degrés.",
    ipa: "/il fɛ mwɛ̃ sɛ̃k də.ɡʁe/",
    english: "It's minus 5 degrees.",
    order: 574,
  },
  {
    id: "vocab-574",
    french: "Il fait très froid.",
    ipa: "/il fɛ tʁɛ fʁwa/",
    english: "It's very cold.",
    order: 575,
  },
  {
    id: "vocab-575",
    french: "Il fait un peu chaud.",
    ipa: "/il fɛ œ̃ pø ʃo/",
    english: "It's a little hot.",
    order: 576,
  },
].map((word) => ({ ...word, lessonId: "lesson-51" }));

async function seedLessonFiftyOne() {
  await db.collection("lessons").doc("lesson-51").set(lesson, { merge: true });
  await db.collection("lessonDetails").doc("lesson-51").set(lessonDetail, { merge: true });

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

  console.log("Lesson 51 seed completed via Firebase Admin SDK.");
}

seedLessonFiftyOne().catch((error) => {
  console.error("Failed to seed lesson 51:", error);
  process.exitCode = 1;
});
