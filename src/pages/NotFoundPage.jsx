import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="page-section">
      <h1>Page introuvable</h1>
      <p>L’adresse demandée ne correspond à aucune page.</p>
      <Link to="/">Retourner à l’accueil</Link>
    </section>
  );
}

export default NotFoundPage;