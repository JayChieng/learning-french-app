import { seedPastVocabularyQuiz } from "./seedPastVocabularyQuiz.js";

seedPastVocabularyQuiz(70).catch((error) => {
  console.error("Failed to seed Quiz 70:", error);
  process.exitCode = 1;
});
