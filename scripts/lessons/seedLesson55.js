import { seedFamilyLesson } from "./seedFamilyLesson.js";

seedFamilyLesson(55).catch((error) => {
  console.error("Failed to seed lesson 55:", error);
  process.exitCode = 1;
});
