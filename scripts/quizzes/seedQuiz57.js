import { activityLessons } from "../lessons/activityLessonData.js";
import { seedCustomQuiz } from "./seedQuizHelper.js";

const lessonNumber = 57;
const lesson = activityLessons[lessonNumber];
const questions = lesson.words.map((word, index) => {
  const frenchToEnglish = index % 2 === 0;
  const answerField = frenchToEnglish ? "english" : "french";
  const correctAnswer = word[answerField];
  const options = [
    { label: correctAnswer, isCorrect: true },
    ...[1, 2, 3].map((offset) => {
      const distractor = lesson.words[(index + offset) % lesson.words.length];
      return { label: distractor[answerField], isCorrect: false };
    }),
  ];

  return {
    vocabularyId: word.id,
    prompt: frenchToEnglish
      ? `What does "${word.french}" mean?`
      : `How do you say "${word.english}" in French?`,
    speechSegments: [{ text: word.french, lang: "fr-FR" }],
    options,
  };
});

seedCustomQuiz({
  lessonId: `lesson-${lessonNumber}`,
  quizId: `quiz-${lessonNumber}`,
  title: `Quiz ${lessonNumber}: Daily Activities`,
  description: "Practise French verbs for everyday activities and routines.",
  category: "Daily activities",
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 57:", error);
  process.exitCode = 1;
});
