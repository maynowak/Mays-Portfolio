import { profile } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

export default function About() {
  const revealRef = useReveal<HTMLElement>();
  const { pendingConfirmation } = profile;

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
            <strong>{pendingConfirmation.experience}*</strong>
            <span>Enterprise-Software, Systemintegration, Cloud</span>
          </div>
          <div className="fact">
            <strong>{pendingConfirmation.degree}*</strong>
            <span>Informatik als Fundament</span>
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

        <p className="footnote">* {pendingConfirmation.note}</p>
      </div>
    </section>
  );
}
