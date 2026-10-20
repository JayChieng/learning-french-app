import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(22).catch((error) => {
  console.error("Failed to seed Quiz 22:", error);
  process.exitCode = 1;
});