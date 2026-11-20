"use client";

import Link from "next/link";
import { InnerFilm } from "@/components/sections/InnerFilm";
import { AboutSequence } from "./AboutSequence";

const experience = [
  {
    period: "2023 — Now",
    role: "Lead Web Designer",
    company: "SMK Web Design · Johannesburg",
    copy: "Leading the design and build of premium, conversion-focused websites for South African businesses and international clients.",
  },
  {
    period: "2021 — 2023",
    role: "UI/UX Designer",
    company: "Freelance · South Africa",
    copy: "Designed user-centred interfaces, wireframes, and prototypes for mobile and web products.",
  },
];

const capabilities = [
  {
    index: "01",
    title: "Web design",
    copy: "Custom, mobile-first interfaces built to convert visitors into clients.",
  },
  {
    index: "02",
    title: "Brand identity",
    copy: "Logos, colour systems, and visual guidelines that make businesses recognisable.",
  },
  {
    index: "03",
    title: "SEO & performance",
    copy: "Technical SEO, Core Web Vitals, and local search built for South African markets.",
  },
  {
    index: "04",
    title: "Development",
    copy: "Figma to React and Next.js, shipped fast on modern infrastructure.",
  },
];

export function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-intro" aria-labelledby="about-title">
        <InnerFilm />
        <div className="container">
          <p className="section-kicker" data-reveal>
            <span>About</span> The practice
          </p>
          <h1 id="about-title" data-reveal>
            Designing for the
            <br />
            moment <em>attention lands.</em>
          </h1>
          <div className="about-intro__foot">
            <p data-reveal>
              I&apos;m Stopher, a web designer and developer in Johannesburg. I build
              websites that look premium, load fast, and turn attention into paying
              clients.
            </p>
            <dl className="about-meta" data-reveal>
              <div>
                <dt>Based</dt>
                <dd>Johannesburg, ZA</dd>
              </div>
              <div>
                <dt>Practice</dt>
                <dd>Design &amp; build</dd>
              </div>
              <div>
                <dt>Since</dt>
                <dd>2021</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <AboutSequence />

      <section className="about-story" aria-labelledby="about-story-title">
        <div className="container about-story__grid">
          <figure className="about-portrait" data-reveal>
            <img
              src="/assets/stopher-portrait.webp"
              alt="Stopher Malik, web designer and developer in Johannesburg"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span>Stopher Malik</span>
              <span>26°12′ S / 28°02′ E</span>
            </figcaption>
          </figure>

          <div className="about-story__copy">
            <p className="section-kicker" data-reveal>
              <span>01</span> The person
            </p>
            <h2 id="about-story-title" data-reveal>
              A designer who <em>ships.</em>
            </h2>
            <p data-reveal>
              I started with interfaces, wireframes, and prototypes. Today I take
              the whole arc: strategy, identity, design, and the build. That means
              fewer hand-offs, fewer compromises, and a site that stays true to the
              idea from first sketch to final deploy.
            </p>
            <p data-reveal>
              My toolkit spans Figma, HTML, CSS, JavaScript, React, Next.js, and
              Cloudflare. I keep the stack deliberately lean so every project loads
              fast, ranks well, and is simple to maintain long after launch.
            </p>

            <dl className="about-facts" data-reveal>
              <div>
                <dt>Markets</dt>
                <dd>South Africa, DRC, Mozambique, Canada</dd>
              </div>
              <div>
                <dt>Approach</dt>
                <dd>Strategy first. Then design. Then build.</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>
                  <span className="about-status" aria-hidden="true" />
                  Open for select projects
                </dd>
              </div>
            </dl>

            <Link href="/projects/" className="text-link about-story__link">
              Selected work <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="about-detail" aria-labelledby="about-record-title">
        <div className="container">
          <header className="section-head section-head--compact">
            <div className="section-head__meta">
              <p className="section-kicker">
                <span>02</span> The record
              </p>
              <p className="section-note">Experience &amp; capabilities</p>
            </div>
            <div className="section-head__body">
              <h2 id="about-record-title" data-reveal>
                A short <em>record.</em>
              </h2>
              <div className="section-head__aside" data-reveal>
                <p>
                  Four years of designing and building for ambitious businesses,
                  from first identity to measurable results.
                </p>
              </div>
            </div>
          </header>

          <div className="about-detail__columns">
            <div className="about-list" data-reveal>
              <h3>Experience</h3>
              <ol>
                {experience.map((item) => (
                  <li key={item.role}>
                    <span className="about-list__period">{item.period}</span>
                    <div>
                      <h4>{item.role}</h4>
                      <p className="about-list__meta">{item.company}</p>
                      <p>{item.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="about-list" data-reveal>
              <h3>Capabilities</h3>
              <ol>
                {capabilities.map((item) => (
                  <li key={item.title}>
                    <span className="about-list__period">{item.index}</span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="about-close" aria-labelledby="about-close-title">
        <div className="container about-close__inner">
          <div>
            <p className="section-kicker">
              <span>03</span> Next
            </p>
            <h2 id="about-close-title" data-reveal>
              Let&apos;s make the next one <em>count.</em>
            </h2>
          </div>
          <div className="about-close__actions" data-reveal>
            <Link href="/contact/" className="btn btn--accent btn--lg">
              Start a project <span aria-hidden="true">↗</span>
            </Link>
            <a href="mailto:info@stopher-malik.co.za" className="about-close__email">
              info@stopher-malik.co.za
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
