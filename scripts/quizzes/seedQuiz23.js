import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(23).catch((error) => {
  console.error("Failed to seed Quiz 23:", error);
  process.exitCode = 1;
});