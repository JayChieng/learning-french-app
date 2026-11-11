import { futureLessons } from "../lessons/futureLessonData.js";
import { seedConversationQuiz } from "./seedQuizHelper.js";

const wordsById = new Map(
  Object.values(futureLessons)
    .flatMap((lesson) => lesson.words)
    .map((word) => [word.id, word])
);

function dialogueLine(vocabularyId, speaker, blankCandidate) {
  const word = wordsById.get(vocabularyId);
  if (!word) {
    throw new Error(`Missing Quiz 66 vocabulary: ${vocabularyId}.`);
  }

  return {
    speaker,
    text: word.french,
    translation: word.english,
    sourceVocabularyIds: [vocabularyId],
    ...(blankCandidate ? { blankCandidates: [blankCandidate], answerMode: "choice" } : {}),
  };
}

const pairs = [
  {
    question: dialogueLine("vocab-730", "A"),
    answer: dialogueLine("vocab-731", "B", "sortir avec mes amis"),
  },
  {
    question: dialogueLine("vocab-732", "A", "aller au cinéma"),
    answer: dialogueLine("vocab-733", "B", "avec plaisir"),
  },
  {
    question: dialogueLine("vocab-718", "A", "au cinéma"),
    answer: dialogueLine("vocab-722", "B", "Bonne idée"),
  },
  {
    question: dialogueLine("vocab-719", "A", "libre demain"),
    answer: dialogueLine("vocab-735", "B", "je suis libre demain"),
  },
  {
    question: dialogueLine("vocab-720", "A", "disponible ce soir"),
    answer: dialogueLine("vocab-723", "B", "je suis occupé"),
  },
  {
    question: dialogueLine("vocab-728", "A", "travailler ce week-end"),
    answer: dialogueLine("vocab-734", "B", "ne vais pas travailler"),
  },
  {
    question: dialogueLine("vocab-725", "A", "faire demain"),
    answer: dialogueLine("vocab-710", "B", "vais étudier"),
  },
  {
    question: dialogueLine("vocab-729", "A", "tes projets"),
    answer: dialogueLine("vocab-715", "B", "allons voyager"),
  },
  {
    question: dialogueLine("vocab-726", "A", "vas-tu aller"),
    answer: dialogueLine("vocab-736", "B", "au cinéma"),
  },
].map((pair) => ({
  ...pair,
  fixedSpeakers: true,
}));

seedConversationQuiz({
  quizId: "quiz-66",
  title: "Quiz 66: Making Plans with Friends",
  description: "Complete a French conversation about future plans and making arrangements.",
  expectedPairCount: 9,
  conversation: { pairs },
}).catch((error) => {
  console.error("Failed to seed Quiz 66:", error);
  process.exitCode = 1;
});
