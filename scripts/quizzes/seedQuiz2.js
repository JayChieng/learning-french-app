import { seedCustomQuiz } from "./seedQuizHelper.js";

const questions = [
  {
    vocabularyId: "vocab-11",
    prompt: "What does 'avoir' mean?",
    options: [
      { label: "to have", isCorrect: true },
      { label: "to come", isCorrect: false },
      { label: "to live", isCorrect: false },
      { label: "to speak", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-12",
    prompt: "What does \"J'ai\" mean?",
    options: [
      { label: "I have", isCorrect: true },
      { label: "I live", isCorrect: false },
      { label: "I'm from", isCorrect: false },
      { label: "You have", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-13",
    prompt: "What does 'ans' mean?",
    options: [
      { label: "years old / years", isCorrect: true },
      { label: "age", isCorrect: false },
      { label: "student", isCorrect: false },
      { label: "city", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-14",
    prompt: "What does \"J'ai 28 ans.\" mean?",
    options: [
      { label: "I'm 28 years old.", isCorrect: true },
      { label: "I have 28 students.", isCorrect: false },
      { label: "I'm from Canada.", isCorrect: false },
      { label: "I live at number 28.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-15",
    prompt: "What does 'Tu as quel âge ?' mean?",
    options: [
      { label: "How old are you?", isCorrect: true },
      { label: "Where are you from?", isCorrect: false },
      { label: "Where do you live?", isCorrect: false },
      { label: "How are you?", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-16",
    prompt: "What does 'venir' mean?",
    options: [
      { label: "to come", isCorrect: true },
      { label: "to live", isCorrect: false },
      { label: "to have", isCorrect: false },
      { label: "to learn", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-17",
    prompt: "What does 'Je viens de...' mean?",
    options: [
      { label: "I'm from... / I come from...", isCorrect: true },
      { label: "I live in...", isCorrect: false },
      { label: "I have...", isCorrect: false },
      { label: "I'm learning...", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-18",
    prompt: "What does 'Je viens du Canada.' mean?",
    options: [
      { label: "I'm from Canada.", isCorrect: true },
      { label: "I live in Canada.", isCorrect: false },
      { label: "I'm from Vietnam.", isCorrect: false },
      { label: "I come to Canada.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-19",
    prompt: "What does 'Je viens du Vietnam.' mean?",
    options: [
      { label: "I'm from Vietnam.", isCorrect: true },
      { label: "I live in Vietnam.", isCorrect: false },
      { label: "I'm from Canada.", isCorrect: false },
      { label: "I come to Vietnam.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-20",
    prompt: "What does \"Tu viens d'où ?\" mean?",
    options: [
      { label: "Where are you from?", isCorrect: true },
      { label: "Where do you live?", isCorrect: false },
      { label: "How old are you?", isCorrect: false },
      { label: "Where are you going?", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-21",
    prompt: "What does 'habiter' mean?",
    options: [
      { label: "to live", isCorrect: true },
      { label: "to come", isCorrect: false },
      { label: "to have", isCorrect: false },
      { label: "to speak", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-22",
    prompt: "What does \"J'habite\" mean?",
    options: [
      { label: "I live", isCorrect: true },
      { label: "I have", isCorrect: false },
      { label: "I come", isCorrect: false },
      { label: "I learn", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-23",
    prompt: "What does \"J'habite à Toronto.\" mean?",
    options: [
      { label: "I live in Toronto.", isCorrect: true },
      { label: "I'm from Toronto.", isCorrect: false },
      { label: "I come to Toronto.", isCorrect: false },
      { label: "I live in Canada.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-24",
    prompt: "What does 'à' mean in these phrases?",
    options: [
      { label: "in / at", isCorrect: true },
      { label: "from", isCorrect: false },
      { label: "and", isCorrect: false },
      { label: "with", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-25",
    prompt: "What does 'Tu habites où ?' mean?",
    options: [
      { label: "Where do you live?", isCorrect: true },
      { label: "Where are you from?", isCorrect: false },
      { label: "How old are you?", isCorrect: false },
      { label: "Where are you going?", isCorrect: false },
    ],
  },
];

seedCustomQuiz({
  lessonId: "lesson-2",
  quizId: "quiz-2",
  title: "Quiz 2: Age & Origin",
  description: "Practice talking about your age, origin, and where you live.",
  category: "Age and origin",
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 2:", error);
  process.exitCode = 1;
});