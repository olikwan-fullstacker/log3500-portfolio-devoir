import { Link, useParams } from 'react-router-dom';

import projects from '../data/projects.js';
import teamMembers from '../data/team.js';

function ProjectDetailsPage() {
  const { projectId } = useParams();

  const project = projects.find(
    (currentProject) => currentProject.id === projectId,
  );

  if (!project) {
    return (
      <section className="page-section">
        <p className="page-eyebrow">Erreur</p>

        <h1>Projet introuvable</h1>

        <p>
          Aucun projet ne correspond à l’identifiant demandé.
        </p>

        <Link className="button button-primary" to="/projets">
          Retourner aux projets
        </Link>
      </section>
    );
  }

  const owner = teamMembers.find(
    (member) => member.id === project.ownerId,
  );

  const projectAuthor =
    project.scope === 'collective'
      ? 'Équipe LOG3500'
      : owner?.fullName ?? 'Membre non identifié';

  const {
    title,
    category,
    fullDescription,
    technologies,
    status,
    repositoryUrl,
    demoUrl,
    isPlaceholder,
    scope,
  } = project;

  return (
    <article className="project-details">
      <Link className="back-link" to="/projets">
        <span aria-hidden="true">←</span> Retour aux projets
      </Link>

      <header className="project-details-header">
        <p className="page-eyebrow">{category}</p>

        <h1>{title}</h1>

        <p className="project-details-author">
          Réalisé par : <strong>{projectAuthor}</strong>
        </p>

        <p className="project-details-status">
          Statut : <strong>{status}</strong>
        </p>

        {scope === 'collective' && (
          <p>
            Ce projet a été réalisé conjointement par les quatre
            membres de l’équipe.
          </p>
        )}

        {isPlaceholder && (
          <p className="project-warning">
            Cette présentation est provisoire et doit être
            remplacée par le contenu réel du projet.
          </p>
        )}
      </header>

      <section
        className="project-details-section"
        aria-labelledby="project-description-title"
      >
        <h2 id="project-description-title">
          Présentation du projet
        </h2>

        <p>{fullDescription}</p>
      </section>

      <section
        className="project-details-section"
        aria-labelledby="project-technologies-title"
      >
        <h2 id="project-technologies-title">
          Technologies utilisées
        </h2>

        <ul className="technology-list">
          {technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </section>

      <section
        className="project-details-section"
        aria-labelledby="project-links-title"
      >
        <h2 id="project-links-title">Liens du projet</h2>

        <div className="project-actions">
          {repositoryUrl ? (
            <a
              className="button button-secondary"
              href={repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              Voir le dépôt GitHub
            </a>
          ) : (
            <span className="unavailable-resource">
              Dépôt GitHub à ajouter
            </span>
          )}

          {demoUrl ? (
            <a
              className="button button-primary"
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Voir la démonstration
            </a>
          ) : (
            <span className="unavailable-resource">
              Démonstration à ajouter
            </span>
          )}
        </div>
      </section>
    </article>
  );
}

export default ProjectDetailsPage;