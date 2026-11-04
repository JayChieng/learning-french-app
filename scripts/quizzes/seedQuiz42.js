import { seedConversationQuiz } from "./seedQuizHelper.js";

const conversation = {
  pairs: [
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Bonjour ! Vous désirez quelque chose à boire ?",
        translation: "Hello! Would you like something to drink?",
        sourceVocabularyIds: ["vocab-404"],
      },
      answer: {
        speaker: "B",
        text: "Oui, je voudrais de l’eau, s’il vous plaît.",
        translation: "Yes, I would like some water, please.",
        sourceVocabularyIds: ["vocab-405"],
        blankCandidates: ["de l’eau"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Et pour manger ?",
        translation: "And to eat?",
        sourceVocabularyIds: ["vocab-406"],
        blankCandidates: ["manger"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Je voudrais du poulet avec du riz.",
        translation: "I would like chicken with rice.",
        sourceVocabularyIds: ["vocab-407"],
        blankCandidates: ["du poulet avec du riz"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Très bien. Autre chose ?",
        translation: "Very good. Anything else?",
        sourceVocabularyIds: ["vocab-408"],
        blankCandidates: ["Autre chose"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Non, merci. C’est tout.",
        translation: "No, thank you. That’s all.",
        sourceVocabularyIds: ["vocab-409"],
        blankCandidates: ["C’est tout"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "L’addition, s’il vous plaît.",
        translation: "The bill, please.",
        sourceVocabularyIds: ["vocab-410"],
        blankCandidates: ["L’addition"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Bien sûr !",
        translation: "Of course!",
        sourceVocabularyIds: ["vocab-410"],
        blankCandidates: ["Bien sûr"],
        answerMode: "choice",
      },
    },
  ],
};

seedConversationQuiz({
  quizId: "quiz-42",
  title: "Quiz 42: Mini Conversation at a Restaurant",
  description:
    "Complete a short restaurant conversation, from ordering a drink and a meal to asking for the bill.",
  expectedPairCount: 4,
  conversation,
}).catch((error) => {
  console.error("Failed to seed Quiz 42:", error);
  process.exitCode = 1;
});
