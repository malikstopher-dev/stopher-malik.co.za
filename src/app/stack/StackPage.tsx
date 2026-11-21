import type { CSSProperties } from "react";
import { InnerFilm } from "@/components/sections/InnerFilm";
import styles from "./stack.module.css";

const tools = [
  { name: "Figma", category: "Design", logos: ["figma"], accent: "157 119 241" },
  { name: "React", category: "Frontend", logos: ["react"], accent: "75 204 241" },
  { name: "Next.js", category: "Framework", logos: ["nextjs"], accent: "158 183 220" },
  { name: "Cloudflare", category: "Infrastructure", logos: ["cloudflare"], accent: "244 147 64" },
  { name: "TypeScript", category: "Language", logos: ["typescript"], accent: "73 151 247" },
  { name: "Tailwind CSS", category: "Styling", logos: ["tailwindcss"], accent: "50 199 219" },
  { name: "HTML / CSS", category: "Core", logos: ["html5", "css3"], accent: "107 153 246" },
  { name: "JavaScript", category: "Language", logos: ["javascript"], accent: "226 200 79" },
  { name: "Git", category: "Version Control", logos: ["git"], accent: "244 119 99" },
  { name: "WordPress", category: "CMS", logos: ["wordpress"], accent: "99 163 229" },
  { name: "Vercel", category: "Hosting", logos: ["vercel"], accent: "168 194 221" },
  { name: "SEO", category: "Optimisation", logos: [], accent: "74 205 163" },
];

export function StackPage() {
  return (
    <main className="stack-page">
      <section className="editorial-intro" aria-labelledby="stack-title">
        <InnerFilm />
        <div className="container">
          <p className="section-kicker" data-reveal><span>Stack</span> Design &amp; development</p>
          <h1 id="stack-title" data-reveal>
            My web<br /><em>development stack.</em>
          </h1>
          <div className="editorial-intro__foot">
            <p data-reveal>
              The tools I use to design, build and host websites, from the first Figma layout to deployment.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.tools} aria-labelledby="stack-tools">
        <div className="container">
          <header className={styles.header}>
            <h2 id="stack-tools">Tools &amp; Platforms</h2>
            <p className="section-note">{tools.length} entries</p>
          </header>
          <ul className={styles.grid} role="list">
            {tools.map((item, index) => (
              <li key={item.name} className={`stack-card ${styles.board}`} style={{ "--tool-accent": item.accent } as CSSProperties}>
                <span className={styles.index} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.logos} aria-hidden="true">
                  {item.logos.length ? item.logos.map((logo) => (
                    <img key={logo} className={logo === "vercel" ? styles.inverse : undefined} src={`/assets/stack/${logo}.svg`} alt="" width="40" height="40" loading="lazy" decoding="async" />
                  )) : (
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="7" /><path d="m15 15 6 6M6 12l3-3 2 1 3-4" /></svg>
                  )}
                </div>
                <div className={styles.label}>
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
