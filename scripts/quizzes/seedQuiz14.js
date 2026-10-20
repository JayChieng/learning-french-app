import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(14).catch((error) => {
  console.error("Failed to seed Quiz 14:", error);
  process.exitCode = 1;
});