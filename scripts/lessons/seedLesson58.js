import { seedActivityLesson } from "./seedActivityLesson.js";

seedActivityLesson(58).catch((error) => {
  console.error("Failed to seed lesson 58:", error);
  process.exitCode = 1;
});
