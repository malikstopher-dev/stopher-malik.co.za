export function BlogIndex() {
  return (
    <main className="main-content">
      <section className="internal-page about-hero">
        <div className="container">
          <div className="internal-page__hero hero__card card" data-tilt data-magnetic data-holo>
            <h1 className="hero__title" data-reveal>Insights &amp; Guides</h1>
          </div>

          <div className="internal-panel section-card card" data-tilt data-morph data-holo>
            <div className="internal-panel__header">
              <h2 className="section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18" aria-hidden="true"><polygon points="12,3 21,12 12,21 3,12"/></svg>
                All Articles
              </h2>
            </div>
            <p className="internal-panel__intro">
              Our guides are published on the SMK Web Design blog and kept up to date there.
            </p>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "var(--space-md)" }}>
              <a href="https://smk.stopher-malik.co.za/en/blog/" className="btn btn--accent btn--lg">
                Read the blog <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
