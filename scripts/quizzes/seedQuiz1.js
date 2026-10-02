import fs from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT || path.resolve(__dirname, "../../serviceAccountKey.json");

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
const lessonId = "lesson-1";

const quizQuestionContent = [
  {
    vocabularyId: "vocab-1",
    prompt: 'What does "Hello" mean?',
    options: [
      { label: "Bonjour", isCorrect: true },
      { label: "Salut", isCorrect: false },
      { label: "Merci", isCorrect: false },
      { label: "Au revoir", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-2",
    prompt: 'What does "Salut" mean?',
    options: [
      { label: "Hi/bye", isCorrect: true },
      { label: "Thank you", isCorrect: false },
      { label: "Good night", isCorrect: false },
      { label: "Good morning", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-3",
    prompt: 'What does "How are you?" mean?',
    options: [
      { label: "Ça va ?", isCorrect: true },
      { label: "Bonjour", isCorrect: false },
      { label: "Merci beaucoup !", isCorrect: false },
      { label: "De rien", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-4",
    prompt: 'What does "Ça va bien." mean?',
    options: [
      { label: "I'm good / I'm doing well.", isCorrect: true },
      { label: "How are you?", isCorrect: false },
      { label: "And you?", isCorrect: false },
      { label: "Good.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-5",
    prompt: 'What does "Good." mean?',
    options: [
      { label: "Bien.", isCorrect: true },
      { label: "Très bien.", isCorrect: false },
      { label: "De rien", isCorrect: false },
      { label: "Et toi ?", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-6",
    prompt: 'What does "Very good." mean?',
    options: [
      { label: "Très bien.", isCorrect: true },
      { label: "Bien.", isCorrect: false },
      { label: "Ça va ?", isCorrect: false },
      { label: "Bonjour", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-7",
    prompt: 'What does "Et toi ?" mean?',
    options: [
      { label: "And you?", isCorrect: true },
      { label: "How are you?", isCorrect: false },
      { label: "I'm good.", isCorrect: false },
      { label: "You're welcome", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-8",
    prompt: "What does \"I'm good. And you?\" mean?",
    options: [
      { label: "Ça va bien. Et toi ?", isCorrect: true },
      { label: "Ça va ?", isCorrect: false },
      { label: "Ça va bien.", isCorrect: false },
      { label: "Très bien.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-9",
    prompt: 'What does "De rien" mean?',
    options: [
      { label: "You're welcome", isCorrect: true },
      { label: "Thank you very much", isCorrect: false },
      { label: "Good", isCorrect: false },
      { label: "Hi/bye", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-10",
    prompt: 'What does "Thank you very much!" mean?',
    options: [
      { label: "Merci beaucoup !", isCorrect: true },
      { label: "De rien", isCorrect: false },
      { label: "Bonjour", isCorrect: false },
      { label: "Salut", isCorrect: false },
    ],
  },
];

function shuffleItems(items) {
  const shuffledItems = [...items];

  for (let currentIndex = shuffledItems.length - 1; currentIndex > 0; currentIndex -= 1) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [shuffledItems[currentIndex], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[currentIndex],
    ];
  }

  return shuffledItems;
}

async function seedQuizOne() {
  const vocabularySnapshot = await db
    .collection("vocabulary")
    .where("lessonId", "==", lessonId)
    .get();

  const lessonVocabularyIds = new Set(vocabularySnapshot.docs.map((document) => document.id));
  const questionVocabularyIds = quizQuestionContent.map((question) => question.vocabularyId);
  const uniqueQuestionVocabularyIds = new Set(questionVocabularyIds);
  const hasOneQuestionPerWord =
    questionVocabularyIds.length === lessonVocabularyIds.size &&
    uniqueQuestionVocabularyIds.size === questionVocabularyIds.length &&
    questionVocabularyIds.every((vocabularyId) => lessonVocabularyIds.has(vocabularyId));

  if (!hasOneQuestionPerWord) {
    throw new Error(
      `Quiz 1 must have exactly one question for every ${lessonId} vocabulary entry. ` +
        `Found ${quizQuestionContent.length} questions and ${lessonVocabularyIds.size} vocabulary entries.`
    );
  }

  const questions = shuffleItems(quizQuestionContent).map(
    ({ vocabularyId: _vocabularyId, ...question }, index) => ({
      ...question,
      id: `question-${index + 1}`,
      category: "Greetings",
      explanation: `Correct answer: ${question.options.find((option) => option.isCorrect)?.label}`,
      options: shuffleItems(question.options).map((option, optionIndex) => ({
        ...option,
        id: `option-${optionIndex + 1}`,
      })),
    })
  );

  await db.collection("quizzes").doc("quiz-1").set({
    title: "Quiz 1: Greetings",
    description:
      "Practice the greetings and polite expressions from Lesson 1 with English-to-French and French-to-English questions.",
    questions,
  });

  console.log(`Quiz 1 seeded with ${questions.length} custom questions for ${lessonId}.`);
}

seedQuizOne().catch((error) => {
  console.error("Failed to seed Quiz 1:", error);
  process.exitCode = 1;
});