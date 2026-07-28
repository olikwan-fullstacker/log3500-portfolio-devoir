import { useMemo, useState } from 'react';

import ProjectCard from '../components/projects/ProjectCard.jsx';
import ProjectFilter from '../components/projects/ProjectFilter.jsx';
import projects from '../data/projects.js';

function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const categories = useMemo(() => {
    const projectCategories = projects.map(
      (project) => project.category,
    );

    return ['Tous', ...new Set(projectCategories)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Tous') {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeCategory,
    );
  }, [activeCategory]);

  return (
    <section
      className="projects-page"
      aria-labelledby="projects-page-title"
    >
      <header className="page-heading">
        <p className="page-eyebrow">Nos réalisations</p>

        <h1 id="projects-page-title">Projets</h1>

        <p className="page-introduction">
          Découvrez les projets réalisés individuellement et
          collectivement par les membres de notre équipe.
        </p>
      </header>

      <ProjectFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

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
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Aucun projet trouvé</h2>
          <p>
            Aucun projet ne correspond actuellement à cette
            catégorie.
          </p>
        </div>
      )}
    </section>
  );
}

export default ProjectsPage;