"use client";

export function PrivacyPage() {
  return (
    <main className="main-content">
      <section className="internal-page">
        <div className="container">
          <div className="internal-page__hero hero__card card" data-tilt data-magnetic data-holo>
            <h1 className="hero__title">Privacy Policy</h1>
            <p className="hero__desc" style={{ marginBottom: 0 }}>
              How SMK Web Design collects, uses, and protects the information you share.
            </p>
          </div>

          <section className="internal-panel card" data-tilt data-morph data-holo>
            <div className="privacy-content">
              <p className="privacy-content__intro">
                This policy applies to stopher-malik.co.za and any website I build for clients that uses the SMK Web Design contact or payment flow.
              </p>

              <div>
                <h2>1. Information I collect</h2>
                <p>
                  When you contact me via the contact form, WhatsApp, email, or phone, I collect the details you choose to share, typically your name, email, phone number, business name, and message. When you make a payment, I receive confirmation from the payment processor but do not store your card details.
                </p>
              </div>

              <div>
                <h2>2. How I use your information</h2>
                <p>
                  I use your information to respond to enquiries, prepare quotes, deliver requested services, send invoices and receipts, and provide project support. I may follow up about website performance. I do not sell or rent your data.
                </p>
              </div>

              <div>
                <h2>3. Cookies &amp; analytics</h2>
                <p>
                  This site does not use third-party advertising cookies. Where analytics is enabled, privacy-respecting tools measure aggregate traffic without identifying individual visitors.
                </p>
              </div>

              <div>
                <h2>4. Data retention</h2>
                <p>
                  I keep project correspondence and invoices for as long as South African law requires, typically five years. You may request deletion of personal data subject to those legal retention requirements.
                </p>
              </div>

              <div>
                <h2>5. Your rights</h2>
                <p>
                  Under POPIA, you may request access to, correction of, or deletion of personal information I hold about you, and you may object to its processing.
                </p>
              </div>

              <div className="privacy-content__contact">
                <h2>6. Contact</h2>
                <p>
                  For privacy questions or requests, email <a href="mailto:info@stopher-malik.co.za">info@stopher-malik.co.za</a> or WhatsApp <a href="https://wa.me/27825100050" target="_blank" rel="noopener noreferrer">+27 82 510 0050</a>.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
