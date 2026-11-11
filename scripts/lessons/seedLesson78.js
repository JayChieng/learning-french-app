import { seedPastLesson } from "./seedPastLesson.js";

seedPastLesson(78).catch((error) => {
  console.error("Failed to seed lesson 78:", error);
  process.exitCode = 1;
});
