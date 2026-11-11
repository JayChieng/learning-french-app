import { seedFutureLesson } from "./seedFutureLesson.js";

seedFutureLesson(64).catch((error) => {
  console.error("Failed to seed lesson 64:", error);
  process.exitCode = 1;
});
