import { seedCustomQuiz } from "./seedQuizHelper.js";

const questions = [
  {
    vocabularyId: "vocab-46",
    prompt: "What does 'Je suis' mean?",
    options: [
      { label: "I am", isCorrect: true },
      { label: "You are", isCorrect: false },
      { label: "He is", isCorrect: false },
      { label: "We are", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-47",
    prompt: "What does 'Tu es' mean?",
    options: [
      { label: "You are", isCorrect: true },
      { label: "I am", isCorrect: false },
      { label: "She is", isCorrect: false },
      { label: "They are", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-48",
    prompt: "What does 'Il est' mean?",
    options: [
      { label: "He is", isCorrect: true },
      { label: "She is", isCorrect: false },
      { label: "I am", isCorrect: false },
      { label: "We are", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-49",
    prompt: "What does 'Elle est' mean?",
    options: [
      { label: "She is", isCorrect: true },
      { label: "He is", isCorrect: false },
      { label: "You are", isCorrect: false },
      { label: "They are", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-50",
    prompt: "What does 'Nous sommes' mean?",
    options: [
      { label: "We are", isCorrect: true },
      { label: "They are", isCorrect: false },
      { label: "You are", isCorrect: false },
      { label: "I am", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-51",
    prompt: "What does 'Vous êtes' mean?",
    options: [
      { label: "You are", isCorrect: true },
      { label: "We are", isCorrect: false },
      { label: "They are", isCorrect: false },
      { label: "She is", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-52",
    prompt: "What does 'Ils sont' mean?",
    options: [
      { label: "They are", isCorrect: true },
      { label: "We are", isCorrect: false },
      { label: "You are", isCorrect: false },
      { label: "He is", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-53",
    prompt: "What does 'Elles sont' mean?",
    options: [
      { label: "They are", isCorrect: true },
      { label: "She is", isCorrect: false },
      { label: "We are", isCorrect: false },
      { label: "You are", isCorrect: false },
    ],
  },
];

seedCustomQuiz({
  lessonId: "lesson-4",
  quizId: "quiz-4",
  title: "Quiz 4: The Verb Être",
  description: "Practice the present-tense forms of the French verb être (to be).",
  category: "Être conjugation",
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 4:", error);
  process.exitCode = 1;
});