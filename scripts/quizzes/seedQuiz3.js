import { seedCustomQuiz } from "./seedQuizHelper.js";

const questions = [
  {
    vocabularyId: "vocab-26",
    prompt: "What does 'Je suis' mean?",
    options: [
      { label: "I am", isCorrect: true },
      { label: "I speak", isCorrect: false },
      { label: "I have", isCorrect: false },
      { label: "I learn", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-27",
    prompt: "What does 'vietnamien' mean?",
    options: [
      { label: "Vietnamese (masculine)", isCorrect: true },
      { label: "Vietnamese (feminine)", isCorrect: false },
      { label: "Canadian (masculine)", isCorrect: false },
      { label: "French (feminine)", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-28",
    prompt: "What does 'parler' mean?",
    options: [
      { label: "to speak", isCorrect: true },
      { label: "to learn", isCorrect: false },
      { label: "to live", isCorrect: false },
      { label: "to come", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-29",
    prompt: "What does 'Je parle...' mean?",
    options: [
      { label: "I speak...", isCorrect: true },
      { label: "I learn...", isCorrect: false },
      { label: "I am...", isCorrect: false },
      { label: "I live...", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-30",
    prompt: "What does 'anglais' mean?",
    options: [
      { label: "English", isCorrect: true },
      { label: "French", isCorrect: false },
      { label: "Vietnamese", isCorrect: false },
      { label: "Canadian", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-31",
    prompt: "What does 'Je parle anglais.' mean?",
    options: [
      { label: "I speak English.", isCorrect: true },
      { label: "I learn English.", isCorrect: false },
      { label: "I speak French.", isCorrect: false },
      { label: "I am English.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-32",
    prompt: "What does 'français' mean?",
    options: [
      { label: "French", isCorrect: true },
      { label: "English", isCorrect: false },
      { label: "Vietnamese", isCorrect: false },
      { label: "Canadian", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-33",
    prompt: "What does 'Je parle français.' mean?",
    options: [
      { label: "I speak French.", isCorrect: true },
      { label: "I learn French.", isCorrect: false },
      { label: "I speak English.", isCorrect: false },
      { label: "I am French.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-34",
    prompt: "What does 'apprendre' mean?",
    options: [
      { label: "to learn", isCorrect: true },
      { label: "to speak", isCorrect: false },
      { label: "to live", isCorrect: false },
      { label: "to have", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-35",
    prompt: "What does \"J'apprends\" mean?",
    options: [
      { label: "I am learning / I learn", isCorrect: true },
      { label: "I am speaking", isCorrect: false },
      { label: "I am living", isCorrect: false },
      { label: "I have learned", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-36",
    prompt: "What does 'le français' mean?",
    options: [
      { label: "French language", isCorrect: true },
      { label: "French person", isCorrect: false },
      { label: "English language", isCorrect: false },
      { label: "Vietnamese language", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-37",
    prompt: "What does \"J'apprends le français.\" mean?",
    options: [
      { label: "I'm learning French.", isCorrect: true },
      { label: "I speak French.", isCorrect: false },
      { label: "I'm teaching French.", isCorrect: false },
      { label: "I'm learning English.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-38",
    prompt: "What does 'vietnamienne' mean?",
    options: [
      { label: "Vietnamese (feminine)", isCorrect: true },
      { label: "Vietnamese (masculine)", isCorrect: false },
      { label: "Canadian (feminine)", isCorrect: false },
      { label: "French (feminine)", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-39",
    prompt: "What does 'canadien' mean?",
    options: [
      { label: "Canadian (masculine)", isCorrect: true },
      { label: "Canadian (feminine)", isCorrect: false },
      { label: "Vietnamese (masculine)", isCorrect: false },
      { label: "French (masculine)", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-40",
    prompt: "What does 'canadienne' mean?",
    options: [
      { label: "Canadian (feminine)", isCorrect: true },
      { label: "Canadian (masculine)", isCorrect: false },
      { label: "Vietnamese (feminine)", isCorrect: false },
      { label: "French (feminine)", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-41",
    prompt: "What does 'française' mean?",
    options: [
      { label: "French (feminine)", isCorrect: true },
      { label: "French (masculine)", isCorrect: false },
      { label: "Canadian (feminine)", isCorrect: false },
      { label: "Vietnamese (feminine)", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-42",
    prompt: "What does 'Je suis vietnamien.' mean?",
    options: [
      { label: "I'm Vietnamese.", isCorrect: true },
      { label: "I speak Vietnamese.", isCorrect: false },
      { label: "I'm Canadian.", isCorrect: false },
      { label: "I'm a student.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-43",
    prompt: "What does 'Je suis étudiant.' mean?",
    options: [
      { label: "I'm a student.", isCorrect: true },
      { label: "I'm a teacher.", isCorrect: false },
      { label: "I am learning.", isCorrect: false },
      { label: "I'm Vietnamese.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-44",
    prompt: "What does 'étudiant' mean?",
    options: [
      { label: "male student", isCorrect: true },
      { label: "female student", isCorrect: false },
      { label: "male teacher", isCorrect: false },
      { label: "French student", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-45",
    prompt: "What does 'étudiante' mean?",
    options: [
      { label: "female student", isCorrect: true },
      { label: "male student", isCorrect: false },
      { label: "female teacher", isCorrect: false },
      { label: "Vietnamese student", isCorrect: false },
    ],
  },
];

seedCustomQuiz({
  lessonId: "lesson-3",
  quizId: "quiz-3",
  title: "Quiz 3: Languages & Personal Information",
  description: "Practice introducing yourself, your nationality, and the languages you speak and learn.",
  category: "Languages and personal information",
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 3:", error);
  process.exitCode = 1;
});