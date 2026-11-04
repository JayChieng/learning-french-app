import { seedCustomQuiz } from "./seedQuizHelper.js";

const vocabulary = [
  { id: "vocab-519", french: "où", english: "where" },
  { id: "vocab-520", french: "ici", english: "here" },
  { id: "vocab-521", french: "là", english: "there" },
  { id: "vocab-522", french: "à gauche", english: "to the left" },
  { id: "vocab-523", french: "à droite", english: "to the right" },
  { id: "vocab-524", french: "tout droit", english: "straight ahead" },
  { id: "vocab-525", french: "près de", english: "near" },
  { id: "vocab-526", french: "loin de", english: "far from" },
  { id: "vocab-527", french: "la rue", english: "the street" },
  { id: "vocab-528", french: "le coin", english: "the corner" },
  { id: "vocab-529", french: "le carrefour", english: "the intersection" },
  { id: "vocab-530", french: "le feu rouge", english: "the traffic light" },
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
  lessonId: "lesson-48",
  quizId: "quiz-48",
  title: "Quiz 48: Asking for Directions Vocabulary",
  description:
    "Practise the meanings of French vocabulary for places, locations, and directions.",
  category: "Directions",
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 48:", error);
  process.exitCode = 1;
});
