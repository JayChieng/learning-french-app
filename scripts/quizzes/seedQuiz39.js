import { seedCustomQuiz } from "./seedQuizHelper.js";

const vocabulary = [
  { id: "vocab-357", french: "du pain", english: "bread" },
  { id: "vocab-358", french: "du riz", english: "rice" },
  { id: "vocab-359", french: "du poulet", english: "chicken" },
  { id: "vocab-360", french: "du poisson", english: "fish" },
  { id: "vocab-361", french: "de l’eau", english: "water" },
  { id: "vocab-362", french: "du café", english: "coffee" },
  { id: "vocab-363", french: "une bière", english: "a beer" },
  { id: "vocab-364", french: "un thé", english: "a tea" },
  { id: "vocab-365", french: "un jus", english: "a juice" },
  { id: "vocab-366", french: "une salade", english: "a salad" },
  { id: "vocab-367", french: "des légumes", english: "vegetables" },
  { id: "vocab-368", french: "un dessert", english: "a dessert" },
  { id: "vocab-369", french: "le menu", english: "the menu" },
  { id: "vocab-370", french: "l’addition", english: "the bill" },
];

const meanings = vocabulary.map((word) => word.english);
const questions = vocabulary.map((word, index) => ({
  vocabularyId: word.id,
  prompt: `What does "${word.french}" mean?`,
  promptFrenchTerm: word.french,
  promptTranslation: word.english,
  options: Array.from({ length: 4 }, (_, offset) => {
    const meaning = meanings[(index + offset) % meanings.length];
    return {
      label: meaning,
      isCorrect: meaning === word.english,
    };
  }),
}));

seedCustomQuiz({
  lessonId: "lesson-39",
  quizId: "quiz-39",
  title: "Quiz 39: Food and Drink",
  description: "Practise the French food and drink vocabulary from Lesson 39.",
  category: "Lesson 39 review",
  randomizeQuestionOrder: true,
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 39:", error);
  process.exitCode = 1;
});
