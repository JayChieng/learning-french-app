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
  title: "Lesson 38: Time and Frequency",
  category: "Daily Routine",
  content:
    "Talk about when you do things and how often, and ask and answer questions about daily routines.",
  order: 38,
};

const lessonDetail = {
  lessonId: "lesson-38",
  summary:
    "Learn common expressions for parts of the day, frequency, and asking about daily routines. Use these expressions with routine verbs to say when you wake up, work, exercise, and go to bed.",
  dialogues: [
    {
      id: "lesson-38-dialogue-1",
      title: "Talking about when you do things",
      lines: [
        { speaker: "A", french: "Tu te réveilles tôt ?", english: "Do you wake up early?" },
        { speaker: "B", french: "Oui, je me réveille tôt.", english: "Yes, I wake up early." },
        { speaker: "A", french: "Tu travailles le matin ?", english: "Do you work in the morning?" },
        { speaker: "B", french: "Oui, je travaille le matin.", english: "Yes, I work in the morning." },
        { speaker: "A", french: "Tu fais du sport le soir ?", english: "Do you exercise in the evening?" },
        { speaker: "B", french: "Parfois, je fais du sport le soir.", english: "Sometimes, I exercise in the evening." },
      ],
    },
    {
      id: "lesson-38-dialogue-2",
      title: "Asking about daily routines",
      lines: [
        { speaker: "A", french: "Tu te réveilles à quelle heure ?", english: "What time do you wake up?" },
        { speaker: "B", french: "Je me réveille à sept heures.", english: "I wake up at seven o'clock." },
        { speaker: "A", french: "Tu prends une douche le matin ?", english: "Do you take a shower in the morning?" },
        { speaker: "B", french: "Oui, je prends une douche le matin.", english: "Yes, I take a shower in the morning." },
        { speaker: "A", french: "Tu travailles tous les jours ?", english: "Do you work every day?" },
        { speaker: "B", french: "Non, je ne travaille pas tous les jours.", english: "No, I don't work every day." },
        { speaker: "A", french: "Tu te couches à quelle heure ?", english: "What time do you go to bed?" },
        { speaker: "B", french: "Je me couche à onze heures.", english: "I go to bed at eleven o'clock." },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-38-explanation-1",
      title: "Time and frequency expressions",
      body:
        "Use le matin (in the morning), l’après-midi (in the afternoon), le soir (in the evening), and la nuit (at night) to say when something happens. Tôt means early and tard means late. Frequency expressions include tous les jours (every day), souvent (often), parfois (sometimes), and toujours (always).",
    },
    {
      id: "lesson-38-explanation-2",
      title: "Combine expressions with routine verbs",
      body:
        "Place a time or frequency expression with the verb to describe your routine: Je me réveille tôt (I wake up early); Je travaille le matin (I work in the morning); Je fais du sport le soir (I exercise in the evening); Je me couche tard (I go to bed late).",
    },
    {
      id: "lesson-38-explanation-3",
      title: "Ask about routines",
      body:
        "Ask when someone does something with Tu ... à quelle heure ? (What time do you ...?). Ask a yes-or-no question with spoken word order and rising intonation, such as Tu prends une douche le matin ? Answer positively with Oui or negatively with ne ... pas: Non, je ne travaille pas tous les jours.",
    },
  ],
};

const words = [
  { id: "vocab-335", french: "le matin", ipa: "/lə ma.tɛ̃/", english: "in the morning", order: 325 },
  { id: "vocab-336", french: "l’après-midi", ipa: "/la.pʁɛ mi.di/", english: "in the afternoon", order: 326 },
  { id: "vocab-337", french: "le soir", ipa: "/lə swaʁ/", english: "in the evening", order: 327 },
  { id: "vocab-338", french: "la nuit", ipa: "/la nɥi/", english: "at night", order: 328 },
  { id: "vocab-339", french: "tôt", ipa: "/to/", english: "early", order: 329 },
  { id: "vocab-340", french: "tard", ipa: "/taʁ/", english: "late", order: 330 },
  { id: "vocab-341", french: "tous les jours", ipa: "/tu le ʒuʁ/", english: "every day", order: 331 },
  { id: "vocab-342", french: "souvent", ipa: "/su.vɑ̃/", english: "often", order: 332 },
  { id: "vocab-343", french: "parfois", ipa: "/paʁ.fwa/", english: "sometimes", order: 333 },
  { id: "vocab-344", french: "toujours", ipa: "/tu.ʒuʁ/", english: "always", order: 334 },
  { id: "vocab-345", french: "Je me réveille tôt.", ipa: "/ʒə mə ʁe.vɛj to/", english: "I wake up early.", order: 335 },
  { id: "vocab-346", french: "Je travaille le matin.", ipa: "/ʒə tʁa.vaj lə ma.tɛ̃/", english: "I work in the morning.", order: 336 },
  { id: "vocab-347", french: "Je fais du sport le soir.", ipa: "/ʒə fɛ dy spɔʁ lə swaʁ/", english: "I exercise in the evening.", order: 337 },
  { id: "vocab-348", french: "Je me couche tard.", ipa: "/ʒə mə kuʃ taʁ/", english: "I go to bed late.", order: 338 },
  { id: "vocab-349", french: "Tu te réveilles à quelle heure ?", ipa: "/ty tə ʁe.vɛj a kɛl œʁ/", english: "What time do you wake up?", order: 339 },
  { id: "vocab-350", french: "Je me réveille à sept heures.", ipa: "/ʒə mə ʁe.vɛj a sɛt œʁ/", english: "I wake up at seven o’clock.", order: 340 },
  { id: "vocab-351", french: "Tu prends une douche le matin ?", ipa: "/ty pʁɑ̃ yn duʃ lə ma.tɛ̃/", english: "Do you take a shower in the morning?", order: 341 },
  { id: "vocab-352", french: "Oui, je prends une douche le matin.", ipa: "/wi ʒə pʁɑ̃ yn duʃ lə ma.tɛ̃/", english: "Yes, I take a shower in the morning.", order: 342 },
  { id: "vocab-353", french: "Tu travailles tous les jours ?", ipa: "/ty tʁa.vaj tu le ʒuʁ/", english: "Do you work every day?", order: 343 },
  { id: "vocab-354", french: "Non, je ne travaille pas tous les jours.", ipa: "/nɔ̃ ʒə nə tʁa.vaj pa tu le ʒuʁ/", english: "No, I don't work every day.", order: 344 },
  { id: "vocab-355", french: "Tu te couches à quelle heure ?", ipa: "/ty tə kuʃ a kɛl œʁ/", english: "What time do you go to bed?", order: 345 },
  { id: "vocab-356", french: "Je me couche à onze heures.", ipa: "/ʒə mə kuʃ a ɔ̃z œʁ/", english: "I go to bed at eleven o’clock.", order: 346 },
];

async function seedLessonThirtyEight() {
  await db.collection("lessons").doc("lesson-38").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-38").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-38",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 38 seed completed via Firebase Admin SDK.");
}

seedLessonThirtyEight().catch((error) => {
  console.error("Failed to seed lesson 38:", error);
  process.exitCode = 1;
});
