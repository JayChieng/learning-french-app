import { workLessons } from "../lessons/workLessonData.js";
import { seedCustomQuiz } from "./seedQuizHelper.js";

const lesson = workLessons[61];
const answerWords = [
  "vocab-658",
  "vocab-659",
  "vocab-660",
  "vocab-661",
  "vocab-664",
  "vocab-670",
  "vocab-662",
  "vocab-665",
  "vocab-666",
  "vocab-667",
  "vocab-668",
  "vocab-669",
  "vocab-685",
  "vocab-686",
  "vocab-687",
  "vocab-688",
];

const questions = lesson.conversationQuestions.map((item, index) => {
  const questionWord = lesson.words.find((word) => word.id === item.vocabularyId);
  const correctWord = [...workLessons[60].words, ...workLessons[62].words].find(
    (word) => word.id === item.answerVocabularyId
  );
  if (!questionWord || !correctWord) {
    throw new Error(`Quiz 61 is missing vocabulary for conversation ${index + 1}.`);
  }

  const distractors = answerWords
    .map((id) =>
      [...workLessons[60].words, ...workLessons[62].words].find((word) => word.id === id)
    )
    .filter((word) => word && word.id !== correctWord.id)
    .slice(index, index + 3);

  if (distractors.length !== 3) {
    throw new Error(`Quiz 61 requires three unique answer choices for conversation ${index + 1}.`);
  }

  return {
    vocabularyId: correctWord.id,
    prompt: questionWord.english,
    dialogue: [
      { speaker: "A", text: questionWord.french, translation: questionWord.english },
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
  lessonIds: ["lesson-60", "lesson-61", "lesson-62"],
  quizId: "quiz-61",
  title: "Quiz 61: Asking About Work",
  description: "Complete French work and study conversations by choosing B's reply.",
  category: "Work and studies",
  dialogueMode: true,
  randomizeQuestionOrder: false,
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 61:", error);
  process.exitCode = 1;
});
