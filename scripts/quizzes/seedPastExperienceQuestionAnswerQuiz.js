import { pastLessons } from "../lessons/pastLessonData.js";
import { seedCustomQuiz } from "./seedQuizHelper.js";

const wordsByFrench = new Map(
  Object.values(pastLessons)
    .flatMap((lesson) => lesson.words)
    .map((word) => [word.french, word])
);

export async function seedPastExperienceQuestionAnswerQuiz({
  quizId,
  title,
  description,
  pairs,
}) {
  const resolvedPairs = pairs.map((pair, index) => {
    const questionWord = wordsByFrench.get(pair.questionVocabularyText ?? pair.question);
    const answerWord = wordsByFrench.get(pair.answer);

    if (!questionWord || !answerWord) {
      throw new Error(`${title} is missing vocabulary for question and answer ${index + 1}.`);
    }

    return { questionWord, answerWord, pair };
  });
  const answerLabels = resolvedPairs.map(({ answerWord }) => answerWord.french);

  if (new Set(answerLabels).size !== answerLabels.length) {
    throw new Error(`${title} must have a unique answer phrase for each question.`);
  }

  const questions = resolvedPairs.map(({ questionWord, answerWord, pair }, index) => {
    const distractors = [1, 2, 3].map(
      (offset) => resolvedPairs[(index + offset) % resolvedPairs.length].answerWord
    );

    return {
      vocabularyId: questionWord.id,
      prompt: pair.questionTranslation ?? questionWord.english,
      dialogue: [
        {
          speaker: "A",
          text: pair.question,
          translation: pair.questionTranslation ?? questionWord.english,
        },
        { speaker: "B", text: "", blank: true },
      ],
      options: [
        {
          label: answerWord.french,
          isCorrect: true,
          translation: answerWord.english,
        },
        ...distractors.map((word) => ({
          label: word.french,
          isCorrect: false,
          translation: word.english,
        })),
      ],
    };
  });

  await seedCustomQuiz({
    lessonIds: [73, 74, 75, 76, 77, 78].map((number) => `lesson-${number}`),
    quizId,
    title,
    description,
    category: "Past experiences",
    dialogueMode: true,
    randomizeQuestionOrder: false,
    questions,
  });
}
