import { profile } from '../data/portfolio';
import { ArrowIcon, GithubIcon } from './icons';
import SystemNetwork from './SystemNetwork';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__content">
          <p className="eyebrow">{profile.eyebrow}</p>
          <h1 className="hero__title" id="hero-title">
            {profile.heroLines[0]}
            <br />
            <em>{profile.heroLines[1]}</em>
          </h1>
          <p className="hero__name">{profile.name}</p>
          <p className="hero__role">
            <strong>{profile.role}</strong> | {profile.field}
          </p>
          <p className="hero__intro">{profile.intro}</p>
          <ul className="hero__competences">
            {profile.competence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#projekte">
              Projekte entdecken
              <ArrowIcon />
            </a>
            <a className="btn btn--ghost" href={profile.github} target="_blank" rel="noreferrer">
              <GithubIcon />
              GitHub
              <ArrowIcon />
            </a>
          </div>
        </div>
        <div className="hero__visual">
          <SystemNetwork />
        </div>
      </div>
    </section>
  );
}
