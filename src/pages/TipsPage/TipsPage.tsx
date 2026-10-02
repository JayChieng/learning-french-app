import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import onlineLearningIllustration from "../../assets/icons/undraw_online-learning_tgmv.svg";
import { useAppData } from "../../context/AppDataContext";
import "./TipsPage.scss";

function TipsPage() {
  const { tips, resources } = useAppData();

  return (
    <section className="tips-page">
      <div className="tips-page__hero">
        <div>
          <Breadcrumb current="Tips & Resources" />
          <h1>Tips & Resources</h1>
          <p>Learn smarter with practical study tips and trustworthy resources.</p>
        </div>
        <img src={onlineLearningIllustration} alt="Learning resources illustration" />
      </div>

      <section className="tips-page__section">
        <h2>Learning Tips</h2>
        <div className="tips-page__grid">
          {tips.map((tip) => (
            <article
              key={tip.id}
              className={`tips-page__card tips-page__card--${tip.tone}`}
            >
              <img src={tip.icon} alt="" />
              <h3>{tip.title}</h3>
              <p>{tip.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tips-page__section">
        <h2>Helpful Resources</h2>
        <div className="tips-page__resources">
          {resources.map((resource) => (
            <article key={resource.id} className="tips-page__resource">
              <img src={resource.icon} alt="" />
              <div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <a href={resource.link} target="_blank" rel="noreferrer">
                  Visit resource
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default TipsPage;