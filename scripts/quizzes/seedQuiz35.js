import { seedLessonQuiz } from "./seedLessonQuiz.js";

const questions = [
  {
    vocabularyId: "vocab-296",
    prompt: "Choose the phrase that means “I have a phone.”",
    question: "Tu as un téléphone ?",
    questionTranslation: "Do you have a phone?",
    answer: "J'ai un téléphone.",
    answerTranslation: "I have a phone.",
    distractors: [
      { label: "Je lis un téléphone.", translation: "I read a phone." },
      { label: "Je regarde un téléphone.", translation: "I watch a phone." },
      { label: "J'aime une téléphone.", translation: "I like a phone. (incorrect article)" },
    ],
  },
  {
    vocabularyId: "vocab-297",
    prompt: "Choose the phrase that means “I have a car.”",
    question: "Tu as une voiture ?",
    questionTranslation: "Do you have a car?",
    answer: "J'ai une voiture.",
    answerTranslation: "I have a car.",
    distractors: [
      { label: "Je lis une voiture.", translation: "I read a car." },
      { label: "Je regarde une voiture.", translation: "I watch a car." },
      { label: "J'ai un voiture.", translation: "I have a car. (incorrect article)" },
    ],
  },
  {
    vocabularyId: "vocab-298",
    prompt: "Choose the phrase that means “I like coffee.”",
    question: "Tu aimes le café ?",
    questionTranslation: "Do you like coffee?",
    answer: "J'aime le café.",
    answerTranslation: "I like coffee.",
    distractors: [
      { label: "Je lis le café.", translation: "I read coffee." },
      { label: "Je regarde le café.", translation: "I watch coffee." },
      { label: "J'aime la café.", translation: "I like coffee. (incorrect article)" },
    ],
  },
  {
    vocabularyId: "vocab-299",
    prompt: "Choose the phrase that means “I read a book.”",
    question: "Qu'est-ce que tu lis ?",
    questionTranslation: "What are you reading?",
    answer: "Je lis un livre.",
    answerTranslation: "I read a book.",
    distractors: [
      { label: "Je regarde un livre.", translation: "I watch a book." },
      { label: "J'aime un livre.", translation: "I like a book." },
      { label: "Je lis une livre.", translation: "I read a book. (incorrect article)" },
    ],
  },
  {
    vocabularyId: "vocab-300",
    prompt: "Choose the phrase that means “I watch a film.”",
    question: "Qu'est-ce que tu regardes ?",
    questionTranslation: "What are you watching?",
    answer: "Je regarde un film.",
    answerTranslation: "I watch a film.",
    distractors: [
      { label: "Je lis un film.", translation: "I read a film." },
      { label: "J'ai un film.", translation: "I have a film." },
      { label: "Je regarde une film.", translation: "I watch a film. (incorrect article)" },
    ],
  },
  {
    vocabularyId: "vocab-294",
    prompt: "Choose the correct present-tense form of lire for “we.”",
    question: "Nous, nous faisons quoi ?",
    questionTranslation: "What do we do?",
    answer: "Nous lisons.",
    answerTranslation: "We read.",
    distractors: [
      { label: "Nous lisez.", translation: "We read. (incorrect verb form)" },
      { label: "Nous lit.", translation: "We read. (incorrect verb form)" },
      { label: "Nous lisent.", translation: "We read. (incorrect verb form)" },
    ],
  },
  {
    vocabularyId: "vocab-301",
    prompt: "Choose the correct present-tense form of lire for “I.”",
    question: "Qu'est-ce que tu fais ?",
    questionTranslation: "What are you doing?",
    answer: "Je lis.",
    answerTranslation: "I read.",
    distractors: [
      { label: "Je lit.", translation: "I read. (incorrect verb form)" },
      { label: "Je lisez.", translation: "I read. (incorrect verb form)" },
      { label: "Je lisent.", translation: "I read. (incorrect verb form)" },
    ],
  },
  {
    vocabularyId: "vocab-303",
    prompt: "Choose the correct present-tense form of lire for “he.”",
    question: "Qu'est-ce qu'il fait ?",
    questionTranslation: "What is he doing?",
    answer: "Il lit.",
    answerTranslation: "He reads.",
    distractors: [
      { label: "Il lis.", translation: "He reads. (incorrect verb form)" },
      { label: "Il lisons.", translation: "He reads. (incorrect verb form)" },
      { label: "Il lisez.", translation: "He reads. (incorrect verb form)" },
    ],
  },
  {
    vocabularyId: "vocab-306",
    prompt: "Choose the correct present-tense form of lire for “you” (plural or formal).",
    question: "Vous, vous faites quoi ?",
    questionTranslation: "What are you doing?",
    answer: "Vous lisez.",
    answerTranslation: "You read.",
    distractors: [
      { label: "Vous lis.", translation: "You read. (incorrect verb form)" },
      { label: "Vous lit.", translation: "You read. (incorrect verb form)" },
      { label: "Vous lisent.", translation: "You read. (incorrect verb form)" },
    ],
  },
  {
    vocabularyId: "vocab-308",
    prompt: "Choose the correct present-tense form of lire for “they” (feminine).",
    question: "Elles, elles font quoi ?",
    questionTranslation: "What are they doing?",
    answer: "Elles lisent.",
    answerTranslation: "They read.",
    distractors: [
      { label: "Elles lis.", translation: "They read. (incorrect verb form)" },
      { label: "Elles lit.", translation: "They read. (incorrect verb form)" },
      { label: "Elles lisons.", translation: "They read. (incorrect verb form)" },
    ],
  },
];

seedLessonQuiz(35, questions).catch((error) => {
  console.error("Failed to seed Quiz 35:", error);
  process.exitCode = 1;
});
