import { seedPastLesson } from "./seedPastLesson.js";

seedPastLesson(70).catch((error) => {
  console.error("Failed to seed lesson 70:", error);
  process.exitCode = 1;
});
