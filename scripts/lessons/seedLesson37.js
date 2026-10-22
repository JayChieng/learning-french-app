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
  title: "Lesson 37: Daily Routine and Reflexive Verbs",
  category: "Daily Routine",
  content:
    "Talk about your daily routine with common reflexive verbs, from waking up and getting dressed to going to bed.",
  order: 37,
};

const lessonDetail = {
  lessonId: "lesson-37",
  summary:
    "Learn common reflexive verbs for daily routines and conjugate se lever in the present tense. Notice how the reflexive pronoun agrees with the subject.",
  dialogues: [
    {
      id: "lesson-37-dialogue-1",
      title: "A morning routine",
      lines: [
        { speaker: "A", french: "À quelle heure tu te réveilles ?", english: "What time do you wake up?" },
        { speaker: "B", french: "Je me réveille à sept heures.", english: "I wake up at seven o'clock." },
        { speaker: "A", french: "Et après ?", english: "And after that?" },
        { speaker: "B", french: "Je me lève et je me douche.", english: "I get up and take a shower." },
        { speaker: "A", french: "Tu t'habilles vite ?", english: "Do you get dressed quickly?" },
        { speaker: "B", french: "Oui, puis je me brosse les dents.", english: "Yes, then I brush my teeth." },
      ],
    },
    {
      id: "lesson-37-dialogue-2",
      title: "Getting ready for bed",
      lines: [
        { speaker: "A", french: "À quelle heure tu te couches ?", english: "What time do you go to bed?" },
        { speaker: "B", french: "Je me couche à dix heures.", english: "I go to bed at ten o'clock." },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-37-explanation-1",
      title: "Daily routine verbs",
      body:
        "se réveiller /sə ʁe.ve.je/ = to wake up; se lever /sə lə.ve/ = to get up; se doucher /sə du.ʃe/ = to take a shower; s'habiller /sa.bi.je/ = to get dressed; se brosser les dents /sə bʁɔ.se le dɑ̃/ = to brush one's teeth; se coucher /sə ku.ʃe/ = to go to bed.",
    },
    {
      id: "lesson-37-explanation-2",
      title: "Why do these verbs begin with se?",
      body:
        "These are reflexive verbs: they describe an action the subject does to or for themself. The reflexive pronoun changes to match the subject. With je, se becomes me: Je me réveille (I wake up), Je me lève (I get up), Je me douche (I take a shower), Je m'habille (I get dressed), Je me couche (I go to bed). Before a vowel sound, me shortens to m', as in Je m'habille.",
    },
    {
      id: "lesson-37-explanation-3",
      title: "Present tense of se lever",
      body:
        "Je me lève /ʒə mə lɛv/ — I get up; Tu te lèves /ty tə lɛv/ — you get up; Il se lève /il sə lɛv/ — he gets up; Elle se lève /ɛl sə lɛv/ — she gets up; Nous nous levons /nu nu lə.vɔ̃/ — we get up; Vous vous levez /vu vu lə.ve/ — you get up; Ils se lèvent /il sə lɛv/ — they get up; Elles se lèvent /ɛl sə lɛv/ — they get up.",
    },
    {
      id: "lesson-37-explanation-4",
      title: "The stem change in lever",
      body:
        "In the present tense, the e in the stem changes to è for je, tu, il, elle, ils, and elles: lev- becomes lèv-. The nous and vous forms keep e: nous levons, vous levez.",
    },
  ],
};

const words = [
  { id: "vocab-316", french: "se réveiller", ipa: "/sə ʁe.ve.je/", english: "to wake up", order: 306 },
  { id: "vocab-317", french: "se lever", ipa: "/sə lə.ve/", english: "to get up", order: 307 },
  { id: "vocab-318", french: "se doucher", ipa: "/sə du.ʃe/", english: "to take a shower", order: 308 },
  { id: "vocab-319", french: "s'habiller", ipa: "/sa.bi.je/", english: "to get dressed", order: 309 },
  { id: "vocab-320", french: "se brosser les dents", ipa: "/sə bʁɔ.se le dɑ̃/", english: "to brush one's teeth", order: 310 },
  { id: "vocab-321", french: "se coucher", ipa: "/sə ku.ʃe/", english: "to go to bed", order: 311 },
  { id: "vocab-322", french: "Je me réveille.", ipa: "/ʒə mə ʁe.vɛj/", english: "I wake up.", order: 312 },
  { id: "vocab-323", french: "Je me lève.", ipa: "/ʒə mə lɛv/", english: "I get up.", order: 313 },
  { id: "vocab-324", french: "Je me douche.", ipa: "/ʒə mə duʃ/", english: "I take a shower.", order: 314 },
  { id: "vocab-325", french: "Je m'habille.", ipa: "/ʒə ma.bij/", english: "I get dressed.", order: 315 },
  { id: "vocab-326", french: "Je me couche.", ipa: "/ʒə mə kuʃ/", english: "I go to bed.", order: 316 },
  { id: "vocab-327", french: "Je me brosse les dents.", ipa: "/ʒə mə bʁɔs le dɑ̃/", english: "I brush my teeth.", order: 317 },
  { id: "vocab-328", french: "Tu te lèves.", ipa: "/ty tə lɛv/", english: "You get up.", order: 318 },
  { id: "vocab-329", french: "Il se lève.", ipa: "/il sə lɛv/", english: "He gets up.", order: 319 },
  { id: "vocab-330", french: "Elle se lève.", ipa: "/ɛl sə lɛv/", english: "She gets up.", order: 320 },
  { id: "vocab-331", french: "Nous nous levons.", ipa: "/nu nu lə.vɔ̃/", english: "We get up.", order: 321 },
  { id: "vocab-332", french: "Vous vous levez.", ipa: "/vu vu lə.ve/", english: "You get up.", order: 322 },
  { id: "vocab-333", french: "Ils se lèvent.", ipa: "/il sə lɛv/", english: "They get up.", order: 323 },
  { id: "vocab-334", french: "Elles se lèvent.", ipa: "/ɛl sə lɛv/", english: "They get up.", order: 324 },
];

async function seedLessonThirtySeven() {
  await db.collection("lessons").doc("lesson-37").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-37").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-37",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 37 seed completed via Firebase Admin SDK.");
}

seedLessonThirtySeven().catch((error) => {
  console.error("Failed to seed lesson 37:", error);
  process.exitCode = 1;
});
