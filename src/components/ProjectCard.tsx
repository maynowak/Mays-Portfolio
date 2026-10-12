import type { Project } from '../data/portfolio';
import { ArrowIcon } from './icons';
import { ProjectDiagram } from './ProjectDiagram';

interface ProjectCardProps {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
  detailId: string;
}

export default function ProjectCard({ project, expanded, onToggle, detailId }: ProjectCardProps) {
  return (
    <article
      id={`projekt-${project.id}`}
      className={`project-card${expanded ? ' project-card--open' : ''}`}
    >
      <div className="project-card__media">
        <ProjectDiagram kind={project.diagram} />
      </div>
      <div className="project-card__body">
        <p className="project-card__category">{project.category}</p>
        <h3 className="project-card__title">{project.name}</h3>
        <p className="project-card__tagline">{project.tagline}</p>
        <button
          type="button"
          className="project-card__toggle"
          aria-expanded={expanded}
          aria-controls={detailId}
          onClick={onToggle}
        >
          {expanded ? 'Ansicht schließen' : 'Projekt erkunden'}
          <ArrowIcon />
        </button>
      </div>
    </article>
  );
}
