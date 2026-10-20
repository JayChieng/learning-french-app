import { seedQuestionAnswerQuiz } from "./seedQuizQuestionAnswer.js";

seedQuestionAnswerQuiz(27).catch((error) => {
  console.error("Failed to seed Quiz 27:", error);
  process.exitCode = 1;
});