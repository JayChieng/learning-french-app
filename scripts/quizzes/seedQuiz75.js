import { seedPastExperienceQuestionAnswerQuiz } from "./seedPastExperienceQuestionAnswerQuiz.js";

seedPastExperienceQuestionAnswerQuiz({
  quizId: "quiz-75",
  title: "Quiz 75: Talking About Things You Have Never Done",
  description: "Complete French conversations with negative passé composé answers.",
  pairs: [
    {
      question: "Tu as déjà voyagé en Europe ?",
      questionVocabularyText: "Je n'ai jamais voyagé en Europe.",
      questionTranslation: "Have you ever travelled to Europe?",
      answer: "Je n'ai jamais voyagé en Europe.",
      questionBlank: "voyagé en Europe",
      answerBlank: "jamais voyagé en Europe",
    },
    {
      question: "Tu as déjà essayé ça ?",
      answer: "Je n'ai jamais essayé ça.",
      questionBlank: "essayé ça",
      answerBlank: "jamais essayé ça",
    },
    {
      question: "Tu as déjà pris l'avion ?",
      answer: "Je n'ai jamais pris l'avion.",
      questionBlank: "pris l'avion",
      answerBlank: "jamais pris l'avion",
    },
    {
      question: "Tu as déjà rencontré cette personne ?",
      questionVocabularyText: "Je n'ai jamais rencontré cette personne.",
      questionTranslation: "Have you ever met this person?",
      answer: "Je n'ai jamais rencontré cette personne.",
      questionBlank: "rencontré cette personne",
      answerBlank: "jamais rencontré cette personne",
    },
  ],
}).catch((error) => {
  console.error("Failed to seed Quiz 75:", error);
  process.exitCode = 1;
});
