import { seedConversationQuiz } from "./seedQuizHelper.js";

const conversation = {
  pairs: [
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Bonjour ! Vous cherchez quelque chose ?",
        translation: "Hello! Are you looking for something?",
        sourceVocabularyIds: ["vocab-511"],
      },
      answer: {
        speaker: "B",
        text: "Oui, je cherche un pantalon noir.",
        translation: "Yes, I'm looking for black pants.",
        sourceVocabularyIds: ["vocab-512"],
        blankCandidates: ["un pantalon noir"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Quelle taille faites-vous ?",
        translation: "What size are you?",
        sourceVocabularyIds: ["vocab-513"],
        blankCandidates: ["Quelle taille"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Je voudrais essayer celui-ci.",
        translation: "I'd like to try this one.",
        sourceVocabularyIds: ["vocab-514"],
        blankCandidates: ["essayer celui-ci"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Bien sûr. Les cabines sont là-bas.",
        translation: "Of course. The fitting rooms are over there.",
        sourceVocabularyIds: ["vocab-515"],
        blankCandidates: ["Les cabines sont là-bas"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Merci. Combien ça coûte ?",
        translation: "Thank you. How much does it cost?",
        sourceVocabularyIds: ["vocab-516"],
        blankCandidates: ["Combien ça coûte"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Ça coûte 40 dollars.",
        translation: "It costs 40 dollars.",
        sourceVocabularyIds: ["vocab-517"],
        blankCandidates: ["40 dollars"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "D’accord. Je paie par carte.",
        translation: "Okay. I'll pay by card.",
        sourceVocabularyIds: ["vocab-518"],
        blankCandidates: ["Je paie par carte"],
        answerMode: "choice",
      },
    },
  ],
};

seedConversationQuiz({
  quizId: "quiz-47",
  title: "Quiz 47: Mini Conversation — Buying Clothes",
  description:
    "Complete a French conversation about looking for clothes, trying them on, asking the price, and paying by card.",
  expectedPairCount: 4,
  conversation,
}).catch((error) => {
  console.error("Failed to seed Quiz 47:", error);
  process.exitCode = 1;
});
