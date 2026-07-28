import GitHubStats from './GitHubStats.jsx';

function MemberCard({ member }) {
  const {
    fullName,
    initials,
    responsibility,
    description,
    githubUsername,
    photo,
    photoAlt,
    isPlaceholder,
  } = member;

  return (
    <article className="member-card">
      <div className="member-portrait">
        {photo ? (
          <img
            className="member-photo"
            src={photo}
            alt={photoAlt}
            width="224"
            height="280"
          />
        ) : (
          <div className="member-avatar" aria-hidden="true">
            {initials}
          </div>
        )}

        {isPlaceholder && (
          <span className="member-photo-badge">
            Photo provisoire
          </span>
        )}
      </div>

      <div className="member-card-content">
        <h2 className="member-name">{fullName}</h2>

        <p className="member-responsibility">
          {responsibility}
        </p>

        <p className="member-description">
          {description}
        </p>

        <GitHubStats username={githubUsername} />
       
      </div>
    </article>
  );
}

export default MemberCard;