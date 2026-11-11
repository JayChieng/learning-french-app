import { seedFamilyLesson } from "./seedFamilyLesson.js";

seedFamilyLesson(53).catch((error) => {
  console.error("Failed to seed lesson 53:", error);
  process.exitCode = 1;
});
