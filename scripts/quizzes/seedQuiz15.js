import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(15, true).catch((error) => {
  console.error("Failed to seed Quiz 15:", error);
  process.exitCode = 1;
});