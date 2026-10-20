import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(8).catch((error) => {
  console.error("Failed to seed Quiz 8:", error);
  process.exitCode = 1;
});