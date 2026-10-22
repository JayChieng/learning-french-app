import { seedCustomQuiz } from "./seedQuizHelper.js";

export async function seedLessonQuiz(lessonNumber, questions) {
  await seedCustomQuiz({
    lessonId: `lesson-${lessonNumber}`,
    quizId: `quiz-${lessonNumber}`,
    title: `Quiz ${lessonNumber}: Lesson ${lessonNumber} Review`,
    description: `Practise the French vocabulary and sentence patterns from Lesson ${lessonNumber}.`,
    category: `Lesson ${lessonNumber} review`,
    dialogueMode: true,
    randomizeQuestionOrder: true,
    questions: questions.map(
      ({
        vocabularyId,
        prompt,
        question,
        questionTranslation,
        answer,
        answerTranslation,
        distractors,
      }) => ({
        vocabularyId,
        prompt,
        dialogue: [
          { speaker: "A", text: question, translation: questionTranslation },
          { speaker: "B", text: "", blank: true },
        ],
        options: [
          { label: answer, isCorrect: true, translation: answerTranslation },
          ...distractors.map(({ label, translation }) => ({
            label,
            isCorrect: false,
            translation,
          })),
        ],
      })
    ),
  });
}
