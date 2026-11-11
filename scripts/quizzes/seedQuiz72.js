import { pastLessons } from "../lessons/pastLessonData.js";
import { seedConversationQuiz } from "./seedQuizHelper.js";

const lesson = pastLessons[72];
const wordsById = new Map(lesson.words.map((word) => [word.id, word]));

const pairs = lesson.conversationPairs.map((pair, index) => {
  const questionWord = wordsById.get(pair.questionVocabularyId);
  const answerWord = wordsById.get(pair.answerVocabularyId);
  if (!questionWord || !answerWord) {
    throw new Error(`Quiz 72 is missing vocabulary for conversation ${index + 1}.`);
  }

  const questionBlank = [
    "Qu'est-ce que tu as fait",
    "qu'est-ce que tu as fait",
    "mangé hier",
    "étudié la semaine dernière",
    "sorti hier soir",
  ][index];
  const answerBlank = [
    "travaillé toute la journée",
    "regardé un film",
    "mangé",
    "étudié",
    "ne suis pas sorti",
  ][index];

  return {
    fixedSpeakers: true,
    question: {
      speaker: "A",
      text: questionWord.french,
      translation: questionWord.english,
      sourceVocabularyIds: [questionWord.id],
      ...(index > 0
        ? { blankCandidates: [questionBlank], answerMode: "choice" }
        : {}),
    },
    answer: {
      speaker: "B",
      text: answerWord.french,
      translation: answerWord.english,
      sourceVocabularyIds: [answerWord.id],
      blankCandidates: [answerBlank],
      answerMode: "choice",
    },
  };
});

seedConversationQuiz({
  quizId: "quiz-72",
  title: "Quiz 72: Talking About Yesterday",
  description: "Complete a French conversation about what you did yesterday.",
  expectedPairCount: 5,
  conversation: { pairs },
}).catch((error) => {
  console.error("Failed to seed Quiz 72:", error);
  process.exitCode = 1;
});
