const GITHUB_API_BASE_URL = 'https://api.github.com';
const CACHE_DURATION = 10 * 60 * 1000;

function getCacheKey(username) {
  return `log3500-github-stats-${username.toLowerCase()}`;
}

function readCachedStats(username) {
  try {
    const cachedValue = sessionStorage.getItem(
      getCacheKey(username),
    );

    if (!cachedValue) {
      return null;
    }

    const parsedValue = JSON.parse(cachedValue);

    if (Date.now() >= parsedValue.expiresAt) {
      sessionStorage.removeItem(getCacheKey(username));
      return null;
    }

    return parsedValue.data;
  } catch {
    return null;
  }
}

function cacheStats(username, data) {
  try {
    sessionStorage.setItem(
      getCacheKey(username),
      JSON.stringify({
        expiresAt: Date.now() + CACHE_DURATION,
        data,
      }),
    );
  } catch {
    // L’application continue même si le stockage est indisponible.
  }
}

async function fetchGitHubRepositoryStats(
  username,
  options = {},
) {
  const normalizedUsername = username?.trim();

  if (!normalizedUsername) {
    throw new Error('Identifiant GitHub manquant.');
  }

  const cachedStats = readCachedStats(normalizedUsername);

  if (cachedStats) {
    return cachedStats;
  }

  const encodedUsername = encodeURIComponent(
    normalizedUsername,
  );

  const endpoint =
    `${GITHUB_API_BASE_URL}/users/${encodedUsername}/repos` +
    '?type=owner&sort=updated&direction=desc&per_page=100';

  const response = await fetch(endpoint, {
    signal: options.signal,
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2026-03-10',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Profil GitHub introuvable.');
    }

    if (
      response.status === 403 ||
      response.status === 429
    ) {
      throw new Error(
        'Limite de requêtes GitHub atteinte. Réessayez plus tard.',
      );
    }

    throw new Error(
      `Erreur GitHub : réponse HTTP ${response.status}.`,
    );
  }

  const repositories = await response.json();

  const totalStars = repositories.reduce(
    (total, repository) =>
      total + (repository.stargazers_count ?? 0),
    0,
  );

  const totalForks = repositories.reduce(
    (total, repository) =>
      total + (repository.forks_count ?? 0),
    0,
  );

  const languages = [
    ...new Set(
      repositories
        .map((repository) => repository.language)
        .filter(Boolean),
    ),
  ].slice(0, 4);

  const stats = {
    repositoryCount: repositories.length,
    totalStars,
    totalForks,
    languages,
    profileUrl: `https://github.com/${encodedUsername}`,
  };

  cacheStats(normalizedUsername, stats);

  return stats;
}

export { fetchGitHubRepositoryStats };