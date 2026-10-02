export type LessonStatus = "locked" | "in-progress" | "completed";

export type Lesson = {
  id: string;
  unit: number;
  title: string;
  topic: string;
  description: string;
  totalSteps: number;
  completedSteps: number;
  estimatedMinutes: number;
  status: LessonStatus;
};

export type LessonDialogueLine = {
  speaker: string;
  french: string;
  english: string;
};

export type LessonDialogue = {
  id: string;
  title: string;
  lines: LessonDialogueLine[];
};

export type LessonExplanation = {
  id: string;
  title: string;
  body: string;
};

export type VocabularyWord = {
  id: string;
  lessonId: string;
  french: string;
  ipa?: string;
  english: string;
  order?: number;
};

export type LessonDetail = {
  lessonId: string;
  summary: string;
  dialogues: LessonDialogue[];
  explanations: LessonExplanation[];
  vocabulary: VocabularyWord[];
};

export type LessonVocabularyCard = {
  id: string;
  french: string;
  ipa: string;
  english: string;
  exampleFrench: string;
  exampleEnglish: string;
};

export type LessonQuestionOption = {
  id: string;
  label: string;
};

export type LessonConversationLine = {
  speaker: string;
  text: string;
};

export type LessonStep = {
  id?: string;
  type: "vocabulary" | "review" | "quiz" | "pronunciation" | "conversation";
  title?: string;
  prompt?: string;
  choices?: string[];
  options?: LessonQuestionOption[];
  vocabulary?: LessonVocabularyCard;
  conversationLines?: LessonConversationLine[];
};

export type LessonSubLesson = {
  id: string;
  title: string;
  objective: string;
  completionMessage: string;
  steps: LessonStep[];
};

export type LessonBlueprint = {
  id: string;
  title: string;
  subLessons?: LessonSubLesson[];
};

export type QuizOption = {
  id: string;
  label: string;
  isCorrect: boolean;
};

export type QuizQuestion = {
  id: string;
  category: string;
  prompt: string;
  explanation: string;
  options: QuizOption[];
};

export type QuizTopicResult = {
  correct: number;
  total: number;
  completed: boolean;
  updatedAt: number;
};

export type QuizTopic = {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
};

export type Tip = {
  id: string;
  title: string;
  body: string;
  icon: string;
  tone: string;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: string;
};

export type ActivityEntry = {
  id: string;
  date: string;
  message: string;
  createdAt?: number;
};

export type UserRole = "user" | "admin" | "super_admin";

export type AuthState = {
  isLoggedIn: boolean;
  name: string;
  email: string;
  role: UserRole;
};

export type AppState = {
  auth: AuthState;
  lessons: Lesson[];
  lessonDetails: LessonDetail[];
  vocabulary: VocabularyWord[];
  quizQuestions: QuizQuestion[];
  quizResults: Record<string, QuizTopicResult>;
  tips: Tip[];
  resources: Resource[];
  activities: ActivityEntry[];
  weeklyActivity: number[];
  quiz: {
    currentQuestionIndex: number;
    answeredQuestionIds: string[];
    correctAnswers: number;
    attempts: number;
  };
};