import Link from "next/link";

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" aria-hidden="true">
        <path d="M3 3h18v18H3z" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    name: "Website Design",
    category: "Build",
    description: "Custom, high-performance websites designed to convert visitors into paying customers — live in 7 days.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" aria-hidden="true">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    name: "E-Commerce",
    category: "Sell",
    description: "Secure, conversion-optimised online stores with seamless checkout that drive sales from day one.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    name: "SEO & Growth",
    category: "Rank",
    description: "Rank on Google with technical SEO, local search optimisation, and content strategy that works.",
  },
];

export function ServicesSection() {
  return (
    <section className="services py-5xl" id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="cin-section-head mb-12">
          <div>
            <span className="cin-kicker">What I Do</span>
            <h2 id="services-heading">Services</h2>
          </div>
          <Link href="/contact/" className="btn btn--ghost btn--sm">Start Project <span aria-hidden="true">&rarr;</span></Link>
        </div>

        <div className="stack__grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.name}
              href="/contact/"
              className="service-card group block p-6 bg-black-soft border border-white/5 rounded-2xl transition-all duration-500 ease-out hover:border-accent/30 hover:shadow-premium animate-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="service-card__icon-wrap mb-4 p-3 bg-white/5 rounded-xl inline-block group-hover:bg-accent/10 transition-colors">
                {service.icon}
              </div>
              <h3 className="service-card__name text-white font-display font-semibold text-xl mb-1">{service.name}</h3>
              <p className="service-card__category text-accent text-label-sm font-medium mb-3">{service.category}</p>
              <p className="service-card__desc text-white-muted text-body-md leading-relaxed">{service.description}</p>
              <span className="inline-flex items-center gap-1 mt-4 text-accent font-medium text-sm group-hover:gap-2 transition-all">
                Learn more
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
