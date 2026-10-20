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
  addDoc,
  deleteDoc,
  deleteField,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
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
  AdminContentCollection,
  AdminContentDocument,
  AdminUserProfile,
  AppState,
  Lesson,
  LessonDetail,
  QuizTopicResult,
  UserRole,
  UserMessage,
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

  if (await isAccountAccessBlocked(result.user.uid)) {
    await firebaseSignOut();
    throw new Error("This account is blocked from using the app. Contact an administrator.");
  }

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

  if (await isAccountAccessBlocked(result.user.uid)) {
    await firebaseSignOut();
    throw new Error("This account is blocked from using the app. Contact an administrator.");
  }

  return result.user;
}

export async function firebaseSignOut() {
  await signOut(auth);
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function isAccountAccessBlocked(uid: string) {
  const snapshot = await getDoc(doc(firestore, "users", uid));
  return snapshot.exists() && snapshot.data().disabled === true;
}

export function subscribeToAccountAccess(
  uid: string,
  onBlocked: (blocked: boolean) => void,
  onError: (error: Error) => void
) {
  return onSnapshot(
    doc(firestore, "users", uid),
    (snapshot) => onBlocked(snapshot.exists() && snapshot.data().disabled === true),
    onError
  );
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

export async function getAdminUsers(): Promise<AdminUserProfile[]> {
  const snapshot = await getDocs(collection(firestore, "users"));
  return snapshot.docs
    .map((userSnapshot) => {
      const data = userSnapshot.data();
      return {
        id: userSnapshot.id,
        name: typeof data.name === "string" ? data.name : "User",
        email: typeof data.email === "string" ? data.email : "",
        role: data.role === "admin" || data.role === "super_admin" ? data.role : "user",
        disabled: data.disabled === true,
        createdAt: data.createdAt,
        activities: Array.isArray(data.activities) ? data.activities : [],
        weeklyActivity: Array.isArray(data.weeklyActivity) ? data.weeklyActivity : [],
        quizResults:
          data.quizResults && typeof data.quizResults === "object" ? data.quizResults : {},
        completedLessonIds: Array.isArray(data.completedLessonIds) ? data.completedLessonIds : [],
      };
    })
    .sort((first, second) => first.name.localeCompare(second.name));
}

export async function getAdminContentDocuments(
  collectionName: AdminContentCollection
): Promise<AdminContentDocument[]> {
  const snapshot = await getDocs(collection(firestore, collectionName));
  return snapshot.docs.map((documentSnapshot) => ({
    id: documentSnapshot.id,
    data: documentSnapshot.data(),
  }));
}

export async function saveAdminContentDocument(
  collectionName: AdminContentCollection,
  id: string,
  data: Record<string, unknown>,
  isNew: boolean
) {
  if (!id.trim()) {
    throw new Error("A document ID is required.");
  }

  const documentRef = doc(firestore, collectionName, id.trim());
  if (isNew && (await getDoc(documentRef)).exists()) {
    throw new Error(`A ${collectionName} document with ID "${id}" already exists.`);
  }

  await setDoc(documentRef, data);
}

export async function deleteAdminContentDocument(
  collectionName: AdminContentCollection,
  id: string
) {
  await deleteDoc(doc(firestore, collectionName, id));
}

export async function setAdminAccountAppAccess(uid: string, blocked: boolean) {
  await updateDoc(doc(firestore, "users", uid), {
    disabled: blocked,
    disabledAt: blocked ? serverTimestamp() : deleteField(),
  });
}

export async function sendAdminMessage(uid: string, body: string) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("You must be signed in to send a message.");
  }

  await addDoc(collection(firestore, "users", uid, "messages"), {
    body: body.trim(),
    senderId: currentUser.uid,
    senderName: (currentUser.displayName ?? currentUser.email ?? "Admin").slice(0, 120),
    createdAt: serverTimestamp(),
    isRead: false,
  });
}

export async function getCurrentUserId() {
  return auth.currentUser?.uid ?? null;
}

export async function getUserMessages(uid: string): Promise<UserMessage[]> {
  const snapshot = await getDocs(collection(firestore, "users", uid, "messages"));
  return snapshot.docs
    .map((messageSnapshot) => {
      const data = messageSnapshot.data();
      return {
        id: messageSnapshot.id,
        body: typeof data.body === "string" ? data.body : "",
        senderName: typeof data.senderName === "string" ? data.senderName : "Admin",
        createdAt: data.createdAt,
        isRead: data.isRead === true,
      };
    })
    .sort((first, second) => getMessageTime(second.createdAt) - getMessageTime(first.createdAt));
}

export async function markUserMessageRead(uid: string, messageId: string) {
  await updateDoc(doc(firestore, "users", uid, "messages", messageId), { isRead: true });
}

function getMessageTime(value: unknown) {
  if (value && typeof value === "object" && "toMillis" in value) {
    const toMillis = value.toMillis;
    if (typeof toMillis === "function") return toMillis.call(value) as number;
  }
  return 0;
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
      conversation?: QuizTopic["conversation"];
    };

    return {
      id: docSnapshot.id,
      title: data.title,
      description: data.description,
      questions: data.questions ?? [],
      ...(data.conversation ? { conversation: data.conversation } : {}),
    } satisfies QuizTopic;
  });

  return quizzes.sort((first, second) => {
    const firstNumber = Number(first.id.match(/^quiz-(\d+)$/i)?.[1] ?? Number.MAX_SAFE_INTEGER);
    const secondNumber = Number(second.id.match(/^quiz-(\d+)$/i)?.[1] ?? Number.MAX_SAFE_INTEGER);

    return firstNumber - secondNumber || first.title.localeCompare(second.title);
  });
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
