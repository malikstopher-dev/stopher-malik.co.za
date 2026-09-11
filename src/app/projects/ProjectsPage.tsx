"use client";

import { ProjectCard } from "@/components/sections/ProjectCard";
import { PROJECTS } from "@/data/projects";

export function ProjectsPage() {
  return (
    <main className="main-content">
      <section className="internal-page projects-page">
        <div className="container">
          <div className="internal-page__hero hero__card card" data-tilt data-magnetic data-holo>
            <h1 className="hero__title">My Projects</h1>
          </div>

          <div className="internal-panel section-card card" data-tilt data-morph data-holo>
            <div className="internal-panel__header">
              <h2 className="section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18" aria-hidden="true"><polygon points="12,3 21,12 12,21 3,12"/></svg>
                Selected Work
              </h2>
            </div>
            <p className="internal-panel__intro">
              23+ projects shipped across South Africa, the DRC, Mozambique, and Canada. Each build blends responsive design with intuitive UI.
            </p>
            <div className="projects__grid internal-project-grid" data-book>
              {PROJECTS.map((project) => (
                <ProjectCard
                  key={project.slug}
                  title={project.name}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                  href={project.url}
                  external={Boolean(project.url)}
                  className="card"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
