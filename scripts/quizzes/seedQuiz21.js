import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(21).catch((error) => {
  console.error("Failed to seed Quiz 21:", error);
  process.exitCode = 1;
});