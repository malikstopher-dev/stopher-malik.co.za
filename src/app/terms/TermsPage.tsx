"use client";

import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";

export function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="The terms governing web design, development and digital services provided by SMK Web Design."
      lastUpdated="September 2026"
    >
      <nav className="legal-toc" aria-label="Table of contents">
        <p className="legal-toc__title">Contents</p>
        <ol className="legal-toc__list">
          <li><a href="#acceptance">Acceptance of Terms</a></li>
          <li><a href="#about">About SMK Web Design</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#quotations">Quotations &amp; Proposals</a></li>
          <li><a href="#payments">Payments &amp; Billing</a></li>
          <li><a href="#payfast">PayFast Payments</a></li>
          <li><a href="#recurring">Recurring Services</a></li>
          <li><a href="#timelines">Project Timelines</a></li>
          <li><a href="#client-responsibilities">Client Responsibilities</a></li>
          <li><a href="#scope">Scope &amp; Change Requests</a></li>
          <li><a href="#third-party">Third-Party Costs</a></li>
          <li><a href="#ip">Intellectual Property</a></li>
          <li><a href="#confidentiality">Confidentiality</a></li>
          <li><a href="#disclaimers">Disclaimers</a></li>
          <li><a href="#maintenance">Maintenance &amp; Support</a></li>
          <li><a href="#suspension">Suspension &amp; Termination</a></li>
          <li><a href="#cancellation">Cancellation</a></li>
          <li><a href="#liability">Limitation of Liability</a></li>
          <li><a href="#force-majeure">Force Majeure</a></li>
          <li><a href="#amendments">Amendments</a></li>
          <li><a href="#governing-law">Governing Law</a></li>
          <li><a href="#contact">Contact Details</a></li>
        </ol>
      </nav>

      <section id="acceptance">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By engaging SMK Web Design for any service, making a payment, or using
          this website, you agree to these Terms and Conditions. If you do not
          agree, please do not proceed with our services.
        </p>
      </section>

      <section id="about">
        <h2>2. About SMK Web Design</h2>
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

      <section id="services">
        <h2>3. Services</h2>
        <p>SMK Web Design provides the following professional services:</p>
        <ul className="legal-list">
          <li>Website design and development</li>
          <li>E-commerce development</li>
          <li>Graphic design and branding</li>
          <li>UI/UX and digital design</li>
          <li>SEO and performance optimisation</li>
          <li>Website maintenance and technical support</li>
          <li>Custom digital projects</li>
        </ul>
        <p>
          Each project is scoped individually. The specific deliverables, timelines
          and fees are agreed upon before work begins.
        </p>
      </section>

      <section id="quotations">
        <h2>4. Quotations &amp; Proposals</h2>
        <p>
          Quotations are provided in writing and remain valid for the period
          stated. If no period is stated, quotations are valid for 30 days from
          the date of issue. Prices are quoted in South African Rand (ZAR) and
          exclude VAT unless otherwise stated.
        </p>
        <p>
          A quotation is not a binding contract. A binding agreement comes into
          effect once the client confirms acceptance in writing and any required
          deposit has been received.
        </p>
      </section>

      <section id="payments">
        <h2>5. Payments &amp; Billing</h2>
        <p>
          Payment terms are outlined in each quotation or proposal. Unless agreed
          otherwise:
        </p>
        <ul className="legal-list">
          <li>A deposit may be required before work begins.</li>
          <li>Payments may be structured in milestones aligned to project phases.</li>
          <li>Final payment is due upon project completion and before delivery of final files or go-live.</li>
          <li>Payment may be made via PayFast, EFT or other methods agreed in writing.</li>
        </ul>
        <p>
          Late payments may attract interest at the rate prescribed under South
          African law. SMK Web Design reserves the right to suspend work on
          outstanding projects where payment is overdue.
        </p>
      </section>

      <section id="payfast">
        <h2>6. PayFast Payments</h2>
        <p>
          Where PayFast is used, payment is processed through PayFast&apos;s
          secure payment gateway. SMK Web Design does not store full card details.
          PayFast&apos;s own terms and privacy policy apply to payment processing.
        </p>
        <p>
          Once-off payments through PayFast are one-time transactions. They do not
          create a recurring billing relationship unless the client has separately
          and explicitly agreed to an ongoing service plan that includes recurring
          billing.
        </p>
      </section>

      <section id="recurring">
        <h2>7. Recurring Services</h2>
        <p>
          Recurring services include website maintenance, technical support, SEO,
          performance optimisation, and retainer arrangements. These are billed
          on a monthly or annual basis as agreed in writing.
        </p>
        <p>
          Recurring billing is only activated where the client has knowingly and
          explicitly agreed to an ongoing service. A once-off web design,
          development, branding or graphic-design project will never automatically
          become a recurring charge.
        </p>
        <p>
          Recurring service agreements may be cancelled by the client in
          accordance with the cancellation terms set out in these Terms and in
          our{" "}
          <Link href="/refund-policy/">Refund &amp; Cancellation Policy</Link>.
        </p>
      </section>

      <section id="timelines">
        <h2>8. Project Timelines</h2>
        <p>
          Estimated timelines are provided in the proposal and are based on
          current workload and the assumed cooperation of the client. Timelines
          may be extended due to:
        </p>
        <ul className="legal-list">
          <li>Delays in receiving content, images or feedback from the client.</li>
          <li>Scope changes or additional feature requests.</li>
          <li>Circumstances beyond either party&apos;s reasonable control.</li>
        </ul>
        <p>
          SMK Web Design will communicate any anticipated delays promptly and
          propose revised timelines where necessary.
        </p>
      </section>

      <section id="client-responsibilities">
        <h2>9. Client Responsibilities</h2>
        <p>The client is responsible for:</p>
        <ul className="legal-list">
          <li>Providing content, images, branding assets and other materials in a timely manner.</li>
          <li>Ensuring supplied materials do not infringe third-party intellectual property rights.</li>
          <li>Reviewing deliverables and providing feedback within the agreed review periods.</li>
          <li>Nominating a single point of contact with authority to approve work.</li>
        </ul>
        <p>
          Delays caused by the client may push back project timelines and
          milestones accordingly.
        </p>
      </section>

      <section id="scope">
        <h2>10. Scope &amp; Change Requests</h2>
        <p>
          The agreed scope of work is defined in the proposal or quotation.
          Requests that fall outside the original scope will be assessed and
          quoted separately before any additional work begins.
        </p>
        <p>
          Revision rounds are limited to the number specified in the proposal.
          Additional revisions beyond the agreed allowance may incur extra
          charges.
        </p>
      </section>

      <section id="third-party">
        <h2>11. Third-Party Costs</h2>
        <p>
          Some projects involve third-party services that carry their own costs.
          These may include:
        </p>
        <ul className="legal-list">
          <li>Domain name registration and renewal</li>
          <li>Web hosting</li>
          <li>Premium plugins, themes or software licences</li>
          <li>Stock photography or media</li>
          <li>Third-party APIs or platforms</li>
        </ul>
        <p>
          Third-party costs are passed through at cost or as otherwise stated in
          the quotation. SMK Web Design is not responsible for changes in
          third-party pricing, service availability or terms.
        </p>
      </section>

      <section id="ip">
        <h2>12. Intellectual Property</h2>
        <p>
          Upon receipt of full payment for a project, the client receives
          ownership of the final deliverables (source files, design files,
          published website code) as agreed in the project proposal.
        </p>
        <p>
          SMK Web Design retains the right to display completed work in its
          portfolio and marketing materials, unless the client requests otherwise
          in writing before project completion.
        </p>
        <p>
          Third-party assets (stock images, fonts, plugins) remain subject to
          their respective licences.
        </p>
      </section>

      <section id="confidentiality">
        <h2>13. Confidentiality</h2>
        <p>
          Both parties agree to keep confidential any proprietary information
          shared during the course of a project. This includes business plans,
          strategies, internal documents and any material marked as confidential.
        </p>
        <p>
          Confidentiality obligations survive the termination of the project
          relationship.
        </p>
      </section>

      <section id="disclaimers">
        <h2>14. Disclaimers</h2>
        <p>SMK Web Design does not guarantee:</p>
        <ul className="legal-list">
          <li>Specific Google search rankings or organic traffic levels.</li>
          <li>Uninterrupted hosting availability or zero downtime.</li>
          <li>Absence of bugs, errors or security vulnerabilities in third-party software.</li>
          <li>Specific commercial results, revenue or conversion rates.</li>
          <li>Permanent availability of third-party services, platforms or APIs.</li>
        </ul>
        <p>
          Website performance depends on factors outside SMK Web Design&apos;s
          control, including hosting infrastructure, browser updates, third-party
          integrations and the client&apos;s own content and actions.
        </p>
      </section>

      <section id="maintenance">
        <h2>15. Maintenance &amp; Support</h2>
        <p>
          Where an ongoing maintenance or support agreement is in place, SMK Web
          Design will provide the services described in the agreement. Maintenance
          covers updates, security patches, backups and technical support as
          specified.
        </p>
        <p>
          Maintenance does not cover new feature development, redesign work or
          major structural changes unless explicitly included in the maintenance
          agreement.
        </p>
      </section>

      <section id="suspension">
        <h2>16. Suspension</h2>
        <p>
          SMK Web Design may suspend work or services where payment is overdue by
          more than 15 days, provided written notice has been given. Work will
          resume once outstanding payment is received.
        </p>
      </section>

      <section id="cancellation">
        <h2>17. Cancellation</h2>
        <p>
          Either party may cancel the engagement by providing written notice.
          Cancellation terms, including any applicable fees or refund entitlements,
          are detailed in the{" "}
          <Link href="/refund-policy/">Refund &amp; Cancellation Policy</Link>.
        </p>
      </section>

      <section id="liability">
        <h2>18. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by South African law, SMK Web Design
          shall not be liable for any indirect, incidental, consequential or
          special damages, including loss of profits, data or business
          opportunities, arising from the use of our services.
        </p>
        <p>
          SMK Web Design&apos;s total liability for any claim arising from a
          project shall not exceed the total amount paid by the client for that
          project.
        </p>
      </section>

      <section id="force-majeure">
        <h2>19. Force Majeure</h2>
        <p>
          Neither party shall be liable for delays or failure to perform caused
          by circumstances beyond reasonable control, including natural disasters,
          government actions, power failures, internet outages, pandemics or
          other events of force majeure.
        </p>
      </section>

      <section id="amendments">
        <h2>20. Amendments</h2>
        <p>
          SMK Web Design may update these Terms from time to time. The current
          version will always be available at{" "}
          <Link href="/terms/">stopher-malik.co.za/terms/</Link>. Continued
          engagement after changes constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section id="governing-law">
        <h2>21. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the Republic of South Africa.
          Any disputes shall be resolved in the courts of South Africa.
        </p>
      </section>

      <section id="contact">
        <h2>22. Contact Details</h2>
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
