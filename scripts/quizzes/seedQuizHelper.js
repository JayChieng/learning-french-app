import fs from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createQuestionSpeechSegments } from "./quizSpeech.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT || path.resolve(__dirname, "../../serviceAccountKey.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`Missing Firebase service account file: ${serviceAccountPath}`);
  console.error(
    "Create a service account key from Firebase Console and set FIREBASE_SERVICE_ACCOUNT or place it at the project root as serviceAccountKey.json."
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const vocabularyByLessonCache = new Map();

async function getVocabularyForLessons(lessonIds) {
  const lessonGroups = await Promise.all(
    lessonIds.map((lessonId) => {
      if (!vocabularyByLessonCache.has(lessonId)) {
        vocabularyByLessonCache.set(
          lessonId,
          db
            .collection("vocabulary")
            .where("lessonId", "==", lessonId)
            .get()
            .then((snapshot) =>
              snapshot.docs.map((document) => ({ ...document.data(), id: document.id }))
            )
        );
      }

      return vocabularyByLessonCache.get(lessonId);
    })
  );

  return lessonGroups.flat();
}

function shuffleItems(items) {
  const shuffledItems = [...items];

  for (let currentIndex = shuffledItems.length - 1; currentIndex > 0; currentIndex -= 1) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [shuffledItems[currentIndex], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[currentIndex],
    ];
  }

  return shuffledItems;
}

