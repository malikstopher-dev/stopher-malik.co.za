"use client";

import { ServiceDetail } from "@/components/sections/ServiceDetail";

const features = [
  { title: "Custom store design", description: "A branded shopping experience that stands out from template stores." },
  { title: "Product management", description: "An easy admin for products, variants, images, and stock levels." },
  { title: "Secure payments", description: "PayFast, Yoco, PayPal, EFT, and card payments ready from launch." },
  { title: "Order processing", description: "Automated confirmations, shipping rates, and tracking integration." },
  { title: "E-commerce SEO", description: "Product schema, clean URLs, and search-friendly category structure." },
  { title: "Mobile checkout", description: "A smooth buying experience on every device, from browse to pay." },
];

const packages = [
  { name: "Starter Store", price: "R3,000–5,000", features: ["Up to 20 products", "Basic theme customisation", "PayFast + EFT", "Order notifications", "Mobile checkout"], cta: "Start Starter" },
  { name: "Growth Store", price: "R6,000–12,000", features: ["Up to 200 products", "Custom design system", "All SA gateways (Yoco, PayPal)", "Inventory + variants", "Abandoned cart recovery"], cta: "Start Growth", highlight: true },
  { name: "Enterprise", price: "R15,000+", features: ["Unlimited products", "Headless / Next.js build", "Custom integrations", "Multi-currency / language", "Dedicated support"], cta: "Start Enterprise" },
];

export function EcommercePage() {
  return (
    <ServiceDetail
      index="03"
      kicker="E-commerce"
      title={<>Stores that <em>sell.</em></>}
      intro="Online stores built to sell. Secure payments, straightforward product management, and a checkout experience that turns browsers into paying customers."
      facts={[
        { label: "Starting at", value: "R3,000" },
        { label: "Scope", value: "Store design" },
        { label: "Payments", value: "SA gateways" },
      ]}
      features={features}
      packages={packages}
      approach="Pick the package that matches your catalogue size. Every store launches with payments, shipping, and analytics connected and tested."
    />
  );
}
