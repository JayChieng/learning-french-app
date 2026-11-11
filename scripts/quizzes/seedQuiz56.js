import { seedConversationQuiz } from "./seedQuizHelper.js";

const conversation = {
  pairs: [
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Tu as des frères et sœurs ?",
        translation: "Do you have siblings?",
        sourceVocabularyIds: ["vocab-610"],
      },
      answer: {
        speaker: "B",
        text: "Oui, j'ai un frère et une sœur.",
        translation: "Yes, I have a brother and a sister.",
        sourceVocabularyIds: ["vocab-615"],
        blankCandidates: ["un frère et une sœur"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Ils habitent où ?",
        translation: "Where do they live?",
        sourceVocabularyIds: ["vocab-616"],
        blankCandidates: ["où"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Ils habitent au Vietnam.",
        translation: "They live in Vietnam.",
        sourceVocabularyIds: ["vocab-617"],
        blankCandidates: ["au Vietnam"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Tu as combien de frères ?",
        translation: "How many brothers do you have?",
        sourceVocabularyIds: ["vocab-611"],
        blankCandidates: ["combien de frères"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "J'ai deux frères.",
        translation: "I have two brothers.",
        sourceVocabularyIds: ["vocab-591"],
        blankCandidates: ["deux frères"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Tu as des enfants ?",
        translation: "Do you have children?",
        sourceVocabularyIds: ["vocab-612"],
        blankCandidates: ["des enfants"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Je n'ai pas d'enfants.",
        translation: "I don't have children.",
        sourceVocabularyIds: ["vocab-618"],
        blankCandidates: ["pas d'enfants"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Comment s'appelle ta mère ?",
        translation: "What's your mother's name?",
        sourceVocabularyIds: ["vocab-613"],
        blankCandidates: ["ta mère"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Ma mère s'appelle Marie.",
        translation: "My mother's name is Marie.",
        sourceVocabularyIds: ["vocab-619"],
        blankCandidates: ["s'appelle Marie"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Où habite ta famille ?",
        translation: "Where does your family live?",
        sourceVocabularyIds: ["vocab-614"],
        blankCandidates: ["Où"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Mes parents habitent au Canada.",
        translation: "My parents live in Canada.",
        sourceVocabularyIds: ["vocab-620"],
        blankCandidates: ["au Canada"],
        answerMode: "choice",
      },
    },
  ],
};

seedConversationQuiz({
  quizId: "quiz-56",
  title: "Quiz 56: Talking About Your Family",
  description: "Practise asking and answering questions about siblings, children, and family.",
  expectedPairCount: 6,
  conversation,
}).catch((error) => {
  console.error("Failed to seed Quiz 56:", error);
  process.exitCode = 1;
});
