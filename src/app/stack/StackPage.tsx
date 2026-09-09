"use client";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

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
    category: "Frontend Framework",
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
];

export function StackPage() {
  return (
    <>
      <Nav />
      <main className="main-content">
        <section className="stack-page">
          <div className="container">
            <div className="hero__card card" data-tilt data-magnetic data-holo style={{ marginBottom: "var(--space-xl)" }}>
              <h1 className="hero__title">Full Stack</h1>
              <p className="hero__desc" style={{ marginBottom: 0 }}>
                My technical toolkit includes proficiency in Figma, HTML, CSS, JavaScript, and various design software. I&apos;m also well-versed in responsive web design, ensuring that websites I create look and function flawlessly across all devices.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)", marginBottom: "var(--space-3xl)" }}>
              {stack.map((item, index) => (
                <div key={item.name} className="stack-card card" data-tilt data-flip data-magnetic data-holo style={{ display: "flex", gap: "var(--space-xl)", alignItems: "flex-start", animationDelay: `${index * 0.1}s` }}>
                  <div className="stack-card__icon-wrap" style={{ marginBottom: 0, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="stack-card__name">{item.name}</h3>
                    <p className="stack-card__category" style={{ marginBottom: "var(--space-sm)" }}>{item.category}</p>
                    <p className="stack-card__desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}