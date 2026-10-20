import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(20).catch((error) => {
  console.error("Failed to seed Quiz 20:", error);
  process.exitCode = 1;
});