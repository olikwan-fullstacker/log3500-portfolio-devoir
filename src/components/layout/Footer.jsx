function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>
        © {currentYear} Équipe LOG3500 — Portfolio des Pros      </p>
    </footer>
  );
}

export default Footer;