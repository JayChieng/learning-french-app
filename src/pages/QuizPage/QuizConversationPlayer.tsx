import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type {
  QuizConversationLine,
  QuizTopic,
} from "../../types/app";
import { useAppData } from "../../context/AppDataContext";
import {
  playQuizAnswerSound,
  speakQuizTexts,
  stopQuizPrompt,
} from "../../services/quizAudio";

type ConversationTurn = QuizConversationLine;
type AnswerMode = "text" | "choice";

type Blank = {
  before: string;
  answer: string;
  after: string;
};

type Challenge = {
  mode: AnswerMode;
  blank: Blank;
  choices: string[];
};

type Outcome = {
  correct: boolean;
  displayText: string;
};

type QuizConversationPlayerProps = {
  quiz: QuizTopic;
  allQuizzes: QuizTopic[];
  onExit: () => void;
  hasNextQuiz: boolean;
  onNextQuiz: () => void;
};

function normalizeAnswer(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[^\p{L}\p{N}' ]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function buildTurns(quiz: QuizTopic): ConversationTurn[] {
  const pairs = quiz.conversation?.pairs ?? [];

  return pairs.flatMap((pair, index) => {
    if (pair.fixedSpeakers || index === 0) {
      return [pair.question, pair.answer];
    }

    const questionSpeaker = Math.random() < 0.5 ? "A" : "B";
    const answerSpeaker = questionSpeaker === "A" ? "B" : "A";

    return [
      { ...pair.question, speaker: questionSpeaker },
      { ...pair.answer, speaker: answerSpeaker },
    ];
  });
}

function getBlankOptions(turn: ConversationTurn): Blank[] {
  const candidates = (turn.blankCandidates ?? []).flatMap((candidate) => {
    const start = turn.text.indexOf(candidate);
    if (start < 0) return [];
    return [{
      before: turn.text.slice(0, start),
      answer: candidate,
      after: turn.text.slice(start + candidate.length),
    }];
  });
  const unique = new Map<string, Blank>();

  for (const blank of candidates) {
    unique.set(normalizeAnswer(blank.answer), blank);
  }

  if (unique.size === 0) {
    throw new Error(`Conversation line has no defined, context-based blank: ${turn.text}`);
  }

  return [...unique.values()];
}

function isAgeNumberBlank(turn: ConversationTurn, blank: Blank) {
  return (
    turn.answerRule === "age" &&
    /^\d+$/.test(blank.answer) &&
    /^\s*J'ai\s+$/i.test(blank.before) &&
    /^\s+ans\.?$/i.test(blank.after)
  );
}

function isCorrectAnswer(turn: ConversationTurn, blank: Blank, answer: string) {
  if (normalizeAnswer(answer) === normalizeAnswer(blank.answer)) return true;

  if (!isAgeNumberBlank(turn, blank) || !/^\d{1,3}$/.test(answer.trim())) return false;

  const age = Number(answer);
  return age >= 1 && age <= 120;
}

function getCompletedLine(blank: Blank, answer: string) {
  return `${blank.before}${answer}${blank.after}`;
}

function getDistractorPool(turns: ConversationTurn[], blank: Blank, quizzes: QuizTopic[]) {
  const phrasePool = [
    ...turns.map((turn) => turn.text),
    ...quizzes.flatMap((quiz) =>
      quiz.questions.flatMap((question) => [
        ...question.options
          .filter((option) => option.translation)
          .map((option) => option.label),
        ...(question.dialogue ?? [])
          .filter((line) => line.translation)
          .map((line) => line.text),
      ])
    ),
  ];
  const isPhraseAnswer = /\s/.test(blank.answer.trim());
  const pool = isPhraseAnswer
    ? phrasePool
    : phrasePool.flatMap((phrase) =>
        [...phrase.matchAll(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)].map(([word]) => word)
      );

  return [...new Map(
    pool
      .filter((candidate) => normalizeAnswer(candidate) !== normalizeAnswer(blank.answer))
      .map((candidate) => [normalizeAnswer(candidate), candidate])
  ).values()];
}

function createChallenge(
  turn: ConversationTurn,
  turns: ConversationTurn[],
  quizzes: QuizTopic[]
): Challenge {
  const blanks = getBlankOptions(turn);
  const blank = blanks[Math.floor(Math.random() * blanks.length)];
  const mode: AnswerMode = isAgeNumberBlank(turn, blank)
    ? "text"
    : Math.random() < 0.5
      ? "text"
      : "choice";
  const distractors = shuffle(getDistractorPool(turns, blank, quizzes)).slice(0, 3);
  const fallbacks = ["Bonjour", "Merci", "Salut", "Très bien", "Et toi ?"];

  for (const fallback of fallbacks) {
    if (distractors.length === 3) break;
    if (
      normalizeAnswer(fallback) !== normalizeAnswer(blank.answer) &&
      !distractors.some((item) => normalizeAnswer(item) === normalizeAnswer(fallback))
    ) {
      distractors.push(fallback);
    }
  }

  return {
    mode,
    blank,
    choices: shuffle([blank.answer, ...distractors]),
  };
}

function QuizConversationSession({
  quiz,
  allQuizzes,
  onExit,
  hasNextQuiz,
  onNextQuiz,
  onRetry,
}: QuizConversationPlayerProps & { onRetry: () => void }) {
  const { saveQuizTopicResult } = useAppData();
  const [turns] = useState(() => buildTurns(quiz));
  const [challenges] = useState(() =>
    turns.slice(1).map((turn) => createChallenge(turn, turns, allQuizzes))
  );
  const [currentTurnIndex, setCurrentTurnIndex] = useState(1);
  const [draftAnswer, setDraftAnswer] = useState("");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const currentTurn = turns[currentTurnIndex];
  const currentChallenge = challenges[currentTurnIndex - 1];

  useEffect(() => {
    if (!currentTurn || isFinished) return;

    if (outcome) {
      const timer = window.setTimeout(() => {
        if (currentTurnIndex === turns.length - 1) {
          saveQuizTopicResult(quiz.id, {
            correct: correctCount + Number(outcome.correct),
            total: turns.length - 1,
            completed: true,
            updatedAt: Date.now(),
          });
          setCorrectCount((count) => count + Number(outcome.correct));
          setIsFinished(true);
          return;
        }

        setCorrectCount((count) => count + Number(outcome.correct));
        setCurrentTurnIndex((index) => index + 1);
        setDraftAnswer("");
        setOutcome(null);
      }, 2000);

      return () => {
        window.clearTimeout(timer);
        stopQuizPrompt();
      };
    }

    const visiblePromptSegments = [
      currentChallenge.blank.before,
      currentChallenge.blank.after,
    ];
    speakQuizTexts(
      currentTurnIndex === 1
        ? [turns[0].text, ...visiblePromptSegments]
        : visiblePromptSegments
    );

    return stopQuizPrompt;
  }, [
    correctCount,
    currentChallenge,
    currentTurn,
    currentTurnIndex,
    isFinished,
    outcome,
    quiz.id,
    saveQuizTopicResult,
    turns,
    turns.length,
  ]);

  useEffect(() => {
    if (!transcriptRef.current) return;
    transcriptRef.current.scrollTo({
      top: transcriptRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [currentTurnIndex, outcome]);

  const visibleTurns = useMemo(
    () => turns.slice(0, currentTurnIndex + 1),
    [currentTurnIndex, turns]
  );

  const progressPercent = Math.round(
    ((currentTurnIndex - 1 + Number(Boolean(outcome))) / (turns.length - 1)) * 100
  );

  const submitAnswer = (answer: string) => {
    if (outcome || !currentChallenge) return;

    const correct = isCorrectAnswer(currentTurn, currentChallenge.blank, answer);
    playQuizAnswerSound(correct);
    setOutcome({
      correct,
      displayText: getCompletedLine(
        currentChallenge.blank,
        correct ? answer.trim() : currentChallenge.blank.answer
      ),
    });
  };

  if (isFinished) {
    return (
      <section className="quiz-page">
        <div className="quiz-page__header">
          <nav className="quiz-page__breadcrumb" aria-label="Breadcrumb">
            <Link to="/dashboard">Home</Link>
            <span aria-hidden="true">&gt;</span>
            <Link to="/dashboard/quiz">Quiz</Link>
            <span aria-hidden="true">&gt;</span>
            <span>{quiz.title}</span>
          </nav>
          <h1 className="quiz-page__title">{quiz.title}</h1>
          <p className="quiz-page__subtitle">Your result has been saved and synced with your progress.</p>
        </div>
        <div className="quiz-result">
          <span className="quiz-result__badge">Completed</span>
          <h2 className="quiz-result__title">
            You got {correctCount}/{turns.length - 1} correct
          </h2>
          <p className="quiz-result__text">You completed the full conversation.</p>
          <div className="quiz-result__actions">
            <button
              type="button"
              className="quiz-result__button quiz-result__button--secondary"
              onClick={onExit}
            >
              Back to Quiz List
            </button>
            <button
              type="button"
              className="quiz-result__button quiz-result__button--primary"
              onClick={onRetry}
            >
              Retry Conversation
            </button>
            {hasNextQuiz && (
              <button
                type="button"
                className="quiz-result__button quiz-result__button--primary"
                onClick={onNextQuiz}
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
          <span>{quiz.title}</span>
        </nav>
        <h1 className="quiz-page__title">{quiz.title}</h1>
        <p className="quiz-page__subtitle">
          Complete each line to reveal the conversation. The missing speaker and answer mode change as you play.
        </p>
      </div>

      <div className="quiz-play quiz-conversation">
        <div className="quiz-play__progress">
          <div className="quiz-play__progress-top">
            <span>Conversation {currentTurnIndex} of {turns.length - 1}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="quiz-play__progress-bar">
            <div className="quiz-play__progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="quiz-conversation__layout">
          <div className="quiz-conversation__card">
            <div className="quiz-conversation__card-heading">
              <span className="quiz-conversation__card-icon" aria-hidden="true">✦</span>
              <div>
                <h2>Conversation</h2>
                <p>Follow the dialogue as it unfolds</p>
              </div>
            </div>
            <div className="quiz-conversation__transcript" ref={transcriptRef} aria-label="Conversation so far">
            {visibleTurns.map((turn, index) => {
              const isActiveTurn = index === currentTurnIndex;
              const turnOutcome = isActiveTurn ? outcome : null;
              const challenge = isActiveTurn ? currentChallenge : null;

              return (
                <div
                  key={`${index}-${turn.speaker}`}
                  className={`quiz-conversation__line quiz-conversation__line--${turn.speaker.toLowerCase()}${
                    turnOutcome
                      ? turnOutcome.correct
                        ? " quiz-conversation__line--correct"
                        : " quiz-conversation__line--wrong"
                      : ""
                  }`}
                >
                  <span className="quiz-conversation__speaker">{turn.speaker}</span>
                  <div className="quiz-conversation__bubble" title={!isActiveTurn || turnOutcome ? turn.translation : undefined}>
                    {isActiveTurn && !turnOutcome && challenge ? (
                      <>
                        <span>{challenge.blank.before}</span>
                        {challenge.mode === "text" ? (
                          <input
                            aria-label={`Complete ${turn.speaker}'s line`}
                            autoComplete="off"
                            className="quiz-conversation__input"
                            disabled={Boolean(outcome)}
                            maxLength={80}
                            onChange={(event) => setDraftAnswer(event.target.value)}
                            placeholder="..."
                            value={draftAnswer}
                          />
                        ) : (
                          <span className="quiz-conversation__blank" aria-label="Choose the missing words">
                            ...
                          </span>
                        )}
                        <span>{challenge.blank.after}</span>
                      </>
                    ) : (
                      turnOutcome ? turnOutcome.displayText : turn.text
                    )}
                  </div>
                </div>
              );
            })}
            </div>
          </div>

          <form
            className="quiz-conversation__answer-card"
            onSubmit={(event) => {
              event.preventDefault();
              submitAnswer(draftAnswer);
            }}
          >
          <div className="quiz-conversation__card-heading">
            <span className="quiz-conversation__card-icon quiz-conversation__card-icon--answer" aria-hidden="true">✎</span>
            <div>
              <h2>Your turn</h2>
              <p>Complete {currentTurn.speaker}'s speech bubble</p>
            </div>
          </div>
          <div className="quiz-conversation__answer">
            <p className="quiz-conversation__instruction">
              Complete {currentTurn.speaker}'s line
              {currentChallenge.mode === "text" ? " by typing the missing words." : " by choosing the missing words."}
            </p>

            {currentChallenge.mode === "choice" && !outcome && (
              <div className="quiz-conversation__choices">
                {currentChallenge.choices.map((choice, index) => (
                  <button
                    key={`${index}-${choice}`}
                    type="button"
                    className="quiz-conversation__choice"
                    onClick={() => submitAnswer(choice)}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            )}

            {currentChallenge.mode === "text" && !outcome && (
              <button
                type="submit"
                className="quiz-play__action-button quiz-play__action-button--primary"
                disabled={!draftAnswer.trim()}
              >
                Check answer
              </button>
            )}

          </div>

          <div className="quiz-conversation__footer">
            <span>{correctCount} correct so far</span>
            <button
              type="button"
              className="quiz-play__action-button quiz-play__action-button--secondary"
              onClick={onExit}
            >
              Back to Quiz List
            </button>
          </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function QuizConversationPlayer(props: QuizConversationPlayerProps) {
  const [attempt, setAttempt] = useState(0);

  return (
    <QuizConversationSession
      key={attempt}
      {...props}
      onRetry={() => setAttempt((value) => value + 1)}
    />
  );
}
