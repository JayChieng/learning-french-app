import { seedCustomQuiz } from "./seedQuizHelper.js";

const questions = [
  {
    vocabularyId: "vocab-371",
    prompt: "Complete the dialogue. Choose a polite way to begin ordering.",
    dialogue: [
      { speaker: "A", text: "Bonjour, que désirez-vous ?", translation: "Hello, what would you like?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je voudrais…", isCorrect: true },
      { label: "C’est combien ?", isCorrect: false },
      { label: "L’addition, s’il vous plaît.", isCorrect: false },
      { label: "C’était très bon !", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-372",
    prompt: "Complete the dialogue. Choose what the customer would like to order.",
    dialogue: [
      { speaker: "A", text: "Qu’est-ce que vous désirez ?", translation: "What would you like?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je voudrais un café.", isCorrect: true },
      { label: "Vous avez le menu ?", isCorrect: false },
      { label: "L’addition, s’il vous plaît.", isCorrect: false },
      { label: "Qu’est-ce que vous recommandez ?", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-373",
    prompt: "Complete the dialogue. Choose the customer's polite request for water.",
    dialogue: [
      { speaker: "A", text: "Et comme boisson ?", translation: "And to drink?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je voudrais de l’eau, s’il vous plaît.", isCorrect: true },
      { label: "Je voudrais une salade.", isCorrect: false },
      { label: "Je prends le poulet.", isCorrect: false },
      { label: "C’est combien ?", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-374",
    prompt: "Complete the dialogue. Choose the customer's order.",
    dialogue: [
      { speaker: "A", text: "Qu’est-ce que vous prenez comme plat ?", translation: "What would you like for your main course?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je voudrais du poulet avec du riz.", isCorrect: true },
      { label: "Vous avez le menu ?", isCorrect: false },
      { label: "Je prends un café.", isCorrect: false },
      { label: "C’était très bon !", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-375",
    prompt: "Complete the dialogue. Choose the customer's order.",
    dialogue: [
      { speaker: "A", text: "Et comme entrée ?", translation: "And for a starter?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je voudrais une salade.", isCorrect: true },
      { label: "C’est combien ?", isCorrect: false },
      { label: "L’addition, s’il vous plaît.", isCorrect: false },
      { label: "Je prends un café.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-376",
    prompt: "Complete the dialogue with the phrase meaning “I’ll have…”",
    dialogue: [
      { speaker: "A", text: "Pour commander, comment dire “I’ll have…” ?", translation: "When ordering, how do you say “I’ll have…”?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je prends…", isCorrect: true },
      { label: "Je voudrais…", isCorrect: false },
      { label: "C’est combien ?", isCorrect: false },
      { label: "Vous avez le menu ?", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-377",
    prompt: "Complete the dialogue. Choose the phrase for ordering chicken.",
    dialogue: [
      { speaker: "A", text: "Qu’est-ce que vous allez prendre ?", translation: "What are you going to have?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je prends le poulet.", isCorrect: true },
      { label: "Je voudrais une salade.", isCorrect: false },
      { label: "Je prends un café.", isCorrect: false },
      { label: "L’addition, s’il vous plaît.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-378",
    prompt: "Complete the dialogue. Choose the phrase for ordering coffee.",
    dialogue: [
      { speaker: "A", text: "Et comme boisson chaude ?", translation: "And what hot drink would you like?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je prends un café.", isCorrect: true },
      { label: "Je prends le poulet.", isCorrect: false },
      { label: "Je voudrais une salade.", isCorrect: false },
      { label: "C’était très bon !", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-379",
    prompt: "Complete the dialogue. Ask the staff for the menu using vous.",
    dialogue: [
      { speaker: "A", text: "Bonjour, monsieur. ................", blank: true },
      { speaker: "B", text: "Bien sûr, le voici.", translation: "Of course, here it is." },
    ],
    options: [
      { label: "Vous avez le menu ?", isCorrect: true },
      { label: "Tu as le menu ?", isCorrect: false },
      { label: "C’est combien ?", isCorrect: false },
      { label: "Qu’est-ce que vous recommandez ?", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-380",
    prompt: "Complete the dialogue. Ask the staff what they recommend.",
    dialogue: [
      { speaker: "A", text: "Je ne sais pas quoi choisir. ................", blank: true, translation: "I don't know what to choose." },
      { speaker: "B", text: "Je vous recommande la salade.", translation: "I recommend the salad." },
    ],
    options: [
      { label: "Qu’est-ce que vous recommandez ?", isCorrect: true },
      { label: "Vous avez le menu ?", isCorrect: false },
      { label: "C’était très bon !", isCorrect: false },
      { label: "L’addition, s’il vous plaît.", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-381",
    prompt: "Complete the dialogue. Ask how much the meal costs.",
    dialogue: [
      { speaker: "A", text: "Voici votre plat.", translation: "Here is your dish." },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "C’est combien ?", isCorrect: true },
      { label: "Vous avez le menu ?", isCorrect: false },
      { label: "Je voudrais une salade.", isCorrect: false },
      { label: "C’était très bon !", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-382",
    prompt: "Complete the dialogue. Ask politely for some water.",
    dialogue: [
      { speaker: "A", text: "Bien sûr. Désirez-vous autre chose ?", translation: "Of course. Would you like anything else?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "Je peux avoir de l’eau, s’il vous plaît ?", isCorrect: true },
      { label: "Je prends le poulet.", isCorrect: false },
      { label: "Vous avez le menu ?", isCorrect: false },
      { label: "Qu’est-ce que vous recommandez ?", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-383",
    prompt: "Complete the dialogue. Ask the server for the bill.",
    dialogue: [
      { speaker: "A", text: "Avez-vous besoin d’autre chose ?", translation: "Do you need anything else?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "L’addition, s’il vous plaît.", isCorrect: true },
      { label: "Vous avez le menu ?", isCorrect: false },
      { label: "Je voudrais du poulet avec du riz.", isCorrect: false },
      { label: "Qu’est-ce que vous recommandez ?", isCorrect: false },
    ],
  },
  {
    vocabularyId: "vocab-384",
    prompt: "Complete the dialogue. Say something positive after your meal.",
    dialogue: [
      { speaker: "A", text: "Est-ce que tout s’est bien passé ?", translation: "Did everything go well?" },
      { speaker: "B", text: "", blank: true },
    ],
    options: [
      { label: "C’était très bon !", isCorrect: true },
      { label: "C’est combien ?", isCorrect: false },
      { label: "Je voudrais un café.", isCorrect: false },
      { label: "Vous avez le menu ?", isCorrect: false },
    ],
  },
];

seedCustomQuiz({
  lessonId: "lesson-40",
  quizId: "quiz-40",
  title: "Quiz 40: Ordering at a Restaurant",
  description: "Complete restaurant conversations by choosing the correct French phrase for each blank.",
  category: "Lesson 40 review",
  dialogueMode: true,
  randomizeQuestionOrder: true,
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 40:", error);
  process.exitCode = 1;
});
