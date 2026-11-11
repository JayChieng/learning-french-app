import { seedFamilyQuiz } from "./seedFamilyQuiz.js";

seedFamilyQuiz(53).catch((error) => {
  console.error("Failed to seed Quiz 53:", error);
  process.exitCode = 1;
});
