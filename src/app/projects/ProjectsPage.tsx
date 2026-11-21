"use client";
import { InnerFilm } from "@/components/sections/InnerFilm";

import { ProjectCard } from "@/components/sections/ProjectCard";
import { PROJECTS } from "@/data/projects";

export function ProjectsPage() {
  return (
    <main className="work-index-page">
      <section className="editorial-intro" aria-labelledby="work-index-title">
        <InnerFilm />
        <div className="container">
          <p className="section-kicker" data-reveal>
            <span>Selected</span> 2021 to 2026
          </p>
          <h1 id="work-index-title" data-reveal>
            Work that earns
            <br />
            <em>attention.</em>
          </h1>
          <div className="editorial-intro__foot">
            <p data-reveal>
              {PROJECTS.length} projects shipped across South Africa, the DRC,
              Mozambique, and Canada. Every build pairs considered design with
              front-end craft and an eye on the result.
            </p>
            <dl className="editorial-intro__meta" data-reveal>
              <div>
                <dt>Projects</dt>
                <dd>{PROJECTS.length}+</dd>
              </div>
              <div>
                <dt>Markets</dt>
                <dd>4 countries</dd>
              </div>
              <div>
                <dt>Scope</dt>
                <dd>Design &amp; build</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="work-index__body" aria-label="All projects">
        <div className="container">
          <div className="work-index__bar">
            <p className="section-kicker">
              <span>Index</span> All work
            </p>
            <p className="section-note">{PROJECTS.length} entries</p>
          </div>
          <div className="work-grid work-index__grid">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.slug}
                title={project.name}
                description={project.description}
                tags={project.tags}
                image={project.image}
                href={project.url}
                external={Boolean(project.url)}
                index={index + 1}
                eager={index < 2}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
