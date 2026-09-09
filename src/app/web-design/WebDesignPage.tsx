"use client";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

const features = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, title: "Custom UI/UX Design", desc: "wireframes, prototypes, pixel-perfect visuals." },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/></svg>, title: "Mobile-First Build", desc: "flawless on phones, tablets, and desktops." },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>, title: "SEO Foundation", desc: "technical on-page SEO, sitemap, robots, schema." },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, title: "Core Web Vitals", desc: "fast LCP, low CLS, snappy INP out of the box." },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, title: "Lead Capture Flow", desc: "forms, WhatsApp, calls tracked from day one." },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M12 2v20M2 12h20"/></svg>, title: "Unlimited Revisions", desc: "within scope, until you're 100% happy." },
];

const packages = [
  { name: "Starter", price: "R1,500–3,000", features: ["Up to 5 pages", "Mobile-responsive", "Basic SEO setup", "Contact form + WhatsApp", "1 revision round"], cta: "Start Starter" },
  { name: "Business Growth", price: "R4,000–8,000", features: ["Up to 15 pages", "Custom animations", "Advanced SEO + schema", "CMS (blog/portfolio)", "3 revision rounds"], cta: "Start Growth", highlight: true },
  { name: "Premium Brand", price: "R9,000+", features: ["Unlimited pages", "Design system", "Full SEO + analytics", "Custom integrations", "Unlimited revisions"], cta: "Start Premium" },
];

export function WebDesignPage() {
  return (
    <>
      <Nav />
      <main className="main-content">
        <section className="about-hero">
          <div className="container">
            <div className="hero__card card" data-tilt data-magnetic data-holo>
              <h1 className="hero__title">Web Design</h1>
              <p className="hero__desc" style={{ marginBottom: 0 }}>
                High-converting, mobile-first websites custom-designed for South African businesses. Built to look premium, load fast, and turn visitors into paying clients.
              </p>
            </div>

            <div className="section-card card" data-tilt data-morph data-holo style={{ marginTop: "var(--space-xl)", marginBottom: "var(--space-3xl)" }}>
              <div className="section-card__header">
                <h2 className="section-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><polygon points="12,3 21,12 12,21 3,12"/></svg>
                  What&apos;s Included
                </h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-lg)" }}>
                {features.map((feature) => (
                  <div key={feature.title} className="contact-btn card" data-flip data-magnetic data-holo>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-md)" }}>
                      <div style={{ flexShrink: 0, marginTop: 2 }}>{feature.icon}</div>
                      <div><strong style={{ color: "var(--white)" }}>{feature.title}</strong> - {feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-card card" data-tilt data-morph data-holo style={{ marginBottom: "var(--space-3xl)" }}>
              <div className="section-card__header">
                <h2 className="section-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><polygon points="12,3 21,12 12,21 3,12"/></svg>
                  Packages
                </h2>
              </div>
              <div className="contact-grid" style={{ marginTop: "var(--space-lg)", display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-lg)" }}>
                {packages.map((pkg) => (
                  <div key={pkg.name} className={`contact-btn card ${pkg.highlight ? "ring-2 ring-accent" : ""}`} data-flip data-magnetic data-holo style={{ flexDirection: "column", alignItems: "flex-start", padding: "var(--space-xl)", borderColor: pkg.highlight ? "var(--accent)" : "rgba(255,255,255,0.06)" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--body-xl)", fontWeight: 700, color: "var(--white)", marginBottom: "var(--space-xs)" }}>{pkg.name}</h3>
                    <p style={{ fontSize: "var(--body-lg)", fontWeight: 600, color: "var(--accent)", marginBottom: "var(--space-lg)" }}>{pkg.price}</p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-sm)", marginBottom: "var(--space-xl)" }}>
                      {pkg.features.map((feat, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", fontSize: "var(--body-sm)", color: "var(--white-muted)" }}>
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ color: "var(--accent)", flexShrink: 0 }}><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact/" className={`btn ${pkg.highlight ? "btn--accent" : "btn--ghost"} btn--lg w-full`}>{pkg.cta}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}