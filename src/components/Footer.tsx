import { profile } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="brand-mark" aria-hidden="true">
          MN
        </span>
        <p>Architektur. Cloud. Künstliche Intelligenz.</p>
        <nav className="footer__nav" aria-label="Fußbereich">
          <a href="#projekte">Projekte</a>
          <a href="#expertise">Expertise</a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
        <p>© 2026 {profile.name}</p>
      </div>
    </footer>
  );
}
