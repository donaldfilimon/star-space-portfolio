import { ArrowUpRight, AsteriskMark } from "./Icons";
import type { Project } from "../data/projects";
import { formatOrdinal } from "../lib/format";

type ProjectCardProps = {
  project: Project;
  index: number;
  onNavigate: (href: string) => void;
};

export function ProjectCard({ project, index, onNavigate }: ProjectCardProps) {
  const destination = project.href ?? project.repoUrl;

  return (
    <article className={`project-card accent-${project.accent}`}>
      <div className="project-number">{formatOrdinal(index)}</div>
      <div className="project-orbit" aria-hidden="true">
        <AsteriskMark />
      </div>
      <div className="project-content">
        <p>
          {project.eyebrow}
          <span className="project-year"> · {project.year}</span>
        </p>
        <h3>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <p className="project-outcome">{project.outcome}</p>
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      {destination ? (
        <a
          className="project-card-link"
          href={destination}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.name}`}
        >
          <span className="project-link-icon" aria-hidden="true">
            <ArrowUpRight />
          </span>
        </a>
      ) : (
        <a
          className="project-card-link"
          href="#contact"
          aria-label={`Ask about ${project.name}`}
          onClick={(event) => {
            event.preventDefault();
            onNavigate("#contact");
          }}
        >
          <span className="project-link-icon" aria-hidden="true">
            <ArrowUpRight />
          </span>
        </a>
      )}
    </article>
  );
}
