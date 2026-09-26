"use client";

import { LegalPage } from "@/components/legal/LegalPage";

export function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      description="How cancellations, refunds and recurring billing work for web design, development and digital services."
      lastUpdated="September 2026"
    >
      <nav className="legal-toc" aria-label="Table of contents">
        <p className="legal-toc__title">Contents</p>
        <ol className="legal-toc__list">
          <li><a href="#general">General Principle</a></li>
          <li><a href="#deposits">Project Deposits</a></li>
          <li><a href="#cancel-before">Cancellation Before Work Begins</a></li>
          <li><a href="#cancel-after">Cancellation After Work Starts</a></li>
          <li><a href="#completed">Completed Work</a></li>
          <li><a href="#design-deliverables">Design &amp; Branding Deliverables</a></li>
          <li><a href="#third-party">Third-Party Costs</a></li>
          <li><a href="#recurring">Monthly Maintenance &amp; Support Plans</a></li>
          <li><a href="#payfast-recurring">PayFast Recurring Billing</a></li>
          <li><a href="#payment-errors">Payment Errors &amp; Disputes</a></li>
          <li><a href="#refund-processing">Refund Processing</a></li>
          <li><a href="#contact">Contact Details</a></li>
        </ol>
      </nav>

      <section id="general">
        <h2>1. General Principle</h2>
        <p>
          SMK Web Design provides customised digital and professional services.
          Because each project involves dedicated planning, design and development
          time, refund eligibility depends on the stage of work completed and the
          nature of the service purchased.
        </p>
      </section>

      <section id="deposits">
        <h2>2. Project Deposits</h2>
        <p>
          A deposit may be required before work on a project begins. Deposits
          secure your place in the production schedule and cover initial planning,
          research and setup.
        </p>
        <p>
          Where a deposit covers work already performed, planning completed,
          reserved production time or third-party services purchased, that
          portion may not be refundable. The refundable portion, if any, will be
          calculated based on the work completed at the time of cancellation.
        </p>
      </section>

      <section id="cancel-before">
        <h2>3. Cancellation Before Work Begins</h2>
        <p>
          If you cancel before substantive work has started and no third-party
          costs have been incurred, you may be entitled to a partial or full
          refund of your deposit, less any administration costs.
        </p>
      </section>

      <section id="cancel-after">
        <h2>4. Cancellation After Work Starts</h2>
        <p>
          If you cancel after work has begun, SMK Web Design will calculate the
          value of work completed, time spent and costs incurred. Any refundable
          amount will be the difference between what has been paid and the value
          of work and costs up to the date of cancellation.
        </p>
      </section>

      <section id="completed">
        <h2>5. Completed Work</h2>
        <p>
          Once a project or milestone has been completed, approved and/or
          delivered, payment relating to that completed work is generally not
          refundable, except where required by applicable law or where a
          separate written agreement states otherwise.
        </p>
      </section>

      <section id="design-deliverables">
        <h2>6. Design &amp; Branding Deliverables</h2>
        <p>
          After final design concepts or files have been supplied, the portion
          of the fee covering that design work is not refundable. This applies
          to logos, brand identity systems, website designs and other graphic
          deliverables.
        </p>
      </section>

      <section id="third-party">
        <h2>7. Third-Party Costs</h2>
        <p>
          Costs already paid to third parties may not be recoverable. These may
          include:
        </p>
        <ul className="legal-list">
          <li>Domain name registration</li>
          <li>Web hosting fees</li>
          <li>Premium plugins, themes or software licences</li>
          <li>Stock photography or media</li>
          <li>Third-party APIs or services</li>
        </ul>
        <p>
          Such costs will be itemised where applicable and deducted from any
          refund calculation.
        </p>
      </section>

      <section id="recurring">
        <h2>8. Monthly Maintenance &amp; Support Plans</h2>
        <p>
          For ongoing maintenance, SEO, support or retainer arrangements:
        </p>
        <ul className="legal-list">
          <li>You may cancel at any time by providing written notice (email is sufficient).</li>
          <li>Cancellation takes effect at the end of the current billing cycle.</li>
          <li>Work already completed within the current billing period will be billed at the agreed rate.</li>
          <li>There will be no automatic renewal or continuation after a properly completed cancellation.</li>
        </ul>
      </section>

      <section id="payfast-recurring">
        <h2>9. PayFast Recurring Billing</h2>
        <p>
          Recurring billing through PayFast is activated only where the client
          has knowingly and explicitly agreed to an ongoing maintenance, SEO,
          support or retainer arrangement.
        </p>
        <p>
          A once-off web design, development, branding or graphic-design payment
          will never automatically become a recurring payment. Recurring billing
          requires your separate, informed consent.
        </p>
      </section>

      <section id="payment-errors">
        <h2>10. Payment Errors &amp; Disputes</h2>
        <p>
          If you believe a duplicate payment has been made, an incorrect amount
          has been processed, or a payment appears unauthorised, please contact
          SMK Web Design immediately at{" "}
          <a href="mailto:info@stopher-malik.co.za">info@stopher-malik.co.za</a>.
          We will investigate and resolve the matter promptly.
        </p>
      </section>

      <section id="refund-processing">
        <h2>11. Refund Processing</h2>
        <p>
          Approved refunds will be processed through the original payment method
          where possible. The time required for a refund to reflect depends on
          PayFast, your bank or payment provider. SMK Web Design does not control
          third-party processing times.
        </p>
      </section>

      <section id="contact">
        <h2>12. Contact Details</h2>
        <div className="legal-contact-card">
          <p><strong>SMK Web Design</strong></p>
          <p>Contact person: Stopher Malik</p>
          <p>Email: <a href="mailto:info@stopher-malik.co.za">info@stopher-malik.co.za</a></p>
          <p>WhatsApp / Telephone: <a href="https://wa.me/27729998863">+27 72 999 8863</a></p>
          <p>Location: Johannesburg, Gauteng, South Africa</p>
        </div>
      </section>
    </LegalPage>
  );
}
