import { ReactNode } from "react";

interface LegalPageProps {
  eyebrow?: string;
  title: string;
  description?: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalPage({
  eyebrow = "LEGAL",
  title,
  description,
  lastUpdated,
  children,
}: LegalPageProps) {
  return (
    <main className="main-content">
      <section className="internal-page">
        <div className="container">
          <div className="internal-page__hero hero__card card" data-tilt data-magnetic data-holo>
            <p className="legal-eyebrow">{eyebrow}</p>
            <h1 className="hero__title">{title}</h1>
            {description && (
              <p className="hero__desc">{description}</p>
            )}
          </div>

          <div className="legal-meta">
            <span className="legal-meta__label">Last updated:</span>
            <span className="legal-meta__date">{lastUpdated}</span>
          </div>

          <section className="internal-panel card" data-tilt data-morph data-holo>
            <div className="legal-content">
              {children}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
