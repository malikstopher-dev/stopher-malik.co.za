"use client";

import { ServiceDetail } from "@/components/sections/ServiceDetail";

const features = [
  { title: "Technical SEO audit", description: "Crawl errors, indexation, site structure, and schema gaps identified and prioritised." },
  { title: "Core Web Vitals", description: "LCP, INP, and CLS optimisation measured against real-user experience." },
  { title: "Speed optimisation", description: "Asset compression, caching headers, CDN configuration, and code splitting." },
  { title: "On-page SEO", description: "Metadata, headings, content structure, and internal linking tuned for search." },
  { title: "Local SEO", description: "Google Business, citations, and location pages for South African markets." },
  { title: "Analytics setup", description: "GA4, Search Console, conversion tracking, and reports you can read." },
];

const packages = [
  { name: "SEO Audit", price: "R1,500", features: ["Full technical audit report", "Core Web Vitals baseline", "Schema gap analysis", "Priority fix list"], cta: "Get Audit" },
  { name: "Optimisation Sprint", price: "R4,000–8,000", features: ["All audit fixes implemented", "Speed optimisation", "Schema markup deployment", "30-day monitoring"], cta: "Start Sprint", highlight: true },
  { name: "Monthly SEO", price: "R2,500/mo", features: ["Ongoing technical monitoring", "Content optimisation", "Rank tracking + reports", "Quarterly strategy calls"], cta: "Start Monthly" },
];

export function SeoPerformancePage() {
  return (
    <ServiceDetail
      index="03"
      kicker="SEO & performance"
      title={<>SEO &amp; <em>performance.</em></>}
      intro="Technical SEO and speed optimisation that moves your website up Google in South Africa. Core Web Vitals, structured data, and performance gains you can measure."
      facts={[
        { label: "Starting at", value: "R1,500" },
        { label: "Scope", value: "Audit + fixes" },
        { label: "Ongoing", value: "Monthly option" },
      ]}
      features={features}
      packages={packages}
      approach="Begin with an audit, fix the foundations, then decide if ongoing optimisation makes sense for your market and goals."
    />
  );
}
