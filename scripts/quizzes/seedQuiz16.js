import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(16, true).catch((error) => {
  console.error("Failed to seed Quiz 16:", error);
  process.exitCode = 1;
});