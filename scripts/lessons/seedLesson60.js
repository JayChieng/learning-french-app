import { seedWorkLesson } from "./seedWorkLesson.js";

seedWorkLesson(60).catch((error) => {
  console.error("Failed to seed lesson 60:", error);
  process.exitCode = 1;
});
