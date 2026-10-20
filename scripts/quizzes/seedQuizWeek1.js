import { seedConversationQuiz } from "./seedQuizHelper.js";

const conversation = {
  pairs: [
    {
      fixedSpeakers: true,
      question: {
        speaker: "A",
        text: "Bonjour",
        translation: "Hello",
        sourceVocabularyIds: ["vocab-1"],
      },
      answer: {
        speaker: "B",
        text: "Salut",
        translation: "Hi",
        sourceVocabularyIds: ["vocab-2"],
        blankCandidates: ["Salut"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Ça va ?",
        translation: "How are you?",
        sourceVocabularyIds: ["vocab-3"],
        blankCandidates: ["Ça va"],
      },
      answer: {
        speaker: "B",
        text: "Ça va bien. Et toi ?",
        translation: "I'm doing well. And you?",
        sourceVocabularyIds: ["vocab-8"],
        blankCandidates: ["Ça va bien"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Comment tu t'appelles ?",
        translation: "What is your name?",
        sourceVocabularyIds: ["vocab-257"],
        blankCandidates: ["Comment"],
      },
      answer: {
        speaker: "B",
        text: "Je m'appelle Paul.",
        translation: "My name is Paul.",
        sourceVocabularyIds: ["vocab-257"],
        blankCandidates: ["Je m'appelle"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Tu viens d'où ?",
        translation: "Where are you from?",
        sourceVocabularyIds: ["vocab-20"],
        blankCandidates: ["d'où"],
      },
      answer: {
        speaker: "B",
        text: "Je viens du Vietnam.",
        translation: "I am from Vietnam.",
        sourceVocabularyIds: ["vocab-19"],
        blankCandidates: ["Je viens"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Tu habites où ?",
        translation: "Where do you live?",
        sourceVocabularyIds: ["vocab-25"],
        blankCandidates: ["où"],
      },
      answer: {
        speaker: "B",
        text: "J'habite à Toronto.",
        translation: "I live in Toronto.",
        sourceVocabularyIds: ["vocab-23"],
        blankCandidates: ["J'habite"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Tu as quel âge ?",
        translation: "How old are you?",
        sourceVocabularyIds: ["vocab-103"],
        blankCandidates: ["quel âge"],
      },
      answer: {
        speaker: "B",
        text: "J'ai 25 ans.",
        translation: "I am 25 years old.",
        sourceVocabularyIds: ["vocab-104"],
        blankCandidates: ["25"],
        answerRule: "age",
      },
    },
    {
      question: {
        speaker: "A",
        text: "Merci beaucoup !",
        translation: "Thank you very much!",
        sourceVocabularyIds: ["vocab-10"],
        blankCandidates: ["beaucoup"],
      },
      answer: {
        speaker: "B",
        text: "De rien",
        translation: "You're welcome.",
        sourceVocabularyIds: ["vocab-9"],
        blankCandidates: ["rien"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Tu aimes quoi ?",
        translation: "What do you like?",
        sourceVocabularyIds: ["vocab-227"],
        blankCandidates: ["quoi"],
      },
      answer: {
        speaker: "B",
        text: "J'aime la musique.",
        translation: "I like music.",
        sourceVocabularyIds: ["vocab-230"],
        blankCandidates: ["J'aime"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Tu fais quoi ?",
        translation: "What are you doing?",
        sourceVocabularyIds: ["vocab-212"],
        blankCandidates: ["quoi"],
      },
      answer: {
        speaker: "B",
        text: "Je fais du sport.",
        translation: "I exercise.",
        sourceVocabularyIds: ["vocab-213"],
        blankCandidates: ["Je fais"],
      },
    },
    {
      question: {
        speaker: "A",
        text: "Pourquoi tu apprends le français ?",
        translation: "Why are you learning French?",
        sourceVocabularyIds: ["vocab-262"],
        blankCandidates: ["Pourquoi"],
      },
      answer: {
        speaker: "B",
        text: "Parce que j'aime le français.",
        translation: "Because I like French.",
        sourceVocabularyIds: ["vocab-266"],
        blankCandidates: ["Parce que"],
      },
    },
  ],
};

seedConversationQuiz({
  quizId: "quiz-week-1",
  title: "Quiz Week 1: Complete Conversation",
  description:
    "Complete a 20-line conversation using greetings, introductions, and questions from the lessons.",
  conversation,
}).catch((error) => {
  console.error("Failed to seed Quiz Week 1:", error);
  process.exitCode = 1;
});
