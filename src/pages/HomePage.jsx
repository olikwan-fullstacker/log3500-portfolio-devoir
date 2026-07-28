import { Link } from 'react-router-dom';

import backgroundVideo from '../assets/videos/fullstack-cover.mp4';
import useLanguage from '../hooks/useLanguage.js';

function HomePage() {
  const { translate } = useLanguage();

  return (
    <section className="hero hero-video-section">
      <video
        className="hero-background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex="-1"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="hero-video-overlay" aria-hidden="true" />

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
            className="button button-secondary hero-secondary-button"
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