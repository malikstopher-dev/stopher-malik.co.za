"use client";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="main-content">
        <section className="about-hero">
          <div className="container">
            <div className="hero__card card" data-tilt data-magnetic data-holo>
              <h1 className="hero__title">Privacy Policy</h1>
              <p className="hero__desc" style={{ marginBottom: "var(--space-xl)" }}>
                Your privacy matters to SMK Web Design. This policy explains what information I collect, how I use it, and the choices you have. It applies to stopher-malik.co.za and any website I build for clients that uses the SMK Web Design contact or payment flow.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2xl)", marginTop: "var(--space-2xl)" }}>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--body-xl)", fontWeight: 600, color: "var(--white)", marginBottom: "var(--space-md)" }}>
                    1. Information I collect
                  </h2>
                  <p style={{ fontSize: "var(--body-md)", color: "var(--white-muted)", lineHeight: "var(--leading-relaxed)" }}>
                    When you contact me via the contact form, WhatsApp, email, or phone, I collect the details you choose to share — typically your name, email, phone number, business name, and the message you send. When you make a payment, I receive confirmation of the transaction from the payment processor (PayFast, SnapScan, PayPal, or your bank) but I do not store your card details.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--body-xl)", fontWeight: 600, color: "var(--white)", marginBottom: "var(--space-md)" }}>
                    2. How I use your information
                  </h2>
                  <p style={{ fontSize: "var(--body-md)", color: "var(--white-muted)", lineHeight: "var(--leading-relaxed)" }}>
                    I use your information to respond to your enquiry, prepare quotes, deliver the services you&apos;ve requested, send invoices and receipts, and provide ongoing support for projects I&apos;ve built for you. I may occasionally follow up to make sure your website is performing well. I never sell or rent your data.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--body-xl)", fontWeight: 600, color: "var(--white)", marginBottom: "var(--space-md)" }}>
                    3. Cookies & analytics
                  </h2>
                  <p style={{ fontSize: "var(--body-md)", color: "var(--white-muted)", lineHeight: "var(--leading-relaxed)" }}>
                    This site does not use third-party advertising cookies. If analytics is enabled on a site I build for you, it uses privacy-respecting tools (such as Cloudflare Web Analytics or privacy-friendly GA4) that measure aggregate traffic without identifying individual visitors.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--body-xl)", fontWeight: 600, color: "var(--white)", marginBottom: "var(--space-md)" }}>
                    4. Data retention
                  </h2>
                  <p style={{ fontSize: "var(--body-md)", color: "var(--white-muted)", lineHeight: "var(--leading-relaxed)" }}>
                    I keep your project correspondence and invoices for as long as required by South African tax law (typically five years). You may request deletion of your personal data at any time, subject to those legal retention requirements.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--body-xl)", fontWeight: 600, color: "var(--white)", marginBottom: "var(--space-md)" }}>
                    5. Your rights
                  </h2>
                  <p style={{ fontSize: "var(--body-md)", color: "var(--white-muted)", lineHeight: "var(--leading-relaxed)" }}>
                    Under the Protection of Personal Information Act (POPIA), you have the right to access, correct, or delete the personal information I hold about you, and to object to the processing of it. To exercise any of these rights, contact me using the details below.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--body-xl)", fontWeight: 600, color: "var(--white)", marginBottom: "var(--space-md)" }}>
                    6. Contact
                  </h2>
                  <p style={{ fontSize: "var(--body-md)", color: "var(--white-muted)", lineHeight: "var(--leading-relaxed)" }}>
                    For any privacy questions or requests, email me at{" "}
                    <a href="mailto:info@stopher-malik.co.za" style={{ color: "var(--accent)", textDecoration: "none" }}>
                      info@stopher-malik.co.za
                    </a>{" "}
                    or WhatsApp{" "}
                    <a href="https://wa.me/27825100050" target="_blank" rel="noopener" style={{ color: "var(--accent)", textDecoration: "none" }}>
                      +27 82 510 0050
                    </a>
                    .
                  </p>
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