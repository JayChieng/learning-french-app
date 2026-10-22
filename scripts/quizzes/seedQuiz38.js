import { seedConversationQuiz } from "./seedQuizHelper.js";

const conversation = {
  pairs: [
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Tu te réveilles à quelle heure ?",
        translation: "What time do you wake up?",
        sourceVocabularyIds: ["vocab-349"],
      },
      answer: {
        speaker: "B",
        text: "Je me réveille à sept heures.",
        translation: "I wake up at seven.",
        sourceVocabularyIds: ["vocab-350"],
        blankCandidates: ["à sept heures"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Qu’est-ce que tu fais le matin ?",
        translation: "What do you do in the morning?",
        sourceVocabularyIds: ["vocab-351"],
        blankCandidates: ["Qu’est-ce que"],
      },
      answer: {
        speaker: "B",
        text: "Je prends une douche et je prends mon petit-déjeuner.",
        translation: "I take a shower and eat breakfast.",
        sourceVocabularyIds: ["vocab-352"],
        blankCandidates: ["mon petit-déjeuner"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Tu vas au travail à quelle heure ?",
        translation: "What time do you go to work?",
        sourceVocabularyIds: ["vocab-346"],
        blankCandidates: ["à quelle heure"],
      },
      answer: {
        speaker: "B",
        text: "Je vais au travail à neuf heures.",
        translation: "I go to work at nine.",
        sourceVocabularyIds: ["vocab-346"],
        blankCandidates: ["à neuf heures"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Tu te couches à quelle heure ?",
        translation: "What time do you go to bed?",
        sourceVocabularyIds: ["vocab-355"],
        blankCandidates: ["à quelle heure"],
      },
      answer: {
        speaker: "B",
        text: "Je me couche à onze heures.",
        translation: "I go to bed at eleven.",
        sourceVocabularyIds: ["vocab-356"],
        blankCandidates: ["à onze heures"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Tu prends une douche le matin ?",
        translation: "Do you take a shower in the morning?",
        sourceVocabularyIds: ["vocab-351"],
        blankCandidates: ["une douche"],
      },
      answer: {
        speaker: "B",
        text: "Oui, je prends une douche le matin.",
        translation: "Yes, I take a shower in the morning.",
        sourceVocabularyIds: ["vocab-352"],
        blankCandidates: ["Oui"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Tu travailles tous les jours ?",
        translation: "Do you work every day?",
        sourceVocabularyIds: ["vocab-353"],
        blankCandidates: ["tous les jours"],
      },
      answer: {
        speaker: "B",
        text: "Non, je ne travaille pas tous les jours.",
        translation: "No, I don't work every day.",
        sourceVocabularyIds: ["vocab-354"],
        blankCandidates: ["ne travaille pas"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Tu te réveilles tôt ?",
        translation: "Do you wake up early?",
        sourceVocabularyIds: ["vocab-345"],
        blankCandidates: ["tôt"],
      },
      answer: {
        speaker: "B",
        text: "Oui, je me réveille tôt.",
        translation: "Yes, I wake up early.",
        sourceVocabularyIds: ["vocab-345"],
        blankCandidates: ["je me réveille"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Qu’est-ce que tu fais le soir ?",
        translation: "What do you do in the evening?",
        sourceVocabularyIds: ["vocab-347"],
        blankCandidates: ["le soir"],
      },
      answer: {
        speaker: "B",
        text: "Je fais du sport le soir.",
        translation: "I exercise in the evening.",
        sourceVocabularyIds: ["vocab-347"],
        blankCandidates: ["du sport"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Tu te couches tard ?",
        translation: "Do you go to bed late?",
        sourceVocabularyIds: ["vocab-348"],
        blankCandidates: ["tard"],
      },
      answer: {
        speaker: "B",
        text: "Oui, je me couche tard.",
        translation: "Yes, I go to bed late.",
        sourceVocabularyIds: ["vocab-348"],
        blankCandidates: ["je me couche"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Tu fais du sport parfois ?",
        translation: "Do you sometimes exercise?",
        sourceVocabularyIds: ["vocab-343"],
        blankCandidates: ["parfois"],
      },
      answer: {
        speaker: "B",
        text: "Oui, parfois je fais du sport le soir.",
        translation: "Yes, sometimes I exercise in the evening.",
        sourceVocabularyIds: ["vocab-343", "vocab-347"],
        blankCandidates: ["je fais du sport"],
      },
    },
  ],
};

seedConversationQuiz({
  quizId: "quiz-38",
  title: "Quiz 38: Daily Routine Conversation",
  description:
    "Complete a conversation about waking up, morning routines, work, and bedtime.",
  conversation,
}).catch((error) => {
  console.error("Failed to seed Quiz 38:", error);
  process.exitCode = 1;
});
