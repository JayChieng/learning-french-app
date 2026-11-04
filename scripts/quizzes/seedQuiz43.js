import { seedConversationQuiz } from "./seedQuizHelper.js";

const conversation = {
  pairs: [
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Bonjour ! Vous cherchez quelque chose ?",
        translation: "Hello! Are you looking for something?",
        sourceVocabularyIds: ["vocab-425"],
      },
      answer: {
        speaker: "B",
        text: "Oui, je cherche un pantalon.",
        translation: "Yes, I’m looking for a pair of trousers.",
        sourceVocabularyIds: ["vocab-426", "vocab-412"],
        blankCandidates: ["un pantalon"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Vous avez ces chaussures en taille 38 ?",
        translation: "Do you have these shoes in size 38?",
        sourceVocabularyIds: ["vocab-427", "vocab-413", "vocab-414"],
        blankCandidates: ["en taille 38"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Oui, voici la taille 38.",
        translation: "Yes, here is size 38.",
        sourceVocabularyIds: ["vocab-414"],
        blankCandidates: ["la taille 38"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Combien coûte ce pantalon ?",
        translation: "How much do these trousers cost?",
        sourceVocabularyIds: ["vocab-428", "vocab-412", "vocab-417"],
        blankCandidates: ["Combien coûte"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Il coûte quarante-cinq euros.",
        translation: "They cost forty-five euros.",
        sourceVocabularyIds: ["vocab-429", "vocab-417"],
        blankCandidates: ["quarante-cinq euros"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "C’est un peu cher.",
        translation: "That’s a little expensive.",
        sourceVocabularyIds: ["vocab-430", "vocab-421"],
        blankCandidates: ["un peu cher"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Vous avez un sac moins cher ?",
        translation: "Do you have a less expensive bag?",
        sourceVocabularyIds: ["vocab-431", "vocab-415", "vocab-421"],
        blankCandidates: ["un sac moins cher"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Oui, ce sac est bon marché.",
        translation: "Yes, this bag is inexpensive.",
        sourceVocabularyIds: ["vocab-432", "vocab-415", "vocab-422"],
        blankCandidates: ["bon marché"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Combien coûte ce sac ?",
        translation: "How much does this bag cost?",
        sourceVocabularyIds: ["vocab-415", "vocab-417"],
        blankCandidates: ["Combien coûte"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Il coûte vingt euros.",
        translation: "It costs twenty euros.",
        sourceVocabularyIds: ["vocab-433", "vocab-417"],
        blankCandidates: ["vingt euros"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Je le prends.",
        translation: "I’ll take it.",
        sourceVocabularyIds: ["vocab-434"],
        blankCandidates: ["Je le prends"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Vous payez par carte ou en espèces ?",
        translation: "Are you paying by card or in cash?",
        sourceVocabularyIds: ["vocab-419", "vocab-420"],
        blankCandidates: ["par carte ou en espèces"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Je paie par carte.",
        translation: "I’m paying by card.",
        sourceVocabularyIds: ["vocab-435", "vocab-419"],
        blankCandidates: ["par carte"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Le magasin est ouvert aujourd’hui ?",
        translation: "Is the shop open today?",
        sourceVocabularyIds: ["vocab-416", "vocab-423"],
        blankCandidates: ["ouvert"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Oui, il est ouvert jusqu’à dix-neuf heures.",
        translation: "Yes, it is open until seven p.m.",
        sourceVocabularyIds: ["vocab-436", "vocab-423"],
        blankCandidates: ["jusqu’à dix-neuf heures"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Est-ce que le magasin est fermé maintenant ?",
        translation: "Is the shop closed now?",
        sourceVocabularyIds: ["vocab-416", "vocab-424"],
        blankCandidates: ["fermé"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Non, il est encore ouvert.",
        translation: "No, it is still open.",
        sourceVocabularyIds: ["vocab-423", "vocab-424"],
        blankCandidates: ["encore ouvert"],
        answerMode: "choice",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Vous avez besoin d’un sac ?",
        translation: "Do you need a bag?",
        sourceVocabularyIds: ["vocab-415"],
        blankCandidates: ["besoin d’un sac"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Non, merci. J’ai déjà un sac.",
        translation: "No, thank you. I already have a bag.",
        sourceVocabularyIds: ["vocab-415", "vocab-418"],
        blankCandidates: ["J’ai déjà un sac"],
        answerMode: "choice",
      },
    },
  ],
};

seedConversationQuiz({
  quizId: "quiz-43",
  title: "Quiz 43: Shopping, Prices and Everyday Transactions",
  description:
    "Complete a shop conversation about clothes, sizes, prices, and paying by card.",
  conversation,
}).catch((error) => {
  console.error("Failed to seed Quiz 43:", error);
  process.exitCode = 1;
});
