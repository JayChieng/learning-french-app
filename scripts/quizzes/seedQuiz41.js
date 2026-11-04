import { seedCustomQuiz } from "./seedQuizHelper.js";

const questions = [
  {
    vocabularyId: "vocab-387",
    prompt: "du pain",
    options: [
      { label: "some bread", isCorrect: true },
      { label: "some salad", isCorrect: false },
      { label: "some water", isCorrect: false },
      { label: "some vegetables", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-388",
    prompt: "de la salade",
    options: [
      { label: "some salad", isCorrect: true },
      { label: "some bread", isCorrect: false },
      { label: "some water", isCorrect: false },
      { label: "some vegetables", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-389",
    prompt: "de l’eau",
    options: [
      { label: "some water", isCorrect: true },
      { label: "some bread", isCorrect: false },
      { label: "some salad", isCorrect: false },
      { label: "some vegetables", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-390",
    prompt: "des légumes",
    options: [
      { label: "some vegetables", isCorrect: true },
      { label: "some bread", isCorrect: false },
      { label: "some salad", isCorrect: false },
      { label: "some water", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-391",
    prompt: "manger",
    options: [
      { label: "to eat", isCorrect: true },
      { label: "to drink", isCorrect: false },
      { label: "to order", isCorrect: false },
      { label: "to pay", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-392",
    prompt: "boire",
    options: [
      { label: "to drink", isCorrect: true },
      { label: "to eat", isCorrect: false },
      { label: "to order", isCorrect: false },
      { label: "to pay", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-393",
    prompt: "commander",
    options: [
      { label: "to order", isCorrect: true },
      { label: "to drink", isCorrect: false },
      { label: "to eat", isCorrect: false },
      { label: "to pay", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-394",
    prompt: "payer",
    options: [
      { label: "to pay", isCorrect: true },
      { label: "to eat", isCorrect: false },
      { label: "to order", isCorrect: false },
      { label: "to drink", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-395",
    prompt: "Je mange du pain.",
    options: [
      { label: "I eat bread.", isCorrect: true },
      { label: "I drink water.", isCorrect: false },
      { label: "I eat a salad.", isCorrect: false },
      { label: "I don’t drink coffee.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-396",
    prompt: "Je bois du café.",
    options: [
      { label: "I drink coffee.", isCorrect: true },
      { label: "I eat bread.", isCorrect: false },
      { label: "I don’t drink coffee.", isCorrect: false },
      { label: "I drink water.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-397",
    prompt: "Je ne bois pas de café.",
    options: [
      { label: "I don’t drink coffee.", isCorrect: true },
      { label: "I drink coffee.", isCorrect: false },
      { label: "I don’t eat bread.", isCorrect: false },
      { label: "I eat a salad.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-398",
    prompt: "Nous mangeons",
    options: [
      { label: "we eat", isCorrect: true },
      { label: "you eat", isCorrect: false },
      { label: "they eat", isCorrect: false },
      { label: "we drink", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-399",
    prompt: "Vous mangez",
    options: [
      { label: "you eat", isCorrect: true },
      { label: "we eat", isCorrect: false },
      { label: "they eat", isCorrect: false },
      { label: "you drink", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-400",
    prompt: "Ils mangent",
    options: [
      { label: "they eat", isCorrect: true },
      { label: "we eat", isCorrect: false },
      { label: "you eat", isCorrect: false },
      { label: "they drink", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-401",
    prompt: "Nous buvons",
    options: [
      { label: "we drink", isCorrect: true },
      { label: "you drink", isCorrect: false },
      { label: "they drink", isCorrect: false },
      { label: "we eat", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-402",
    prompt: "Vous buvez",
    options: [
      { label: "you drink", isCorrect: true },
      { label: "we drink", isCorrect: false },
      { label: "they drink", isCorrect: false },
      { label: "you eat", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-403",
    prompt: "Ils boivent",
    options: [
      { label: "they drink", isCorrect: true },
      { label: "we drink", isCorrect: false },
      { label: "you drink", isCorrect: false },
      { label: "they eat", isCorrect: false },
    ],
  },
].map((question) => ({
  ...question,
  promptFrenchTerm: question.prompt,
}));

seedCustomQuiz({
  lessonId: "lesson-41",
  quizId: "quiz-41",
  title: "Quiz 41: Food Quantities and Eating and Drinking",
  description:
    "Practise partitive articles, food and drink phrases, and the verbs manger and boire.",
  category: "Lesson 41 review",
  randomizeQuestionOrder: true,
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 41:", error);
  process.exitCode = 1;
});
