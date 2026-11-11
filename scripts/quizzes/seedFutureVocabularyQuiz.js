import { futureLessons } from "../lessons/futureLessonData.js";
import { seedCustomQuiz } from "./seedQuizHelper.js";

export async function seedFutureVocabularyQuiz(lessonNumber) {
  const lesson = futureLessons[lessonNumber];
  if (!lesson) {
    throw new Error(`No future plans lesson data found for quiz ${lessonNumber}.`);
  }

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

  await seedCustomQuiz({
    lessonId: `lesson-${lessonNumber}`,
    quizId: `quiz-${lessonNumber}`,
    title: `Quiz ${lessonNumber}: ${lesson.title.replace(/^Lesson \d+: /, "")}`,
    description: `Practise French future plans vocabulary from Lesson ${lessonNumber}.`,
    category: lesson.category,
    questions,
  });
}
