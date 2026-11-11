import { seedPastLesson } from "./seedPastLesson.js";

seedPastLesson(75).catch((error) => {
  console.error("Failed to seed lesson 75:", error);
  process.exitCode = 1;
});
