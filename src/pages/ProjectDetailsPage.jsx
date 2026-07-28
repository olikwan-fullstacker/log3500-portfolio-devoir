import { useParams } from 'react-router-dom';

function ProjectDetailsPage() {
  const { projectId } = useParams();

  return (
    <section className="page-section">
      <h1>Détail du projet</h1>
      <p>Identifiant provisoire du projet : {projectId}</p>
    </section>
  );
}

export default ProjectDetailsPage;