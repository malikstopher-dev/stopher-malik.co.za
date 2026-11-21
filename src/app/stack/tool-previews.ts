export const toolPreviews = [
  {
    name: "Figma", category: "Design", logos: ["figma"], accent: "157 119 241", prompt: "figma.createFrame()",
    code: ["const frame = figma.createFrame();", 'frame.name = "Landing page";', 'frame.layoutMode = "VERTICAL";', "frame.itemSpacing = 24;", "frame.paddingLeft = 32;", "figma.currentPage.appendChild(frame);"],
  },
  {
    name: "React", category: "Frontend", logos: ["react"], accent: "75 204 241", prompt: "render(<App />)",
    code: ["function ProjectList({ projects }) {", "  return <ul>", "    {projects.map(project => (", "      <Card key={project.id} {...project} />", "    ))}", "  </ul>;", "}"],
  },
  {
    name: "Next.js", category: "Framework", logos: ["nextjs"], accent: "158 183 220", prompt: "next build",
    code: ['export const dynamic = "force-static";', "export function generateStaticParams() {", "  return projects.map(({ slug }) =>", "    ({ slug })", "  );", "}", "// Static routes ready"],
  },
  {
    name: "Cloudflare", category: "Infrastructure", logos: ["cloudflare"], accent: "244 147 64", prompt: "wrangler dev",
    code: ["export default {", "  async fetch(request, env) {", "    const url = new URL(request.url);", '    if (url.pathname === "/health")', '      return new Response("OK");', "    return env.ASSETS.fetch(request);", "  }", "};"],
  },
  {
    name: "TypeScript", category: "Language", logos: ["typescript"], accent: "73 151 247", prompt: "tsc --noEmit",
    code: ["type Project = {", "  title: string;", "  slug: string;", "  featured?: boolean;", "};", "const featured = (p: Project) =>", "  p.featured === true;"],
  },
  {
    name: "Tailwind CSS", category: "Styling", logos: ["tailwindcss"], accent: "50 199 219", prompt: "@theme {",
    code: ['@import "tailwindcss";', "@theme {", "  --color-studio: #12355a;", "}", ".panel {", "  @apply rounded-lg p-6;", "}"],
  },
  {
    name: "HTML / CSS", category: "Core", logos: ["html5", "css3"], accent: "107 153 246", prompt: '<main class="app">',
    code: ['<main class="app">', "  <h1>Selected work</h1>", "</main>", ".app {", "  display: grid;", "  gap: 1.5rem;", "}"],
  },
  {
    name: "JavaScript", category: "Language", logos: ["javascript"], accent: "226 200 79", prompt: "loadProjects()",
    code: ["async function loadProjects() {", '  const res = await fetch("/projects.json");', "  if (!res.ok) return [];", "  return res.json();", "}", "const projects = await loadProjects();"],
  },
  {
    name: "Git", category: "Version Control", logos: ["git"], accent: "244 119 99", prompt: "git status -sb",
    code: ["$ git switch -c refine-layout", "$ git diff --check", "$ git add src/", '$ git commit -m "Refine layout"', "$ git log --oneline -3", "# Changes recorded"],
  },
  {
    name: "WordPress", category: "CMS", logos: ["wordpress"], accent: "99 163 229", prompt: "the_title();",
    code: ["<?php if ( have_posts() ) : ?>", "  <?php while ( have_posts() ) : the_post(); ?>", "    <h2><?php the_title(); ?></h2>", "    <?php the_excerpt(); ?>", "  <?php endwhile; ?>", "<?php endif; ?>"],
  },
  {
    name: "Vercel", category: "Hosting", logos: ["vercel"], accent: "168 194 221", prompt: "vercel deploy",
    code: ["$ vercel deploy", "Building / preview", "Compiling routes", "Uploading static assets", "Status: READY", "$ vercel inspect"],
  },
  {
    name: "SEO", category: "Optimisation", logos: [], accent: "74 205 163", prompt: "checkMetadata()",
    code: ["{", '  "@context": "https://schema.org",', '  "@type": "WebSite",', '  "name": "SMK Web Design",', '  "inLanguage": "en-ZA"', "}"],
  },
];
