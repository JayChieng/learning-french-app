import { seedConversationQuiz } from "./seedQuizHelper.js";

const conversation = {
  pairs: [
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Vous cherchez ce pantalon ?",
        translation: "Are you looking for these pants?",
        sourceVocabularyIds: ["vocab-443"],
      },
      answer: {
        speaker: "B",
        text: "Oui, je cherche ce pantalon.",
        translation: "Yes, I’m looking for these pants.",
        sourceVocabularyIds: ["vocab-443"],
        blankCandidates: ["ce pantalon"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Combien ça coûte ?",
        translation: "How much does it cost?",
        sourceVocabularyIds: ["vocab-437"],
        blankCandidates: ["Combien ça coûte"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Il coûte quarante euros.",
        translation: "It costs forty euros.",
        sourceVocabularyIds: ["vocab-460"],
        blankCandidates: ["quarante euros"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Combien coûtent ces chaussures ?",
        translation: "How much do these shoes cost?",
        sourceVocabularyIds: ["vocab-440", "vocab-446"],
        blankCandidates: ["Combien coûtent"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Elles coûtent cinquante euros.",
        translation: "They cost fifty euros.",
        sourceVocabularyIds: ["vocab-440"],
        blankCandidates: ["cinquante euros"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "C’est trop cher.",
        translation: "It’s too expensive.",
        sourceVocabularyIds: ["vocab-441"],
        blankCandidates: ["trop cher"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "C’est moins cher, cette chemise.",
        translation: "This shirt is cheaper.",
        sourceVocabularyIds: ["vocab-442", "vocab-445"],
        blankCandidates: ["moins cher"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "C’est combien, cette chemise ?",
        translation: "How much is this shirt?",
        sourceVocabularyIds: ["vocab-459", "vocab-445"],
        blankCandidates: ["C’est combien"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Cette chemise coûte vingt-cinq euros.",
        translation: "This shirt costs twenty-five euros.",
        sourceVocabularyIds: ["vocab-461", "vocab-445"],
        blankCandidates: ["vingt-cinq euros"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Vous avez une taille plus grande ?",
        translation: "Do you have a bigger size?",
        sourceVocabularyIds: ["vocab-447"],
        blankCandidates: ["plus grande"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Oui, et aussi une taille plus petite.",
        translation: "Yes, and also a smaller size.",
        sourceVocabularyIds: ["vocab-447", "vocab-448"],
        blankCandidates: ["plus petite"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Je voudrais essayer ce pantalon.",
        translation: "I would like to try on these pants.",
        sourceVocabularyIds: ["vocab-449", "vocab-443"],
        blankCandidates: ["essayer"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Bien sûr. Où sont les cabines d’essayage ?",
        translation: "Of course. Where are the fitting rooms?",
        sourceVocabularyIds: ["vocab-450"],
        blankCandidates: ["cabines d’essayage"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Vous préférez cette chemise ou ces chaussures ?",
        translation: "Do you prefer this shirt or these shoes?",
        sourceVocabularyIds: ["vocab-445", "vocab-446"],
        blankCandidates: ["cette chemise ou ces chaussures"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Je préfère cette chemise, s’il vous plaît.",
        translation: "I prefer this shirt, please.",
        sourceVocabularyIds: ["vocab-445"],
        blankCandidates: ["cette chemise"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Vous voulez essayer ce pantalon ?",
        translation: "Would you like to try on these pants?",
        sourceVocabularyIds: ["vocab-449", "vocab-443"],
        blankCandidates: ["essayer"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Oui, où sont les cabines d’essayage ?",
        translation: "Yes, where are the fitting rooms?",
        sourceVocabularyIds: ["vocab-450"],
        blankCandidates: ["cabines d’essayage"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Vous préférez ce pantalon ou cet ordinateur ?",
        translation: "Do you prefer these pants or this computer?",
        sourceVocabularyIds: ["vocab-443", "vocab-444"],
        blankCandidates: ["cet ordinateur"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Je préfère ce pantalon.",
        translation: "I prefer these pants.",
        sourceVocabularyIds: ["vocab-443"],
        blankCandidates: ["ce pantalon"],
        answerMode: "choice",
      },
    },
  ],
};

seedConversationQuiz({
  quizId: "quiz-44",
  title: "Quiz 44: Prices, Sizes and Demonstratives",
  description:
    "Complete a shopping conversation by choosing the right questions and replies about prices, sizes, and demonstratives.",
  conversation,
}).catch((error) => {
  console.error("Failed to seed Quiz 44:", error);
  process.exitCode = 1;
});
