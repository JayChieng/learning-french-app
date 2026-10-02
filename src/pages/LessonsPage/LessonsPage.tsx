import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useAppData } from "../../context/AppDataContext";
import lessonIcon from "../../assets/icons/icons8-lesson-64.png";
import "./LessonsPage.scss";

function LessonsPage() {
  const { lessons } = useAppData();

  return (
    <section className="lessons-page">
      <Breadcrumb current="Lessons" />

      <div className="lessons-page__intro">
        <h1>Lessons</h1>
        <p>Follow a sequenced curriculum and open each lesson to study dialogues, meaning, and key vocabulary.</p>
      </div>

      <div className="lessons-page__grid">
        {lessons.map((lesson) => {
          const percentage = Math.round(
            (lesson.completedSteps / lesson.totalSteps) * 100
          );

          const cardContent = (
            <>
              <div className="lessons-page__card-header">
                <img
                  src={lessonIcon}
                  alt={`${lesson.title} icon`}
                  className="lessons-page__icon"
                />

                <div className="lessons-page__meta">
                  <span>Unit {lesson.unit}</span>
                  <strong>{lesson.title}</strong>
                  <p>{lesson.topic}</p>
                </div>
              </div>

              <p className="lessons-page__description">{lesson.description}</p>

              <div className="lessons-page__track">
                <span style={{ width: `${percentage}%` }} />
              </div>

              <div className="lessons-page__footer">
                <small>
                  {lesson.completedSteps}/{lesson.totalSteps} completed
                </small>
                <em className="lessons-page__status">
                  {lesson.status === "completed"
                    ? "Completed"
                    : lesson.status === "locked"
                    ? "Locked"
                    : "Open lesson"}
                </em>
              </div>
            </>
          );

          if (lesson.status === "locked") {
            return (
              <div
                key={lesson.id}
                className="lessons-page__card lessons-page__card--locked"
              >
                {cardContent}
              </div>
            );
          }

          return (
            <Link
              key={lesson.id}
              to={`/dashboard/lessons/${lesson.id}`}
              className={`lessons-page__card lessons-page__card--${lesson.status}`}
            >
              {cardContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default LessonsPage;