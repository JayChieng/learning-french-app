import { initializeApp, type FirebaseOptions } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdTokenResult,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import lessonIcon from "../assets/icons/icons8-lesson-64.png";
import breadIcon from "../assets/icons/icons8-bread-100.png";
import milkIcon from "../assets/icons/icons8-milk-100.png";
import noteIcon from "../assets/icons/icons8-note-48.png";
import progressIcon from "../assets/icons/icons8-progress-100.png";
import volumeIcon from "../assets/icons/icons8-volume-48.png";
import wordReferenceIcon from "../assets/icons/icons8-wordreference-100.png";
import type {
  ActivityEntry,
  AppState,
  Lesson,
  LessonDetail,
  QuizTopicResult,
  UserRole,
  VocabularyWord,
} from "../types/app";
import type { QuizTopic } from "../types/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyCCDK7Zog2HDrKvyKaZN_iddEV_H6IYzP4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "french-learning-web-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "french-learning-web-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "french-learning-web-app.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "873283468152",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:873283468152:web:8c5593998ef3c8b954e68d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

if (typeof window !== "undefined" && import.meta.env.VITE_FIREBASE_APPCHECK_SITE_KEY) {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(import.meta.env.VITE_FIREBASE_APPCHECK_SITE_KEY),
    isTokenAutoRefreshEnabled: true,
  });
}

type PersistedUserState = {
  activities?: ActivityEntry[];
  weeklyActivity?: number[];
  quiz?: AppState["quiz"];
  quizResults?: Record<string, QuizTopicResult>;
  completedLessonIds?: string[];
};

export async function getUserRole(user?: User | null): Promise<UserRole> {
  if (!user) {
    return "user";
  }

  try {
    const tokenResult = await getIdTokenResult(user);
    const role = tokenResult.claims.role;

    if (role === "super_admin") {
      return "super_admin";
    }

    if (role === "admin" || tokenResult.claims.admin === true) {
      return "admin";
    }

    return "user";
  } catch {
    return "user";
  }
}

export async function firebaseRegister(
  name: string,
  email: string,
  password: string
) {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
  }

  await ensureUserProfile({
    uid: result.user.uid,
    displayName: name,
    email: result.user.email,
  });

  return result.user;
}

export async function firebaseSignIn(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);

  await ensureUserProfile({
    uid: result.user.uid,
    displayName: result.user.displayName,
    email: result.user.email,
  });

  return result.user;
}

export async function firebaseGoogleSignIn() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const result = await signInWithPopup(auth, provider);

  await ensureUserProfile({
    uid: result.user.uid,
    displayName: result.user.displayName,
    email: result.user.email,
  });

  return result.user;
}

export async function firebaseSignOut() {
  await signOut(auth);
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function readRemoteAppState(
  userId: string
): Promise<PersistedUserState | null> {
  const snapshot = await getDoc(doc(firestore, "users", userId));
  return snapshot.exists() ? (snapshot.data() as PersistedUserState) : null;
}

export async function writeRemoteAppState(
  userId: string,
  state: AppState
): Promise<void> {
  const completedLessonIds = state.lessons
    .filter((lesson) => lesson.status === "completed")
    .map((lesson) => lesson.id);

  await setDoc(
    doc(firestore, "users", userId),
    {
      activities: state.activities,
      weeklyActivity: state.weeklyActivity,
      quiz: state.quiz,
      quizResults: state.quizResults,
      completedLessonIds,
    },
    { merge: true }
  );
}

// Seed helper removed for production usage. Use Firestore console or admin scripts to populate initial data.

export async function ensureUserProfile(user: {
  uid: string;
  displayName: string | null;
  email: string | null;
}) {
  const userRef = doc(firestore, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    return;
  }

  await setDoc(
    userRef,
    {
      name: user.displayName ?? "User",
      email: user.email ?? "",
      createdAt: serverTimestamp(),
      role: "user",
      activities: [],
      weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
      quiz: {
        currentQuestionIndex: 0,
        answeredQuestionIds: [],
        correctAnswers: 0,
        attempts: 0,
      },
      quizResults: {},
      completedLessonIds: [],
    },
    { merge: true }
  );
}

export async function getAdminDashboardStats() {
  const [lessonsSnapshot, lessonDetailsSnapshot, vocabularySnapshot, quizzesSnapshot, usersSnapshot] = await Promise.all([
    getDocs(collection(firestore, "lessons")),
    getDocs(collection(firestore, "lessonDetails")),
    getDocs(collection(firestore, "vocabulary")),
    getDocs(collection(firestore, "quizzes")),
    getDocs(collection(firestore, "users")),
  ]);

  return {
    lessons: lessonsSnapshot.size,
    lessonDetails: lessonDetailsSnapshot.size,
    vocabulary: vocabularySnapshot.size,
    quizzes: quizzesSnapshot.size,
    users: usersSnapshot.size,
  };
}

export async function getLessonsFromFirestore(
  completedLessonIds: string[] = []
): Promise<Lesson[]> {
  const snapshot = await getDocs(collection(firestore, "lessons"));

  return buildLessons(
    snapshot.docs.map((docSnapshot, index) => {
      const data = docSnapshot.data() as {
        title: string;
        category: string;
        level: string;
        content: string;
        order?: number;
      };

      return {
        id: docSnapshot.id,
        title: data.title,
        category: data.category,
        level: data.level,
        content: data.content,
        order: data.order ?? index + 1,
      };
    }),
    completedLessonIds
  );
}

export async function getLessonDetailsFromFirestore(): Promise<LessonDetail[]> {
  const [detailSnapshot, vocabularySnapshot] = await Promise.all([
    getDocs(collection(firestore, "lessonDetails")),
    getDocs(collection(firestore, "vocabulary")),
  ]);

  const vocabulary = buildVocabularyWords(
    vocabularySnapshot.docs.map((docSnapshot) => {
      const data = docSnapshot.data() as {
        french: string;
        english: string;
        ipa?: string;
        category?: string;
        lessonId: string;
        example?: string;
        icon?: string;
        order?: number;
      };

      return {
        id: docSnapshot.id,
        lessonId: data.lessonId,
        french: data.french,
        english: data.english,
        category: data.category ?? "general",
        example: data.example,
        icon: data.icon,
        order: data.order,
        ipa: data.ipa,
      };
    })
  );

  return buildLessonDetails(
    detailSnapshot.docs.map((docSnapshot) => {
      const data = docSnapshot.data() as Omit<LessonDetail, "vocabulary">;

      return {
        lessonId: data.lessonId,
        summary: data.summary,
        dialogues: data.dialogues ?? [],
        explanations: data.explanations ?? [],
      };
    }),
    vocabulary
  );
}

export async function getVocabularyFromFirestore(): Promise<VocabularyWord[]> {
  const snapshot = await getDocs(collection(firestore, "vocabulary"));

  return buildVocabularyWords(
    snapshot.docs.map((docSnapshot) => {
      const data = docSnapshot.data() as {
        french: string;
        english: string;
        ipa?: string;
        category?: string;
        lessonId: string;
        example?: string;
        icon?: string;
        order?: number;
      };

      return {
        id: docSnapshot.id,
        lessonId: data.lessonId,
        french: data.french,
        english: data.english,
        category: data.category ?? "general",
        example: data.example,
        icon: data.icon,
        order: data.order,
        ipa: data.ipa,
      };
    })
  );
}

export async function getQuizzesFromFirestore(): Promise<QuizTopic[]> {
  const snapshot = await getDocs(collection(firestore, "quizzes"));

  const quizzes = snapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data() as {
      title: string;
      description: string;
      questions: QuizTopic["questions"];
    };

    return {
      id: docSnapshot.id,
      title: data.title,
      description: data.description,
      questions: data.questions ?? [],
    } satisfies QuizTopic;
  });

  return quizzes;
}

