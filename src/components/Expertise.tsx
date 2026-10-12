import { expertise, projects } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

function shortName(projectId: string): string {
  const project = projects.find((p) => p.id === projectId);
  return project ? project.name : projectId;
}

export default function Expertise() {
  const revealRef = useReveal<HTMLElement>();

  return (
    <section id="expertise" className="section" ref={revealRef} aria-labelledby="expertise-title">
      <div className="section__inner">
        <header className="section-head">
          <p className="eyebrow">Expertise</p>
          <h2 id="expertise-title">
            Drei Säulen, <em>ein Anspruch</em>.
          </h2>
        </header>

        <div className="expertise-grid">
          {expertise.map((pillar) => (
            <article key={pillar.title} className="expertise-card">
              <h3>{pillar.title}</h3>
              <p>{pillar.summary}</p>
              <ul className="expertise-refs">
                {pillar.projectRefs.map((ref) => (
                  <li key={`${pillar.title}-${ref.projectId}`}>
                    <a href={`#projekt-${ref.projectId}`}>{shortName(ref.projectId)}</a>
                    {' — '}
                    {ref.text}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
