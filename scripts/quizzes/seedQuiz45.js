import { seedCustomQuiz } from "./seedQuizHelper.js";

const vocabulary = [
  { id: "vocab-451", french: "noir / noire", english: "black", color: "#111827" },
  { id: "vocab-452", french: "blanc / blanche", english: "white", color: "#ffffff" },
  { id: "vocab-453", french: "rouge", english: "red", color: "#dc2626" },
  { id: "vocab-454", french: "bleu / bleue", english: "blue", color: "#2563eb" },
  { id: "vocab-455", french: "vert / verte", english: "green", color: "#16a34a" },
  { id: "vocab-456", french: "gris / grise", english: "grey", color: "#6b7280" },
  { id: "vocab-462", french: "jaune", english: "yellow", color: "#facc15" },
  { id: "vocab-463", french: "orange", english: "orange", color: "#f97316" },
  { id: "vocab-464", french: "rose", english: "pink", color: "#ec4899" },
  { id: "vocab-465", french: "violet / violette", english: "purple / violet", color: "#8b5cf6" },
  { id: "vocab-466", french: "marron", english: "brown", color: "#78350f" },
  { id: "vocab-467", french: "beige", english: "beige", color: "#d6c3a1" },
  { id: "vocab-468", french: "turquoise", english: "turquoise", color: "#14b8a6" },
  { id: "vocab-469", french: "clair / claire", english: "light (colour)", color: "#93c5fd" },
  { id: "vocab-470", french: "foncé / foncée", english: "dark (colour)", color: "#1f2937" },
  { id: "vocab-471", french: "bleu marine", english: "navy blue", color: "#1e3a8a" },
];

const questions = vocabulary.map((word, index) => {
  const direction = index % 3;
  const answerField = direction === 0 ? "english" : "french";
  const correctAnswer = word[answerField];
  const options = [
    { label: correctAnswer, isCorrect: true },
    ...[1, 2, 3].map((offset) => {
      const distractor = vocabulary[(index + offset) % vocabulary.length];
      return { label: distractor[answerField], isCorrect: false };
    }),
  ];

  if (direction === 0) {
    return {
      vocabularyId: word.id,
      prompt: `What does "${word.french}" mean?`,
      speechSegments: [{ text: word.french, lang: "fr-FR" }],
      options,
    };
  }

  if (direction === 1) {
    return {
      vocabularyId: word.id,
      prompt: `How do you say "${word.english}" in French?`,
      speechSegments: [
        { text: `How do you say "${word.english}" in French?`, lang: "en-US" },
      ],
      options,
    };
  }

  return {
    vocabularyId: word.id,
    prompt: "Which French colour matches this colour?",
    promptColor: word.color,
    speechSegments: [{ text: "Which French colour matches this colour?", lang: "en-US" }],
    options,
  };
});

seedCustomQuiz({
  lessonId: "lesson-45",
  quizId: "quiz-45",
  title: "Quiz 45: Colours",
  description:
    "Practise colour vocabulary by matching French and English words and identifying colours from solid-colour swatches.",
  category: "Colours",
  questions,
}).catch((error) => {
  console.error("Failed to seed Quiz 45:", error);
  process.exitCode = 1;
});
