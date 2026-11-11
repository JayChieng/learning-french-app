import { seedPastVocabularyQuiz } from "./seedPastVocabularyQuiz.js";

seedPastVocabularyQuiz(73).catch((error) => {
  console.error("Failed to seed Quiz 73:", error);
  process.exitCode = 1;
});
