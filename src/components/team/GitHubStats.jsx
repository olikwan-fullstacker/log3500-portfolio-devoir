import { useEffect, useState } from 'react';

import ErrorMessage from '../common/ErrorMessage.jsx';
import LoadingIndicator from '../common/LoadingIndicator.jsx';
import {
  fetchGitHubRepositoryStats,
} from '../../services/githubApi.js';

const initialRequestState = {
  username: null,
  status: 'idle',
  stats: null,
  error: '',
};

function GitHubStats({ username }) {
  const [requestState, setRequestState] = useState(
    initialRequestState,
  );

  useEffect(() => {
    if (!username) {
      return undefined;
    }

    const controller = new AbortController();

    async function loadStats() {
      try {
        const githubStats =
          await fetchGitHubRepositoryStats(username, {
            signal: controller.signal,
          });

        if (!controller.signal.aborted) {
          setRequestState({
            username,
            status: 'success',
            stats: githubStats,
            error: '',
          });
        }
      } catch (requestError) {
        if (
          requestError.name !== 'AbortError' &&
          !controller.signal.aborted
        ) {
          setRequestState({
            username,
            status: 'error',
            stats: null,
            error:
              requestError.message ||
              'Impossible de charger les données GitHub.',
          });
        }
      }
    }

    loadStats();

    return () => {
      controller.abort();
    };
  }, [username]);

  if (!username) {
    return (
      <p className="github-unavailable">
        Identifiant GitHub à ajouter
      </p>
    );
  }

  const isCurrentUsername =
    requestState.username === username;

  if (
    !isCurrentUsername ||
    requestState.status === 'idle'
  ) {
    return (
      <LoadingIndicator label="Chargement des statistiques GitHub…" />
    );
  }

  if (requestState.status === 'error') {
    return (
      <ErrorMessage message={requestState.error} />
    );
  }

  const { stats } = requestState;

  if (!stats) {
    return null;
  }

  return (
    <section
      className="github-stats"
      aria-label={`Statistiques GitHub de ${username}`}
    >
      <dl className="github-stats-grid">
        <div className="github-stat">
          <dt>Dépôts analysés</dt>
          <dd>{stats.repositoryCount}</dd>
        </div>

        <div className="github-stat">
          <dt>Étoiles</dt>
          <dd>{stats.totalStars}</dd>
        </div>

        <div className="github-stat">
          <dt>Forks</dt>
          <dd>{stats.totalForks}</dd>
        </div>
      </dl>

      <div className="github-languages">
        <p>Langages principaux</p>

        {stats.languages.length > 0 ? (
          <ul>
            {stats.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        ) : (
          <span>Aucun langage détecté</span>
        )}
      </div>

      <a
        className="member-link"
        href={stats.profileUrl}
        target="_blank"
        rel="noreferrer"
      >
        Voir le profil GitHub
      </a>
    </section>
  );
}

export default GitHubStats;