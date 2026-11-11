import { seedFamilyLesson } from "./seedFamilyLesson.js";

seedFamilyLesson(56).catch((error) => {
  console.error("Failed to seed lesson 56:", error);
  process.exitCode = 1;
});
