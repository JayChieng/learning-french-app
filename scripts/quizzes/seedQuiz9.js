import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(9).catch((error) => {
  console.error("Failed to seed Quiz 9:", error);
  process.exitCode = 1;
});