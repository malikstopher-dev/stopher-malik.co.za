import Link from "next/link";

const services = [
  {
    index: "01",
    name: "Web design",
    copy: "Bespoke sites built around your business, not a template. Strategy, art direction and interface design in one.",
    href: "/web-design/",
    tags: "Design · Build · Launch",
  },
  {
    index: "02",
    name: "E-commerce",
    copy: "Stores that make buying feel effortless — catalogue, checkout and the operational details behind them.",
    href: "/ecommerce/",
    tags: "Shopify · Headless · Payments",
  },
  {
    index: "03",
    name: "SEO & performance",
    copy: "Technical foundations, local search and speed work that help the right people find you first.",
    href: "/seo-performance/",
    tags: "Technical SEO · CWV · Local",
  },
  {
    index: "04",
    name: "Brand identity",
    copy: "Wordmarks, type and visual systems that keep every touchpoint recognisably yours.",
    href: "/branding/",
    tags: "Identity · Guidelines · Assets",
  },
];

export function ServicesSection() {
  return (
    <section className="services-section" id="services" aria-labelledby="services-heading">
      <div className="container">
        <header className="section-head section-head--compact" data-reveal>
          <div className="section-head__meta">
            <p className="section-kicker"><span>03</span> Services</p>
            <p className="section-note">One partner, from first sketch to launch</p>
          </div>
          <div className="section-head__body">
            <h2 id="services-heading">What I <em>build.</em></h2>
            <div className="section-head__aside">
              <p>
                Most projects combine all four. Start where it hurts most — the rest
                can follow.
              </p>
              <Link href="/contact/" className="text-link">
                Discuss your project <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </header>

        <ul className="service-list">
          {services.map((service) => (
            <li key={service.name} data-reveal>
              <Link href={service.href} className="service-row">
                <span className="service-row__index">{service.index}</span>
                <span className="service-row__main">
                  <span className="service-row__title">{service.name}</span>
                  <span className="service-row__tags">{service.tags}</span>
                </span>
                <span className="service-row__copy">{service.copy}</span>
                <span className="service-row__arrow" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
