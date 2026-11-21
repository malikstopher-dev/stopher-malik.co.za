"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { InnerFilm } from "@/components/sections/InnerFilm";
import { ServiceSelect } from "./ServiceSelect";

// This public Web3Forms form key determines the receiving inbox at build time.
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() || "23d51a8d-11fc-48a5-bae3-02ca670202c3";

export function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
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
  const contactLinksRef = useRef<HTMLDivElement>(null);
  const [contactLinksVisible, setContactLinksVisible] = useState(false);

  useEffect(() => {
    const links = contactLinksRef.current;
    if (!links || !("IntersectionObserver" in window)) {
      setContactLinksVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setContactLinksVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(links);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === "submitting") return;
    if (formData.honeypot || formData.honeypot2) {
      setErrorMessage("The spam check blocked this enquiry before it was sent.");
      setFormStatus("error");
      return;
    }
    setFormStatus("submitting");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New portfolio enquiry: Stopher Malik",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          honeypot: formData.honeypot,
        }),
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.success === true) {
        setFormStatus("success");
        formRef.current?.reset();
        setFormData({ name: "", email: "", phone: "", service: "", message: "", honeypot: "", honeypot2: "" });
      } else {
        setErrorMessage(typeof result?.message === "string" && result.message ? result.message : `The email service did not confirm your enquiry (HTTP ${response.status}).`);
        setFormStatus("error");
      }
    } catch {
      setErrorMessage("We couldn’t confirm submission with the email service. Your draft is still here.");
      setFormStatus("error");
    }
  };

  const whatsAppFallback = () => {
    const text = `Hi Stopher, I'm ${formData.name} (${formData.email}). I'm interested in ${formData.service}. ${formData.message}`;
    window.open(`https://wa.me/27729998863?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <main className="contact-editorial">
      <section className="contact-editorial__intro" aria-labelledby="contact-title">
        <InnerFilm />
        <div className="container">
          <p className="section-kicker" data-reveal>
            <span>Contact</span> New business
          </p>
          <div className="contact-editorial__head">
            <h1 id="contact-title" data-reveal>
              Tell me what
              <br />
              you&apos;re <em>building.</em>
            </h1>
            <div className="contact-editorial__aside" data-reveal>
              <p>
                Tell me what you need and when you need it. I&apos;ll usually reply within one working day.
              </p>
              <p className="contact-editorial__availability">
                <span aria-hidden="true" />
                Available for select projects
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-editorial__body" aria-label="Contact details and enquiry form">
        <div className="container contact-page__layout">
          <aside className="contact-panel contact-panel--links">
            <div className="contact-panel__header">
              <p className="contact-editorial__label">Direct</p>
              <h2 className="contact-editorial__panel-title">Reach me</h2>
            </div>
            <div
              ref={contactLinksRef}
              className={`contact-links-list${contactLinksVisible ? " is-visible" : ""}`}
            >
              <a href="mailto:info@stopher-malik.co.za" className="contact-link-row">
                <span className="contact-link-row__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                <span className="contact-link-row__label">info@stopher-malik.co.za</span>
                <span className="contact-link-row__arrow" aria-hidden="true">&rarr;</span>
              </a>
              <a href="https://wa.me/27729998863" target="_blank" rel="noopener noreferrer" className="contact-link-row">
                <span className="contact-link-row__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>
                <span className="contact-link-row__label">Book a call</span>
                <span className="contact-link-row__arrow" aria-hidden="true">&rarr;</span>
              </a>
              <a href="https://x.com/stopher_malik" target="_blank" rel="noopener" className="contact-link-row">
                <span className="contact-link-row__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 3h3l-6.6 7.55L22 21h-6l-4.7-6.15L5.9 21H3l6.9-7.9L2.6 3h6.15l4.25 5.6L18 3Z"/></svg></span>
                <span className="contact-link-row__label">Twitter</span>
                <span className="contact-link-row__arrow" aria-hidden="true">&rarr;</span>
              </a>
              <a href="https://www.linkedin.com/in/stophermalik/" target="_blank" rel="noopener" className="contact-link-row">
                <span className="contact-link-row__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></span>
                <span className="contact-link-row__label">LinkedIn</span>
                <span className="contact-link-row__arrow" aria-hidden="true">&rarr;</span>
              </a>
              <a href="https://www.instagram.com/stophermalik/" target="_blank" rel="noopener" className="contact-link-row">
                <span className="contact-link-row__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none"/></svg></span>
                <span className="contact-link-row__label">Instagram</span>
                <span className="contact-link-row__arrow" aria-hidden="true">&rarr;</span>
              </a>
              <a href="https://wa.me/27729998863" target="_blank" rel="noopener noreferrer" className="contact-link-row">
                <span className="contact-link-row__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></span>
                <span className="contact-link-row__label">WhatsApp chat</span>
                <span className="contact-link-row__arrow" aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <p className="contact-editorial__note">
              Prefer email? Include your website, deadline, and budget range and
              you&apos;ll get a more useful first reply.
            </p>
          </aside>

          <section className="contact-panel contact-panel--form">
            <div className="contact-panel__header">
              <p className="contact-editorial__label">Enquiry</p>
              <h2 className="contact-editorial__panel-title">Start the conversation</h2>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} id="contact-form" className="contact-form">
              <input type="hidden" name="honeypot" value={formData.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
              <input type="hidden" name="honeypot2" value={formData.honeypot2} onChange={handleChange} tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

              <div className="contact-form__grid">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" id="name" name="name" className="form-input" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" id="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone (optional)</label>
                  <input type="tel" id="phone" name="phone" className="form-input" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="service" className="form-label">Service</label>
                  <ServiceSelect
                    value={formData.service}
                    onValueChange={(service) => setFormData((current) => ({ ...current, service }))}
                  />
                </div>
              </div>

              <div className="form-group form-group--message">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form__actions">
                <button
                  type="submit"
                  className="btn btn--accent btn--lg contact-form__submit"
                  disabled={formStatus === "submitting"}
                >
                  {formStatus === "submitting" ? "Sending..." : "Send message"}
                </button>
                <button
                  type="button"
                  onClick={whatsAppFallback}
                  className="btn btn--ghost btn--lg contact-form__whatsapp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp instead
                </button>
              </div>

              {formStatus === "success" && (
                <div className="contact-form__status contact-form__status--success" role="status" aria-live="polite">
                  <p>Thanks. The email service accepted your enquiry. I’ll reply to the email address you provided.</p>
                </div>
              )}

              {formStatus === "error" && (
                <div className="contact-form__status contact-form__status--error" role="alert">
                  <p>
                    {errorMessage} <a href="mailto:info@stopher-malik.co.za">Email me directly</a> or <a href="https://wa.me/27729998863" target="_blank" rel="noopener">use WhatsApp</a>.
                  </p>
                </div>
              )}
            </form>
            <p className="legal-ack">
              By submitting this form, you acknowledge our{" "}
              <Link href="/privacy/">Privacy Policy</Link> and{" "}
              <Link href="/terms/">Terms &amp; Conditions</Link>.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
