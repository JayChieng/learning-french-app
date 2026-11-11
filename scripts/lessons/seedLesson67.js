import { seedPastLesson } from "./seedPastLesson.js";

seedPastLesson(67).catch((error) => {
  console.error("Failed to seed lesson 67:", error);
  process.exitCode = 1;
});
