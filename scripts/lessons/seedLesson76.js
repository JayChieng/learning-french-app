import { seedPastLesson } from "./seedPastLesson.js";

seedPastLesson(76).catch((error) => {
  console.error("Failed to seed lesson 76:", error);
  process.exitCode = 1;
});
