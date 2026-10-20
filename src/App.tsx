import type { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { useAppData } from "./context/AppDataContext";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import HomePage from "./pages/HomePage/HomePage";
import LessonDetailPage from "./pages/LessonDetailPage/LessonDetailPage";
import LessonsPage from "./pages/LessonsPage/LessonsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProgressPage from "./pages/ProgressPage/ProgressPage";
import QuizPage from "./pages/QuizPage/QuizPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TipsPage from "./pages/TipsPage/TipsPage";
import VocabularyPage from "./pages/VocabularyPage/VocabularyPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import "./App.scss";

function App() {
  const { auth, authReady } = useAppData();

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            authReady ? (
              auth.isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <HomePage />
              )
            ) : (
              <div>Loading...</div>
            )
          }
        />

        <Route
          path="/login"
          element={
            authReady && auth.isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage />
            )
          }
        />

        <Route
          path="/register"
          element={
            authReady && auth.isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <RegisterPage />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAllowed={auth.isLoggedIn} authReady={authReady}>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="lessons" element={<LessonsPage />} />
          <Route path="lessons/:lessonId" element={<LessonDetailPage />} />
          <Route path="vocabulary" element={<VocabularyPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="tips" element={<TipsPage />} />
          <Route
            path="admin"
            element={
              <AdminRoute
                isAdmin={auth.role === "admin" || auth.role === "super_admin"}
                authReady={authReady}
              >
                <AdminPage />
              </AdminRoute>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <Navigate
              to={authReady && auth.isLoggedIn ? "/dashboard" : "/"}
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}

function ProtectedRoute({
  isAllowed,
  authReady,
  children,
}: {
  isAllowed: boolean;
  authReady: boolean;
  children: ReactElement;
}) {
  if (!authReady) {
    return <div>Loading...</div>;
  }

  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AdminRoute({
  isAdmin,
  authReady,
  children,
}: {
  isAdmin: boolean;
  authReady: boolean;
  children: ReactElement;
}) {
  if (!authReady) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default App;