import { ProjectCard } from "./ProjectCard";
import { FEATURED_PROJECTS } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section className="projects py-5xl" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <div className="section-card">
        <div className="cin-section-head mb-12">
          <div>
            <span className="cin-kicker">Selected Work</span>
            <h2 id="projects-heading">Projects</h2>
          </div>
          <a href="/projects/" className="btn btn--ghost btn--sm">All Projects <span aria-hidden="true">&rarr;</span></a>
        </div>

        <div className="projects__grid grid grid-cols-1 md:grid-cols-2 gap-6" data-book>
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.name}
              description={project.description}
              tags={project.tags}
              image={project.image}
              href={project.url}
              external={Boolean(project.url)}
            />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
