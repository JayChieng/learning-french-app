import { seedQuestionAnswerQuiz } from "./seedQuizQuestionAnswer.js";

seedQuestionAnswerQuiz(32).catch((error) => {
  console.error("Failed to seed Quiz 32:", error);
  process.exitCode = 1;
});