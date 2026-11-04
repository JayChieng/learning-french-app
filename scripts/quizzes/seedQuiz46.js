import { seedCustomQuiz } from "./seedQuizHelper.js";

const vocabulary = [
  {
    id: "vocab-457",
    french: "Je cherche un pantalon noir.",
    english: "I’m looking for black pants.",
  },
  {
    id: "vocab-458",
    french: "Vous avez cette chemise en bleu ?",
    english: "Do you have this shirt in blue?",
  },
  {
    id: "vocab-472",
    french: "De quelle couleur est ce pantalon ?",
    english: "What colour are these pants?",
  },
  { id: "vocab-473", french: "un pantalon noir", english: "black pants" },
  { id: "vocab-474", french: "une chemise blanche", english: "a white shirt" },
  { id: "vocab-475", french: "une robe rouge", english: "a red dress" },
  { id: "vocab-476", french: "des chaussures bleues", english: "blue shoes" },
  { id: "vocab-477", french: "un pull vert", english: "a green sweater" },
  { id: "vocab-478", french: "un sac gris", english: "a grey bag" },
  { id: "vocab-479", french: "une jupe jaune", english: "a yellow skirt" },
  { id: "vocab-480", french: "un manteau orange", english: "an orange coat" },
  { id: "vocab-481", french: "une robe rose", english: "a pink dress" },
  { id: "vocab-482", french: "un chapeau violet", english: "a purple hat" },
  { id: "vocab-483", french: "des chaussures marron", english: "brown shoes" },
  { id: "vocab-484", french: "une veste beige", english: "a beige jacket" },
  {
    id: "vocab-485",
    french: "un pantalon bleu clair",
    english: "light blue pants",
  },
  {
    id: "vocab-486",
    french: "un pull vert foncé",
    english: "a dark green sweater",
  },
  {
    id: "vocab-487",
    french: "Je préfère le bleu.",
    english: "I prefer blue.",
  },
  {
    id: "vocab-488",
    french: "Je préfère le manteau orange.",
    english: "I prefer the orange coat.",
  },
  {
    id: "vocab-489",
    french: "Vous cherchez quelle couleur ?",
    english: "What colour are you looking for?",
  },
];

const questions = vocabulary.map((word, index) => {
  const frenchToEnglish = index % 2 === 0;
  const correctAnswer = frenchToEnglish ? word.english : word.french;
  const distractors = [1, 2, 3].map((offset) => {
    const distractor = vocabulary[(index + offset) % vocabulary.length];
    return {
      label: frenchToEnglish ? distractor.english : distractor.french,
      isCorrect: false,
    };
  });

  return {
    vocabularyId: word.id,
    prompt: frenchToEnglish
      ? `What does "${word.french}" mean?`
      : `How do you say "${word.english}" in French?`,
    speakPrompt: false,
    speechSegments: [{ text: word.french, lang: "fr-FR" }],
    answerSpeechSegments: [{ text: word.french, lang: "fr-FR" }],
    options: [
      { label: correctAnswer, isCorrect: true },
      ...distractors,
    ],
  };
});

seedCustomQuiz({
  lessonId: "lesson-46",
  quizId: "quiz-46",
  title: "Quiz 46: Colours and Clothes",
  description:
    "Practise Lesson 46 vocabulary one question at a time with French-to-English and English-to-French multiple-choice questions.",
  category: "Colours and Clothes",
  randomizeQuestionOrder: true,
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 46:", error);
  process.exitCode = 1;
});
