import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(11).catch((error) => {
  console.error("Failed to seed Quiz 11:", error);
  process.exitCode = 1;
});