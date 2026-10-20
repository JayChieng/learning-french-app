import { seedQuestionAnswerQuiz } from "./seedQuizQuestionAnswer.js";

seedQuestionAnswerQuiz(28).catch((error) => {
  console.error("Failed to seed Quiz 28:", error);
  process.exitCode = 1;
});