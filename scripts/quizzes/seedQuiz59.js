import { seedWorkVocabularyQuiz } from "./seedWorkVocabularyQuiz.js";

seedWorkVocabularyQuiz(59).catch((error) => {
  console.error("Failed to seed Quiz 59:", error);
  process.exitCode = 1;
});
