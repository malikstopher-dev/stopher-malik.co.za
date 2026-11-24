import type { Metadata } from "next";
import styles from "./boma-stock.module.css";

const dashboardUrl =
  "https://script.google.com/macros/s/AKfycbzdS5B2Hni5m3JI7prc5KG1SqJUE0Vh13eY7JGkRk_-gDDcIiBuESrn4HWrhc8-cto_oA/exec";

export const metadata: Metadata = {
  title: "The Boma Cafe Sandton",
  description: "Private stock dashboard for The Boma Cafe Sandton.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function BomaStockPage() {
  return (
    <main className={`${styles.page} boma-stock-page`}>
      <section className={styles.panel} aria-labelledby="boma-title">
        <span className={styles.halo} aria-hidden="true" />
        <span className={styles.lock} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4.5" y="10" width="15" height="10.5" rx="2.5" />
            <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
            <path d="M12 14.5v2" />
          </svg>
        </span>

        <h1 id="boma-title">
          The Boma Cafe <span>Sandton</span>
        </h1>
        <p className={styles.lede}>
          Private stock dashboard &ndash; sign in with your Google account
        </p>

        <a
          className={`btn btn--accent btn--lg ${styles.action}`}
          href={dashboardUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open stock dashboard
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7" />
            <path d="M9 7h8v8" />
          </svg>
        </a>
      </section>
    </main>
  );
}
