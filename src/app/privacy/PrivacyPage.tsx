"use client";

import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";

export function PrivacyPageContent() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How SMK Web Design collects, uses and protects your personal information."
      lastUpdated="September 2026"
    >
      <nav className="legal-toc" aria-label="Table of contents">
        <p className="legal-toc__title">Contents</p>
        <ol className="legal-toc__list">
          <li><a href="#who">Who We Are</a></li>
          <li><a href="#collect">Information We Collect</a></li>
          <li><a href="#payments">Payment Information</a></li>
          <li><a href="#why">Why We Process Your Information</a></li>
          <li><a href="#communications">Communications</a></li>
          <li><a href="#security">Security</a></li>
          <li><a href="#analytics">Analytics</a></li>
          <li><a href="#third-party">Third-Party Service Providers</a></li>
          <li><a href="#retention">Data Retention</a></li>
          <li><a href="#rights">Your Rights Under POPIA</a></li>
          <li><a href="#cookies">Cookies</a></li>
          <li><a href="#links">Third-Party Links</a></li>
          <li><a href="#children">Children &amp; Minors</a></li>
          <li><a href="#changes">Changes to This Policy</a></li>
          <li><a href="#contact">Contact Details</a></li>
        </ol>
      </nav>

      <section id="who">
        <h2>1. Who We Are</h2>
        <p>
          SMK Web Design is a web design and digital services business operated by
          Stopher Malik, based in Johannesburg, Gauteng, South Africa.
        </p>
        <div className="legal-contact-card">
          <p><strong>Business name:</strong> SMK Web Design</p>
          <p><strong>Contact person:</strong> Stopher Malik</p>
          <p><strong>Email:</strong> <a href="mailto:info@stopher-malik.com">info@stopher-malik.com</a></p>
          <p><strong>WhatsApp / Telephone:</strong> <a href="https://wa.me/27729998863">+27 72 999 8863</a></p>
          <p><strong>Website:</strong> <a href="https://stopher-malik.co.za">stopher-malik.co.za</a></p>
          <p><strong>Location:</strong> Johannesburg, Gauteng, South Africa</p>
        </div>
      </section>

      <section id="collect">
        <h2>2. Information We Collect</h2>
        <p>When you interact with SMK Web Design, we may collect:</p>
        <ul className="legal-list">
          <li><strong>Contact and enquiry information:</strong> name, email address, phone number, business name and message submitted through the contact form, WhatsApp, email or phone.</li>
          <li><strong>Quotation information:</strong> project details, requirements and specifications shared during the quoting process.</li>
          <li><strong>Client project information:</strong> content, assets, branding materials and other files provided for website or design projects.</li>
          <li><strong>Payment information:</strong> transaction confirmation and payment reference details processed through PayFast. SMK Web Design does not store full card numbers, CVV values or banking credentials.</li>
        </ul>
      </section>

      <section id="payments">
        <h2>3. Payment Information</h2>
        <p>
          Payments are processed through PayFast, a secure third-party payment
          gateway. PayFast collects and processes payment card details on their
          own infrastructure. SMK Web Design receives transaction confirmation
          and reference information only.
        </p>
        <p>
          We do not store, process or have access to your full card details,
          CVV, PIN or banking credentials. For details on how PayFast handles
          your payment data, refer to{" "}
          <a href="https://www.payfast.co.za" target="_blank" rel="noopener noreferrer">
            PayFast&apos;s own privacy policy
          </a>.
        </p>
      </section>

      <section id="why">
        <h2>4. Why We Process Your Information</h2>
        <p>We use the information collected to:</p>
        <ul className="legal-list">
          <li>Respond to enquiries and prepare quotations.</li>
          <li>Deliver requested web design, development, branding and digital services.</li>
          <li>Send invoices, receipts and payment confirmations.</li>
          <li>Provide ongoing project support and maintenance where agreed.</li>
          <li>Improve our services and website experience.</li>
          <li>Comply with South African legal and tax obligations.</li>
        </ul>
        <p>
          We do not sell, rent or trade your personal information to third
          parties for their marketing purposes.
        </p>
      </section>

      <section id="communications">
        <h2>5. Communications</h2>
        <p>
          We may contact you regarding your project, enquiry or active service
          agreement. This may include project updates, feedback requests,
          invoices and support correspondence. We will not send marketing
          communications unless you have opted in to receive them.
        </p>
      </section>

      <section id="security">
        <h2>6. Security</h2>
        <p>
          SMK Web Design takes reasonable steps to protect personal information
          from unauthorised access, loss or misuse. These measures include
          secure hosting, encrypted data transmission (HTTPS) and restricted
          access to project files.
        </p>
        <p>
          While we take reasonable precautions, no method of transmission or
          storage is completely secure. We encourage you to use strong
          passwords and protect your own accounts and devices.
        </p>
      </section>

      <section id="analytics">
        <h2>7. Analytics</h2>
        <p>
          This site may use privacy-respecting analytics tools to measure
          aggregate traffic patterns (such as page views and visit duration)
          without identifying individual visitors. Analytics data is used
          solely to improve website performance and content.
        </p>
        <p>
          This site does not use third-party advertising cookies or behavioural
          tracking for ad targeting.
        </p>
      </section>

      <section id="third-party">
        <h2>8. Third-Party Service Providers</h2>
        <p>We use the following categories of third-party services:</p>
        <ul className="legal-list">
          <li><strong>Hosting providers:</strong> website hosting and content delivery.</li>
          <li><strong>Analytics services:</strong> aggregate traffic measurement.</li>
          <li><strong>Payment processors:</strong> PayFast for secure payment handling.</li>
          <li><strong>Communication tools:</strong> email and WhatsApp for client correspondence.</li>
        </ul>
        <p>
          These providers have access only to the information necessary to
          perform their functions and are bound by their own privacy policies.
        </p>
      </section>

      <section id="retention">
        <h2>9. Data Retention</h2>
        <p>
          We retain project correspondence, invoices and related records for as
          long as South African law requires, typically five years for financial
          records. Personal data submitted through enquiry forms is retained
          for the duration of the business relationship and a reasonable period
          thereafter.
        </p>
        <p>
          You may request deletion of your personal data subject to our legal
          retention obligations.
        </p>
      </section>

      <section id="rights">
        <h2>10. Your Rights Under POPIA</h2>
        <p>
          Under the Protection of Personal Information Act (POPIA), you have
          the right to:
        </p>
        <ul className="legal-list">
          <li>Request access to the personal information we hold about you.</li>
          <li>Request correction or deletion of your personal information.</li>
          <li>Object to the processing of your personal information.</li>
          <li>Lodge a complaint with the Information Regulator if you believe your rights have been infringed.</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at{" "}
          <a href="mailto:info@stopher-malik.com">info@stopher-malik.com</a>.
        </p>
      </section>

      <section id="cookies">
        <h2>11. Cookies</h2>
        <p>
          This site uses only essential cookies required for basic site
          functionality (such as session management). We do not use
          advertising cookies, cross-site tracking cookies or third-party
          remarketing cookies.
        </p>
      </section>

      <section id="links">
        <h2>12. Third-Party Links</h2>
        <p>
          Our website and communications may contain links to third-party
          websites. We are not responsible for the privacy practices or content
          of those sites. We encourage you to review their privacy policies.
        </p>
      </section>

      <section id="children">
        <h2>13. Children &amp; Minors</h2>
        <p>
          Our services are directed at businesses and adults. We do not
          knowingly collect personal information from children under 18. If you
          believe a child has provided us with personal information, please
          contact us and we will remove it.
        </p>
      </section>

      <section id="changes">
        <h2>14. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The current
          version will always be available at{" "}
          <Link href="/privacy/">stopher-malik.co.za/privacy/</Link>. We
          encourage you to review this page periodically.
        </p>
      </section>

      <section id="contact">
        <h2>15. Contact Details</h2>
        <div className="legal-contact-card">
          <p><strong>SMK Web Design</strong></p>
          <p>Contact person: Stopher Malik</p>
          <p>Email: <a href="mailto:info@stopher-malik.com">info@stopher-malik.com</a></p>
          <p>WhatsApp / Telephone: <a href="https://wa.me/27729998863">+27 72 999 8863</a></p>
          <p>Location: Johannesburg, Gauteng, South Africa</p>
        </div>
      </section>
    </LegalPage>
  );
}