export async function seedCustomQuiz({
  lessonId,
  lessonIds = [lessonId],
  quizId,
  title,
  description,
  category,
  dialogueMode = false,
  randomizeQuestionOrder = true,
  questions: questionContent,
}) {
  const vocabularyDocuments = await getVocabularyForLessons(lessonIds);
  const lessonVocabularyIds = new Set(vocabularyDocuments.map((word) => word.id));
  const lessonVocabulary = new Map(
    vocabularyDocuments.map((word) => [word.id, word])
  );
  const questionVocabularyIds = questionContent.map((question) => question.vocabularyId);
  const uniqueQuestionVocabularyIds = new Set(questionVocabularyIds);
  const hasOneQuestionPerWord =
    questionVocabularyIds.length === lessonVocabularyIds.size &&
    uniqueQuestionVocabularyIds.size === questionVocabularyIds.length &&
    questionVocabularyIds.every((vocabularyId) => lessonVocabularyIds.has(vocabularyId));
  const allVocabularyReferencesExist = questionVocabularyIds.every((vocabularyId) =>
    lessonVocabularyIds.has(vocabularyId)
  );

  if (!allVocabularyReferencesExist || (!dialogueMode && !hasOneQuestionPerWord)) {
    throw new Error(
      dialogueMode
        ? `${title} contains a vocabulary reference that does not exist in ${lessonIds.join(", ")}.`
        : `${title} must have exactly one question for every ${lessonIds.join(", ")} vocabulary entry. ` +
            `Found ${questionContent.length} questions and ${lessonVocabularyIds.size} vocabulary entries.`
    );
  }

  for (const question of questionContent) {
    const labels = question.options.map((option) => option.label);
    const correctOptions = question.options.filter((option) => option.isCorrect);

    if (
      !question.prompt ||
      labels.length !== 4 ||
      new Set(labels).size !== labels.length ||
      correctOptions.length !== 1
    ) {
      throw new Error(`Each ${title} question needs a prompt, four unique options, and one correct answer.`);
    }
  }

  const frenchMeanings = new Map(
    vocabularyDocuments.map((word) => [normalizeVocabularyValue(word.french), word.english])
  );

  const orderedQuestionContent = randomizeQuestionOrder
    ? shuffleItems(questionContent)
    : questionContent;
  const questions = orderedQuestionContent.map(({ vocabularyId, ...question }, index) => {
    const quotedTerm = question.prompt.match(/^What does\s+["'](.+?)["']\s+mean\?$/i)?.[1];
    const promptFrenchTerm =
      question.promptFrenchTerm ??
      (quotedTerm && frenchMeanings.has(normalizeVocabularyValue(quotedTerm)) ? quotedTerm : undefined);
    const promptTranslation =
      question.promptTranslation ??
      (promptFrenchTerm
        ? frenchMeanings.get(normalizeVocabularyValue(promptFrenchTerm))
        : undefined);
    const dialogue = question.dialogue?.map((line) => {
      const translation = frenchMeanings.get(normalizeVocabularyValue(line.text));

      return translation ? { ...line, translation } : line;
    });
    const options = shuffleItems(question.options).map((option, optionIndex) => {
      const translation = frenchMeanings.get(normalizeVocabularyValue(option.label));

      return {
        ...option,
        id: `option-${optionIndex + 1}`,
        ...(translation ? { translation } : {}),
      };
    });

    return {
      ...question,
      id: `question-${index + 1}`,
      category,
      ...(promptFrenchTerm && promptTranslation
        ? { promptFrenchTerm, promptTranslation }
        : {}),
      speechSegments: question.dialogue
        ? [
            {
              text: question.dialogue
                .filter((line) => !line.blank && line.text.trim())
                .map((line) => line.text.trim())
                .join(". "),
              lang: "fr-FR",
            },
          ].filter((segment) => segment.text)
        : createQuestionSpeechSegments(question.prompt, lessonVocabulary.get(vocabularyId)),
      ...(dialogue ? { dialogue } : {}),
      explanation: `Correct answer: ${question.options.find((option) => option.isCorrect)?.label}`,
      options,
    };
  });

  await db.collection("quizzes").doc(quizId).set({
    title,
    description,
    questions,
  });

  console.log(`${title} seeded with ${questions.length} custom questions for ${lessonIds.join(", ")}.`);
}

export async function seedConversationQuiz({
  quizId,
  legacyQuizIds = [],
  title,
  description,
  conversation,
}) {
  if (!Array.isArray(conversation?.pairs) || conversation.pairs.length !== 10) {
    throw new Error(`${title} must contain exactly 10 conversation pairs.`);
  }

  const vocabularySnapshot = await db.collection("vocabulary").get();
  const vocabularyIds = new Set(vocabularySnapshot.docs.map((document) => document.id));
  const turns = conversation.pairs.flatMap((pair) => [pair.question, pair.answer]);

  for (const [index, turn] of turns.entries()) {
    if (
      !turn.text?.trim() ||
      !turn.translation?.trim() ||
      !Array.isArray(turn.sourceVocabularyIds) ||
      turn.sourceVocabularyIds.length === 0 ||
      !turn.sourceVocabularyIds.every((vocabularyId) => vocabularyIds.has(vocabularyId))
    ) {
      throw new Error(`${title} contains a dialogue line with missing text, translation, or lesson vocabulary references.`);
    }

    const isOpeningLine = index === 0 && conversation.pairs[0].fixedSpeakers;
    if (!isOpeningLine && (!Array.isArray(turn.blankCandidates) || turn.blankCandidates.length === 0)) {
      throw new Error(`${title} contains a dialogue line without an explicitly defined, context-based blank: ${turn.text}`);
    }

    for (const blankCandidate of turn.blankCandidates ?? []) {
      if (!blankCandidate || !turn.text.includes(blankCandidate)) {
        throw new Error(`${title} contains a blank candidate that is not part of its dialogue line: ${blankCandidate}`);
      }
    }
  }

  await db.collection("quizzes").doc(quizId).set({
    title,
    description,
    conversation,
  });

  await Promise.all(
    legacyQuizIds
      .filter((legacyQuizId) => legacyQuizId !== quizId)
      .map((legacyQuizId) => db.collection("quizzes").doc(legacyQuizId).delete())
  );

  console.log(`${title} seeded with ${turns.length} conversation lines.`);
}

function normalizeVocabularyValue(value) {
  return value.trim().toLocaleLowerCase();
}

function appendUniqueWords(target, candidates, limit, knownFrench, knownEnglish) {
  for (const word of candidates) {
    const french = normalizeVocabularyValue(word.french);
    const english = normalizeVocabularyValue(word.english);

    if (knownFrench.has(french) || knownEnglish.has(english)) continue;

    target.push(word);
    knownFrench.add(french);
    knownEnglish.add(english);

    if (target.length >= limit) break;
  }
}

function createQuestionOptions(correctLabel, words, field, excludedWordIds = new Set()) {
  const normalizedCorrect = normalizeVocabularyValue(correctLabel);
  const distractors = shuffleItems(words.filter((word) => !excludedWordIds.has(word.id)).map((word) => word[field])).filter(
    (label, index, labels) =>
      normalizeVocabularyValue(label) !== normalizedCorrect &&
      labels.findIndex((candidate) => normalizeVocabularyValue(candidate) === normalizeVocabularyValue(label)) === index
  );

  if (distractors.length < 3) return null;

  return [
    { label: correctLabel, isCorrect: true },
    ...distractors.slice(0, 3).map((label) => ({ label, isCorrect: false })),
  ];
}

function getDialogueTopic(englishQuestion) {
  const question = englishQuestion.toLocaleLowerCase();

  const possessionQuestion = question.match(/^do you have (?:a|an|the)\s+(.+?)\?$/);
  if (possessionQuestion) {
    return `possession:${normalizeVocabularyValue(possessionQuestion[1])}`;
  }

  if (/how old|what age/.test(question)) return "age";
  if (/where .*from|where are you from/.test(question)) return "origin";
  if (/where .*live|where do you live/.test(question)) return "residence";
  if (/how are you|how .*feel/.test(question)) return "wellbeing";
  if (/what language|which language|what languages/.test(question)) return "language";
  if (/what .*name|what is your name/.test(question)) return "name";
  if (/what .*job|what do you do/.test(question)) return "work";
  if (/where .*go|where are you going/.test(question)) return "destination";
  if (/what .*like|do you like/.test(question)) return "likes";
  if (/when|what time/.test(question)) return "time";
  if (/\bwho\b/.test(question)) return "person";
  if (/\bwhy\b/.test(question)) return "reason";

  return null;
}

function answerMatchesDialogueTopic(englishAnswer, topic) {
  const answer = englishAnswer.toLocaleLowerCase();
  const possessionItem = topic.startsWith("possession:") ? topic.slice("possession:".length) : null;

  if (possessionItem) {
    return /^(yes,?\s+i have|no,?\s+i don't have|i have|i don't have)\b/.test(answer) &&
      answer.includes(possessionItem);
  }

  const answerPatterns = {
    age: /^(i am|i'm|you are|he is|she is|we are|they are)\s+\d+\b/,
    origin: /^(i am from|i'm from|i come from)\s+(?!\.{3})[a-z]/,
    residence: /^(i live|i am living|i'm living)\s+(in|at|near)\s+\S+/,
    wellbeing: /^(i am|i'm|i feel)\s+(good|well|fine|tired|happy|sad|hungry|thirsty|hot|cold|afraid|sleepy)\b/,
    language: /^(i speak|i am learning|i'm learning|i learn)\s+(?!\.{3})[a-z]/,
    name: /^(my name is|i am called|i'm called)\b/,
    work: /^(i am a|i'm a|i work as|my job is)\b/,
    destination: /^(i am going|i'm going|i go to|i visit)\b/,
    likes: /^(i like|i love|i enjoy)\s+(?!\.{3})\S+/,
    time: /^(it's|it is|at)\b.*(o'clock|half past|quarter past|\d|monday|tuesday)/,
    person: /^(he|she|they) (is|are)\b/,
    reason: /because|because of/,
  };

  return answerPatterns[topic]?.test(answer) ?? false;
}

function ageSubjectsMatch(englishQuestion, englishAnswer) {
  const questionMatch = englishQuestion
    .toLocaleLowerCase()
    .match(/how old (?:am|are|is) (i|you|he|she|we|they)\b/);
  const answer = englishAnswer.toLocaleLowerCase();
  const answerSubjects = [
    [/^(?:i am|i'm)\s+\d+\b/, "i"],
    [/^you are\s+\d+\b/, "you"],
    [/^he is\s+\d+\b/, "he"],
    [/^she is\s+\d+\b/, "she"],
    [/^we are\s+\d+\b/, "we"],
    [/^they are\s+\d+\b/, "they"],
  ];
  const answerSubject = answerSubjects.find(([pattern]) => pattern.test(answer))?.[1];
  const questionSubject = questionMatch?.[1];

  if (!questionSubject || !answerSubject) return false;
  if (questionSubject === "you") return answerSubject === "i" || answerSubject === "you";
  if (questionSubject === "i") return answerSubject === "you" || answerSubject === "i";
  return questionSubject === answerSubject;
}

function frenchAgeSubjectsMatch(frenchQuestion, frenchAnswer) {
  const questionSubject = frenchQuestion.toLocaleLowerCase().match(/^(tu|il|elle|nous|vous|ils|elles)\b/)?.[1];
  const answerSubject = frenchAnswer.toLocaleLowerCase().match(/^(j'ai|il a|elle a|nous avons|vous avez|ils ont|elles ont)\b/)?.[1];
  const expectedAnswerSubject = {
    tu: "j'ai",
    vous: "j'ai",
    il: "il a",
    elle: "elle a",
    nous: "nous avons",
    ils: "ils ont",
    elles: "elles ont",
  }[questionSubject];

  return expectedAnswerSubject === answerSubject;
}

function findDialoguePairs(words) {
  const questionWords = words.filter((word) => word.english.includes("?"));

  return questionWords.flatMap((questionWord) => {
    const topic = getDialogueTopic(questionWord.english);
    if (!topic) return [];

    return words
      .filter(
        (answerWord) =>
          answerWord.id !== questionWord.id &&
          !answerWord.english.includes("?") &&
          answerMatchesDialogueTopic(answerWord.english, topic) &&
          (topic !== "age" ||
            (ageSubjectsMatch(questionWord.english, answerWord.english) &&
              frenchAgeSubjectsMatch(questionWord.french, answerWord.french)))
      )
      .map((answerWord) => ({ questionWord, answerWord, topic }));
  });
}

function createDialogueQuestion(pair, words, blankQuestion, dialoguePairs) {
  const { questionWord, answerWord } = pair;
  const correctWord = blankQuestion ? questionWord : answerWord;
  const sameTopicWordIds = new Set(
    dialoguePairs
      .filter((candidate) => candidate.topic === pair.topic)
      .flatMap((candidate) => [candidate.questionWord.id, candidate.answerWord.id])
  );
  const options = createQuestionOptions(correctWord.french, words, "french", sameTopicWordIds);

  if (!options) return null;

  return {
    vocabularyId: questionWord.id,
    prompt: blankQuestion ? "Choose A's question." : "Choose B's reply.",
    dialogue: [
      {
        speaker: "A",
        text: blankQuestion ? "" : questionWord.french,
        blank: blankQuestion,
      },
      {
        speaker: "B",
        text: blankQuestion ? answerWord.french : "",
        blank: !blankQuestion,
      },
    ],
    options,
  };
}

function createMeaningQuestion(word, words, frenchToEnglish = Math.random() < 0.5) {
  const source = frenchToEnglish ? word.french : word.english;

  return {
    vocabularyId: word.id,
    prompt: `What does "${source}" mean?`,
    ...(frenchToEnglish
      ? { promptFrenchTerm: source, promptTranslation: word.english }
      : {}),
    options: createQuestionOptions(
      frenchToEnglish ? word.english : word.french,
      words,
      frenchToEnglish ? "english" : "french"
    ),
  };
}

export async function seedLessonReviewQuiz(lessonNumber, currentLessonOnly = false) {
  if (!Number.isInteger(lessonNumber) || lessonNumber < 6 || lessonNumber > 33) {
    throw new Error("Lesson review quiz number must be between 6 and 33.");
  }

  const lessonNumbers = currentLessonOnly
    ? [lessonNumber]
    : [lessonNumber, lessonNumber - 1, lessonNumber - 2];
  const vocabularyRecords = await getVocabularyForLessons(
    lessonNumbers.map((number) => `lesson-${number}`)
  );
  const lessonVocabularyGroups = lessonNumbers.map((number) =>
    vocabularyRecords
      .filter((word) => word.lessonId === `lesson-${number}`)
      .filter((word) => typeof word.french === "string" && typeof word.english === "string")
      .sort((first, second) => (first.order ?? 0) - (second.order ?? 0))
  );
  const currentLessonWords = lessonVocabularyGroups[0] ?? [];
  const earlierLessonWords = lessonVocabularyGroups.slice(1).flat();
  const availableWords = [...currentLessonWords, ...earlierLessonWords];

  if (currentLessonWords.length === 0) {
    throw new Error(`No vocabulary found for lesson-${lessonNumber}. Seed that lesson first.`);
  }

  const currentQuestionTarget = currentLessonOnly ? 10 : 7;
  const earlierQuestionTarget = currentLessonOnly ? 0 : 3;
  const currentQuestions = [];
  const currentUsedIds = new Set();
  const currentMeaningEntries = [];
  const currentDialoguePairs = findDialoguePairs(currentLessonWords);

  for (const pair of shuffleItems(currentDialoguePairs)) {
    if (currentQuestions.length >= currentQuestionTarget) break;
    if (currentUsedIds.has(pair.questionWord.id) || currentUsedIds.has(pair.answerWord.id)) continue;

    const question = createDialogueQuestion(
      pair,
      availableWords,
      Math.random() < 0.5,
      currentDialoguePairs
    );
    if (!question) continue;

    currentQuestions.push(question);
    currentUsedIds.add(pair.questionWord.id);
    currentUsedIds.add(pair.answerWord.id);
  }

  const addCurrentMeaning = (word, frenchToEnglish) => {
    currentQuestions.push(createMeaningQuestion(word, availableWords, frenchToEnglish));
    currentMeaningEntries.push({ word, frenchToEnglish });
    currentUsedIds.add(word.id);
  };

  for (const word of shuffleItems(currentLessonWords)) {
    if (currentQuestions.length >= currentQuestionTarget) break;
    if (currentUsedIds.has(word.id)) continue;
    addCurrentMeaning(word, Math.random() < 0.5);
  }

  for (const entry of shuffleItems(currentMeaningEntries)) {
    if (currentQuestions.length >= currentQuestionTarget) break;
    addCurrentMeaning(entry.word, !entry.frenchToEnglish);
  }

  for (const word of shuffleItems(currentLessonWords)) {
    if (currentQuestions.length >= currentQuestionTarget) break;
    addCurrentMeaning(word, Math.random() < 0.5);
  }

  const earlierQuestions = [];
  const earlierUsedIds = new Set();
  const earlierDialoguePairs = findDialoguePairs(earlierLessonWords);

  for (const pair of shuffleItems(earlierDialoguePairs)) {
    if (earlierQuestions.length >= earlierQuestionTarget) break;
    if (earlierUsedIds.has(pair.questionWord.id) || earlierUsedIds.has(pair.answerWord.id)) continue;

    const question = createDialogueQuestion(
      pair,
      availableWords,
      Math.random() < 0.5,
      earlierDialoguePairs
    );
    if (!question) continue;

    earlierQuestions.push(question);
    earlierUsedIds.add(pair.questionWord.id);
    earlierUsedIds.add(pair.answerWord.id);
  }

  const earlierMeaningEntries = [];
  for (const word of shuffleItems(earlierLessonWords)) {
    if (earlierQuestions.length >= earlierQuestionTarget) break;
    if (earlierUsedIds.has(word.id)) continue;

    const frenchToEnglish = Math.random() < 0.5;
    earlierQuestions.push(createMeaningQuestion(word, availableWords, frenchToEnglish));
    earlierMeaningEntries.push({ word, frenchToEnglish });
    earlierUsedIds.add(word.id);
  }

  for (const entry of shuffleItems(earlierMeaningEntries)) {
    if (earlierQuestions.length >= earlierQuestionTarget) break;
    earlierQuestions.push(createMeaningQuestion(entry.word, availableWords, !entry.frenchToEnglish));
  }

  if (currentQuestions.length + earlierQuestions.length < 10) {
    const extraWords = currentLessonOnly ? currentLessonWords : availableWords;
    for (const word of shuffleItems(extraWords)) {
      if (currentQuestions.length + earlierQuestions.length >= 10) break;
      currentQuestions.push(createMeaningQuestion(word, availableWords));
    }
  }

  const questions = shuffleItems([...currentQuestions, ...earlierQuestions]).slice(0, 10);

  if (questions.length !== 10) {
    throw new Error(`Quiz ${lessonNumber} could only generate ${questions.length} questions.`);
  }

  await seedCustomQuiz({
    lessonIds: lessonNumbers.map((number) => `lesson-${number}`),
    quizId: `quiz-${lessonNumber}`,
    title: `Quiz ${lessonNumber}: Lesson ${lessonNumber} Review`,
    description: currentLessonOnly
      ? `Practice vocabulary from Lesson ${lessonNumber} with translation questions.`
      : `Review Lesson ${lessonNumber} and earlier vocabulary with translation and dialogue questions.`,
    category: `Lesson ${lessonNumber} review`,
    dialogueMode: true,
    randomizeQuestionOrder: false,
    questions,
  });
}