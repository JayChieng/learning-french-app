import { pastLessons } from "../lessons/pastLessonData.js";
import { seedConversationQuiz } from "./seedQuizHelper.js";

const lesson = pastLessons[78];
const wordsById = new Map(lesson.words.map((word) => [word.id, word]));
const questionBlanks = [
  null,
  "visité d'autres pays",
  "essayé ça",
  "visité Paris",
  "pris l'avion",
];
const answerBlanks = [
  "jamais",
  "voyagé au Canada et au Vietnam",
  "Pas encore",
  "déjà visité Paris",
  "plusieurs fois",
];

const pairs = lesson.conversationPairs.map((pair, index) => {
  const questionWord = wordsById.get(pair.questionVocabularyId);
  const answerWord = wordsById.get(pair.answerVocabularyId);
  if (!questionWord || !answerWord) {
    throw new Error(`Quiz 78 is missing vocabulary for conversation ${index + 1}.`);
  }

  return {
    fixedSpeakers: true,
    question: {
      speaker: "A",
      text: questionWord.french,
      translation: questionWord.english,
      sourceVocabularyIds: [questionWord.id],
      ...(questionBlanks[index]
        ? {
            blankCandidates: [questionBlanks[index]],
            answerMode: "choice",
          }
        : {}),
    },
    answer: {
      speaker: "B",
      text: answerWord.french,
      translation: answerWord.english,
      sourceVocabularyIds: [answerWord.id],
      blankCandidates: [answerBlanks[index]],
      answerMode: "choice",
    },
  };
});

seedConversationQuiz({
  quizId: "quiz-78",
  title: "Quiz 78: Talking About Past Experiences",
  description: "Complete French conversations about travel and past experiences.",
  expectedPairCount: 5,
  conversation: { pairs },
}).catch((error) => {
  console.error("Failed to seed Quiz 78:", error);
  process.exitCode = 1;
});
