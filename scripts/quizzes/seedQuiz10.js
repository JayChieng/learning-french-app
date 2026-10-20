import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(10).catch((error) => {
  console.error("Failed to seed Quiz 10:", error);
  process.exitCode = 1;
});