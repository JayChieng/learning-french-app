import { seedLessonQuiz } from "./seedLessonQuiz.js";

const questions = [
  {
    vocabularyId: "vocab-276",
    prompt: "Choose the correct phrase for “a phone.”",
    question: "Qu'est-ce que tu as ?",
    questionTranslation: "What do you have?",
    answer: "J'ai un téléphone.",
    answerTranslation: "I have a phone.",
    distractors: [
      { label: "J'ai une téléphone.", translation: "I have a phone. (incorrect article)" },
      { label: "Je suis un téléphone.", translation: "I am a phone." },
      { label: "J'ai les téléphone.", translation: "I have the phone. (incorrect plural)" },
    ],
  },
  {
    vocabularyId: "vocab-280",
    prompt: "Choose the correct phrase for “a table.”",
    question: "Qu'est-ce que c'est ?",
    questionTranslation: "What is it?",
    answer: "C'est une table.",
    answerTranslation: "It's a table.",
    distractors: [
      { label: "C'est un table.", translation: "It's a table. (incorrect article)" },
      { label: "C'est la table.", translation: "It's the table." },
      { label: "J'ai une table.", translation: "I have a table." },
    ],
  },
  {
    vocabularyId: "vocab-277",
    prompt: "How do you say “the book”?",
    question: "Où est le livre ?",
    questionTranslation: "Where is the book?",
    answer: "Le livre est ici.",
    answerTranslation: "The book is here.",
    distractors: [
      { label: "La livre est ici.", translation: "The book is here. (incorrect article)" },
      { label: "Un livre est ici.", translation: "A book is here." },
      { label: "Les livre est ici.", translation: "The books are here. (incorrect plural)" },
    ],
  },
  {
    vocabularyId: "vocab-282",
    prompt: "Choose the correct article for voiture.",
    question: "Tu as une voiture ?",
    questionTranslation: "Do you have a car?",
    answer: "Oui, j'ai une voiture.",
    answerTranslation: "Yes, I have a car.",
    distractors: [
      { label: "Oui, j'ai un voiture.", translation: "Yes, I have a car. (incorrect article)" },
      { label: "Oui, je suis une voiture.", translation: "Yes, I am a car." },
      { label: "Oui, j'ai les voiture.", translation: "Yes, I have the cars. (incorrect plural)" },
    ],
  },
  {
    vocabularyId: "vocab-278",
    prompt: "Choose the correct phrase for “a computer.”",
    question: "Qu'est-ce que tu as ?",
    questionTranslation: "What do you have?",
    answer: "J'ai un ordinateur.",
    answerTranslation: "I have a computer.",
    distractors: [
      { label: "J'ai une ordinateur.", translation: "I have a computer. (incorrect article)" },
      { label: "Je suis un ordinateur.", translation: "I am a computer." },
      { label: "J'ai la ordinateur.", translation: "I have the computer. (incorrect article)" },
    ],
  },
  {
    vocabularyId: "vocab-281",
    prompt: "Choose the correct phrase for “a chair.”",
    question: "Qu'est-ce que c'est ?",
    questionTranslation: "What is it?",
    answer: "C'est une chaise.",
    answerTranslation: "It's a chair.",
    distractors: [
      { label: "C'est un chaise.", translation: "It's a chair. (incorrect article)" },
      { label: "C'est le chaise.", translation: "It's the chair. (incorrect article)" },
      { label: "C'est des chaise.", translation: "It's some chairs. (incorrect plural)" },
    ],
  },
  {
    vocabularyId: "vocab-284",
    prompt: "Choose the sentence that means “The phone is here.”",
    question: "Où est le téléphone ?",
    questionTranslation: "Where is the phone?",
    answer: "Le téléphone est ici.",
    answerTranslation: "The phone is here.",
    distractors: [
      { label: "La téléphone est ici.", translation: "The phone is here. (incorrect article)" },
      { label: "Un téléphone est ici.", translation: "A phone is here." },
      { label: "Les téléphones sont ici.", translation: "The phones are here." },
    ],
  },
  {
    vocabularyId: "vocab-286",
    prompt: "Choose the correct phrase for “the table.”",
    question: "Où est le livre ?",
    questionTranslation: "Where is the book?",
    answer: "Le livre est sur la table.",
    answerTranslation: "The book is on the table.",
    distractors: [
      { label: "Le livre est sur le table.", translation: "The book is on the table. (incorrect article)" },
      { label: "Le livre est sur un table.", translation: "The book is on a table. (incorrect article)" },
      { label: "Le livre est sous la table.", translation: "The book is under the table." },
    ],
  },
  {
    vocabularyId: "vocab-288",
    prompt: "Choose the correct plural phrase for “the books.”",
    question: "Qu'est-ce qu'il y a ici ?",
    questionTranslation: "What is here?",
    answer: "Les livres.",
    answerTranslation: "The books.",
    distractors: [
      { label: "Le livre.", translation: "The book." },
      { label: "La livres.", translation: "The books. (incorrect article)" },
      { label: "Un livres.", translation: "A books. (incorrect plural)" },
    ],
  },
  {
    vocabularyId: "vocab-289",
    prompt: "Choose the correct plural phrase for “the cars.”",
    question: "Qu'est-ce qu'il y a dans la rue ?",
    questionTranslation: "What is in the street?",
    answer: "Les voitures.",
    answerTranslation: "The cars.",
    distractors: [
      { label: "La voiture.", translation: "The car." },
      { label: "Le voitures.", translation: "The cars. (incorrect article)" },
      { label: "Une voitures.", translation: "A cars. (incorrect plural)" },
    ],
  },
];

seedLessonQuiz(34, questions).catch((error) => {
  console.error("Failed to seed Quiz 34:", error);
  process.exitCode = 1;
});
