import Link from "next/link";

export function CTASection() {
  return (
    <section className="cta-section" id="contact" aria-labelledby="cta-heading">
      <div className="cta-section__glow" aria-hidden="true" />
      <div className="container cta-section__inner">
        <p className="section-kicker" data-reveal><span>05</span> Next</p>
        <h2 id="cta-heading" data-reveal>
          Have something<br /><em>in mind?</em>
        </h2>
        <div className="cta-section__actions" data-reveal>
          <Link href="/contact/" className="btn btn--accent btn--lg">
            Start a project <span aria-hidden="true">↗</span>
          </Link>
          <a href="mailto:info@stopher-malik.co.za" className="cta-section__email">
            info@stopher-malik.co.za
          </a>
        </div>
        <p className="cta-section__note" data-reveal>
          Johannesburg · Working worldwide · Usually replies within one working day
        </p>
      </div>
      <span className="cta-section__watermark" aria-hidden="true">SMK</span>
    </section>
  );
}
