function MemberCard({ member }) {
  const {
    fullName,
    initials,
    responsibility,
    description,
    githubUsername,
  } = member;

  return (
    <article className="member-card">
      <div className="member-avatar" aria-hidden="true">
        {initials}
      </div>

      <div className="member-card-content">
        <h2 className="member-name">{fullName}</h2>

        <p className="member-responsibility">{responsibility}</p>

        <p className="member-description">{description}</p>

        {githubUsername ? (
          <a
            className="member-link"
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noreferrer"
          >
            Voir le profil GitHub
          </a>
        ) : (
          <p className="member-link-unavailable">
            Profil GitHub à ajouter
          </p>
        )}
      </div>
    </article>
  );
}

export default MemberCard;