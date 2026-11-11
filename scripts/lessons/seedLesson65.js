import { seedFutureLesson } from "./seedFutureLesson.js";

seedFutureLesson(65).catch((error) => {
  console.error("Failed to seed lesson 65:", error);
  process.exitCode = 1;
});