function getVocabularyIcon(category: string) {
  const normalized = category.toLowerCase();

  if (normalized.includes("food")) {
    return breadIcon;
  }

  if (normalized.includes("drink")) {
    return milkIcon;
  }

  if (normalized.includes("classroom")) {
    return noteIcon;
  }

  if (normalized.includes("color")) {
    return progressIcon;
  }

  if (normalized.includes("greeting") || normalized.includes("conversation")) {
    return volumeIcon;
  }

  if (normalized.includes("time")) {
    return lessonIcon;
  }

  return wordReferenceIcon;
}

function buildVocabularyExample(french: string, english: string) {
  return `${french} means ${english}.`;
}

function buildLessons(
  sourceLessons: Array<{
    id: string;
    title: string;
    category: string;
    content: string;
    order?: number;
  }>,
  completedLessonIds: string[] = []
): Lesson[] {
  const completedSet = new Set(completedLessonIds);

  const rawLessons = sourceLessons
    .map((lesson) => {
      const isCompleted = completedSet.has(lesson.id);

      const order = lesson.order ?? 1;

      return {
        id: lesson.id,
        unit: order,
        title: lesson.title,
        topic: lesson.category,
        description: lesson.content,
        totalSteps: 10,
        completedSteps: isCompleted ? 10 : 0,
        estimatedMinutes: 12 + order,
        status: isCompleted ? "completed" : "locked",
      };
    })
    .sort((a, b) => a.unit - b.unit);

  return rawLessons.map((lesson, index, array) => {
    const previousLesson = array[index - 1];
    const isUnlocked =
      index === 0 ||
      Boolean(previousLesson && (previousLesson.status === "completed" || completedSet.has(previousLesson.id)));

    return {
      ...lesson,
      unit: lesson.unit ?? index + 1,
      status: lesson.status === "completed" ? "completed" : isUnlocked ? "in-progress" : "locked",
    };
  });
}

function buildVocabularyWords(
  sourceWords: Array<{
    id: string;
    lessonId: string;
    french: string;
    english: string;
    ipa?: string;
    category?: string;
    example?: string;
    icon?: string;
    order?: number;
  }>
): VocabularyWord[] {
  return sourceWords
    .map((word, index) => ({
      id: word.id,
      lessonId: word.lessonId,
      french: word.french,
      ipa: word.ipa?.trim() || undefined,
      english: word.english,
      category: word.category ?? "general",
      example: word.example?.trim() || buildVocabularyExample(word.french, word.english),
      icon: word.icon?.trim() || getVocabularyIcon(word.category ?? "general"),
      order: typeof word.order === "number" ? word.order : index + 1,
    }))
    .sort((a, b) => a.order - b.order);
}

function buildLessonDetails(
  sourceDetails: Array<Omit<LessonDetail, "vocabulary">>,
  vocabulary: VocabularyWord[]
): LessonDetail[] {
  const vocabularyByLessonId = vocabulary.reduce<Record<string, VocabularyWord[]>>(
    (accumulator, word) => {
      if (!accumulator[word.lessonId]) {
        accumulator[word.lessonId] = [];
      }

      accumulator[word.lessonId].push(word);
      return accumulator;
    },
    {}
  );

  return sourceDetails.map((detail) => ({
    lessonId: detail.lessonId,
    summary: detail.summary,
    dialogues: detail.dialogues ?? [],
    explanations: detail.explanations ?? [],
    vocabulary: vocabularyByLessonId[detail.lessonId] ?? [],
  }));
}
