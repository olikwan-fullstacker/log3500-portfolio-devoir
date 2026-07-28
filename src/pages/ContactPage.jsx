import ContactForm from '../components/contact/ContactForm.jsx';

function ContactPage() {
  return (
    <section
      className="contact-page"
      aria-labelledby="contact-page-title"
    >
      <header className="page-heading">
        <p className="page-eyebrow">
          Communication
        </p>

        <h1 id="contact-page-title">
          Nous contacter
        </h1>

        <p className="page-introduction">
          Utilisez ce formulaire pour communiquer avec
          l’équipe responsable du portfolio LOG3500.
        </p>
      </header>

      <div className="contact-layout">
        <div className="contact-information">
          <h2>Avant d’envoyer votre message</h2>

          <p>
            Indiquez clairement le sujet de votre demande et
            fournissez les informations nécessaires pour
            comprendre votre message.
          </p>

          <ul>
            <li>Utilisez une adresse électronique valide.</li>
            <li>Évitez d’envoyer des données confidentielles.</li>
            <li>Décrivez précisément votre demande.</li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

export default ContactPage;