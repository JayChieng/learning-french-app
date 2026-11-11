import { seedFutureLesson } from "./seedFutureLesson.js";

seedFutureLesson(63).catch((error) => {
  console.error("Failed to seed lesson 63:", error);
  process.exitCode = 1;
});
