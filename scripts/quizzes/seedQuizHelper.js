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

export async function seedCustomQuiz({
  lessonId,
  quizId,
  title,
  description,
  category,
  questions: questionContent,
}) {
  const vocabularySnapshot = await db
    .collection("vocabulary")
    .where("lessonId", "==", lessonId)
    .get();
  const lessonVocabularyIds = new Set(vocabularySnapshot.docs.map((document) => document.id));
  const questionVocabularyIds = questionContent.map((question) => question.vocabularyId);
  const uniqueQuestionVocabularyIds = new Set(questionVocabularyIds);
  const hasOneQuestionPerWord =
    questionVocabularyIds.length === lessonVocabularyIds.size &&
    uniqueQuestionVocabularyIds.size === questionVocabularyIds.length &&
    questionVocabularyIds.every((vocabularyId) => lessonVocabularyIds.has(vocabularyId));

  if (!hasOneQuestionPerWord) {
    throw new Error(
      `${title} must have exactly one question for every ${lessonId} vocabulary entry. ` +
        `Found ${questionContent.length} questions and ${lessonVocabularyIds.size} vocabulary entries.`
    );
  }

  for (const question of questionContent) {
    const labels = question.options.map((option) => option.label);
    const correctOptions = question.options.filter((option) => option.isCorrect);

    if (
      !question.prompt ||
      labels.length !== 4 ||
      new Set(labels).size !== labels.length ||
      correctOptions.length !== 1
    ) {
      throw new Error(`Each ${title} question needs a prompt, four unique options, and one correct answer.`);
    }
  }

  const questions = shuffleItems(questionContent).map(
    ({ vocabularyId: _vocabularyId, ...question }, index) => ({
      ...question,
      id: `question-${index + 1}`,
      category,
      explanation: `Correct answer: ${question.options.find((option) => option.isCorrect)?.label}`,
      options: shuffleItems(question.options).map((option, optionIndex) => ({
        ...option,
        id: `option-${optionIndex + 1}`,
      })),
    })
  );

  await db.collection("quizzes").doc(quizId).set({
    title,
    description,
    questions,
  });

  console.log(`${title} seeded with ${questions.length} custom questions for ${lessonId}.`);
}