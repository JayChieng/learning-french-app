import { seedFutureLesson } from "./seedFutureLesson.js";

seedFutureLesson(66).catch((error) => {
  console.error("Failed to seed lesson 66:", error);
  process.exitCode = 1;
});
