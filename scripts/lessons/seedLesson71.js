import { seedPastLesson } from "./seedPastLesson.js";

seedPastLesson(71).catch((error) => {
  console.error("Failed to seed lesson 71:", error);
  process.exitCode = 1;
});
