import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(6).catch((error) => {
  console.error("Failed to seed Quiz 6:", error);
  process.exitCode = 1;
});