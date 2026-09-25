import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";

const SITE = "https://stopher-malik.co.za";

const ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects/", changeFrequency: "weekly", priority: 0.9 },
  { path: "/stack/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/web-design/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ecommerce/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/seo-performance/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/branding/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/terms/", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy/", changeFrequency: "yearly", priority: 0.4 },
  { path: "/refund-policy/", changeFrequency: "yearly", priority: 0.4 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  const routes: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: `${SITE}${route.path}`,
    lastModified: today,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogDir = path.join(process.cwd(), "content", "blog");
  const posts: MetadataRoute.Sitemap = fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
      const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const dateMatch = frontmatter && frontmatter[1].match(/date:\s*"([^"]+)"/);
      return {
        url: `${SITE}/blog/${slug}/`,
        lastModified: dateMatch ? new Date(dateMatch[1]) : today,
        changeFrequency: "monthly",
        priority: 0.7,
      };
    });

  return [...routes, ...posts];
}
