"use client";

import { ServiceDetail } from "@/components/sections/ServiceDetail";

const features = [
  { title: "Logo design", description: "Primary mark, secondary mark, and icon variants in full colour and mono." },
  { title: "Colour palette", description: "Primary, secondary, and accent colours with hex and RGB values ready for any medium." },
  { title: "Typography system", description: "A considered font pairing with weights, scale, and hierarchy for web and print." },
  { title: "Brand guidelines", description: "Usage rules, spacing, and do's and don'ts collected in one clear document." },
  { title: "Social media kit", description: "Profile banners, post templates, and story formats ready to publish." },
  { title: "Business cards", description: "Print-ready designs that carry the identity into the physical world." },
];

const packages = [
  { name: "Logo Only", price: "R2,500", features: ["Primary + secondary logo", "Icon / favicon", "Full colour + mono", "PNG, SVG, WebP formats"], cta: "Get Logo" },
  { name: "Brand Kit", price: "R5,000–8,000", features: ["Everything in Logo Only", "Colour palette + typography", "Brand guidelines (PDF)", "Social media templates"], cta: "Get Brand Kit", highlight: true },
  { name: "Full Identity", price: "R12,000+", features: ["Everything in Brand Kit", "Stationery suite", "Print collateral", "Rollout support (3 months)"], cta: "Get Full Identity" },
];

export function BrandingPage() {
  return (
    <ServiceDetail
      index="03"
      kicker="Brand identity"
      title={<>Branding &amp; <em>identity.</em></>}
      intro="Logos, brand kits, and visual identity that make your business impossible to forget. Built for South African brands that want to look serious, trustworthy, and memorable from day one."
      facts={[
        { label: "Starting at", value: "R2,500" },
        { label: "Scope", value: "Identity system" },
        { label: "Assets", value: "Print & digital" },
      ]}
      features={features}
      packages={packages}
      approach="Start with a logo or go all the way to a full identity. Every package leaves you with organised, production-ready files you can actually use."
    />
  );
}
