/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { buildBaseState, hydrateAppState, syncAppState } from "../services/appStorage";
import {
  firebaseGoogleSignIn,
  firebaseRegister,
  firebaseSignIn,
  firebaseSignOut,
  getUserRole,
  getLessonDetailsFromFirestore,
  getLessonsFromFirestore,
  getVocabularyFromFirestore,
  isAccountAccessBlocked,
  subscribeToAuth,
  subscribeToAccountAccess,
} from "../services/firebase";
import type {
  ActivityEntry,
  AppState,
  Lesson,
  LessonDetail,
  QuizTopicResult,
  VocabularyWord,
} from "../types/app";

type AppDataContextValue = AppState & {
  authReady: boolean;
  completeLesson: (lessonId: string) => void;
  refreshLearningContent: () => Promise<void>;
  getLessonDetailById: (lessonId: string) => LessonDetail | undefined;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  saveQuizTopicResult: (quizId: string, result: QuizTopicResult) => void;
  pronounceWord: (word: Pick<VocabularyWord, "french">, rate?: number) => void;
  progressSummary: {
    completedLessons: number;
    lessonCompletionRate: number;
    learnedWords: number;
    quizAverage: number;
    streakDays: number;
  };
};

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => buildBaseState());
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [authReady, setAuthReady] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [hydratedForUserId, setHydratedForUserId] = useState<string | null>(null);

  // Keep the latest in-memory snapshot available for manual sync calls.
  const stateRef = useRef<AppState>(buildBaseState());
  // Ignore stale hydrate requests when auth state changes quickly.
  const hydrateRequestIdRef = useRef(0);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const loadLearningContent = async (completedLessonIds?: string[]) => {
    const ids = completedLessonIds ?? stateRef.current.lessons
      .filter((lesson) => lesson.status === "completed")
      .map((lesson) => lesson.id);
    const [lessons, lessonDetails, vocabulary] = await Promise.all([
      getLessonsFromFirestore(ids),
      getLessonDetailsFromFirestore(),
      getVocabularyFromFirestore(),
    ]);

    setState((current) => ({
      ...current,
      lessons,
      lessonDetails,
      vocabulary,
    }));
  };

  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      const syncAuthState = async () => {
        if (user && (await isAccountAccessBlocked(user.uid))) {
          await firebaseSignOut();
          return;
        }

        const role = user ? await getUserRole(user) : "user";

        if (user) {
          setUserId(user.uid);
          setState((current) => ({
            ...current,
            auth: {
              isLoggedIn: true,
              email: user.email ?? "",
              name: user.displayName ?? user.email?.split("@")[0] ?? "User",
              role,
            },
          }));
        } else {
          setUserId(undefined);
          setState((current) => ({
            ...current,
            auth: {
              isLoggedIn: false,
              email: "",
              name: "",
              role: "user",
            },
          }));
        }

        setAuthReady(true);
      };

      void syncAuthState().catch(async (error: unknown) => {
        console.error("Could not verify account access.", error);
        setUserId(undefined);
        setState((current) => ({
          ...current,
          auth: {
            isLoggedIn: false,
            email: "",
            name: "",
            role: "user",
          },
        }));
        setAuthReady(true);
        if (user) {
          await firebaseSignOut().catch((signOutError: unknown) => {
            console.error("Could not sign out after account access verification failed.", signOutError);
          });
        }
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!userId) return;

    return subscribeToAccountAccess(
      userId,
      (blocked) => {
        if (blocked) {
          void firebaseSignOut().catch((error: unknown) => {
            console.error("Could not sign out blocked account.", error);
          });
        }
      },
      (error) => {
        console.error("Could not watch account access status.", error);
      }
    );
  }, [userId]);

  useEffect(() => {
    if (!authReady) {
      return;
    }

    // Each auth change gets its own hydrate request id so older async runs
    // cannot overwrite the latest state.

    const requestId = hydrateRequestIdRef.current + 1;
    hydrateRequestIdRef.current = requestId;

    const run = async () => {
      setHasHydrated(false);
      setHydratedForUserId(null);
      const baseState = buildBaseState();

      if (!userId) {
        const [lessons, lessonDetails, vocabulary] = await Promise.all([
          getLessonsFromFirestore(),
          getLessonDetailsFromFirestore(),
          getVocabularyFromFirestore(),
        ]);

        if (hydrateRequestIdRef.current !== requestId) {
          return;
        }

        setState((current) => ({
          ...baseState,
          auth: current.auth,
          lessons,
          lessonDetails,
          vocabulary,
        }));
        setHydratedForUserId('__guest__');
        setHasHydrated(true);
        return;
      }

      const remoteState = await hydrateAppState(userId);
      const completedLessonIds = remoteState?.completedLessonIds ?? [];

      const [lessons, lessonDetails, vocabulary] = await Promise.all([
        getLessonsFromFirestore(completedLessonIds),
        getLessonDetailsFromFirestore(),
        getVocabularyFromFirestore(),
      ]);

      if (hydrateRequestIdRef.current !== requestId) {
        return;
      }

      setState((current) => ({
        ...baseState,
        auth: current.auth,
        lessons,
        lessonDetails,
        vocabulary,
        activities: remoteState?.activities ?? baseState.activities,
        weeklyActivity: remoteState?.weeklyActivity ?? baseState.weeklyActivity,
        quiz: remoteState?.quiz ?? baseState.quiz,
        quizResults: remoteState?.quizResults ?? {},
      }));
      setHydratedForUserId(userId);
      setHasHydrated(true);
    };

    run().catch((error) => {
      console.error('Failed to hydrate app state.', error);

      if (hydrateRequestIdRef.current !== requestId) {
        return;
      }

      // Keep sync disabled when hydration fails. Writing this fallback state
      // would replace saved progress with empty arrays on the next render.
      setState((current) => ({ ...buildBaseState(), auth: current.auth }));
    });
  }, [userId, authReady]);

  useEffect(() => {
    // Do not push state to Firestore until hydration for the current user finishes.
    if (!authReady || !userId || !hasHydrated || hydratedForUserId !== userId) {
      return;
    }

    syncAppState(stateRef.current, userId).catch((error) => {
      console.error('Failed to sync app state.', error);
    });
  }, [state, userId, authReady, hasHydrated, hydratedForUserId]);

  const value = useMemo<AppDataContextValue>(() => {
    const completedLessons = state.lessons.filter(
      (lesson) => lesson.status === "completed"
    ).length;

    const totalSteps = state.lessons.reduce(
      (sum, lesson) => sum + lesson.totalSteps,
      0
    );

    const completedSteps = state.lessons.reduce(
      (sum, lesson) => sum + lesson.completedSteps,
      0
    );

    const completedQuizResults = Object.values(state.quizResults).filter(
      (result) => result.completed
    );

    const totalQuizCorrect = completedQuizResults.reduce(
      (sum, result) => sum + result.correct,
      0
    );

    const totalQuizQuestionsAnswered = completedQuizResults.reduce(
      (sum, result) => sum + result.total,
      0
    );

    const quizAverage =
      totalQuizQuestionsAnswered === 0
        ? 0
        : Math.round((totalQuizCorrect / totalQuizQuestionsAnswered) * 100);

    const completedLessonIds = new Set(
      state.lessons
        .filter((lesson) => lesson.status === "completed")
        .map((lesson) => lesson.id)
    );

    const learnedWords = state.lessonDetails
      .filter((detail) => completedLessonIds.has(detail.lessonId))
      .reduce((sum, detail) => sum + detail.vocabulary.length, 0);

    return {
      ...state,
      authReady,

      refreshLearningContent: async () => {
        const completedIds = state.lessons
          .filter((lesson) => lesson.status === "completed")
          .map((lesson) => lesson.id);

        await loadLearningContent(completedIds);
      },

      getLessonDetailById: (lessonId: string) => {
        return state.lessonDetails.find((item) => item.lessonId === lessonId);
      },

      completeLesson: (lessonId: string) => {
        setState((current) => {
          const updatedLessons: Lesson[] = current.lessons.map((lesson) =>
            lesson.id === lessonId
              ? {
                  ...lesson,
                  completedSteps: lesson.totalSteps,
                  status: "completed",
                }
              : lesson
          );

          const normalizedLessons: Lesson[] = updatedLessons.map((lesson, index, array) => {
            if (lesson.status === "completed") {
              return lesson;
            }

            const previousLesson = array[index - 1];
            const isUnlocked =
              index === 0 ||
              Boolean(previousLesson && previousLesson.status === "completed");

            return {
              ...lesson,
              status: isUnlocked ? "in-progress" : "locked",
            };
          });

          return {
            ...current,
            lessons: normalizedLessons,
            activities: prependActivity(
              current.activities,
              `Finished ${getLessonTitle(normalizedLessons, lessonId)}.`
            ),
            weeklyActivity: bumpWeeklyActivity(current.weeklyActivity),
          };
        });
      },

      signIn: async (email: string, password: string) => {
        const normalizedEmail = email.trim().toLowerCase();
        const user = await firebaseSignIn(normalizedEmail, password);

        const role = await getUserRole(user);

        setUserId(user.uid);
        setState((current) => ({
          ...current,
          auth: {
            isLoggedIn: true,
            email: user.email ?? normalizedEmail,
            name: user.displayName ?? user.email?.split("@")[0] ?? "User",
            role,
          },
        }));
      },

      signInWithGoogle: async () => {
        // Google sign-in shares the same post-login hydrate flow as email auth.
        const user = await firebaseGoogleSignIn();
        const role = await getUserRole(user);

        setUserId(user.uid);
        setState((current) => ({
          ...current,
          auth: {
            isLoggedIn: true,
            email: user.email ?? "",
            name: user.displayName ?? user.email?.split("@")[0] ?? "User",
            role,
          },
        }));
      },

      register: async (name: string, email: string, password: string) => {
        const normalizedEmail = email.trim().toLowerCase();
        const user = await firebaseRegister(name.trim(), normalizedEmail, password);

        const role = await getUserRole(user);

        setUserId(user.uid);
        setState((current) => ({
          ...current,
          auth: {
            isLoggedIn: true,
            name: name.trim(),
            email: normalizedEmail,
            role,
          },
          activities: prependActivity(
            current.activities,
            "Created an account and started a new learning plan."
          ),
        }));
      },

      signOut: async () => {
        if (userId) {
          try {
            await syncAppState(stateRef.current, userId);
          } catch (error) {
            console.error("Could not sync app state before signing out.", error);
          }
        }

        await firebaseSignOut();

        setUserId(undefined);
        setHasHydrated(false);
        setState((current) => ({
          ...current,
          auth: {
            isLoggedIn: false,
            email: "",
            name: "",
            role: "user",
          },
        }));
      },

      saveQuizTopicResult: (quizId: string, result: QuizTopicResult) => {
        // Store per-topic quiz results; the dedicated quiz page reads from this map.
        setState((current) => ({
          ...current,
          quizResults: {
            ...current.quizResults,
            [quizId]: result,
          },
          activities: prependActivity(
            current.activities,
            `Completed quiz: ${quizId} (${result.correct}/${result.total}).`
          ),
          weeklyActivity: bumpWeeklyActivity(current.weeklyActivity),
        }));
      },

      pronounceWord: (word: Pick<VocabularyWord, "french">, rate = 0.75) => {
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(word.french);
          utterance.lang = "fr-FR";
          utterance.rate = rate;
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
        }
      },

      progressSummary: {
        completedLessons,
        lessonCompletionRate:
          totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100),
        learnedWords,
        quizAverage,
        streakDays: calculateStreak(state.weeklyActivity),
      },
    };
  }, [state, authReady, userId]);

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error("useAppData must be used inside AppDataProvider");
  }

  return context;
}

function prependActivity(activities: ActivityEntry[], message: string) {
  const now = Date.now();

  const nextEntry: ActivityEntry = {
    id: `${now}-${Math.random().toString(16).slice(2)}`,
    date: new Date(now).toLocaleDateString("en-CA", {
      month: "short",
      day: "numeric",
    }),
    message,
    createdAt: now,
  };

  return [nextEntry, ...activities].slice(0, 10);
}

function bumpWeeklyActivity(activity: number[]) {
  const next = [...activity];
  const lastIndex = next.length - 1;
  next[lastIndex] = Math.min(4, (next[lastIndex] ?? 0) + 1);
  return next;
}

function getLessonTitle(lessons: Lesson[], lessonId: string) {
  return lessons.find((lesson) => lesson.id === lessonId)?.title ?? "lesson";
}

function calculateStreak(activity: number[]) {
  let streak = 0;

  for (let index = activity.length - 1; index >= 0; index -= 1) {
    if ((activity[index] ?? 0) <= 0) {
      break;
    }

    streak += 1;
  }

  return streak;
}
