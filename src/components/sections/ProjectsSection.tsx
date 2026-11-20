import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import { FEATURED_PROJECTS, PROJECTS } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section className="work-section" id="work" aria-labelledby="work-heading">
      <div className="container">
        <header className="section-head" data-reveal>
          <div className="section-head__meta">
            <p className="section-kicker"><span>01</span> Selected work</p>
            <p className="section-note">2021 — 2026 · South Africa, DRC, Mozambique, Canada</p>
          </div>
          <div className="section-head__body">
            <h2 id="work-heading">
              Built to be<br /><em>remembered.</em>
            </h2>
            <div className="section-head__aside">
              <p>
                Websites for restaurants, builders and businesses that needed to look
                as serious as the work they do.
              </p>
              <Link href="/projects/" className="text-link">
                All {PROJECTS.length} projects <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="work-grid">
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.slug}
              title={project.name}
              description={project.description}
              tags={project.tags}
              image={project.image}
              href={project.url}
              external={Boolean(project.url)}
              index={index + 1}
              eager={index === 0}
            />
          ))}
        </div>

        <footer className="work-footer" data-reveal>
          <p>Available for a limited number of projects each quarter.</p>
          <Link href="/contact/" className="btn btn--accent">
            Start a project <span aria-hidden="true">↗</span>
          </Link>
        </footer>
      </div>
    </section>
  );
}
