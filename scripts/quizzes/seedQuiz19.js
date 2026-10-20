import { seedLessonReviewQuiz } from "./seedQuizHelper.js";

seedLessonReviewQuiz(19, true).catch((error) => {
  console.error("Failed to seed Quiz 19:", error);
  process.exitCode = 1;
});