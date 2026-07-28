import { Link } from 'react-router-dom';

import useLanguage from '../hooks/useLanguage.js';

function HomePage() {
  const { translate } = useLanguage();

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-eyebrow">
          {translate('home.eyebrow')}
        </p>

        <h1>{translate('home.title')}</h1>

        <p className="hero-description">
          {translate('home.description')}
        </p>

        <div className="hero-actions">
          <Link
            className="button button-primary"
            to="/projets"
          >
            {translate('home.projectsButton')}
          </Link>

          <Link
            className="button button-secondary"
            to="/equipe"
          >
            {translate('home.teamButton')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomePage;