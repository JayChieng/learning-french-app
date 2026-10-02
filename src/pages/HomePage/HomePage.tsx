import { Link } from "react-router-dom";
import frenchFlag from "../../assets/icons/icons8-french-flag-48.png";
import homeIllustration from "../../assets/icons/Home page.svg";
import lessonIcon from "../../assets/icons/icons8-lesson-64.png";
import volumeIcon from "../../assets/icons/icons8-volume-48.png";
import quizIcon from "../../assets/icons/icons8-quiz-64.png";
import progressIcon from "../../assets/icons/icons8-progress-100.png";
import "./HomePage.scss";

function HomePage() {
  const featureCards = [
    {
      id: "feature-lessons",
      title: "Lessons",
      description: "Follow beginner-friendly units with clear learning outcomes.",
      icon: lessonIcon,
    },
    {
      id: "feature-vocabulary",
      title: "Vocabulary with Audio",
      description: "Practice useful words and hear pronunciation support.",
      icon: volumeIcon,
    },
    {
      id: "feature-quiz",
      title: "Quiz Practice",
      description: "Check understanding with interactive questions and feedback.",
      icon: quizIcon,
    },
    {
      id: "feature-progress",
      title: "Progress Tracking",
      description: "Monitor lessons completed, score trends, and consistency.",
      icon: progressIcon,
    },
  ];
  return (
    <main className="home-page">
      <header className="home-page__nav">
        <div className="home-page__brand">
          <img src={frenchFlag} alt="" />
          <span>French Learning</span>
        </div>
        <nav className="home-page__links">
          <a href="#features">Features</a>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <section className="home-page__hero">
        <div className="home-page__copy">
          <span className="home-page__eyebrow">Major project ready React web app</span>
          <h1>Learn French in a simple and interactive way</h1>
          <p>
            This app teaches beginner French through lessons, vocabulary review,
            quizzes, progress tracking, and curated learning resources.
          </p>
          <div className="home-page__actions">
            <Link className="home-page__primary" to="/register">
              Start Learning
            </Link>
            <Link className="home-page__secondary" to="/login">
              Sign In
            </Link>
          </div>
        </div>
        <div className="home-page__visual">
          <div className="home-page__orb" />
          <img src={homeIllustration} alt="French learning illustration" />
        </div>
      </section>

      <section className="home-page__features" id="features">
        <div className="home-page__features-header">
          <h2>Core Features</h2>
          <p>
            The project is structured as a multi-page learning tool with clear
            purpose, strong visual design, and persistent data handling.
          </p>
        </div>

        <div className="home-page__grid">
          {featureCards.map((card) => (
            <article key={card.id} className="home-page__card">
              <img src={card.icon} alt="" />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
