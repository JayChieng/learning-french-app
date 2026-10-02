import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useAppData } from "../../context/AppDataContext";
import type { QuizTopic } from "../../types/app";
import { getQuizzesFromFirestore } from "../../services/firebase";
import type { ActivityEntry } from "../../types/app";
import "./ProgressPage.scss";

const DAY_HEADERS = ["S", "M", "T", "W", "T", "F", "S"];

type HeatmapWeek = {
  label: string;
  cells: number[];
};

function ProgressPage() {
  const {
    lessons,
    lessonDetails,
    vocabulary,
    activities,
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

  const heatmapWeeks = buildFiveWeekHeatmap(activities);

  const hasRecordedHistory = heatmapWeeks.some((week) =>
    week.cells.some((value) => value > 0)
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

        <article className="progress-page__stat-card">
          <span className="progress-page__stat-label">Current Streak</span>
          <strong>
            {progressSummary.streakDays} day
            {progressSummary.streakDays === 1 ? "" : "s"}
          </strong>
          <p>Based on your recent recorded activity</p>
        </article>
      </div>

      <div className="progress-page__main">
        <article className="progress-page__panel progress-page__panel--wide">
          <div className="progress-page__panel-head">
            <div>
              <h2>Weekly Progress</h2>
              <p>Last 5 weeks of activity based on lessons and quiz practice.</p>
            </div>

            {hasRecordedHistory && (
              <span className="progress-page__streak-badge">
                {progressSummary.streakDays}-Day Streak
              </span>
            )}
          </div>

          <div className="progress-page__heatmap-wrapper">
            <div className="progress-page__heatmap-corner" />

            {DAY_HEADERS.map((day) => (
              <div key={day} className="progress-page__heatmap-day">
                {day}
              </div>
            ))}

            {heatmapWeeks.map((week) => (
              <div key={week.label} className="progress-page__heatmap-row">
                <div className="progress-page__heatmap-label">{week.label}</div>

                <div className="progress-page__heatmap-cells">
                  {week.cells.map((value, index) => (
                    <span
                      key={`${week.label}-${index}`}
                      className={`progress-page__heatmap-cell level-${value}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {!hasRecordedHistory && (
            <p className="progress-page__empty-note">
              No activity recorded yet. Complete a lesson or answer quiz questions
              to start filling this chart.
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

function buildFiveWeekHeatmap(activities: ActivityEntry[]): HeatmapWeek[] {
  const today = startOfDay(new Date());
  const oldestDate = addDays(today, -34);
  const dailyCounts = new Array<number>(35).fill(0);

  const hasTimestampedActivity = activities.some(
    (activity) => typeof activity.createdAt === "number"
  );

  if (hasTimestampedActivity) {
    activities.forEach((activity) => {
      if (typeof activity.createdAt !== "number") return;

      const activityDate = startOfDay(new Date(activity.createdAt));

      if (activityDate < oldestDate || activityDate > today) return;

      const diffDays = Math.floor(
        (activityDate.getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays >= 0 && diffDays < dailyCounts.length) {
        dailyCounts[diffDays] += 1;
      }
    });
  } else {
    const fallbackCounts = [...dailyCounts];

    activities
      .slice()
      .reverse()
      .slice(0, fallbackCounts.length)
      .forEach((_, index) => {
        const targetIndex = fallbackCounts.length - 1 - index;
        if (targetIndex >= 0) {
          fallbackCounts[targetIndex] = 1;
        }
      });

    for (let index = 0; index < fallbackCounts.length; index += 1) {
      dailyCounts[index] = fallbackCounts[index];
    }
  }

  const weeks: HeatmapWeek[] = [];

  for (let weekIndex = 0; weekIndex < 5; weekIndex += 1) {
    const startIndex = weekIndex * 7;
    const firstDate = addDays(oldestDate, startIndex);

    weeks.push({
      label: firstDate.toLocaleDateString("en-CA", {
        month: "short",
        day: "numeric",
      }),
      cells: dailyCounts
        .slice(startIndex, startIndex + 7)
        .map((count) => mapCountToLevel(count)),
    });
  }

  return weeks;
}

function mapCountToLevel(count: number) {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;
  return 4;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return startOfDay(next);
}

export default ProgressPage;