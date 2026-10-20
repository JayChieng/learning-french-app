import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(7).catch((error) => {
  console.error("Failed to seed Quiz 7:", error);
  process.exitCode = 1;
});