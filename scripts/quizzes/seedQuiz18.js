import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(18, true).catch((error) => {
  console.error("Failed to seed Quiz 18:", error);
  process.exitCode = 1;
});