function ProjectFilter({
  categories,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div
      className="project-filter"
      aria-label="Filtrer les projets par catégorie"
    >
      {categories.map((category) => {
        const isActive = category === activeCategory;

        return (
          <button
            className={
              isActive
                ? 'filter-button filter-button-active'
                : 'filter-button'
            }
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default ProjectFilter;