import { seedWorkLesson } from "./seedWorkLesson.js";

seedWorkLesson(59).catch((error) => {
  console.error("Failed to seed lesson 59:", error);
  process.exitCode = 1;
});
