import { seedPastVocabularyQuiz } from "./seedPastVocabularyQuiz.js";

seedPastVocabularyQuiz(67).catch((error) => {
  console.error("Failed to seed Quiz 67:", error);
  process.exitCode = 1;
});
