import { Link } from 'react-router-dom';

function ProjectCard({ project, ownerName }) {
  const {
    id,
    title,
    category,
    scope,
    shortDescription,
    technologies,
    status,
    image,
    isPlaceholder,
  } = project;

  return (
    <article className="project-card">
      <div className="project-visual">
        {image ? (
          <img
            className="project-image"
            src={image}
            alt={`Aperçu du projet ${title}`}
            width="640"
            height="360"
          />
        ) : (
          <div className="project-image-placeholder" aria-hidden="true">
            <span>{category}</span>
          </div>
        )}

        <span className="project-status">{status}</span>
      </div>

      <div className="project-card-content">
        <div className="project-card-heading">
          <p className="project-category">{category}</p>

          {isPlaceholder && (
            <span className="project-placeholder-badge">
              Contenu provisoire
            </span>
          )}
        </div>

          <p className="project-owner">
  {scope === 'collective'
    ? 'Projet collectif'
    : `Projet de ${ownerName}`}
</p>

        <h2 className="project-title">{title}</h2>

        <p className="project-description">
          {shortDescription}
        </p>

        <ul
          className="technology-list"
          aria-label={`Technologies utilisées pour ${title}`}
        >
          {technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <Link
          className="project-details-link"
          to={`/projets/${id}`}
        >
          Voir le projet
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;