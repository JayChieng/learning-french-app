import { seedLessonQuiz } from "./seedLessonQuiz.js";

const questions = [
  {
    vocabularyId: "vocab-309",
    prompt: "Choose the correct French question for “What is it?”",
    question: "Qu'est-ce que c'est ?",
    questionTranslation: "What is it?",
    answer: "C'est un livre.",
    answerTranslation: "It's a book.",
    distractors: [
      { label: "Tu lis des livres ?", translation: "Do you read books?" },
      { label: "Tu as un ordinateur ?", translation: "Do you have a computer?" },
      { label: "Oui, j'ai un ordinateur.", translation: "Yes, I have a computer." },
    ],
  },
  {
    vocabularyId: "vocab-310",
    prompt: "Choose the phrase that means “It's a book.”",
    question: "Qu'est-ce que c'est ?",
    questionTranslation: "What is it?",
    answer: "C'est un livre.",
    answerTranslation: "It's a book.",
    distractors: [
      { label: "C'est une table.", translation: "It's a table." },
      { label: "Tu as un ordinateur ?", translation: "Do you have a computer?" },
      { label: "Oui, je lis des livres.", translation: "Yes, I read books." },
    ],
  },
  {
    vocabularyId: "vocab-311",
    prompt: "Choose the phrase that means “It's a table.”",
    question: "Qu'est-ce que c'est ?",
    questionTranslation: "What is it?",
    answer: "C'est une table.",
    answerTranslation: "It's a table.",
    distractors: [
      { label: "C'est un livre.", translation: "It's a book." },
      { label: "Tu lis des livres ?", translation: "Do you read books?" },
      { label: "Oui, j'ai un ordinateur.", translation: "Yes, I have a computer." },
    ],
  },
  {
    vocabularyId: "vocab-312",
    prompt: "Choose the question that asks “Do you have a computer?”",
    question: "Tu as un ordinateur ?",
    questionTranslation: "Do you have a computer?",
    answer: "Oui, j'ai un ordinateur.",
    answerTranslation: "Yes, I have a computer.",
    distractors: [
      { label: "C'est un livre.", translation: "It's a book." },
      { label: "C'est une table.", translation: "It's a table." },
      { label: "Oui, je lis des livres.", translation: "Yes, I read books." },
    ],
  },
  {
    vocabularyId: "vocab-313",
    prompt: "Choose the phrase that means “Yes, I have a computer.”",
    question: "Tu as un ordinateur ?",
    questionTranslation: "Do you have a computer?",
    answer: "Oui, j'ai un ordinateur.",
    answerTranslation: "Yes, I have a computer.",
    distractors: [
      { label: "Oui, je lis des livres.", translation: "Yes, I read books." },
      { label: "C'est un livre.", translation: "It's a book." },
      { label: "C'est une table.", translation: "It's a table." },
    ],
  },
  {
    vocabularyId: "vocab-314",
    prompt: "Choose the question that asks “Do you read books?”",
    question: "Tu lis des livres ?",
    questionTranslation: "Do you read books?",
    answer: "Oui, je lis des livres.",
    answerTranslation: "Yes, I read books.",
    distractors: [
      { label: "Oui, j'ai un ordinateur.", translation: "Yes, I have a computer." },
      { label: "C'est un livre.", translation: "It's a book." },
      { label: "C'est une table.", translation: "It's a table." },
    ],
  },
  {
    vocabularyId: "vocab-315",
    prompt: "Choose the phrase that means “Yes, I read books.”",
    question: "Tu lis des livres ?",
    questionTranslation: "Do you read books?",
    answer: "Oui, je lis des livres.",
    answerTranslation: "Yes, I read books.",
    distractors: [
      { label: "Oui, j'ai un ordinateur.", translation: "Yes, I have a computer." },
      { label: "C'est une table.", translation: "It's a table." },
      { label: "C'est un livre.", translation: "It's a book." },
    ],
  },
  {
    vocabularyId: "vocab-312",
    prompt: "How do you ask someone if they have a computer?",
    question: "Tu as un ordinateur ?",
    questionTranslation: "Do you have a computer?",
    answer: "Oui, j'ai un ordinateur.",
    answerTranslation: "Yes, I have a computer.",
    distractors: [
      { label: "Oui, je lis des livres.", translation: "Yes, I read books." },
      { label: "C'est un livre.", translation: "It's a book." },
      { label: "C'est une table.", translation: "It's a table." },
    ],
  },
  {
    vocabularyId: "vocab-314",
    prompt: "What does “des livres” mean in this question?",
    question: "Tu lis des livres ?",
    questionTranslation: "Do you read books?",
    answer: "Books (plural, in general).",
    answerTranslation: "Books (plural, in general).",
    distractors: [
      { label: "A computer.", translation: "A computer." },
      { label: "A table.", translation: "A table." },
      { label: "A book.", translation: "A book." },
    ],
  },
  {
    vocabularyId: "vocab-310",
    prompt: "Which reply identifies an object as a book?",
    question: "Qu'est-ce que c'est ?",
    questionTranslation: "What is it?",
    answer: "C'est un livre.",
    answerTranslation: "It's a book.",
    distractors: [
      { label: "C'est une table.", translation: "It's a table." },
      { label: "Oui, j'ai un ordinateur.", translation: "Yes, I have a computer." },
      { label: "Oui, je lis des livres.", translation: "Yes, I read books." },
    ],
  },
];

seedLessonQuiz(36, questions).catch((error) => {
  console.error("Failed to seed Quiz 36:", error);
  process.exitCode = 1;
});
