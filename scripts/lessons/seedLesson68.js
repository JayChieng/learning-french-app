import { seedPastLesson } from "./seedPastLesson.js";

seedPastLesson(68).catch((error) => {
  console.error("Failed to seed lesson 68:", error);
  process.exitCode = 1;
});
