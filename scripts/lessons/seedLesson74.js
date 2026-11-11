import { seedPastLesson } from "./seedPastLesson.js";

seedPastLesson(74).catch((error) => {
  console.error("Failed to seed lesson 74:", error);
  process.exitCode = 1;
});
