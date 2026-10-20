import { seedQuestionAnswerQuiz } from "./seedQuizQuestionAnswer.js";

seedQuestionAnswerQuiz(30).catch((error) => {
  console.error("Failed to seed Quiz 30:", error);
  process.exitCode = 1;
});