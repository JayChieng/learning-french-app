import { seedActivityLesson } from "./seedActivityLesson.js";

seedActivityLesson(57).catch((error) => {
  console.error("Failed to seed lesson 57:", error);
  process.exitCode = 1;
});
