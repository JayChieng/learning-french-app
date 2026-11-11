import { activityLessons } from "../lessons/activityLessonData.js";
import { seedCustomQuiz } from "./seedQuizHelper.js";

const lessonNumber = 58;
const lesson = activityLessons[lessonNumber];
const questions = lesson.conversationQuestions.map((item, index) => {
  const correctWord = lesson.words.find((word) => word.id === item.vocabularyId);
  if (!correctWord) {
    throw new Error(`Missing vocabulary ${item.vocabularyId} for Lesson ${lessonNumber}.`);
  }

  const distractors = [1, 2, 3].map(
    (offset) => lesson.words[(index + offset) % lesson.words.length]
  );

  return {
    vocabularyId: item.vocabularyId,
    prompt: item.questionTranslation,
    dialogue: [
      { speaker: "A", text: item.question, translation: item.questionTranslation },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: correctWord.french, isCorrect: true, translation: correctWord.english },
      ...distractors.map((word) => ({
        label: word.french,
        isCorrect: false,
        translation: word.english,
      })),
    ],
  };
});

seedCustomQuiz({
  lessonId: `lesson-${lessonNumber}`,
  quizId: `quiz-${lessonNumber}`,
  title: "Quiz 58: Talking About Your Hobbies",
  description: "Complete French conversations about hobbies by choosing B's reply.",
  category: "Hobbies",
  dialogueMode: true,
  randomizeQuestionOrder: false,
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 58:", error);
  process.exitCode = 1;
});
