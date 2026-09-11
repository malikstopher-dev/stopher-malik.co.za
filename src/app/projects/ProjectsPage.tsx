"use client";

import Link from "next/link";
import { projects } from "@/data/projects";

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
              {projects.map((project) => (
                <Link
                  key={project.title}
                  href={project.href}
                  target={project.external ? "_blank" : undefined}
                  rel={project.external ? "noopener noreferrer" : undefined}
                  className="project-card card"
                  data-tilt
                  data-flip
                  data-magnetic
                  data-holo
                >
                  <div className="project-card__img-wrap">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-card__img block h-full w-full object-cover"
                      loading="lazy"
                    />
                    <span className="project-card__hover-cta">View Site &rarr;</span>
                  </div>
                  <div className="project-card__body">
                    <div className="project-card__tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-card__tag tech-pill">{tag}</span>
                      ))}
                    </div>
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__desc">{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
