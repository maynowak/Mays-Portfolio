import { profile } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

export default function About() {
  const revealRef = useReveal<HTMLElement>();
  const { degree, experience } = profile;

  return (
    <section id="ueber-mich" className="section" ref={revealRef} aria-labelledby="ueber-mich-title">
      <div className="section__inner">
        <header className="section-head">
          <p className="eyebrow">Über mich</p>
          <h2 id="ueber-mich-title">
            Erfahrung, die <em>nachvollziehbar</em> bleibt.
          </h2>
        </header>

        <div className="about__facts">
          <div className="fact">
            <strong>{degree}</strong>
            <span>Abschluss Informatik</span>
          </div>
          <div className="fact">
            <strong>{experience}</strong>
            <span>Enterprise-Software, Systemintegration, Cloud</span>
          </div>
        </div>

        <div className="about__text">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ul className="about__focus" aria-label="Schwerpunkte">
          {profile.focusAreas.map((area) => (
            <li key={area} className="chip">
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
