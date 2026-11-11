import { seedFamilyLesson } from "./seedFamilyLesson.js";

seedFamilyLesson(54).catch((error) => {
  console.error("Failed to seed lesson 54:", error);
  process.exitCode = 1;
});
