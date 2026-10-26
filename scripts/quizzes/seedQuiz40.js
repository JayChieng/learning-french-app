import { seedCustomQuiz } from "./seedQuizHelper.js";

const vocabulary = [
  { id: "vocab-371", french: "Je voudrais…", english: "I would like…" },
  { id: "vocab-372", french: "Je voudrais un café.", english: "I would like a coffee." },
  { id: "vocab-373", french: "Je voudrais de l’eau, s’il vous plaît.", english: "I would like some water, please." },
  { id: "vocab-374", french: "Je voudrais du poulet avec du riz.", english: "I would like chicken with rice." },
  { id: "vocab-375", french: "Je voudrais une salade.", english: "I would like a salad." },
  { id: "vocab-376", french: "Je prends…", english: "I’ll have…" },
  { id: "vocab-377", french: "Je prends le poulet.", english: "I’ll have the chicken." },
  { id: "vocab-378", french: "Je prends un café.", english: "I’ll have a coffee." },
  { id: "vocab-379", french: "Vous avez le menu ?", english: "Do you have the menu?" },
  { id: "vocab-380", french: "Qu’est-ce que vous recommandez ?", english: "What do you recommend?" },
  { id: "vocab-381", french: "C’est combien ?", english: "How much is it?" },
  { id: "vocab-382", french: "Je peux avoir de l’eau, s’il vous plaît ?", english: "Can I have some water, please?" },
  { id: "vocab-383", french: "L’addition, s’il vous plaît.", english: "The bill, please." },
  { id: "vocab-384", french: "C’était très bon !", english: "It was very good!" },
  { id: "vocab-385", french: "tu", english: "informal you" },
  { id: "vocab-386", french: "vous", english: "polite you" },
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
  lessonId: "lesson-40",
  quizId: "quiz-40",
  title: "Quiz 40: Ordering at a Restaurant",
  description: "Practise polite ordering phrases and useful questions for a French restaurant.",
  category: "Lesson 40 review",
  randomizeQuestionOrder: true,
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 40:", error);
  process.exitCode = 1;
});
