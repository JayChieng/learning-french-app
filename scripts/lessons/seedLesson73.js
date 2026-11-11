import { seedPastLesson } from "./seedPastLesson.js";

seedPastLesson(73).catch((error) => {
  console.error("Failed to seed lesson 73:", error);
  process.exitCode = 1;
});
