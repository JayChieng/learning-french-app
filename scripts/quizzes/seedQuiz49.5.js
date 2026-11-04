import { seedConversationQuiz } from "./seedQuizHelper.js";

const conversation = {
  pairs: [
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Bonjour, excusez-moi. Où est le carrefour ?",
        translation: "Hello, excuse me. Where is the intersection?",
        sourceVocabularyIds: ["vocab-519", "vocab-529"],
      },
      answer: {
        speaker: "B",
        text: "Le carrefour est près de la place.",
        translation: "The intersection is near the square.",
        sourceVocabularyIds: ["vocab-525", "vocab-529", "vocab-537"],
        blankCandidates: ["près de la place"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Je continue tout droit ?",
        translation: "Do I continue straight ahead?",
        sourceVocabularyIds: ["vocab-524", "vocab-533"],
        blankCandidates: ["tout droit"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Oui, continuez jusqu’au pont.",
        translation: "Yes, continue as far as the bridge.",
        sourceVocabularyIds: ["vocab-533", "vocab-536", "vocab-542"],
        blankCandidates: ["jusqu’au pont"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Après le pont, je tourne où ?",
        translation: "After the bridge, where do I turn?",
        sourceVocabularyIds: ["vocab-519", "vocab-531", "vocab-536"],
        blankCandidates: ["je tourne où"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Tournez à gauche dans la rue.",
        translation: "Turn left onto the street.",
        sourceVocabularyIds: ["vocab-522", "vocab-527", "vocab-531"],
        blankCandidates: ["à gauche"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Le magasin est loin d’ici ?",
        translation: "Is the store far from here?",
        sourceVocabularyIds: ["vocab-520", "vocab-526", "vocab-539"],
        blankCandidates: ["loin d’ici"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Non, il est en face de la place.",
        translation: "No, it is opposite the square.",
        sourceVocabularyIds: ["vocab-537", "vocab-541"],
        blankCandidates: ["en face de la place"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Comment aller au carrefour ?",
        translation: "How do I get to the intersection?",
        sourceVocabularyIds: ["vocab-529"],
        blankCandidates: ["au carrefour"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Prenez l’avenue jusqu’au feu rouge.",
        translation: "Take the avenue as far as the traffic light.",
        sourceVocabularyIds: ["vocab-534", "vocab-538", "vocab-542", "vocab-530"],
        blankCandidates: ["l’avenue jusqu’au feu rouge"],
        answerMode: "choice",
      },
    },
  ],
};

seedConversationQuiz({
  quizId: "quiz-49.5",
  title: "Quiz 49.5: Asking for Directions",
  description:
    "Practise asking for and giving directions in a French conversation using places and route vocabulary.",
  expectedPairCount: 5,
  conversation,
}).catch((error) => {
  console.error("Failed to seed Quiz 49.5:", error);
  process.exitCode = 1;
});
