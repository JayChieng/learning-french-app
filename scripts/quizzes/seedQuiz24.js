import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(24).catch((error) => {
  console.error("Failed to seed Quiz 24:", error);
  process.exitCode = 1;
});