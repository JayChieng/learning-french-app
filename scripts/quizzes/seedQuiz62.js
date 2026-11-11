import { seedWorkVocabularyQuiz } from "./seedWorkVocabularyQuiz.js";

seedWorkVocabularyQuiz(62).catch((error) => {
  console.error("Failed to seed Quiz 62:", error);
  process.exitCode = 1;
});
