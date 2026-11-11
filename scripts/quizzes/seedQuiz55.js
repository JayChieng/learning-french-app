import { seedFamilyQuiz } from "./seedFamilyQuiz.js";

seedFamilyQuiz(55).catch((error) => {
  console.error("Failed to seed Quiz 55:", error);
  process.exitCode = 1;
});
