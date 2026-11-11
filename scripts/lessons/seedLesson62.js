import { seedWorkLesson } from "./seedWorkLesson.js";

seedWorkLesson(62).catch((error) => {
  console.error("Failed to seed lesson 62:", error);
  process.exitCode = 1;
});
