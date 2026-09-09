const stack = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
    name: "Figma",
    category: "Design Tool",
    description: "My go-to for UI/UX design. I create wireframes, prototypes, and high-fidelity designs that translate seamlessly into code.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    name: "React & Next.js",
    category: "Frontend",
    description: "I build fast, interactive user interfaces with React and server-rendered applications with Next.js for optimal performance.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" aria-hidden="true">
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
      </svg>
    ),
    name: "Cloudflare",
    category: "Infrastructure",
    description: "For hosting, CDN, and edge computing. I deploy applications globally with Cloudflare Workers, Pages, and R2 storage.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    name: "SEO & TypeScript",
    category: "Growth",
    description: "Technical SEO, structured data, and TypeScript for resilient, scalable codebases that rank well on Google.",
  },
];

export function StackSection() {
  return (
    <section className="stack py-5xl" id="stack" aria-labelledby="stack-heading">
      <div className="container">
        <div className="cin-section-head mb-12">
          <div>
            <span className="cin-kicker">Tools & Technologies</span>
            <h2 id="stack-heading">Stack</h2>
          </div>
          <a href="/stack/" className="btn btn--ghost btn--sm">Full Stack <span aria-hidden="true">&rarr;</span></a>
        </div>

        <div className="stack__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stack.map((item, index) => (
            <article 
              key={item.name} 
              className="stack-card group relative p-6 bg-black-soft border border-white/5 rounded-2xl transition-all duration-500 ease-out hover:border-accent/30 hover:shadow-premium animate-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stack-card__icon-wrap mb-4 p-3 bg-white/5 rounded-xl inline-block group-hover:bg-accent/10 transition-colors">
                {item.icon}
              </div>
              <h3 className="stack-card__name text-white font-display font-semibold text-xl mb-1">{item.name}</h3>
              <p className="stack-card__category text-accent text-label-sm font-medium mb-2">{item.category}</p>
              <p className="stack-card__desc text-white-muted text-body-md leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
