import { seedCustomQuiz } from "./seedQuizHelper.js";

const questions = [
  {
    vocabularyId: "vocab-197",
    prompt: "Complete B's reply.",
    dialogue: [
      { speaker: "A", text: "Tu vas où ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je vais à Toronto.", isCorrect: true },
      { label: "Je vais au travail.", isCorrect: false },
      { label: "Je vais à l'école.", isCorrect: false },
      { label: "Je vais chez moi.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-197",
    prompt: "Complete B's reply.",
    dialogue: [
      { speaker: "A", text: "Tu vas où ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je vais au travail.", isCorrect: true },
      { label: "Je vais à Toronto.", isCorrect: false },
      { label: "Je vais au restaurant.", isCorrect: false },
      { label: "Je vais chez moi.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-197",
    prompt: "Complete B's reply.",
    dialogue: [
      { speaker: "A", text: "Tu vas où ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je vais à l'école.", isCorrect: true },
      { label: "Je vais à Toronto.", isCorrect: false },
      { label: "Je vais au travail.", isCorrect: false },
      { label: "Je vais au restaurant.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-197",
    prompt: "Complete B's reply.",
    dialogue: [
      { speaker: "A", text: "Tu vas où ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je vais au restaurant.", isCorrect: true },
      { label: "Je vais à Toronto.", isCorrect: false },
      { label: "Je vais à l'école.", isCorrect: false },
      { label: "Je vais chez moi.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-197",
    prompt: "Complete B's reply.",
    dialogue: [
      { speaker: "A", text: "Tu vas où ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je vais chez moi.", isCorrect: true },
      { label: "Je vais à Toronto.", isCorrect: false },
      { label: "Je vais au travail.", isCorrect: false },
      { label: "Je vais au restaurant.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-212",
    prompt: "Complete B's reply.",
    dialogue: [
      { speaker: "A", text: "Tu fais quoi ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je fais du sport.", isCorrect: true },
      { label: "Je fais du football.", isCorrect: false },
      { label: "Je fais la cuisine.", isCorrect: false },
      { label: "Je fais mes devoirs.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-212",
    prompt: "Complete B's reply.",
    dialogue: [
      { speaker: "A", text: "Tu fais quoi ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je fais du football.", isCorrect: true },
      { label: "Je fais du sport.", isCorrect: false },
      { label: "Je fais la cuisine.", isCorrect: false },
      { label: "Je fais une promenade.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-212",
    prompt: "Complete B's reply.",
    dialogue: [
      { speaker: "A", text: "Tu fais quoi ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je fais la cuisine.", isCorrect: true },
      { label: "Je fais du sport.", isCorrect: false },
      { label: "Je fais du football.", isCorrect: false },
      { label: "Je fais mes devoirs.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-212",
    prompt: "Complete B's reply.",
    dialogue: [
      { speaker: "A", text: "Tu fais quoi ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je fais mes devoirs.", isCorrect: true },
      { label: "Je fais du sport.", isCorrect: false },
      { label: "Je fais la cuisine.", isCorrect: false },
      { label: "Je fais une promenade.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-212",
    prompt: "Complete B's reply.",
    dialogue: [
      { speaker: "A", text: "Tu fais quoi ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je fais une promenade.", isCorrect: true },
      { label: "Je fais du sport.", isCorrect: false },
      { label: "Je fais du football.", isCorrect: false },
      { label: "Je fais mes devoirs.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-227",
    prompt: "Complete B's reply.",
    dialogue: [
      { speaker: "A", text: "Tu aimes quoi ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "J'aime le français.", isCorrect: true },
      { label: "J'aime le football.", isCorrect: false },
      { label: "J'aime la musique.", isCorrect: false },
      { label: "J'aime les films.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-227",
    prompt: "Complete B's reply.",
    dialogue: [
      { speaker: "A", text: "Tu aimes quoi ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "J'aime le football.", isCorrect: true },
      { label: "J'aime le français.", isCorrect: false },
      { label: "J'aime la musique.", isCorrect: false },
      { label: "J'aime le café.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-227",
    prompt: "Complete B's reply.",
    dialogue: [
      { speaker: "A", text: "Tu aimes quoi ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "J'aime la musique.", isCorrect: true },
      { label: "J'aime le français.", isCorrect: false },
      { label: "J'aime le football.", isCorrect: false },
      { label: "J'aime les films.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-227",
    prompt: "Complete B's reply.",
    dialogue: [
      { speaker: "A", text: "Tu aimes quoi ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "J'aime les films.", isCorrect: true },
      { label: "J'aime le français.", isCorrect: false },
      { label: "J'aime le football.", isCorrect: false },
      { label: "J'aime le café.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-227",
    prompt: "Complete B's reply.",
    dialogue: [
      { speaker: "A", text: "Tu aimes quoi ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "J'aime le café.", isCorrect: true },
      { label: "J'aime le français.", isCorrect: false },
      { label: "J'aime la musique.", isCorrect: false },
      { label: "J'aime les films.", isCorrect: false },
    ],
  },
];

seedCustomQuiz({
  lessonIds: ["lesson-20", "lesson-21", "lesson-22", "lesson-23", "lesson-24", "lesson-25", "lesson-26"],
  quizId: "quiz-26",
  title: "Quiz 26: Conversation Review",
  description: "Complete 15 French conversations using questions and replies from Lessons 20–26.",
  category: "Dialogue",
  dialogueMode: true,
  randomizeQuestionOrder: true,
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 26:", error);
  process.exitCode = 1;
});