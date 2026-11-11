import { seedFamilyQuiz } from "./seedFamilyQuiz.js";

seedFamilyQuiz(52).catch((error) => {
  console.error("Failed to seed Quiz 52:", error);
  process.exitCode = 1;
});
