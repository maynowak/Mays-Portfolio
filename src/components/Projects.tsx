import { useState } from 'react';
import type { MaturityStatus, Project } from '../data/portfolio';
import { projects } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import { ArrowIcon, GithubIcon } from './icons';
import ProjectCard from './ProjectCard';
import RisSimulation from './RisSimulation';

const DETAIL_ID = 'projekt-architekturansicht';

const STATUS_LABELS: Record<MaturityStatus, string> = {
  IMPLEMENTED: 'Implemented',
  VERIFIED: 'Verified',
  PREPARED: 'Prepared',
  NOT_DEPLOYED: 'Not deployed',
  HISTORICAL: 'Historisch',
};

const STATUS_MODIFIERS: Record<MaturityStatus, string> = {
  IMPLEMENTED: 'implemented',
  VERIFIED: 'verified',
  PREPARED: 'prepared',
  NOT_DEPLOYED: 'not_deployed',
  HISTORICAL: 'historical',
};

function ProjectDetail({ project }: { project: Project }) {
  const { details } = project;
  return (
    <div className="project-detail__inner">
      <div className="project-detail__head">
        <h3>{project.name}</h3>
        <div className="project-detail__links">
          <a className="link-chip" href={project.links.github} target="_blank" rel="noreferrer">
            <GithubIcon />
            Repository
            <ArrowIcon />
          </a>
          {project.links.live && (
            <a className="link-chip" href={project.links.live} target="_blank" rel="noreferrer">
              Live-Demo
              <ArrowIcon />
            </a>
          )}
        </div>
      </div>

      <div className="detail-grid">
        <div>
          <div className="detail-block">
            <h4>Problem</h4>
            <p>{details.problem}</p>
          </div>
          <div className="detail-block">
            <h4>Architektur</h4>
            <p>{details.architecture}</p>
          </div>
          <div className="detail-block">
            <h4>Beitrag</h4>
            <p>{details.contribution}</p>
          </div>
        </div>

        <div>
          <div className="detail-block">
            <h4>Reifegrad</h4>
            <ul className="maturity-list">
              {details.maturity.map((entry) => (
                <li
                  key={entry.status + entry.label}
                  className={`maturity-item maturity-item--${STATUS_MODIFIERS[entry.status]}`}
                >
                  <div className="maturity-item__top">
                    <span className={`badge badge--${STATUS_MODIFIERS[entry.status]}`}>
                      {STATUS_LABELS[entry.status]}
                    </span>
                    <strong>{entry.label}</strong>
                  </div>
                  <p>{entry.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="detail-block">
            <h4>Stack</h4>
            <ul className="stack-list">
              {details.stack.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="detail-block">
            <h4>Nachweise</h4>
            <ul className="evidence-list">
              {details.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {project.hasSimulation && <RisSimulation />}

      <p className="source-note">
        Reifegrad-Quelle: {details.source} Historische Tests werden nicht als aktueller Betrieb
        dargestellt.
      </p>
    </div>
  );
}

export default function Projects() {
  const revealRef = useReveal<HTMLElement>();
  const [openId, setOpenId] = useState<Project['id'] | null>(null);
  const openProject = projects.find((project) => project.id === openId) ?? null;

  return (
    <section id="projekte" className="section" ref={revealRef} aria-labelledby="projekte-title">
      <div className="section__inner">
        <header className="section-head">
          <p className="eyebrow">Aus meiner Arbeit</p>
          <h2 id="projekte-title">
            Aus Ideen werden <em>Systeme</em>.
          </h2>
        </header>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              expanded={openId === project.id}
              detailId={DETAIL_ID}
              onToggle={() => setOpenId((current) => (current === project.id ? null : project.id))}
            />
          ))}
        </div>

        {openProject && (
          <div
            id={DETAIL_ID}
            className="project-detail"
            key={openProject.id}
            role="region"
            aria-label={`Architekturansicht: ${openProject.name}`}
          >
            <ProjectDetail project={openProject} />
          </div>
        )}
      </div>
    </section>
  );
}
