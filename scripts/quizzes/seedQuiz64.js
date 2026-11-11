import { seedFutureVocabularyQuiz } from "./seedFutureVocabularyQuiz.js";

seedFutureVocabularyQuiz(64).catch((error) => {
  console.error("Failed to seed Quiz 64:", error);
  process.exitCode = 1;
});
