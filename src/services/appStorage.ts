import { readRemoteAppState, writeRemoteAppState } from "./firebase";
import type { AppState, QuizTopicResult } from "../types/app";

type PersistedUserState = {
  activities?: AppState["activities"];
  weeklyActivity?: number[];
  quiz?: AppState["quiz"];
  quizResults?: Record<string, QuizTopicResult>;
  completedLessonIds?: string[];
};

// Keep writes for each account in order. Firestore requests can otherwise
// finish out of order and let an older snapshot replace newer progress.
const syncQueues = new Map<string, Promise<void>>();

export async function hydrateAppState(
  userId?: string
): Promise<PersistedUserState | null> {
  if (!userId) {
    return null;
  }

  return readRemoteAppState(userId);
}

export async function syncAppState(
  state: AppState,
  userId?: string
): Promise<void> {
  if (!userId) {
    return;
  }

  const previousWrite = syncQueues.get(userId) ?? Promise.resolve();
  const nextWrite = previousWrite
    .catch(() => undefined)
    .then(() => writeRemoteAppState(userId, state));

  syncQueues.set(userId, nextWrite);

  try {
    await nextWrite;
  } finally {
    if (syncQueues.get(userId) === nextWrite) {
      syncQueues.delete(userId);
    }
  }
}

export function buildBaseState(): AppState {
  return {
    auth: {
      isLoggedIn: false,
      name: "",
      email: "",
      role: "user",
    },
    lessons: [],
    lessonDetails: [],
    vocabulary: [],
    quizQuestions: [],
    quizResults: {},
    tips: [],
    resources: [],
    activities: [],
    weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
    quiz: {
      currentQuestionIndex: 0,
      answeredQuestionIds: [],
      correctAnswers: 0,
      attempts: 0,
    },
  };
}
