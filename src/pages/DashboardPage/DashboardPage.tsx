import { Link } from "react-router-dom";
import { useAppData } from "../../context/AppDataContext";
import "./DashboardPage.scss";
import lessonIcon from "../../assets/icons/icons8-lesson-64.png";
import wordReferenceIcon from "../../assets/icons/icons8-wordreference-100.png";
import quizIcon from "../../assets/icons/icons8-quiz-64.png";
import progressIcon from "../../assets/icons/icons8-progress-100.png";
import tipIcon from "../../assets/icons/icons8-tip-48.png";

function DashboardPage() {
  const { auth, progressSummary } = useAppData();

  // Dashboard highlights for navigation
  const dashboardHighlights = [
    {
      id: "highlight-lessons",
      title: "Lessons",
      description: "Continue your structured learning path",
      icon: lessonIcon,
      path: "/dashboard/lessons",
    },
    {
      id: "highlight-vocabulary",
      title: "Vocabulary",
      description: "Review useful French words with context",
      icon: wordReferenceIcon,
      path: "/dashboard/vocabulary",
    },
    {
      id: "highlight-quiz",
      title: "Quiz",
      description: "Test retention with fast practice rounds",
      icon: quizIcon,
      path: "/dashboard/quiz",
    },
    {
      id: "highlight-progress",
      title: "Progress",
      description: "Track lessons, quiz score, and streaks",
      icon: progressIcon,
      path: "/dashboard/progress",
    },
    {
      id: "highlight-tips",
      title: "Tips & Resources",
      description: "Support your learning with external resources",
      icon: tipIcon,
      path: "/dashboard/tips",
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-page__intro">
        <h1>Welcome back, {auth.name}</h1>
        <p>Pick up where you left off and keep building your French confidence.</p>
      </div>

      {/* Seed/update button removed for production */}

      <div className="dashboard-page__grid">
        {dashboardHighlights.slice(0, 3).map((item) => (
          <Link key={item.id} className="dashboard-page__card" to={item.path}>
            <img src={item.icon} alt="" />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>

      <div className="dashboard-page__lower">
        <article className="dashboard-page__progress-card">
          <h2>Your progress</h2>
          <div className="dashboard-page__ring-row">
            <div className="dashboard-page__ring">
              <div className="dashboard-page__ring-inner">
                {progressSummary.lessonCompletionRate}%
              </div>
            </div>
            <div className="dashboard-page__progress-copy">
              <strong>{progressSummary.completedLessons} lessons completed</strong>
              <span>{progressSummary.learnedWords} words available to review</span>
              <span>{progressSummary.quizAverage}% average quiz score</span>
            </div>
          </div>
        </article>

        <div className="dashboard-page__side">
          {dashboardHighlights.slice(3).map((item) => (
            <Link key={item.id} className="dashboard-page__side-card" to={item.path}>
              <img src={item.icon} alt="" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;