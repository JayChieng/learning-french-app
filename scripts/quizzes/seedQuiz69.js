import { seedPastVocabularyQuiz } from "./seedPastVocabularyQuiz.js";

seedPastVocabularyQuiz(69).catch((error) => {
  console.error("Failed to seed Quiz 69:", error);
  process.exitCode = 1;
});
