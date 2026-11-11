import { seedFutureVocabularyQuiz } from "./seedFutureVocabularyQuiz.js";

seedFutureVocabularyQuiz(65).catch((error) => {
  console.error("Failed to seed Quiz 65:", error);
  process.exitCode = 1;
});
