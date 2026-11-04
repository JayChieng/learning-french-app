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
  title: "Lesson 44: Asking Prices, Sizes and Demonstratives",
  category: "Shopping",
  content:
    "Ask how much items cost, use ce, cet, cette and ces, and request a different size. Estimated study time: 40–50 minutes.",
  order: 44,
};

const lessonDetail = {
  lessonId: "lesson-44",
  summary:
    "Practise asking prices, choosing the correct demonstrative adjective, requesting another size, and trying on clothes in a shop.",
  dialogues: [
    {
      id: "lesson-44-dialogue-1",
      title: "Finding clothes and asking the price",
      lines: [
        {
          speaker: "Vendeur",
          french: "Bonjour ! Vous cherchez quelque chose ?",
          english: "Hello! Are you looking for something?",
        },
        {
          speaker: "Client",
          french: "Oui, je cherche un pantalon.",
          english: "Yes, I’m looking for a pair of pants.",
        },
        {
          speaker: "Client",
          french: "Combien coûte ce pantalon ?",
          english: "How much do these pants cost?",
        },
        {
          speaker: "Vendeur",
          french: "Il coûte quarante euros.",
          english: "They cost forty euros.",
        },
        {
          speaker: "Client",
          french: "C’est trop cher. C’est combien, cette chemise ?",
          english: "That’s too expensive. How much is this shirt?",
        },
        {
          speaker: "Vendeur",
          french: "Cette chemise coûte vingt-cinq euros.",
          english: "This shirt costs twenty-five euros.",
        },
      ],
    },
    {
      id: "lesson-44-dialogue-2",
      title: "Trying a different size",
      lines: [
        {
          speaker: "Client",
          french: "Vous avez une taille plus grande ?",
          english: "Do you have a bigger size?",
        },
        {
          speaker: "Vendeur",
          french: "Oui. Vous voulez essayer ce pantalon ?",
          english: "Yes. Would you like to try on these pants?",
        },
        {
          speaker: "Client",
          french: "Oui, merci. Où sont les cabines d’essayage ?",
          english: "Yes, thank you. Where are the fitting rooms?",
        },
        {
          speaker: "Vendeur",
          french: "Elles sont à gauche. Vous avez cette chemise en taille 38 ?",
          english: "They’re on the left. Do you have this shirt in size 38?",
        },
        {
          speaker: "Client",
          french: "Oui, et aussi en taille 40.",
          english: "Yes, and also in size 40.",
        },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-44-explanation-1",
      title: "Ask how much something costs",
      body:
        "Combien ça coûte ? /kɔ̃.bjɛ̃ sa kut/ and C’est combien ? /sɛ kɔ̃.bjɛ̃/ both mean “How much does it cost?” Ask Combien coûte ce pantalon ? for one item and Combien coûtent ces chaussures ? for plural items. Say C’est trop cher /sɛ tʁo ʃɛʁ/ (It’s too expensive) or C’est moins cher /sɛ mwɛ̃ ʃɛʁ/ (It’s cheaper).",
    },
    {
      id: "lesson-44-explanation-2",
      title: "Choose ce, cet, cette or ces",
      body:
        "These demonstratives mean this, that, these or those depending on context. Use ce before a masculine singular noun: ce pantalon /sə pɑ̃.ta.lɔ̃/. Use cet before a masculine singular noun beginning with a vowel sound or silent h: cet ordinateur /sɛt ɔʁ.di.na.tœʁ/. Use cette before a feminine singular noun: cette chemise /sɛt ʃə.miz/. Use ces before plural nouns: ces chaussures /se ʃo.syʁ/.",
    },
    {
      id: "lesson-44-explanation-3",
      title: "Ask for another size",
      body:
        "Ask Vous avez une taille plus grande ? (Do you have a bigger size?) or Vous avez une taille plus petite ? (Do you have a smaller size?). Je voudrais essayer ce pantalon means “I would like to try on these pants.” Ask Où sont les cabines d’essayage ? to find the fitting rooms.",
    },
  ],
};

const words = [
  { id: "vocab-437", french: "Combien ça coûte ?", ipa: "/kɔ̃.bjɛ̃ sa kut/", english: "How much does it cost?", order: 427 },
  { id: "vocab-438", french: "C’est combien ?", ipa: "/sɛ kɔ̃.bjɛ̃/", english: "How much is it?", order: 428 },
  { id: "vocab-439", french: "Combien coûte ce pantalon ?", ipa: "/kɔ̃.bjɛ̃ kut sə pɑ̃.ta.lɔ̃/", english: "How much do these pants cost?", order: 429 },
  { id: "vocab-440", french: "Combien coûtent ces chaussures ?", ipa: "/kɔ̃.bjɛ̃ kut se ʃo.syʁ/", english: "How much do these shoes cost?", order: 430 },
  { id: "vocab-441", french: "C’est trop cher.", ipa: "/sɛ tʁo ʃɛʁ/", english: "It’s too expensive.", order: 431 },
  { id: "vocab-442", french: "C’est moins cher.", ipa: "/sɛ mwɛ̃ ʃɛʁ/", english: "It’s cheaper.", order: 432 },
  { id: "vocab-443", french: "ce pantalon", ipa: "/sə pɑ̃.ta.lɔ̃/", english: "these / those pants", order: 433 },
  { id: "vocab-444", french: "cet ordinateur", ipa: "/sɛt ɔʁ.di.na.tœʁ/", english: "this / that computer", order: 434 },
  { id: "vocab-445", french: "cette chemise", ipa: "/sɛt ʃə.miz/", english: "this / that shirt", order: 435 },
  { id: "vocab-446", french: "ces chaussures", ipa: "/se ʃo.syʁ/", english: "these / those shoes", order: 436 },
  { id: "vocab-447", french: "Vous avez une taille plus grande ?", ipa: "/vu za.ve yn taj ply ɡʁɑ̃d/", english: "Do you have a bigger size?", order: 437 },
  { id: "vocab-448", french: "Vous avez une taille plus petite ?", ipa: "/vu za.ve yn taj ply pə.tit/", english: "Do you have a smaller size?", order: 438 },
  { id: "vocab-449", french: "Je voudrais essayer ce pantalon.", ipa: "/ʒə vu.dʁɛ e.se.je sə pɑ̃.ta.lɔ̃/", english: "I would like to try on these pants.", order: 439 },
  { id: "vocab-450", french: "Où sont les cabines d’essayage ?", ipa: "/u sɔ̃ le ka.bin de.sɛ.jaʒ/", english: "Where are the fitting rooms?", order: 440 },
  { id: "vocab-459", french: "C’est combien, cette chemise ?", ipa: "/sɛ kɔ̃.bjɛ̃ sɛt ʃə.miz/", english: "How much is this shirt?", order: 449 },
  { id: "vocab-460", french: "Il coûte quarante euros.", ipa: "/il kut ka.ʁɑ̃t ø.ʁo/", english: "It costs forty euros.", order: 450 },
  { id: "vocab-461", french: "Cette chemise coûte vingt-cinq euros.", ipa: "/sɛt ʃə.miz kut vɛ̃ sɛ̃k ø.ʁo/", english: "This shirt costs twenty-five euros.", order: 451 },
].map((word) => ({ ...word, lessonId: "lesson-44" }));

async function seedLessonFortyFour() {
  await db.collection("lessons").doc("lesson-44").set(lesson, { merge: true });
  await db.collection("lessonDetails").doc("lesson-44").set(lessonDetail, { merge: true });

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

  console.log("Lesson 44 seed completed via Firebase Admin SDK.");
}

seedLessonFortyFour().catch((error) => {
  console.error("Failed to seed lesson 44:", error);
  process.exitCode = 1;
});
