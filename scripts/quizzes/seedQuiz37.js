import { seedCustomQuiz } from "./seedQuizHelper.js";

const questions = [
  {
    vocabularyId: "vocab-319",
    prompt: "Choose A's question to match B's answer.",
    dialogue: [
      { speaker: "A", text: "", blank: true },
      { speaker: "B", text: "Je m'habille vite.", translation: "I get dressed quickly." },
    ],
    options: [
      { label: "Comment tu t'habilles ?", isCorrect: true, translation: "How do you get dressed?" },
      { label: "À quelle heure tu te réveilles ?", isCorrect: false, translation: "What time do you wake up?" },
      { label: "Tu te couches tard ?", isCorrect: false, translation: "Do you go to bed late?" },
      { label: "Tu te brosses les dents ?", isCorrect: false, translation: "Do you brush your teeth?" },
    ],
  },
  {
    vocabularyId: "vocab-322",
    prompt: "Choose A's question to match B's answer.",
    dialogue: [
      { speaker: "A", text: "", blank: true },
      { speaker: "B", text: "Je me réveille à sept heures.", translation: "I wake up at seven o'clock." },
    ],
    options: [
      { label: "Tu te réveilles à quelle heure ?", isCorrect: true, translation: "What time do you wake up?" },
      { label: "Tu te couches à quelle heure ?", isCorrect: false, translation: "What time do you go to bed?" },
      { label: "Tu te lèves tôt ?", isCorrect: false, translation: "Do you get up early?" },
      { label: "Tu t'habilles vite ?", isCorrect: false, translation: "Do you get dressed quickly?" },
    ],
  },
  {
    vocabularyId: "vocab-327",
    prompt: "Choose A's question to match B's answer.",
    dialogue: [
      { speaker: "A", text: "", blank: true },
      { speaker: "B", text: "Je me brosse les dents après le petit-déjeuner.", translation: "I brush my teeth after breakfast." },
    ],
    options: [
      { label: "Quand est-ce que tu te brosses les dents ?", isCorrect: true, translation: "When do you brush your teeth?" },
      { label: "Quand est-ce que tu te réveilles ?", isCorrect: false, translation: "When do you wake up?" },
      { label: "Tu te douches le soir ?", isCorrect: false, translation: "Do you take a shower in the evening?" },
      { label: "À quelle heure tu te couches ?", isCorrect: false, translation: "What time do you go to bed?" },
    ],
  },
  {
    vocabularyId: "vocab-326",
    prompt: "Choose A's question to match B's answer.",
    dialogue: [
      { speaker: "A", text: "", blank: true },
      { speaker: "B", text: "Je me couche à onze heures.", translation: "I go to bed at eleven o'clock." },
    ],
    options: [
      { label: "Tu te couches à quelle heure ?", isCorrect: true, translation: "What time do you go to bed?" },
      { label: "Tu te lèves à quelle heure ?", isCorrect: false, translation: "What time do you get up?" },
      { label: "Tu te réveilles tôt ?", isCorrect: false, translation: "Do you wake up early?" },
      { label: "Tu te douches à onze heures ?", isCorrect: false, translation: "Do you take a shower at eleven o'clock?" },
    ],
  },
  {
    vocabularyId: "vocab-324",
    prompt: "Choose A's question to match B's answer.",
    dialogue: [
      { speaker: "A", text: "", blank: true },
      { speaker: "B", text: "Je prends une douche le matin.", translation: "I take a shower in the morning." },
    ],
    options: [
      { label: "Tu prends une douche quand ?", isCorrect: true, translation: "When do you take a shower?" },
      { label: "Tu te brosses les dents quand ?", isCorrect: false, translation: "When do you brush your teeth?" },
      { label: "Tu te couches le matin ?", isCorrect: false, translation: "Do you go to bed in the morning?" },
      { label: "À quelle heure tu t'habilles ?", isCorrect: false, translation: "What time do you get dressed?" },
    ],
  },
  {
    vocabularyId: "vocab-317",
    prompt: "Choose B's reply to A's question.",
    dialogue: [
      { speaker: "A", text: "Tu te lèves tôt ?", translation: "Do you get up early?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Oui, je me lève tôt.", isCorrect: true, translation: "Yes, I get up early." },
      { label: "Oui, je me couche tôt.", isCorrect: false, translation: "Yes, I go to bed early." },
      { label: "Non, je ne me brosse pas les dents tôt.", isCorrect: false, translation: "No, I don't brush my teeth early." },
      { label: "Je m'habille après la douche.", isCorrect: false, translation: "I get dressed after my shower." },
    ],
  },
  {
    vocabularyId: "vocab-325",
    prompt: "Choose B's reply to A's question.",
    dialogue: [
      { speaker: "A", text: "Tu t'habilles après la douche ?", translation: "Do you get dressed after your shower?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Oui, je m'habille après la douche.", isCorrect: true, translation: "Yes, I get dressed after my shower." },
      { label: "Oui, je me douche après m'habiller.", isCorrect: false, translation: "Yes, I take a shower after getting dressed." },
      { label: "Non, je ne me réveille pas après la douche.", isCorrect: false, translation: "No, I don't wake up after my shower." },
      { label: "Je me couche après la douche.", isCorrect: false, translation: "I go to bed after my shower." },
    ],
  },
  {
    vocabularyId: "vocab-320",
    prompt: "Choose B's reply to A's question.",
    dialogue: [
      { speaker: "A", text: "Tu te brosses les dents le soir ?", translation: "Do you brush your teeth in the evening?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Non, je me brosse les dents le matin.", isCorrect: true, translation: "No, I brush my teeth in the morning." },
      { label: "Oui, je me douche le matin.", isCorrect: false, translation: "Yes, I take a shower in the morning." },
      { label: "Non, je ne me lève pas le soir.", isCorrect: false, translation: "No, I don't get up in the evening." },
      { label: "Je me couche à onze heures.", isCorrect: false, translation: "I go to bed at eleven o'clock." },
    ],
  },
  {
    vocabularyId: "vocab-329",
    prompt: "Choose B's reply to A's question.",
    dialogue: [
      { speaker: "A", text: "À quelle heure est-ce qu'il se lève ?", translation: "What time does he get up?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Il se lève à six heures.", isCorrect: true, translation: "He gets up at six o'clock." },
      { label: "Il se réveille à six heures.", isCorrect: false, translation: "He wakes up at six o'clock." },
      { label: "Elle se lève à six heures.", isCorrect: false, translation: "She gets up at six o'clock." },
      { label: "Nous nous levons à six heures.", isCorrect: false, translation: "We get up at six o'clock." },
    ],
  },
  {
    vocabularyId: "vocab-334",
    prompt: "Choose B's reply to A's question.",
    dialogue: [
      { speaker: "A", text: "Elles se réveillent tôt ?", translation: "Do they wake up early?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Non, elles se réveillent tard.", isCorrect: true, translation: "No, they wake up late." },
      { label: "Oui, elles se couchent tôt.", isCorrect: false, translation: "Yes, they go to bed early." },
      { label: "Non, elle se réveille tard.", isCorrect: false, translation: "No, she wakes up late." },
      { label: "Oui, ils se réveillent tôt.", isCorrect: false, translation: "Yes, they wake up early." },
    ],
  },
];

seedCustomQuiz({
  lessonId: "lesson-37",
  quizId: "quiz-37",
  title: "Quiz 37: Lesson 37 Review",
  description: "Practise daily routines and reflexive verbs with both sides of a conversation.",
  category: "Lesson 37 review",
  dialogueMode: true,
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 37:", error);
  process.exitCode = 1;
});
