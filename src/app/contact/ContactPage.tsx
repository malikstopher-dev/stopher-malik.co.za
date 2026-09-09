"use client";

import { useState, useRef } from "react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    honeypot: "",
    honeypot2: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.honeypot || formData.honeypot2) {
      setFormStatus("success");
      return;
    }
    setFormStatus("submitting");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "23d51a8d-11fc-48a5-bae3-02ca670202c3",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          honeypot: formData.honeypot,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        formRef.current?.reset();
        setFormData({ name: "", email: "", phone: "", service: "", message: "", honeypot: "", honeypot2: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const whatsAppFallback = () => {
    const text = `Hi Stopher, I'm ${formData.name} (${formData.email}). I'm interested in ${formData.service}. ${formData.message}`;
    window.open(`https://wa.me/27825100050?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      <Nav />
      <main className="main-content">
        <section className="contact-page">
          <div className="container">
            <div className="hero__card card" data-tilt data-magnetic data-holo style={{ marginBottom: "var(--space-xl)" }}>
              <h1 className="hero__title">Let&apos;s Connect!</h1>
            </div>

            <div className="section-card card" data-tilt data-morph data-holo style={{ marginBottom: "var(--space-xl)" }}>
              <div className="section-card__header">
                <h2 className="section-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><polygon points="12,3 21,12 12,21 3,12"/></svg>
                  Contact Links
                </h2>
              </div>
              <div className="contact-grid" style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "var(--space-md)",
              }}>
                <a href="mailto:info@stopher-malik.co.za" className="contact-btn card" data-flip data-magnetic data-holo>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  info@stopher-malik.co.za
                </a>
                <a href="https://wa.me/27825100050" target="_blank" className="contact-btn card" data-flip data-magnetic data-holo>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  Book a Call
                </a>
                <a href="https://x.com/stopher_malik" target="_blank" rel="noopener" className="contact-btn card" data-flip data-magnetic data-holo>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                  Twitter
                </a>
                <a href="https://www.linkedin.com/in/stophermalik/" target="_blank" rel="noopener" className="contact-btn card" data-flip data-magnetic data-holo>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  LinkedIn
                </a>
                <a href="https://www.instagram.com/stophermalik/" target="_blank" rel="noopener" className="contact-btn card" data-flip data-magnetic data-holo>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  Instagram
                </a>
                <a href="https://wa.me/27825100050" target="_blank" className="contact-btn card" data-flip data-magnetic data-holo>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  WhatsApp Chat
                </a>
              </div>
            </div>

            <div className="section-card card" data-tilt data-morph data-holo>
              <div className="section-card__header">
                <h2 className="section-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><polygon points="12,3 21,12 12,21 3,12"/></svg>
                  Project Enquiry
                </h2>
              </div>
              <form ref={formRef} onSubmit={handleSubmit} id="contact-form" style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
                <input type="hidden" name="honeypot" value={formData.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
                <input type="hidden" name="honeypot2" value={formData.honeypot2} onChange={handleChange} tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: "var(--space-lg)" }}>
                  <label htmlFor="name" className="form-label" style={{ fontSize: "var(--label-sm)", fontWeight: 600, color: "var(--white-muted)", textTransform: "uppercase", letterSpacing: "var(--tracking-wider)" }}>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", background: "var(--black-medium)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "var(--radius-lg)", padding: "12px var(--space-lg)", color: "var(--white)", fontSize: "var(--body-sm)" }}
                  />
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: "var(--space-lg)" }}>
                  <label htmlFor="email" className="form-label" style={{ fontSize: "var(--label-sm)", fontWeight: 600, color: "var(--white-muted)", textTransform: "uppercase", letterSpacing: "var(--tracking-wider)" }}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", background: "var(--black-medium)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "var(--radius-lg)", padding: "12px var(--space-lg)", color: "var(--white)", fontSize: "var(--body-sm)" }}
                  />
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: "var(--space-lg)" }}>
                  <label htmlFor="phone" className="form-label" style={{ fontSize: "var(--label-sm)", fontWeight: 600, color: "var(--white-muted)", textTransform: "uppercase", letterSpacing: "var(--tracking-wider)" }}>Phone (optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ width: "100%", background: "var(--black-medium)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "var(--radius-lg)", padding: "12px var(--space-lg)", color: "var(--white)", fontSize: "var(--body-sm)" }}
                  />
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: "var(--space-lg)" }}>
                  <label htmlFor="service" className="form-label" style={{ fontSize: "var(--label-sm)", fontWeight: 600, color: "var(--white-muted)", textTransform: "uppercase", letterSpacing: "var(--tracking-wider)" }}>Service</label>
                  <select
                    id="service"
                    name="service"
                    className="form-input"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", background: "var(--black-medium)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "var(--radius-lg)", padding: "12px var(--space-lg)", color: "var(--white)", fontSize: "var(--body-sm)" }}
                  >
                    <option value="">Select a service</option>
                    <option value="Website Design">Website Design</option>
                    <option value="Full-Stack Development">Full-Stack Development</option>
                    <option value="E-Commerce Store">E-Commerce Store</option>
                    <option value="SEO & Performance">SEO & Performance</option>
                    <option value="Branding & Logo">Branding & Logo</option>
                    <option value="Startup Package">Startup Package</option>
                    <option value="Other / Not Sure">Other / Not Sure</option>
                  </select>
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: "var(--space-lg)" }}>
                  <label htmlFor="message" className="form-label" style={{ fontSize: "var(--label-sm)", fontWeight: 600, color: "var(--white-muted)", textTransform: "uppercase", letterSpacing: "var(--tracking-wider)" }}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", minHeight: 120, background: "var(--black-medium)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "var(--radius-lg)", padding: "12px var(--space-lg)", color: "var(--white)", fontSize: "var(--body-sm)", resize: "vertical" }}
                  />
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-md)" }}>
                  <button
                    type="submit"
                    className="btn btn--accent btn--lg"
                    disabled={formStatus === "submitting"}
                    style={{ padding: "10px var(--space-xl)", fontFamily: "var(--font-body)", fontSize: "var(--body-sm)", fontWeight: 500, borderRadius: "var(--radius-full)", transition: "all 0.25s var(--ease-out)", cursor: "pointer", border: "1px solid transparent", textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "var(--space-sm)", background: "var(--accent)", color: "var(--black)" }}
                  >
                    {formStatus === "submitting" ? "Sending..." : "Send Message"}
                  </button>
                  <button
                    type="button"
                    onClick={whatsAppFallback}
                    className="btn btn--ghost btn--lg"
                    style={{ padding: "10px var(--space-xl)", fontFamily: "var(--font-body)", fontSize: "var(--body-sm)", fontWeight: 500, borderRadius: "var(--radius-full)", transition: "all 0.25s var(--ease-out)", cursor: "pointer", border: "1px solid transparent", textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "var(--space-sm)", background: "transparent", borderColor: "rgba(255,255,255,0.12)", color: "var(--white)" }}
                  >
                    WhatsApp Instead
                  </button>
                </div>

                {formStatus === "success" && (
                  <div className="toast toast--success" style={{
                    position: "fixed",
                    bottom: "var(--space-xl)",
                    left: "50%",
                    transform: "translateX(-50%) translateY(0)",
                    padding: "var(--space-md) var(--space-2xl)",
                    background: "var(--black-light)",
                    border: "1px solid var(--accent)",
                    borderRadius: "var(--radius-full)",
                    zIndex: 200,
                    opacity: 1,
                  }}>
                    <p className="toast__message" style={{ fontSize: "var(--body-sm)", color: "var(--white)", whiteSpace: "nowrap" }}>
                      Message sent! I&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="toast toast--error" style={{
                    position: "fixed",
                    bottom: "var(--space-xl)",
                    left: "50%",
                    transform: "translateX(-50%) translateY(0)",
                    padding: "var(--space-md) var(--space-2xl)",
                    background: "var(--black-light)",
                    border: "1px solid #ef4444",
                    borderRadius: "var(--radius-full)",
                    zIndex: 200,
                    opacity: 1,
                  }}>
                    <p className="toast__message" style={{ fontSize: "var(--body-sm)", color: "var(--white)", whiteSpace: "nowrap" }}>
                      Something went wrong. <a href="https://wa.me/27825100050" target="_blank" rel="noopener" style={{ color: "var(--accent)" }}>WhatsApp me directly</a>.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
