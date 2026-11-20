"use client";

import Link from "next/link";
import { InnerFilm } from "@/components/sections/InnerFilm";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(value: string) {
  const parts = value.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return value;
  const [year, month, day] = parts;
  return `${day} ${months[month - 1] ?? ""} ${year}`.trim();
}

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
    <main className="article-page">
      <article>
        <header className="article-hero">
          <InnerFilm />
          <div className="container">
            <Link href="/blog/" className="article-back">
              <span aria-hidden="true">←</span> Journal
            </Link>
            <div className="article-hero__meta">
              <span className="article-hero__category">{frontmatter.category}</span>
              {frontmatter.date ? <span>{formatDate(frontmatter.date)}</span> : null}
              <span>{frontmatter.readTime}</span>
            </div>
            <h1>{frontmatter.title}</h1>
          </div>
        </header>

        <div className="container article-layout">
          <div className="article-body">{mdxContent}</div>

          <aside className="article-aside" aria-label="About the author">
            <p className="article-aside__label">Written by</p>
            <p className="article-aside__name">Stopher Malik</p>
            <p className="article-aside__copy">
              Web designer and developer in Johannesburg, building distinctive
              websites for businesses in South Africa and abroad.
            </p>
            <Link href="/contact/" className="article-aside__cta">
              Start a project <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/blog/" className="article-aside__back">
              ← All articles
            </Link>
          </aside>
        </div>
      </article>
    </main>
  );
}
