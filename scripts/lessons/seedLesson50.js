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
  title: "Lesson 50: Talking About the Weather",
  category: "Weather",
  content:
    "Learn how to describe the weather, talk about temperature, and discuss what the weather is like outside. Estimated study time: 25–30 minutes.",
  order: 50,
};

const lessonDetail = {
  lessonId: "lesson-50",
  summary:
    "Learn essential weather words and use simple French expressions to describe sunshine, rain, snow, clouds, wind, and temperature.",
  dialogues: [
    {
      id: "lesson-50-dialogue-1",
      title: "Talking about today's weather",
      lines: [
        {
          speaker: "A",
          french: "Quel temps fait-il aujourd’hui ?",
          english: "What is the weather like today?",
        },
        {
          speaker: "B",
          french: "Il fait beau et chaud.",
          english: "The weather is nice and hot.",
        },
        {
          speaker: "A",
          french: "Il y a du soleil ?",
          english: "Is it sunny?",
        },
        {
          speaker: "B",
          french: "Oui, mais il y a aussi du vent.",
          english: "Yes, but it is also windy.",
        },
        {
          speaker: "A",
          french: "Et demain ?",
          english: "And tomorrow?",
        },
        {
          speaker: "B",
          french: "Le temps sera nuageux. Peut-être qu’il pleuvra.",
          english: "The weather will be cloudy. Maybe it will rain.",
        },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-50-explanation-1",
      title: "Ask about the weather",
      body:
        "Use Quel temps fait-il ? to ask “What is the weather like?” You can add aujourd’hui (today) or demain (tomorrow).",
    },
    {
      id: "lesson-50-explanation-2",
      title: "Describe temperature and conditions",
      body:
        "Use Il fait with chaud (hot), froid (cold), frais (cool), beau (nice), or mauvais (bad): Il fait froid means “It is cold.” Use Il fait beau to say “The weather is nice.”",
    },
    {
      id: "lesson-50-explanation-3",
      title: "Talk about sun, clouds, and wind",
      body:
        "Use Il y a du soleil for “It is sunny,” Il y a du vent for “It is windy,” and Il y a un nuage for “There is a cloud.” Le temps est nuageux means “The weather is cloudy.”",
    },
    {
      id: "lesson-50-explanation-4",
      title: "Talk about rain and snow",
      body:
        "Use Il pleut for “It is raining” and Il neige for “It is snowing.” The nouns are la pluie (rain) and la neige (snow).",
    },
  ],
};

const words = [
  {
    id: "vocab-543",
    french: "le temps",
    ipa: "/lə tɑ̃/",
    english: "the weather",
    order: 544,
  },
  {
    id: "vocab-544",
    french: "le soleil",
    ipa: "/lə sɔ.lɛj/",
    english: "the sun",
    order: 545,
  },
  {
    id: "vocab-545",
    french: "la pluie",
    ipa: "/la plɥi/",
    english: "the rain",
    order: 546,
  },
  {
    id: "vocab-546",
    french: "la neige",
    ipa: "/la nɛʒ/",
    english: "the snow",
    order: 547,
  },
  {
    id: "vocab-547",
    french: "le vent",
    ipa: "/lə vɑ̃/",
    english: "the wind",
    order: 548,
  },
  {
    id: "vocab-548",
    french: "un nuage",
    ipa: "/œ̃ nɥaʒ/",
    english: "a cloud",
    order: 549,
  },
  {
    id: "vocab-549",
    french: "chaud",
    ipa: "/ʃo/",
    english: "hot",
    order: 550,
  },
  {
    id: "vocab-550",
    french: "froid",
    ipa: "/fʁwa/",
    english: "cold",
    order: 551,
  },
  {
    id: "vocab-551",
    french: "frais",
    ipa: "/fʁɛ/",
    english: "cool",
    order: 552,
  },
  {
    id: "vocab-552",
    french: "beau",
    ipa: "/bo/",
    english: "beautiful / nice",
    order: 553,
  },
  {
    id: "vocab-553",
    french: "mauvais",
    ipa: "/mo.vɛ/",
    english: "bad",
    order: 554,
  },
  {
    id: "vocab-554",
    french: "nuageux",
    ipa: "/nɥa.ʒø/",
    english: "cloudy",
    order: 555,
  },
].map((word) => ({ ...word, lessonId: "lesson-50" }));

async function seedLessonFifty() {
  await db.collection("lessons").doc("lesson-50").set(lesson, { merge: true });
  await db.collection("lessonDetails").doc("lesson-50").set(lessonDetail, { merge: true });

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

  console.log("Lesson 50 seed completed via Firebase Admin SDK.");
}

seedLessonFifty().catch((error) => {
  console.error("Failed to seed lesson 50:", error);
  process.exitCode = 1;
});
