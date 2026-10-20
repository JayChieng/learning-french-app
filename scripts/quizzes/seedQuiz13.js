import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(13).catch((error) => {
  console.error("Failed to seed Quiz 13:", error);
  process.exitCode = 1;
});