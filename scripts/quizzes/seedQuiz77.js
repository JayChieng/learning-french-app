import { seedPastExperienceQuestionAnswerQuiz } from "./seedPastExperienceQuestionAnswerQuiz.js";

seedPastExperienceQuestionAnswerQuiz({
  quizId: "quiz-77",
  title: "Quiz 77: Answering Questions About Experiences",
  description: "Complete French conversations using experience phrases and past-tense answers.",
  pairs: [
    {
      question: "Tu as déjà voyagé à l'étranger ?",
      answer: "Oui, déjà.",
      answerBlank: "déjà",
    },
    {
      question: "Tu as déjà visité Paris ?",
      answer: "Oui, plusieurs fois.",
      questionBlank: "visité Paris",
      answerBlank: "plusieurs fois",
    },
    {
      question: "Tu as déjà essayé ça ?",
      answer: "Non, jamais.",
      questionBlank: "essayé ça",
      answerBlank: "jamais",
    },
    {
      question: "Tu as déjà mangé japonais ?",
      answer: "Pas encore.",
      questionBlank: "mangé japonais",
      answerBlank: "Pas encore",
    },
    {
      question: "Tu as déjà pris l'avion ?",
      answer: "Une seule fois.",
      questionBlank: "pris l'avion",
      answerBlank: "Une seule fois",
    },
    {
      question: "Tu as aimé ton voyage ?",
      questionVocabularyText: "une expérience",
      questionTranslation: "Did you enjoy your trip?",
      answer: "C'était incroyable !",
      questionBlank: "aimé ton voyage",
      answerBlank: "incroyable",
    },
    {
      question: "Tu veux essayer ça ?",
      questionVocabularyText: "Tu as déjà essayé ça ?",
      questionTranslation: "Do you want to try that?",
      answer: "J'aimerais essayer.",
      questionBlank: "essayer ça",
      answerBlank: "J'aimerais essayer",
    },
    {
      question: "Tu as déjà voyagé en Europe ?",
      questionVocabularyText: "Tu as déjà voyagé à l'étranger ?",
      questionTranslation: "Have you ever travelled in Europe?",
      answer: "Je n'ai pas encore voyagé.",
      questionBlank: "voyagé en Europe",
      answerBlank: "pas encore voyagé",
    },
  ],
}).catch((error) => {
  console.error("Failed to seed Quiz 77:", error);
  process.exitCode = 1;
});
