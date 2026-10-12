import { profile } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import { ArrowIcon, GithubIcon } from './icons';

export default function Contact() {
  const revealRef = useReveal<HTMLElement>();

  return (
    <section id="kontakt" className="section" ref={revealRef} aria-labelledby="kontakt-title">
      <div className="section__inner">
        <div className="contact__panel">
          <div className="contact__text">
            <p className="eyebrow">Kontakt</p>
            <h2 id="kontakt-title">
              Lass uns über <em>Systeme</em> sprechen.
            </h2>
            <p>
              Der direkte Weg führt über meine Repositories: Code, Architektur-Dokumente,
              Roadmaps und Testnachweise liegen dort offen — inklusive ehrlicher Reifegrade.
            </p>
          </div>
          <a className="btn btn--primary" href={profile.github} target="_blank" rel="noreferrer">
            <GithubIcon />
            github.com/maynowak
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
