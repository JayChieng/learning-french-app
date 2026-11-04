import { seedCustomQuiz } from "./seedQuizHelper.js";

const vocabulary = [
  { id: "vocab-531", french: "tourner", english: "to turn" },
  { id: "vocab-532", french: "traverser", english: "to cross" },
  { id: "vocab-533", french: "continuer", english: "to continue" },
  { id: "vocab-534", french: "prendre", english: "to take" },
  { id: "vocab-535", french: "suivre", english: "to follow" },
  { id: "vocab-536", french: "le pont", english: "the bridge" },
  { id: "vocab-537", french: "la place", english: "the square" },
  { id: "vocab-538", french: "l’avenue", english: "the avenue" },
  { id: "vocab-539", french: "le magasin", english: "the store" },
  { id: "vocab-540", french: "au bout de", english: "at the end of" },
  { id: "vocab-541", french: "en face de", english: "opposite" },
  { id: "vocab-542", french: "jusqu’à", english: "until; as far as" },
];

const questions = vocabulary.map((word, index) => {
  const frenchToEnglish = index % 2 === 0;
  const answerField = frenchToEnglish ? "english" : "french";
  const correctAnswer = word[answerField];
  const options = [
    { label: correctAnswer, isCorrect: true },
    ...[1, 2, 3].map((offset) => {
      const distractor = vocabulary[(index + offset) % vocabulary.length];
      return { label: distractor[answerField], isCorrect: false };
    }),
  ];

  return {
    vocabularyId: word.id,
    prompt: frenchToEnglish
      ? `What does "${word.french}" mean?`
      : `How do you say "${word.english}" in French?`,
    speechSegments: [{ text: word.french, lang: "fr-FR" }],
    options,
  };
});

seedCustomQuiz({
  lessonId: "lesson-49",
  quizId: "quiz-49",
  title: "Quiz 49: Giving Directions Vocabulary",
  description:
    "Practise the meanings of French route directions and common town landmarks.",
  category: "Directions",
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 49:", error);
  process.exitCode = 1;
});
