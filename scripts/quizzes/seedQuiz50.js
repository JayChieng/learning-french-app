import { seedCustomQuiz } from "./seedQuizHelper.js";

const vocabulary = [
  { id: "vocab-543", french: "le temps", english: "the weather" },
  { id: "vocab-544", french: "le soleil", english: "the sun" },
  { id: "vocab-545", french: "la pluie", english: "the rain" },
  { id: "vocab-546", french: "la neige", english: "the snow" },
  { id: "vocab-547", french: "le vent", english: "the wind" },
  { id: "vocab-548", french: "un nuage", english: "a cloud" },
  { id: "vocab-549", french: "chaud", english: "hot" },
  { id: "vocab-550", french: "froid", english: "cold" },
  { id: "vocab-551", french: "frais", english: "cool" },
  { id: "vocab-552", french: "beau", english: "beautiful / nice" },
  { id: "vocab-553", french: "mauvais", english: "bad" },
  { id: "vocab-554", french: "nuageux", english: "cloudy" },
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
  lessonId: "lesson-50",
  quizId: "quiz-50",
  title: "Quiz 50: Talking About the Weather",
  description:
    "Practise the meanings of French weather words and adjectives for describing conditions outside.",
  category: "Weather",
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 50:", error);
  process.exitCode = 1;
});
