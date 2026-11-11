import { seedFamilyLesson } from "./seedFamilyLesson.js";

seedFamilyLesson(52).catch((error) => {
  console.error("Failed to seed lesson 52:", error);
  process.exitCode = 1;
});
