import { seedWorkLesson } from "./seedWorkLesson.js";

seedWorkLesson(61).catch((error) => {
  console.error("Failed to seed lesson 61:", error);
  process.exitCode = 1;
});
