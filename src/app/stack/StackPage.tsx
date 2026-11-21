"use client";
import { InnerFilm } from "@/components/sections/InnerFilm";

const tools = [
  { name: "Figma", category: "Design", logos: ["figma"] },
  { name: "React", category: "Frontend", logos: ["react"] },
  { name: "Next.js", category: "Framework", logos: ["nextjs"] },
  { name: "Cloudflare", category: "Infrastructure", logos: ["cloudflare"] },
  { name: "TypeScript", category: "Language", logos: ["typescript"] },
  { name: "Tailwind CSS", category: "Styling", logos: ["tailwindcss"] },
  { name: "HTML / CSS", category: "Core", logos: ["html5", "css3"] },
  { name: "JavaScript", category: "Language", logos: ["javascript"] },
  { name: "Git", category: "Version Control", logos: ["git"] },
  { name: "WordPress", category: "CMS", logos: ["wordpress"] },
  { name: "Vercel", category: "Hosting", logos: ["vercel"] },
  { name: "SEO", category: "Optimisation", logos: [] },
];

export function StackPage() {
  return (
    <main className="main-content">
      <section className="internal-page stack-page">
        <div className="container">
          <div className="internal-page__hero hero__card card" data-tilt data-magnetic data-holo>
            <InnerFilm />
            <h1 className="hero__title">Full Stack</h1>
          </div>

          <div className="internal-panel section-card card" data-tilt data-morph data-holo>
            <div className="internal-panel__header">
              <h2 className="section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18" aria-hidden="true"><polygon points="12,3 21,12 12,21 3,12"/></svg>
                Tools &amp; Platforms
              </h2>
            </div>
            <p className="internal-panel__intro">
              Design tools, frontend frameworks, infrastructure, and everything in between. I pick the right tool for each job and keep the stack lean.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "var(--space-lg)" }}>
              {tools.map((item) => (
                <div
                  key={item.name}
                  className="stack-card card"
                  data-tilt
                  data-flip
                  data-magnetic
                  data-holo
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "var(--space-xl)", gap: "var(--space-md)" }}
                >
                  <div className="stack-card__icon-wrap" style={{ display: "flex", gap: 4, alignItems: "center" }} aria-hidden="true">
                    {item.logos.length ? item.logos.map((logo) => (
                      <img key={logo} src={`/assets/stack/${logo}.svg`} alt="" width="40" height="40" style={{ objectFit: "contain", filter: ["vercel", "wordpress", "nextjs"].includes(logo) ? "drop-shadow(0 0 2px white)" : undefined }} />
                    )) : (
                      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="7" /><path d="m15 15 6 6M6 12l3-3 2 1 3-4" /></svg>
                    )}
                  </div>
                  <div>
                    <h3 className="stack-card__name">{item.name}</h3>
                    <p className="stack-card__category" style={{ marginBottom: 0 }}>{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
