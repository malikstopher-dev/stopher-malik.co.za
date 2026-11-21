"use client";

import { ServiceDetail } from "@/components/sections/ServiceDetail";

const features = [
  { title: "Custom UI/UX design", description: "Wireframes, prototypes, and pixel-perfect visuals shaped around your business." },
  { title: "Mobile-first build", description: "Flawless layouts on phones, tablets, and desktops, tested across current browsers." },
  { title: "SEO foundation", description: "Technical on-page SEO, sitemap, robots, and structured data from day one." },
  { title: "Core Web Vitals", description: "Fast LCP, low CLS, and snappy INP built into the front end, not bolted on later." },
  { title: "Lead capture flow", description: "Forms, WhatsApp, and call tracking connected so enquiries don't get lost." },
  { title: "Unlimited revisions", description: "Within scope, we refine until the site feels right to you and works for your clients." },
];

const packages = [
  { name: "Starter", price: "R1,500 to R3,000", features: ["Up to 5 pages", "Mobile-responsive", "Basic SEO setup", "Contact form + WhatsApp", "1 revision round"], cta: "Start Starter" },
  { name: "Business Growth", price: "R4,000 to R8,000", features: ["Up to 15 pages", "Custom animations", "Advanced SEO + schema", "CMS for blog or portfolio", "3 revision rounds"], cta: "Start Growth", highlight: true },
  { name: "Premium Brand", price: "R9,000+", features: ["Unlimited pages", "Design system", "Full SEO + analytics", "Custom integrations", "Unlimited revisions"], cta: "Start Premium" },
];

export function WebDesignPage() {
  return (
    <ServiceDetail
      index="03"
      kicker="Web design"
      title={<>Web <em>design.</em></>}
      intro="High-converting, mobile-first websites custom-designed for South African businesses. Built to look premium, load fast, and turn visitors into paying clients."
      facts={[
        { label: "Starting at", value: "R1,500" },
        { label: "Scope", value: "Design & build" },
        { label: "Delivery", value: "Worldwide" },
      ]}
      features={features}
      packages={packages}
      approach="Most projects start with the Business Growth package. We scope the pages, agree the outcome, and build in focused rounds with a live preview throughout."
    />
  );
}
