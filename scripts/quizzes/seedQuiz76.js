import { seedPastExperienceQuestionAnswerQuiz } from "./seedPastExperienceQuestionAnswerQuiz.js";

seedPastExperienceQuestionAnswerQuiz({
  quizId: "quiz-76",
  title: "Quiz 76: Asking About Someone's Experiences",
  description: "Complete questions and answers about travel and personal experiences.",
  pairs: [
    {
      question: "Tu as déjà voyagé à l'étranger ?",
      answer: "Oui, plusieurs fois.",
      answerBlank: "plusieurs fois",
    },
    {
      question: "Tu as déjà visité Paris ?",
      answer: "Oui, déjà.",
      questionBlank: "visité Paris",
      answerBlank: "déjà",
    },
    {
      question: "Tu as déjà essayé ça ?",
      answer: "Pas encore.",
      questionBlank: "essayé ça",
      answerBlank: "Pas encore",
    },
    {
      question: "Tu as déjà mangé japonais ?",
      answer: "J'aimerais essayer.",
      questionBlank: "mangé japonais",
      answerBlank: "J'aimerais essayer",
    },
    {
      question: "Tu as déjà pris l'avion ?",
      answer: "Une seule fois.",
      questionBlank: "pris l'avion",
      answerBlank: "Une seule fois",
    },
  ],
}).catch((error) => {
  console.error("Failed to seed Quiz 76:", error);
  process.exitCode = 1;
});
