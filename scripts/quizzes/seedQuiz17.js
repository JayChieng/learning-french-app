import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(17, true).catch((error) => {
  console.error("Failed to seed Quiz 17:", error);
  process.exitCode = 1;
});