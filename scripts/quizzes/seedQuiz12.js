import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(12).catch((error) => {
  console.error("Failed to seed Quiz 12:", error);
  process.exitCode = 1;
});