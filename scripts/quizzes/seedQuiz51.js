import { seedConversationQuiz } from "./seedQuizHelper.js";

const conversation = {
  pairs: [
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Quel temps fait-il aujourd'hui ?",
        translation: "What's the weather like today?",
        sourceVocabularyIds: ["vocab-566"],
      },
      answer: {
        speaker: "B",
        text: "Il fait froid et il neige.",
        translation: "It's cold and snowing.",
        sourceVocabularyIds: ["vocab-556", "vocab-561"],
        blankCandidates: ["froid et il neige"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Tu aimes la neige ?",
        translation: "Do you like snow?",
        sourceVocabularyIds: ["vocab-546"],
        blankCandidates: ["la neige"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Oui, mais je préfère le soleil.",
        translation: "Yes, but I prefer sunshine.",
        sourceVocabularyIds: ["vocab-544"],
        blankCandidates: ["le soleil"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Quelle température fait-il ?",
        translation: "What's the temperature?",
        sourceVocabularyIds: ["vocab-570"],
        blankCandidates: ["température"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Il fait moins cinq degrés.",
        translation: "It's minus five degrees.",
        sourceVocabularyIds: ["vocab-573"],
        blankCandidates: ["moins cinq degrés"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Est-ce qu'il y a du vent aussi ?",
        translation: "Is it windy too?",
        sourceVocabularyIds: ["vocab-563"],
        blankCandidates: ["du vent"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Oui, il y a beaucoup de vent.",
        translation: "Yes, it's very windy.",
        sourceVocabularyIds: ["vocab-563"],
        blankCandidates: ["beaucoup de vent"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Est-ce qu'il y aura du soleil demain ?",
        translation: "Will it be sunny tomorrow?",
        sourceVocabularyIds: ["vocab-562"],
        blankCandidates: ["du soleil"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Oui, la météo annonce du soleil demain.",
        translation: "Yes, the forecast says it will be sunny tomorrow.",
        sourceVocabularyIds: ["vocab-562"],
        blankCandidates: ["du soleil"],
        answerMode: "choice",
      },
    },
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Avec le soleil, on se promène demain ?",
        translation: "Shall we go for a walk tomorrow in the sunshine?",
        sourceVocabularyIds: ["vocab-544"],
        blankCandidates: ["le soleil"],
        answerMode: "choice",
      },
      answer: {
        speaker: "B",
        text: "Oui, s'il fait beau !",
        translation: "Yes, if the weather is nice!",
        sourceVocabularyIds: ["vocab-557"],
        blankCandidates: ["fait beau"],
        answerMode: "choice",
      },
    },
  ],
};

seedConversationQuiz({
  quizId: "quiz-51",
  title: "Quiz 51: Weather Conversation",
  description:
    "Complete a French conversation about today's weather and preferences.",
  expectedPairCount: 6,
  conversation,
}).catch((error) => {
  console.error("Failed to seed Quiz 51:", error);
  process.exitCode = 1;
});
