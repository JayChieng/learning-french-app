import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useAppData } from "../../context/AppDataContext";
import type { QuizTopic } from "../../types/app";
import { getQuizzesFromFirestore } from "../../services/firebase";
import "./ProgressPage.scss";

const DAY_HEADERS = ["S", "M", "T", "W", "T", "F", "S"];

function ProgressPage() {
  const {
    lessons,
    lessonDetails,
    vocabulary,
    activities,
    activityDates,
    progressSummary,
    quizResults,
  } = useAppData();
  const [quizTopics, setQuizTopics] = useState<QuizTopic[]>([]);

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
      }
    };

    loadQuizTopics();

    return () => {
      isMounted = false;
    };
  }, []);

  const completedLessonIds = new Set(
    lessons.filter((lesson) => lesson.status === "completed").map((lesson) => lesson.id)
  );

  const totalLessons = lessons.length;

  const learnedWords = lessonDetails
    .filter((detail) => completedLessonIds.has(detail.lessonId))
    .reduce((sum, detail) => sum + detail.vocabulary.length, 0);

  const totalWords = vocabulary.length;

  const vocabularyCoverage =
    totalWords === 0 ? 0 : Math.round((learnedWords / totalWords) * 100);

  const completedQuizResults = Object.values(quizResults).filter(
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

  const completedQuizTopics = completedQuizResults.length;
  const totalQuizTopics = quizTopics.length;

  const overallScore = Math.round(
    progressSummary.lessonCompletionRate * 0.45 +
      quizAverage * 0.35 +
      vocabularyCoverage * 0.2
  );

  const monthCalendar = buildMonthCalendar(activityDates);
  const hasRecordedActivity = monthCalendar.days.some(
    (day) => day?.hasActivity
  );

  return (
    <section className="progress-page">
      <Breadcrumb current="Progress" />

      <div className="progress-page__intro">
        <div>
          <h1>Progress</h1>
          <p>
            Track your completed lessons, quiz performance, vocabulary growth,
            and weekly study consistency.
          </p>
        </div>

        <div className="progress-page__intro-actions">
          <Link to="/dashboard/lessons" className="progress-page__primary-action">
            Continue Lessons
          </Link>

          <Link to="/dashboard/quiz" className="progress-page__secondary-action">
            Practice Quiz
          </Link>
        </div>
      </div>

      <div className="progress-page__stats">
        <article className="progress-page__stat-card">
          <span className="progress-page__stat-label">Lesson Completion</span>
          <strong>{progressSummary.lessonCompletionRate}%</strong>
          <p>
            {progressSummary.completedLessons} of {totalLessons} lessons completed
          </p>
        </article>

        <article className="progress-page__stat-card">
          <span className="progress-page__stat-label">Quiz Performance</span>
          <strong>{quizAverage}%</strong>
          <p>
            {totalQuizQuestionsAnswered} quiz questions completed across{" "}
            {completedQuizTopics} of {totalQuizTopics} quiz topics
          </p>
        </article>

        <article className="progress-page__stat-card">
          <span className="progress-page__stat-label">Words Learned</span>
          <strong>{learnedWords}</strong>
          <p>
            {vocabularyCoverage}% of {totalWords} vocabulary words unlocked
          </p>
        </article>

      </div>

      <div className="progress-page__main">
        <article className="progress-page__panel progress-page__panel--wide">
          <div className="progress-page__panel-head">
            <div>
              <h2>Activity Calendar</h2>
              <p>Days with lesson or quiz activity are highlighted.</p>
            </div>
            <span className="progress-page__calendar-month">
              {monthCalendar.monthLabel}
            </span>
          </div>

          <div className="progress-page__calendar">
            {DAY_HEADERS.map((day, index) => (
              <div key={`${day}-${index}`} className="progress-page__calendar-weekday">
                {day}
              </div>
            ))}

            {monthCalendar.days.map((day, index) =>
              day ? (
                <time
                  key={day.dateKey}
                  dateTime={day.dateKey}
                  className={[
                    "progress-page__calendar-day",
                    day.hasActivity && "is-active",
                    day.isToday && "is-today",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-label={`${monthCalendar.monthLabel} ${day.day}${
                    day.hasActivity ? ", activity recorded" : ""
                  }`}
                  title={`${monthCalendar.monthLabel} ${day.day}${
                    day.hasActivity ? " - activity recorded" : ""
                  }`}
                >
                  {day.day}
                </time>
              ) : (
                <span
                  key={`empty-${index}`}
                  className="progress-page__calendar-empty"
                  aria-hidden="true"
                />
              )
            )}
          </div>

          {!hasRecordedActivity && (
            <p className="progress-page__empty-note">
              No activity this month yet. Complete a lesson or practice a quiz
              to mark a day on the calendar.
            </p>
          )}
        </article>

        <article className="progress-page__panel progress-page__panel--overview">
          <h2>Overview</h2>

          <div
            className="progress-page__ring"
            style={{
              background: `conic-gradient(#5b8dfc 0 ${overallScore}%, #d9dce3 ${overallScore}% 100%)`,
            }}
          >
            <div className="progress-page__ring-inner">
              <strong>{overallScore}%</strong>
              <span>Overall</span>
            </div>
          </div>

          <ul className="progress-page__overview-list">
            <li>
              <strong>{progressSummary.completedLessons}</strong>
              <span>
                completed lesson{progressSummary.completedLessons === 1 ? "" : "s"}
              </span>
            </li>
            <li>
              <strong>{learnedWords}</strong>
              <span>words from completed lessons</span>
            </li>
            <li>
              <strong>{quizAverage}%</strong>
              <span>current quiz average</span>
            </li>
          </ul>
        </article>

        <article className="progress-page__panel progress-page__panel--activity">
          <h2>Recent Activity</h2>

          {activities.length > 0 ? (
            <ul className="progress-page__activity-list">
              {activities.map((activity) => (
                <li key={activity.id}>
                  <strong>{activity.date}</strong>
                  <span>{activity.message}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="progress-page__empty-note">
              Your recent activity will appear here after you complete lessons or
              practice quizzes.
            </p>
          )}
        </article>
      </div>
    </section>
  );
}

function buildMonthCalendar(activityDates: string[]) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayKey = toLocalDateKey(today);
  const activeDates = new Set(activityDates);
  const days: Array<{
    day: number;
    dateKey: string;
    hasActivity: boolean;
    isToday: boolean;
  } | null> = Array.from({ length: new Date(year, month, 1).getDay() }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = toLocalDateKey(new Date(year, month, day));
    days.push({
      day,
      dateKey,
      hasActivity: activeDates.has(dateKey),
      isToday: dateKey === todayKey,
    });
  }

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return {
    days,
    monthLabel: new Date(year, month, 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
  };
}

function toLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default ProgressPage;