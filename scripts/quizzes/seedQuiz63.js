import { seedFutureVocabularyQuiz } from "./seedFutureVocabularyQuiz.js";

seedFutureVocabularyQuiz(63).catch((error) => {
  console.error("Failed to seed Quiz 63:", error);
  process.exitCode = 1;
});
