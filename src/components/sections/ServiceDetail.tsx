import type { ReactNode } from "react";
import Link from "next/link";
import { InnerFilm } from "./InnerFilm";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServicePackage {
  name: string;
  price: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

interface ServiceDetailProps {
  index: string;
  kicker: string;
  title: ReactNode;
  intro: string;
  facts: { label: string; value: string }[];
  features: ServiceFeature[];
  packages: ServicePackage[];
  approach: string;
}

export function ServiceDetail({
  index,
  kicker,
  title,
  intro,
  facts,
  features,
  packages,
  approach,
}: ServiceDetailProps) {
  return (
    <main className="service-detail">
      <section className="service-detail__hero" aria-labelledby="service-detail-title">
        <InnerFilm />
        <div className="container">
          <p className="section-kicker" data-reveal>
            <span>{index}</span> {kicker}
          </p>
          <h1 id="service-detail-title" data-reveal>{title}</h1>
          <div className="service-detail__foot">
            <p data-reveal>{intro}</p>
            <dl className="service-detail__meta" data-reveal>
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="service-detail__features" aria-labelledby="service-included-title">
        <div className="container">
          <div className="service-detail__bar">
            <h2 id="service-included-title" className="section-kicker">
              <span>01</span> What&apos;s included
            </h2>
            <p className="section-note">{features.length} capabilities</p>
          </div>
          <div className="service-detail__grid">
            {features.map((feature, featureIndex) => (
              <article className="service-detail__feature" key={feature.title} data-reveal>
                <span className="service-detail__index" aria-hidden="true">
                  {String(featureIndex + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-detail__packages" aria-labelledby="service-packages-title">
        <div className="container">
          <header className="section-head section-head--compact">
            <div className="section-head__meta">
              <p className="section-kicker">
                <span>02</span> Packages
              </p>
              <p className="section-note">Fixed scope · Clear deliverables</p>
            </div>
            <div className="section-head__body">
              <h2 id="service-packages-title" data-reveal>
                Ways to <em>work.</em>
              </h2>
              <div className="section-head__aside" data-reveal>
                <p>{approach}</p>
              </div>
            </div>
          </header>

          <div className="service-plans">
            {packages.map((plan) => (
              <article
                className={`service-plan${plan.highlight ? " is-featured" : ""}`}
                key={plan.name}
                data-reveal
              >
                {plan.highlight ? <span className="service-plan__flag">Most chosen</span> : null}
                <h3>{plan.name}</h3>
                <p className="service-plan__price">{plan.price}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span aria-hidden="true">↗</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact/"
                  className={`btn ${plan.highlight ? "btn--accent" : "btn--ghost"} btn--lg service-plan__cta`}
                >
                  {plan.cta} <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>

          <p className="service-detail__note">
            Not sure which fits? <Link href="/contact/">Tell me what you&apos;re building</Link> and
            I&apos;ll point you in the right direction.
          </p>
        </div>
      </section>
    </main>
  );
}
