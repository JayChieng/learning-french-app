import { seedQuestionAnswerQuiz } from "./seedQuizQuestionAnswer.js";

seedQuestionAnswerQuiz(33).catch((error) => {
  console.error("Failed to seed Quiz 33:", error);
  process.exitCode = 1;
});