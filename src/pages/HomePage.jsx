import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-eyebrow">Équipe LOG3500</p>

        <h1>Nous concevons des expériences Web modernes.</h1>

        <p className="hero-description">
          Découvrez notre équipe, nos compétences et les projets réalisés
          dans le cadre du cours de conception et programmation de sites Web.
        </p>

        <div className="hero-actions">
          <Link className="button button-primary" to="/projets">
            Découvrir nos projets
          </Link>

          <Link className="button button-secondary" to="/equipe">
            Rencontrer l’équipe
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomePage;