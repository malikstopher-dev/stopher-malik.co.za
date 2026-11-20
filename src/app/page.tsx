import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { StudioSection } from "@/components/sections/StudioSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd, websiteSchema, personSchema, localBusinessSchema } from "@/components/json-ld";

export const metadata: Metadata = { alternates: { canonical: "https://stopher-malik.co.za/" } };

export default function Home() {
  return <>
    <JsonLd data={websiteSchema()} />
    <JsonLd data={personSchema()} />
    <JsonLd data={localBusinessSchema()} />
    <main>
      <Hero />
      <Ticker />
      <ProjectsSection />
      <StudioSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  </>;
}
