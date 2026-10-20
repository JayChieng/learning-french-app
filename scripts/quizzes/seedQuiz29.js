import { seedQuestionAnswerQuiz } from "./seedQuizQuestionAnswer.js";

seedQuestionAnswerQuiz(29).catch((error) => {
  console.error("Failed to seed Quiz 29:", error);
  process.exitCode = 1;
});