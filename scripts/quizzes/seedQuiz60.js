import { seedWorkVocabularyQuiz } from "./seedWorkVocabularyQuiz.js";

seedWorkVocabularyQuiz(60).catch((error) => {
  console.error("Failed to seed Quiz 60:", error);
  process.exitCode = 1;
});
