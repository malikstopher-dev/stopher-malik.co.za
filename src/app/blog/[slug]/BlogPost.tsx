"use client";

import Link from "next/link";

interface BlogPostProps {
  frontmatter: {
    title: string;
    date: string;
    category: string;
    readTime: string;
  };
  mdxContent: React.ReactElement;
}

export function BlogPost({ frontmatter, mdxContent }: BlogPostProps) {
  return (
    <main className="main-content">
      <section className="internal-page about-hero">
        <div className="container">
          <div className="internal-page__hero hero__card card" data-tilt data-magnetic data-holo>
            <h1 className="hero__title" data-reveal>{frontmatter.title}</h1>
          </div>

          <div className="internal-panel section-card card" data-tilt data-morph data-holo>
            <div className="article-meta">
              <span className="badge">{frontmatter.category}</span>
              <span>{frontmatter.date}</span>
              <span>{frontmatter.readTime}</span>
            </div>
            {mdxContent}
          </div>

          <div className="internal-panel section-card card" data-tilt data-morph data-holo>
            <h2 className="section-title" style={{ marginBottom: "var(--space-xl)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
              Related Articles
            </h2>
            <div className="blog-related-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-lg)" }}>
              <Link href="/blog/" className="btn btn--ghost btn--lg w-full" style={{ marginTop: "var(--space-xl)" }}>&larr; Back to Blog</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
