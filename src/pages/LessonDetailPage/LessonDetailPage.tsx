import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useAppData } from "../../context/AppDataContext";
import volumeIcon from "../../assets/icons/icons8-volume-48.png";
import type { VocabularyWord } from "../../types/app";
import "./LessonDetailPage.scss";

function LessonDetailPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { lessons, getLessonDetailById, completeLesson, pronounceWord } = useAppData();

  const nextPronunciationRate = useRef(new Map<string, number>());
  const lesson = lessons.find((item) => item.id === lessonId);
  const detail = lessonId ? getLessonDetailById(lessonId) : undefined;

  const [wordProgress, setWordProgress] = useState({ lessonId: "", index: 0 });
  const activeWordIndex =
    wordProgress.lessonId === lessonId ? wordProgress.index : 0;
  const currentLessonIndex = lessons.findIndex((item) => item.id === lesson?.id);
  const previousLesson = currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : undefined;
  const nextLesson =
    currentLessonIndex >= 0 && currentLessonIndex < lessons.length - 1
      ? lessons[currentLessonIndex + 1]
      : undefined;

  const wordCount = detail?.vocabulary.length ?? 0;
  const safeWordIndex = wordCount === 0 ? 0 : Math.min(activeWordIndex, wordCount - 1);
  const currentWord = wordCount === 0 ? undefined : detail?.vocabulary[safeWordIndex];
  const isLastWord = wordCount > 0 && safeWordIndex === wordCount - 1;
  const setActiveWordIndex = (update: (index: number) => number) => {
    setWordProgress((current) => {
      const currentIndex = current.lessonId === lessonId ? current.index : 0;
      return {
        lessonId: lessonId ?? "",
        index: update(currentIndex),
      };
    });
  };

  const handlePronounce = (key: string, french: string) => {
    const rate = nextPronunciationRate.current.get(key) ?? 0.5;
    nextPronunciationRate.current.set(key, rate === 0.5 ? 0.75 : 0.5);
    pronounceWord({ french }, rate);
  };

  const handlePronounceWord = (word: VocabularyWord) => {
    handlePronounce(word.id, word.french);
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

  if (!lesson || !detail) {
    return <Navigate to="/dashboard/lessons" replace />;
  }

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
              >
                <span className="lesson-detail-page__word-counter">
                  {safeWordIndex + 1}/{detail.vocabulary.length}
                </span>

                <button
                  type="button"
                  className="lesson-detail-page__word-card-action"
                  onClick={() => currentWord && handlePronounceWord(currentWord)}
                  aria-label={`Play pronunciation for ${currentWord?.french ?? "vocabulary"}`}
                >
                  {currentWord?.imageUrl ? (
                    <img
                      className="lesson-detail-page__word-image"
                      src={currentWord.imageUrl}
                      alt=""
                    />
                  ) : null}
                  <strong>{currentWord?.french ?? "Vocabulary"}</strong>
                  <div className="lesson-detail-page__word-ipa">
                    {currentWord?.ipa ?? ""}
                  </div>
                  <p>{currentWord?.english ?? "No word available."}</p>
                </button>

                {currentWord?.imageAttribution && currentWord.imageSourceUrl ? (
                  <a
                    className="lesson-detail-page__image-attribution"
                    href={currentWord.imageSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Photo: {currentWord.imageAttribution}
                  </a>
                ) : null}
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

        {detail.dialogues.length > 0 ? (
          <section className="lesson-detail-page__section">
            <h2>Dialogue</h2>
            {detail.dialogues.map((dialogue) => (
              <article className="lesson-detail-page__dialogue" key={dialogue.id}>
                <h3>{dialogue.title}</h3>
                <div className="lesson-detail-page__lines">
                  {dialogue.lines.map((line, index) => (
                    <div
                      className="lesson-detail-page__line"
                      key={`${dialogue.id}-${index}`}
                    >
                      <strong>{line.speaker}</strong>
                      <div className="lesson-detail-page__french-row">
                        <p className="lesson-detail-page__french">{line.french}</p>
                        <button
                          type="button"
                          className="lesson-detail-page__audio"
                          onClick={() =>
                            handlePronounce(`${dialogue.id}-${index}`, line.french)
                          }
                          aria-label={`Play slow or fast pronunciation for ${line.french}`}
                          title="Toggle between slow and fast pronunciation"
                        >
                          <img src={volumeIcon} alt="" />
                        </button>
                      </div>
                      <p className="lesson-detail-page__english">{line.english}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>
        ) : null}

        {detail.explanations.length > 0 ? (
          <section className="lesson-detail-page__section">
            <h2>Explain</h2>
            <div className="lesson-detail-page__explanations">
              {detail.explanations.map((explanation) => (
                <article
                  className="lesson-detail-page__explanation-card"
                  key={explanation.id}
                >
                  <h3>{explanation.title}</h3>
                  <p>{explanation.body}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}

export default LessonDetailPage;
