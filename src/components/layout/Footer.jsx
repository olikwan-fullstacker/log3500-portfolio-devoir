function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>
        © {currentYear} Équipe LOG3500 — Portfolio professionnel collectif
      </p>
    </footer>
  );
}

export default Footer;