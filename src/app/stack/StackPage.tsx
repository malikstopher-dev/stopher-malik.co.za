import type { CSSProperties } from "react";
import { InnerFilm } from "@/components/sections/InnerFilm";
import styles from "./stack.module.css";
import { toolPreviews } from "./tool-previews";

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
            <p className="section-note">{toolPreviews.length} entries</p>
          </header>
          <ul className={styles.grid} role="list">
            {toolPreviews.map((item, index) => (
              <li key={item.name} className={`stack-card ${styles.board}`} style={{
                "--tool-accent": item.accent,
                "--command-length": item.prompt.length,
                "--terminal-offset": `${(index % 5) * -1.35}s`,
              } as CSSProperties}>
                <div className={styles.terminal} aria-hidden="true">
                  <div className={styles.prompt}><code className={styles.command}>{item.prompt}</code></div>
                  <div className={styles.feed}>
                    <div className={styles.stream}>
                      {[0, 1, 2].map(copy => <pre key={copy}>{item.code.join("\n")}</pre>)}
                    </div>
                  </div>
                </div>
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
