import Link from "next/link";
import { InnerFilm } from "@/components/sections/InnerFilm";
import { formatJournalCopy } from "@/lib/journal-copy";
import fs from "fs";
import path from "path";

interface JournalPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getPosts(): JournalPost[] {
  const blogDir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(blogDir)) return [];

  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const source = formatJournalCopy(fs.readFileSync(path.join(blogDir, file), "utf-8"));
      const match = source.match(/^---\n([\s\S]*?)\n---/);
      const frontmatter = match ? match[1] : "";
      const read = (key: string) => {
        const value = frontmatter.match(new RegExp(`${key}:\\s*"([^"]*)"`));
        return value ? value[1] : "";
      };

      return {
        slug,
        title: read("title") || slug,
        description: read("description"),
        date: read("date"),
        category: read("category") || "Journal",
        readTime: read("readTime") || "5 min read",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function BlogIndex() {
  const posts = getPosts();

  return (
    <main className="journal-page">
      <section className="journal-hero" aria-labelledby="journal-title">
        <InnerFilm />
        <div className="container">
          <p className="section-kicker" data-reveal>
            <span>Journal</span> Notes on design &amp; build
          </p>
          <h1 id="journal-title" data-reveal>
            Ideas for better
            <br />
            <em>websites.</em>
          </h1>
          <div className="journal-hero__foot">
            <p data-reveal>
              Guides on web design, SEO and what to consider before building or updating a site.
            </p>
            <dl className="journal-hero__meta" data-reveal>
              <div>
                <dt>Articles</dt>
                <dd>{posts.length}</dd>
              </div>
              <div>
                <dt>Topics</dt>
                <dd>Design, SEO, growth</dd>
              </div>
              <div>
                <dt>Words by</dt>
                <dd>Stopher Malik</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="journal-index" aria-label="All articles">
        <div className="container">
          <div className="journal-bar">
            <p className="section-kicker">
              <span>Index</span> All writing
            </p>
            <p className="section-note">{posts.length} articles</p>
          </div>
          <ol className="journal-list">
            {posts.map((post, index) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}/`} className="journal-row">
                  <span className="journal-row__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="journal-row__title">
                    <h2>{post.title}</h2>
                    {post.description ? <p>{post.description}</p> : null}
                  </div>
                  <div className="journal-row__meta">
                    <span>{post.category}</span>
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <span className="journal-row__arrow" aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="journal-foot">
            <p>Prefer the long-form archive?</p>
            <a href="https://smk.stopher-malik.co.za/en/blog/" className="text-link">
              Visit the SMK journal <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
