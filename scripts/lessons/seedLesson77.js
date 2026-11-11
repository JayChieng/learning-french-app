import { seedPastLesson } from "./seedPastLesson.js";

seedPastLesson(77).catch((error) => {
  console.error("Failed to seed lesson 77:", error);
  process.exitCode = 1;
});
