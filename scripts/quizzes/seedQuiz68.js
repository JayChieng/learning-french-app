import { seedPastVocabularyQuiz } from "./seedPastVocabularyQuiz.js";

seedPastVocabularyQuiz(68).catch((error) => {
  console.error("Failed to seed Quiz 68:", error);
  process.exitCode = 1;
});
