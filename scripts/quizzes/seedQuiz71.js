import { seedPastVocabularyQuiz } from "./seedPastVocabularyQuiz.js";

seedPastVocabularyQuiz(71).catch((error) => {
  console.error("Failed to seed Quiz 71:", error);
  process.exitCode = 1;
});
