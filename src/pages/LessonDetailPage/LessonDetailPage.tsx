import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useAppData } from "../../context/AppDataContext";
import type { VocabularyWord } from "../../types/app";
import "./LessonDetailPage.scss";

function LessonDetailPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { lessons, getLessonDetailById, completeLesson, pronounceWord } = useAppData();

  const nextPronunciationRate = useRef(new Map<string, number>());
  const lesson = lessons.find((item) => item.id === lessonId);
  const detail = lessonId ? getLessonDetailById(lessonId) : undefined;

  const [activeWordIndex, setActiveWordIndex] = useState(0);

  useEffect(() => {
    setActiveWordIndex(0);
  }, [lessonId]);

  if (!lesson || !detail) {
    return <Navigate to="/dashboard/lessons" replace />;
  }

  const currentLessonIndex = lessons.findIndex((item) => item.id === lesson.id);
  const previousLesson = currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : undefined;
  const nextLesson =
    currentLessonIndex >= 0 && currentLessonIndex < lessons.length - 1
      ? lessons[currentLessonIndex + 1]
      : undefined;

  const wordCount = detail.vocabulary.length;
  const safeWordIndex = wordCount === 0 ? 0 : Math.min(activeWordIndex, wordCount - 1);
  const currentWord = wordCount === 0 ? undefined : detail.vocabulary[safeWordIndex];
  const isLastWord = wordCount > 0 && safeWordIndex === wordCount - 1;

  const handlePronounceWord = (word: VocabularyWord) => {
    const rate = nextPronunciationRate.current.get(word.id) ?? 0.5;
    nextPronunciationRate.current.set(word.id, rate === 0.5 ? 0.75 : 0.5);
    pronounceWord(word, rate);
  };

  useEffect(() => {
    if (!currentWord) {
      return;
    }

    const timer = window.setTimeout(() => {
      pronounceWord(currentWord);
    }, 150);

    return () => window.clearTimeout(timer);
  }, [currentWord, pronounceWord]);

  useEffect(() => {
    if (wordCount === 0) {
      setActiveWordIndex(0);
      return;
    }

    setActiveWordIndex((currentIndex) => Math.min(currentIndex, wordCount - 1));
  }, [wordCount]);

  const handlePreviousLesson = () => {
    if (previousLesson) {
      navigate(`/dashboard/lessons/${previousLesson.id}`);
      return;
    }

    navigate("/dashboard/lessons");
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      navigate(`/dashboard/lessons/${nextLesson.id}`);
      return;
    }

    navigate("/dashboard/lessons");
  };

  const handleCompleteLesson = () => {
    completeLesson(lesson.id);

    if (nextLesson) {
      navigate(`/dashboard/lessons/${nextLesson.id}`, { replace: true });
      return;
    }

    navigate("/dashboard/lessons", { replace: true });
  };

  const handlePreviousWord = () => {
    if (wordCount === 0) {
      return;
    }

    setActiveWordIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  };

  const handleNextWord = () => {
    if (wordCount === 0) {
      return;
    }

    setActiveWordIndex((currentIndex) => Math.min(currentIndex + 1, wordCount - 1));
  };

  return (
    <section className="lesson-detail-page">
      <Breadcrumb
        items={[
          { label: "Home", path: "/dashboard" },
          { label: "Lessons", path: "/dashboard/lessons" },
          { label: lesson.title },
        ]}
      />

      <div className="lesson-detail-page__hero">
        <div>
          <span className="lesson-detail-page__unit">Unit {lesson.unit}</span>
          <h1>{lesson.title}</h1>
          <p>{detail.summary}</p>
        </div>

        <div className="lesson-detail-page__hero-actions">
          <button
            type="button"
            className="lesson-detail-page__nav-button"
            onClick={handlePreviousLesson}
            disabled={!previousLesson}
          >
            Previous lesson
          </button>
          <button
            type="button"
            className="lesson-detail-page__nav-button lesson-detail-page__nav-button--primary"
            onClick={handleNextLesson}
            disabled={!nextLesson}
          >
            Next lesson
          </button>
        </div>
      </div>

      <div className="lesson-detail-page__sections">
        <section className="lesson-detail-page__section lesson-detail-page__section--focus">
          <h2>Key Vocabulary</h2>

          {detail.vocabulary.length === 0 ? (
            <p className="lesson-detail-page__empty-state">No vocabulary available for this lesson yet.</p>
          ) : (
            <div className="lesson-detail-page__vocabulary-stage">
              <button
                type="button"
                className="lesson-detail-page__word-button lesson-detail-page__word-button--ghost"
                onClick={handlePreviousWord}
                disabled={activeWordIndex === 0}
              >
                Back
              </button>

              <article
                className="lesson-detail-page__word-card lesson-detail-page__word-card--featured"
                onClick={() => currentWord && handlePronounceWord(currentWord)}
                onKeyDown={(event) => {
                  if ((event.key === "Enter" || event.key === " ") && currentWord) {
                    event.preventDefault();
                    handlePronounceWord(currentWord);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <span className="lesson-detail-page__word-counter">
                  {safeWordIndex + 1}/{detail.vocabulary.length}
                </span>

                <strong>{currentWord?.french ?? "Vocabulary"}</strong>
                <div className="lesson-detail-page__word-ipa">
                  {currentWord?.ipa ?? ""}
                </div>
                <p>{currentWord?.english ?? "No word available."}</p>
              </article>

              <button
                type="button"
                className="lesson-detail-page__word-button lesson-detail-page__word-button--primary"
                onClick={isLastWord ? handleCompleteLesson : handleNextWord}
              >
                {isLastWord ? "Complete" : "Next"}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

export default LessonDetailPage;