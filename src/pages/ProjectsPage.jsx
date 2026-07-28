import { useMemo, useState } from 'react';

import ProjectCard from '../components/projects/ProjectCard.jsx';
import ProjectFilter from '../components/projects/ProjectFilter.jsx';
import projects from '../data/projects.js';
import teamMembers from '../data/team.js';

function getProjectOwnerName(project) {
  if (project.scope === 'collective') {
    return 'Équipe LOG3500';
  }

  const owner = teamMembers.find(
    (member) => member.id === project.ownerId,
  );

  return owner?.fullName ?? 'Membre non identifié';
}

function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [activeMemberId, setActiveMemberId] = useState('all');

  const categories = useMemo(() => {
    const projectCategories = projects.map(
      (project) => project.category,
    );

    return ['Tous', ...new Set(projectCategories)];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'Tous' ||
        project.category === activeCategory;

      const isContributor =
        project.contributorIds?.includes(activeMemberId) ?? false;

      const matchesMember =
        activeMemberId === 'all' ||
        project.ownerId === activeMemberId ||
        isContributor;

      return matchesCategory && matchesMember;
    });
  }, [activeCategory, activeMemberId]);

  return (
    <section
      className="projects-page"
      aria-labelledby="projects-page-title"
    >
      <header className="page-heading">
        <p className="page-eyebrow">Nos réalisations</p>

        <h1 id="projects-page-title">Projets</h1>

        <p className="page-introduction">
          Chaque membre présente ses propres réalisations. Les projets
          développés par toute l’équipe sont identifiés comme projets
          collectifs.
        </p>
      </header>

      <ProjectFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="member-filter">
        <label htmlFor="project-member-filter">
          Afficher les projets de
        </label>

        <select
          id="project-member-filter"
          value={activeMemberId}
          onChange={(event) =>
            setActiveMemberId(event.target.value)
          }
        >
          <option value="all">Tous les membres</option>

          {teamMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.fullName}
            </option>
          ))}
        </select>
      </div>

      <p className="project-results-count" aria-live="polite">
        {filteredProjects.length}{' '}
        {filteredProjects.length > 1
          ? 'projets affichés'
          : 'projet affiché'}
      </p>

      {filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              ownerName={getProjectOwnerName(project)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Aucun projet trouvé</h2>

          <p>
            Aucun projet ne correspond actuellement aux filtres
            sélectionnés.
          </p>
        </div>
      )}
    </section>
  );
}

export default ProjectsPage;