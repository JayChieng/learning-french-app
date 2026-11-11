import { seedPastExperienceQuestionAnswerQuiz } from "./seedPastExperienceQuestionAnswerQuiz.js";

seedPastExperienceQuestionAnswerQuiz({
  quizId: "quiz-74",
  title: "Quiz 74: Talking About Experiences with Déjà",
  description: "Complete French conversations about things you have already done.",
  pairs: [
    {
      question: "Tu as déjà voyagé à l'étranger ?",
      answer: "J'ai déjà voyagé au Canada.",
      answerBlank: "voyagé au Canada",
    },
    {
      question: "Tu as déjà visité Paris ?",
      answer: "J'ai déjà visité Paris.",
      questionBlank: "visité Paris",
      answerBlank: "déjà visité Paris",
    },
    {
      question: "Tu as déjà mangé ici ?",
      questionVocabularyText: "J'ai déjà mangé ici.",
      questionTranslation: "Have you eaten here before?",
      answer: "J'ai déjà mangé ici.",
      questionBlank: "mangé ici",
      answerBlank: "déjà mangé ici",
    },
    {
      question: "Tu as déjà mangé japonais ?",
      questionVocabularyText: "J'ai déjà mangé ici.",
      questionTranslation: "Have you ever eaten Japanese food?",
      answer: "J'ai déjà essayé.",
      questionBlank: "mangé japonais",
      answerBlank: "déjà essayé",
    },
    {
      question: "Tu as déjà vu ce film ?",
      questionVocabularyText: "J'ai déjà vu ce film.",
      questionTranslation: "Have you seen this movie before?",
      answer: "J'ai déjà vu ce film.",
      questionBlank: "vu ce film",
      answerBlank: "déjà vu ce film",
    },
  ],
}).catch((error) => {
  console.error("Failed to seed Quiz 74:", error);
  process.exitCode = 1;
});
