import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

type ProjectGridProps = {
  onNavigate: (href: string) => void;
};

export function ProjectGrid({ onNavigate }: ProjectGridProps) {
  return (
    <section id="projects" className="projects section-anchor">
      <div className="page-width">
        <div className="section-heading split-heading reveal-section">
          <div>
            <p>SELECTED WORK</p>
            <h2>Systems built to last.</h2>
          </div>
          <p className="section-copy">
            Ambitious technical work spanning personal AI, distributed memory, Swift frameworks,
            and real-time creative experiences.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </section>
  );
}
