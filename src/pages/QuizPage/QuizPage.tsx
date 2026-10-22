import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./QuizPage.scss";
import type { QuizTopic } from "../../types/app";
import { useAppData } from "../../context/AppDataContext";
import { getQuizzesFromFirestore } from "../../services/firebase";
import {
  playQuizAnswerSound,
  speakQuizPrompt,
  stopQuizPrompt,
} from "../../services/quizAudio";
import QuizConversationPlayer from "./QuizConversationPlayer";

type AnswerMap = Record<number, string>;

const QuizPage = () => {
  const { quizResults, saveQuizTopicResult } = useAppData();
  const [quizTopics, setQuizTopics] = useState<QuizTopic[]>([]);
  const [isLoadingTopics, setIsLoadingTopics] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedQuizId = searchParams.get("quiz");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [isFinished, setIsFinished] = useState(false);
  const [pendingAdvanceIndex, setPendingAdvanceIndex] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadQuizTopics = async () => {
      try {
        const firestoreQuizzes = await getQuizzesFromFirestore();

        if (!isMounted) return;

        if (firestoreQuizzes.length > 0) {
          setQuizTopics(firestoreQuizzes);
        } else {
          setQuizTopics([]);
        }
      } catch {
        if (!isMounted) return;
        setQuizTopics([]);
      } finally {
        if (isMounted) {
          setIsLoadingTopics(false);
        }
      }
    };

    loadQuizTopics();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedQuiz = useMemo<QuizTopic | null>(() => {
    return quizTopics.find((quiz) => quiz.id === selectedQuizId) ?? null;
  }, [selectedQuizId, quizTopics]);

  const currentQuestion = selectedQuiz?.questions[currentQuestionIndex] ?? null;
  const selectedAnswer = answers[currentQuestionIndex] ?? null;

  useEffect(() => {
    if (!selectedQuizId || !currentQuestion || isFinished) return;

    speakQuizPrompt(currentQuestion);
    return stopQuizPrompt;
  }, [currentQuestion, isFinished, selectedQuizId]);

  const correctCount = useMemo(() => {
    if (!selectedQuiz) return 0;

    return selectedQuiz.questions.reduce((count, question, index) => {
      const correctOptionId = question.options.find((option) => option.isCorrect)?.id;
      return answers[index] === correctOptionId ? count + 1 : count;
    }, 0);
  }, [answers, selectedQuiz]);

  const progressPercent = selectedQuiz
    ? Math.round(((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100)
    : 0;

  const startQuiz = (quizId: string) => {
    setSearchParams({ quiz: quizId });
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsFinished(false);
    setPendingAdvanceIndex(null);
  };

  const goBackToQuizList = () => {
    setSearchParams({});
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsFinished(false);
    setPendingAdvanceIndex(null);
  };

  const handleAnswerSelect = (answer: string) => {
    if (!currentQuestion || !selectedQuiz || selectedAnswer) return;

    const isCorrect = currentQuestion.options.find((option) => option.id === answer)?.isCorrect;
    stopQuizPrompt();
    playQuizAnswerSound(isCorrect === true);

    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
    setPendingAdvanceIndex(currentQuestionIndex);
  };

  const handleNext = useCallback(() => {
    if (!selectedQuiz || !currentQuestion || !selectedAnswer) return;

    setPendingAdvanceIndex(null);

    const isLastQuestion =
      currentQuestionIndex === selectedQuiz.questions.length - 1;

    if (isLastQuestion) {
      const finalCorrectCount = selectedQuiz.questions.reduce((count, question, index) => {
        const correctOptionId = question.options.find((option) => option.isCorrect)?.id;
        return answers[index] === correctOptionId ? count + 1 : count;
      }, 0);

      saveQuizTopicResult(selectedQuiz.id, {
        correct: finalCorrectCount,
        total: selectedQuiz.questions.length,
        completed: true,
        updatedAt: Date.now(),
      });

      setIsFinished(true);
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
  }, [
    answers,
    currentQuestion,
    currentQuestionIndex,
    saveQuizTopicResult,
    selectedAnswer,
    selectedQuiz,
  ]);

  useEffect(() => {
    if (pendingAdvanceIndex !== currentQuestionIndex || !selectedAnswer) return;

    const timer = window.setTimeout(handleNext, 2000);
    return () => window.clearTimeout(timer);
  }, [currentQuestionIndex, handleNext, pendingAdvanceIndex, selectedAnswer]);

  const handlePrevious = () => {
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const retryQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsFinished(false);
    setPendingAdvanceIndex(null);
  };

  const selectedQuizIndex = quizTopics.findIndex((quiz) => quiz.id === selectedQuizId);
  const nextQuiz = selectedQuizIndex >= 0 ? quizTopics[selectedQuizIndex + 1] : null;
  const startNextQuiz = () => {
    if (nextQuiz) startQuiz(nextQuiz.id);
  };

  const getOptionClassName = (optionId: string) => {
    if (!currentQuestion || !selectedAnswer) {
      return "quiz-play__option";
    }

    const correctOptionId = currentQuestion.options.find((option) => option.isCorrect)?.id;
    const isCorrectAnswer = optionId === correctOptionId;
    const isSelectedAnswer = optionId === selectedAnswer;
    const isWrongSelected = isSelectedAnswer && selectedAnswer !== correctOptionId;

    if (isCorrectAnswer) {
      return "quiz-play__option quiz-play__option--correct";
    }

    if (isWrongSelected) {
      return "quiz-play__option quiz-play__option--wrong";
    }

    return "quiz-play__option";
  };

  if (isLoadingTopics) {
    return (
      <section className="quiz-page">
        <div className="quiz-page__header">
          <nav className="quiz-page__breadcrumb" aria-label="Breadcrumb">
            <Link to="/dashboard">Home</Link>
            <span aria-hidden="true">&gt;</span>
            <span>Quiz</span>
          </nav>
          <h1 className="quiz-page__title">Quiz</h1>
          <p className="quiz-page__subtitle">Loading quiz topics...</p>
        </div>
      </section>
    );
  }

  if (!selectedQuiz) {
    return (
      <section className="quiz-page">
        <div className="quiz-page__header">
          <nav className="quiz-page__breadcrumb" aria-label="Breadcrumb">
            <Link to="/dashboard">Home</Link>
            <span aria-hidden="true">&gt;</span>
            <span>Quiz</span>
          </nav>
          <h1 className="quiz-page__title">Quiz</h1>
          <p className="quiz-page__subtitle">
            Choose a quiz and practise vocabulary or complete a conversation.
          </p>
        </div>

        <div className="quiz-page__grid">
          {quizTopics.map((quiz) => {
            const quizResult = quizResults[quiz.id];

            return (
              <article key={quiz.id} className="quiz-card">
                <div className="quiz-card__content">
                  <span className="quiz-card__badge">
                    {quiz.conversation ? "Conversation Quiz" : "Vocabulary Quiz"}
                  </span>

                  <h2 className="quiz-card__title">{quiz.title}</h2>
                  <p className="quiz-card__description">{quiz.description}</p>

                  <div className="quiz-card__meta">
                    <span>
                      {quiz.conversation
                        ? `${quiz.conversation.pairs.length * 2} dialogue lines`
                        : `${quiz.questions.length} questions`}
                    </span>

                    {quizResult?.completed ? (
                      <span className="quiz-card__score">
                        {quizResult.correct}/{quizResult.total} correct
                      </span>
                    ) : (
                      <span className="quiz-card__status">Not started</span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="quiz-card__button"
                  onClick={() => startQuiz(quiz.id)}
                >
                  {quizResult?.completed ? "Try Again" : "Start Quiz"}
                </button>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  if (selectedQuiz.conversation) {
    return (
      <QuizConversationPlayer
        key={selectedQuiz.id}
        quiz={selectedQuiz}
        allQuizzes={quizTopics}
        onExit={goBackToQuizList}
        hasNextQuiz={Boolean(nextQuiz)}
        onNextQuiz={startNextQuiz}
      />
    );
  }

  if (isFinished) {
    return (
      <section className="quiz-page">
        <div className="quiz-page__header">
          <nav className="quiz-page__breadcrumb" aria-label="Breadcrumb">
            <Link to="/dashboard">Home</Link>
            <span aria-hidden="true">&gt;</span>
            <Link to="/dashboard/quiz">Quiz</Link>
            <span aria-hidden="true">&gt;</span>
            <span>{selectedQuiz.title}</span>
          </nav>
          <h1 className="quiz-page__title">{selectedQuiz.title}</h1>
          <p className="quiz-page__subtitle">
            Your result has been saved and synced with your progress.
          </p>
        </div>

        <div className="quiz-result">
          <span className="quiz-result__badge">Completed</span>
          <h2 className="quiz-result__title">
            You got {correctCount}/{selectedQuiz.questions.length} correct
          </h2>
          <p className="quiz-result__text">
            Review this topic again or return to the quiz list to choose another quiz.
          </p>

          <div className="quiz-result__actions">
            <button
              type="button"
              className="quiz-result__button quiz-result__button--secondary"
              onClick={goBackToQuizList}
            >
              Back to Quiz List
            </button>

            <button
              type="button"
              className="quiz-result__button quiz-result__button--primary"
              onClick={retryQuiz}
            >
              Retry Quiz
            </button>

            {nextQuiz && (
              <button
                type="button"
                className="quiz-result__button quiz-result__button--primary"
                onClick={startNextQuiz}
              >
                Next Quiz
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quiz-page">
      <div className="quiz-page__header">
        <nav className="quiz-page__breadcrumb" aria-label="Breadcrumb">
          <Link to="/dashboard">Home</Link>
          <span aria-hidden="true">&gt;</span>
          <Link to="/dashboard/quiz">Quiz</Link>
          <span aria-hidden="true">&gt;</span>
          <span>{selectedQuiz.title}</span>
        </nav>
        <h1 className="quiz-page__title">{selectedQuiz.title}</h1>
        <p className="quiz-page__subtitle">
          Answer each question and get immediate feedback.
        </p>
      </div>

      <div className="quiz-play">
        <div className="quiz-play__progress">
          <div className="quiz-play__progress-top">
            <span>
              Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
            </span>
            <span>{progressPercent}%</span>
          </div>

          <div className="quiz-play__progress-bar">
            <div
              className="quiz-play__progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {currentQuestion && (
          <div className="quiz-play__card">
            <h2 className="quiz-play__question">
              {currentQuestion.promptFrenchTerm ? (
                <>
                  {currentQuestion.prompt.split(currentQuestion.promptFrenchTerm)[0]}
                  <span
                    className="quiz-play__translation-term"
                    title={currentQuestion.promptTranslation}
                  >
                    {currentQuestion.promptFrenchTerm}
                  </span>
                  {currentQuestion.prompt.split(currentQuestion.promptFrenchTerm).slice(1).join(currentQuestion.promptFrenchTerm)}
                </>
              ) : (
                currentQuestion.prompt
              )}
            </h2>

            {currentQuestion.dialogue && (
              <div className="quiz-play__dialogue" aria-label="Dialogue">
                {currentQuestion.dialogue.map((line, index) => {
                  const selectedOption = currentQuestion.options.find(
                    (option) => option.id === selectedAnswer
                  );

                  return (
                    <div
                      key={`${line.speaker}-${index}`}
                      className={`quiz-play__dialogue-line quiz-play__dialogue-line--${line.speaker.toLowerCase()}`}
                    >
                      <span className="quiz-play__dialogue-speaker">{line.speaker}</span>
                      <p className="quiz-play__dialogue-bubble" title={line.translation}>
                        {line.text}
                        {line.blank && (
                          <span
                            className="quiz-play__dialogue-blank"
                            title={selectedOption?.translation}
                          >
                            {selectedOption?.label ?? "................"}
                          </span>
                        )}
                        {line.suffix}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="quiz-play__options">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={getOptionClassName(option.id)}
                  onClick={() => handleAnswerSelect(option.id)}
                  disabled={!!selectedAnswer}
                >
                  <span className="quiz-play__radio" />
                  <span title={option.translation}>{option.label}</span>
                </button>
              ))}
            </div>

          </div>
        )}

        <div className="quiz-play__actions">
          <button
            type="button"
            className="quiz-play__action-button quiz-play__action-button--secondary"
            onClick={goBackToQuizList}
          >
            Back to Quiz List
          </button>

          <div className="quiz-play__actions-right">
            <button
              type="button"
              className="quiz-play__action-button quiz-play__action-button--secondary"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0 || pendingAdvanceIndex === currentQuestionIndex}
            >
              Previous
            </button>

            {selectedAnswer && pendingAdvanceIndex !== currentQuestionIndex && (
              <button
                type="button"
                className="quiz-play__action-button quiz-play__action-button--primary"
                onClick={handleNext}
              >
                {currentQuestionIndex === selectedQuiz.questions.length - 1
                  ? "Finish Quiz"
                  : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizPage;