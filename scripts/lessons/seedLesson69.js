import { seedPastLesson } from "./seedPastLesson.js";

seedPastLesson(69).catch((error) => {
  console.error("Failed to seed lesson 69:", error);
  process.exitCode = 1;
});
