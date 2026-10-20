import { seedCustomQuiz } from "./seedQuizHelper.js";

const questions = [
  {
    vocabularyId: "vocab-2",
    prompt: "Complete this greeting exchange.",
    dialogue: [
      { speaker: "A", text: "Bonjour !" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Salut !", isCorrect: true },
      { label: "Au revoir !", isCorrect: false },
      { label: "Merci beaucoup !", isCorrect: false },
      { label: "De rien.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-9",
    prompt: "Select the polite reply.",
    dialogue: [
      { speaker: "A", text: "Merci beaucoup !" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "De rien.", isCorrect: true },
      { label: "Au revoir.", isCorrect: false },
      { label: "Ça va bien.", isCorrect: false },
      { label: "Et toi ?", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-20",
    prompt: "Answer the question about origin.",
    dialogue: [
      { speaker: "A", text: "Tu viens d'où ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je viens du Canada.", isCorrect: true },
      { label: "J'habite à Toronto.", isCorrect: false },
      { label: "J'ai vingt-huit ans.", isCorrect: false },
      { label: "Je parle français.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-15",
    prompt: "Choose A's question.",
    dialogue: [
      { speaker: "A", text: "", blank: true },
      { speaker: "B", text: "J'ai vingt-huit ans." },
    ],
    options: [
      { label: "Tu as quel âge ?", isCorrect: true },
      { label: "Tu viens d'où ?", isCorrect: false },
      { label: "Tu habites où ?", isCorrect: false },
      { label: "Tu parles quelle langue ?", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-25",
    prompt: "Ask where B lives.",
    dialogue: [
      { speaker: "A", text: "", blank: true },
      { speaker: "B", text: "J'habite à Toronto." },
    ],
    options: [
      { label: "Tu habites où ?", isCorrect: true },
      { label: "Tu viens d'où ?", isCorrect: false },
      { label: "Tu as quel âge ?", isCorrect: false },
      { label: "Tu viens du Canada ?", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-33",
    prompt: "Continue the language conversation.",
    dialogue: [
      { speaker: "A", text: "Je parle anglais. Et toi ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je parle français.", isCorrect: true },
      { label: "J'apprends le français.", isCorrect: false },
      { label: "Je viens du Vietnam.", isCorrect: false },
      { label: "Je suis étudiant.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-40",
    prompt: "Reply with your nationality.",
    dialogue: [
      { speaker: "A", text: "Je suis vietnamien. Et toi ?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je suis canadienne.", isCorrect: true },
      { label: "Je suis étudiant.", isCorrect: false },
      { label: "Je parle anglais.", isCorrect: false },
      { label: "J'habite à Toronto.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-50",
    prompt: "Complete the être form.",
    dialogue: [
      { speaker: "A", text: "Vous êtes étudiants ?" },
      { speaker: "B", text: "Oui, nous", blank: true, suffix: " étudiants." },
    ],
    options: [
      { label: "sommes", isCorrect: true },
      { label: "êtes", isCorrect: false },
      { label: "suis", isCorrect: false },
      { label: "sont", isCorrect: false },
    ],
  },
];

seedCustomQuiz({
  lessonIds: ["lesson-1", "lesson-2", "lesson-3", "lesson-4"],
  quizId: "quiz-5",
  title: "Quiz 5: French Dialogue",
  description: "Complete varied French conversations using vocabulary from Lessons 1–4.",
  category: "Dialogue",
  dialogueMode: true,
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 5:", error);
  process.exitCode = 1;
});