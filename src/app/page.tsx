import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { LocationCard } from "@/components/sections/LocationCard";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { StackSection } from "@/components/sections/StackSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = { alternates: { canonical: "https://stopher-malik.co.za/" } };

export default function Home() {
  return <>
    <header className="home-intro"><Hero /></header>
    <main id="main-content">
      <section className="hero" aria-label="Location and skills"><div className="container"><div className="hero__bottom grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-10"><LocationCard /><SkillsSection /></div></div></section>
      <ProjectsSection /><StackSection /><ServicesSection /><TestimonialsSection /><CTASection />
    </main>
  </>;
}
