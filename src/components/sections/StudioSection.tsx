import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { LocationCard } from "./LocationCard";

const skills = [
  "Web design",
  "UI / UX",
  "React & Next.js",
  "TypeScript",
  "Figma",
  "Cloudflare",
  "SEO",
  "E-commerce",
  "Motion",
  "Brand systems",
];

export function StudioSection() {
  return (
    <section className="studio-section" id="studio" aria-labelledby="studio-heading">
      <div className="container">
        <div className="studio-grid">
          <div className="studio-copy" data-reveal>
            <p className="section-kicker"><span>02</span> The studio</p>
            <h2 id="studio-heading">
              An independent <em>web design studio.</em>
            </h2>
            <p className="studio-lede">
              I&rsquo;m Stopher Malik, a designer and developer in Johannesburg. I work
              directly with a few clients at a time on websites, branding and search optimisation.
            </p>
            <dl className="studio-facts">
              <div><dt>Based</dt><dd>Sandton, Johannesburg</dd></div>
              <div><dt>Working</dt><dd>South Africa &amp; worldwide</dd></div>
              <div><dt>Since</dt><dd>2021 · {PROJECTS.length}+ projects shipped</dd></div>
            </dl>
            <Link href="/about/" className="text-link">
              More about the practice <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="studio-visual" data-reveal>
            <LocationCard />
          </div>
        </div>

        <div className="skills-band" data-reveal>
          <div className="skills-band__track">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
                {skills.map((skill) => <li key={`${copy}-${skill}`}>{skill}</li>)}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
