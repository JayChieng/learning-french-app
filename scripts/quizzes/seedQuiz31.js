import { seedQuestionAnswerQuiz } from "./seedQuizQuestionAnswer.js";

seedQuestionAnswerQuiz(31).catch((error) => {
  console.error("Failed to seed Quiz 31:", error);
  process.exitCode = 1;
});