"use client";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export function AboutPage() {
  return (
    <>
      <Nav />
      <main className="main-content">
        <section className="about-hero">
          <div className="container">
            <div className="hero__card card" data-tilt data-magnetic data-holo>
              <h1 className="hero__title">Get to Know Me Better!</h1>
              <p className="hero__desc" style={{ marginBottom: "var(--space-xl)" }}>
                Greetings! I&apos;m Stopher, and I thrive in the realm of web design, where pixels meet purpose. Armed with a keen understanding of user experience and a knack for translating ideas into visually captivating interfaces, I embark on each project with an enthusiasm to create something extraordinary.
              </p>
              <p className="hero__desc" style={{ marginBottom: "var(--space-xl)" }}>
                My journey in web design began with a solid foundation in design principles, honed during my years of formal education. I hold a degree in Graphic Design from XYZ University, where I not only gained technical expertise but also developed a deep appreciation for the marriage of aesthetics and functionality.
              </p>
              <p className="hero__desc" style={{ marginBottom: 0 }}>
                My tech stack is as diverse as the web itself, ranging from HTML5, CSS3, and JavaScript to various design tools like Adobe Creative Suite and Figma. I believe in staying ahead of the curve, constantly exploring emerging technologies and design trends to ensure that my work remains both timeless and cutting-edge.
              </p>
            </div>

            <div id="about-stage" className="about-stage" data-count="96">
              <img
                className="about-stage__poster"
                src="/assets/about-frames/poster.webp"
                alt="Stopher Malik in blue studio light &mdash; cinematic portrait sequence"
                loading="lazy"
                decoding="async"
              />
              <canvas className="about-stage__canvas" aria-hidden="true" />
              <div className="about-stage__grain" aria-hidden="true" />
              <div className="about-stage__vignette" aria-hidden="true" />
              <p className="about-stage__caption">Crafted with intent — light, depth, and precision.</p>
            </div>

            <div className="hero__card card" data-tilt style={{ marginTop: "var(--space-xl)", padding: "var(--space-2xl)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flexStart", gap: "var(--space-xl)", justifyContent: "flex-start" }}>
                <div style={{
                  position: "relative",
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid var(--accent)",
                  boxShadow: "0 0 0 6px rgba(0,212,255,0.08), 0 20px 60px rgba(0,212,255,0.15)",
                  flexShrink: 0
                }}>
                  <img
                    src="/assets/stopher-portrait.png"
                    alt="Stopher Malik — Web Designer & Developer, Johannesburg"
                    fetchPriority="high"
                    decoding="async"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 28%", display: "block" }}
                  />
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: "inset 0 0 40px rgba(3,7,15,0.4)", pointerEvents: "none" }} />
                </div>
                <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--white)", margin: 0 }}>
                    Stopher Malik
                  </h2>
                  <p style={{ fontSize: "var(--body-md)", color: "var(--accent)", margin: "4px 0 0", letterSpacing: "var(--tracking-wide)" }}>
                    Web Designer & Developer
                  </p>
                  <p style={{ fontSize: "var(--label-sm)", color: "var(--white-muted)", margin: "8px 0 0", textTransform: "uppercase", letterSpacing: "var(--tracking-wider)" }}>
                    Johannesburg, South Africa
                  </p>
                  <div style={{ display: "inlineFlex", alignItems: "center", gap: 8, padding: "6px 14px", background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)", borderRadius: "999px", marginTop: "var(--space-lg)" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
                    <span style={{ fontSize: "var(--label-sm)", color: "var(--white)", fontWeight: 500 }}>Available for projects</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero__bottom" style={{ marginTop: "var(--space-xl)", marginBottom: "var(--space-3xl)" }}>
              <div className="hero__skills-card" style={{ minHeight: "auto" }}>
                <h2 className="hero__skills-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><polygon points="12,3 21,12 12,21 3,12"/></svg>
                  Education
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)", marginTop: "var(--space-lg)" }}>
                  <div>
                    <h3 style={{ fontSize: "var(--body-lg)", fontWeight: 600, color: "var(--white)" }}>Graphic Design Degree</h3>
                    <p style={{ fontSize: "var(--label-sm)", color: "var(--accent)", margin: "2px 0 6px" }}>XYZ University (2018 - 2022)</p>
                    <p style={{ fontSize: "var(--body-sm)", color: "var(--white-muted)", lineHeight: 1.5 }}>Honed skills in layout design, typography, color theory, and digital graphics.</p>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "var(--space-lg)" }}>
                    <h3 style={{ fontSize: "var(--body-lg)", fontWeight: 600, color: "var(--white)" }}>Web Development Certification</h3>
                    <p style={{ fontSize: "var(--label-sm)", color: "var(--accent)", margin: "2px 0 6px" }}>Tech Academy (2022)</p>
                    <p style={{ fontSize: "var(--body-sm)", color: "var(--white-muted)", lineHeight: 1.5 }}>Acquired deep knowledge of HTML, CSS, JavaScript, and modern frameworks.</p>
                  </div>
                </div>
              </div>

              <div className="hero__skills-card" style={{ minHeight: "auto" }}>
                <h2 className="hero__skills-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><polygon points="12,3 21,12 12,21 3,12"/></svg>
                  Experience
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)", marginTop: "var(--space-lg)" }}>
                  <div>
                    <h3 style={{ fontSize: "var(--body-lg)", fontWeight: 600, color: "var(--white)" }}>Lead Web Designer</h3>
                    <p style={{ fontSize: "var(--label-sm)", color: "var(--accent)", margin: "2px 0 6px" }}>SMK Web Design (2023 - Present)</p>
                    <p style={{ fontSize: "var(--body-sm)", color: "var(--white-muted)", lineHeight: 1.5 }}>Designing premium, converting digital experiences for diverse South African clients.</p>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "var(--space-lg)" }}>
                    <h3 style={{ fontSize: "var(--body-lg)", fontWeight: 600, color: "var(--white)" }}>UI/UX Designer</h3>
                    <p style={{ fontSize: "var(--label-sm)", color: "var(--accent)", margin: "2px 0 6px" }}>Freelance (2021 - 2023)</p>
                    <p style={{ fontSize: "var(--body-sm)", color: "var(--white-muted)", lineHeight: 1.5 }}>Created user-centered interfaces, wireframes, and prototypes for mobile and web apps.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}