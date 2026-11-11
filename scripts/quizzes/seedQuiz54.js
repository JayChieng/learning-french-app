import { seedFamilyQuiz } from "./seedFamilyQuiz.js";

seedFamilyQuiz(54).catch((error) => {
  console.error("Failed to seed Quiz 54:", error);
  process.exitCode = 1;
});
