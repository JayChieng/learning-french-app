import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(25).catch((error) => {
  console.error("Failed to seed Quiz 25:", error);
  process.exitCode = 1;
});