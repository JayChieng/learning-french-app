import { seedPastLesson } from "./seedPastLesson.js";

seedPastLesson(72).catch((error) => {
  console.error("Failed to seed lesson 72:", error);
  process.exitCode = 1;
});
