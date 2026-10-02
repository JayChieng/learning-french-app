import fs from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT ||
  path.resolve(__dirname, "../serviceAccountKey.json");

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
  title: "Lesson 9: Negative: ne ... pas",
  category: "Grammar",
  content: "Form negative sentences with être using ne + verb + pas.",
  order: 9,
};

const lessonDetail = {
  lessonId: "lesson-9",
  summary: "Learn to make negative sentences with être using ne ... pas.",
  dialogues: [],
  explanations: [],
};

const words = [
  {
    id: "vocab-85",
    french: "Je ne suis pas étudiant.",
    ipa: "/ʒə nə sɥi pa e.ty.djɑ̃/",
    english: "I am not a student.",
    order: 75,
  },
  {
    id: "vocab-86",
    french: "Je ne suis pas fatigué.",
    ipa: "/ʒə nə sɥi pa fa.ti.ɡe/",
    english: "I am not tired.",
    order: 76,
  },
  {
    id: "vocab-87",
    french: "Tu n'es pas fatigué.",
    ipa: "/ty nɛ pa fa.ti.ɡe/",
    english: "You are not tired.",
    order: 77,
  },
  {
    id: "vocab-88",
    french: "Il n'est pas étudiant.",
    ipa: "/il nɛ pa e.ty.djɑ̃/",
    english: "He is not a student.",
    order: 78,
  },
  {
    id: "vocab-89",
    french: "Elle n'est pas occupée.",
    ipa: "/ɛl nɛ pa z‿ɔ.ky.pe/",
    english: "She is not busy.",
    order: 79,
  },
  {
    id: "vocab-90",
    french: "Nous ne sommes pas à la maison.",
    ipa: "/nu nə sɔm pa a la mɛ.zɔ̃/",
    english: "We are not at home.",
    order: 80,
  },
  {
    id: "vocab-91",
    french: "Vous n'êtes pas en retard.",
    ipa: "/vu nɛt pa ɑ̃ ʁə.taʁ/",
    english: "You are not late.",
    order: 81,
  },
  {
    id: "vocab-92",
    french: "Ils ne sont pas prêts.",
    ipa: "/il nə sɔ̃ pa pʁɛ/",
    english: "They are not ready.",
    order: 82,
  },
  {
    id: "vocab-93",
    french: "Elles ne sont pas françaises.",
    ipa: "/ɛl nə sɔ̃ pa fʁɑ̃.sɛz/",
    english: "They are not French.",
    order: 83,
  },
];

async function seedLessonNine() {
  await db.collection("lessons").doc("lesson-9").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-9").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-9",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 9 seed completed via Firebase Admin SDK.");
}

seedLessonNine().catch((error) => {
  console.error("Failed to seed lesson 9:", error);
  process.exitCode = 1;
});