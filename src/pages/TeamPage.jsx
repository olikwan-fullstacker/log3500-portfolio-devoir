import MemberCard from '../components/team/MemberCard.jsx';
import teamMembers from '../data/team.js';

function TeamPage() {
  return (
    <section className="team-page" aria-labelledby="team-page-title">
      <header className="page-heading">
        <p className="page-eyebrow">Collaboration</p>

        <h1 id="team-page-title">Notre équipe</h1>

        <p className="page-introduction">
          Quatre étudiants réunis autour de la conception d’un portfolio
          professionnel collectif Full-Stack.
        </p>
      </header>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}

export default TeamPage;