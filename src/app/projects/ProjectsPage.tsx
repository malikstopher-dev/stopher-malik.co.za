"use client";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

const projects = [
  {
    title: "Salem Home Innovation",
    description: "A full business website that started generating enquiries from day one. Built for local SEO and client conversion in the Johannesburg home services market.",
    tags: ["Home Services", "SEO"],
    image: "/assets/salem.jpg",
    href: "https://salemhi.co.za",
  },
  {
    title: "The Boma Cafe",
    description: "Premium restaurant and events website with menu showcase, gallery, booking flow, and bilingual support.",
    tags: ["Restaurant", "Next.js"],
    image: "/assets/the-boma-cafe.png",
    href: "https://the-boma-cafe.vercel.app/",
  },
  {
    title: "Selrahc Architects",
    description: "Award-winning architecture studio website with bilingual support, portfolio showcase, and project enquiry system.",
    tags: ["Architecture", "Bilingual"],
    image: "/assets/selrahc.jpg",
    href: "https://www.selrahcarchitects.com/",
  },
  {
    title: "JMOTO Electrical",
    description: "Professional electrical services website with service presentation, business credibility, and contact flow.",
    tags: ["Electrical", "SEO"],
    image: "/assets/jmoto.png",
    href: "https://jmoto-website.vercel.app/",
  },
  {
    title: "JKJ SolarTech",
    description: "Solar, electrical, CCTV and security services website for clients across South Africa.",
    tags: ["Solar / CCTV", "Security"],
    image: "/assets/jk.jpg",
    href: "https://jkjsolatech.co.za/",
  },
  {
    title: "Cleanisa Solutions",
    description: "Cleaning services website with service cards, trust-building layout, and contact conversion flow.",
    tags: ["Cleaning", "Lead Gen"],
    image: "/assets/cleaningsa.png",
    href: "https://cleanisa-solutions.pages.dev/",
  },
  {
    title: "B.E. Mhlanga Services",
    description: "Multi-service business website covering maintenance, cleaning, plumbing, and electrical enquiries.",
    tags: ["Maintenance", "Lead Gen"],
    image: "/assets/bemhlanga.png",
    href: "https://bemhlanga.co.za/",
  },
  {
    title: "Chefs Buxaba",
    description: "Catering and private chef website with menu presentation and booking integration.",
    tags: ["Catering", "Booking"],
    image: "/assets/chefsbuxaba.png",
    href: "https://chefsbuxaba.co.za/",
  },
  {
    title: "Cooks Transport",
    description: "Logistics and transport company website with service listing and quote request flow.",
    tags: ["Logistics", "Transport"],
    image: "/assets/cooks.jpg",
    href: "https://cookstransport.co.za/",
  },
  {
    title: "Dolce Vita",
    description: "Luxury restaurant website with reservation system, wine list, and gallery.",
    tags: ["Restaurant", "Wine"],
    image: "/assets/dolcevita.jpg",
    href: "https://dolcevita.co.za/",
  },
  {
    title: "Electrolight",
    description: "Electrical contracting website with project portfolio and compliance documentation.",
    tags: ["Electrical", "Compliance"],
    image: "/assets/electrolight.png",
    href: "https://electrolight.co.za/",
  },
  {
    title: "Fiestas Chicken",
    description: "Fast food chain website with online ordering, location finder, and loyalty program.",
    tags: ["Fast Food", "Ordering"],
    image: "/assets/fiestas-chicken.png",
    href: "https://fiestaschicken.co.za/",
  },
  {
    title: "101 On Fraser",
    description: "Boutique hotel website with room booking, gallery, and local attractions guide.",
    tags: ["Hospitality", "Booking"],
    image: "/assets/fraser.jpg",
    href: "https://101onfraser.co.za/",
  },
  {
    title: "Le Centre",
    description: "Medical centre website with practitioner profiles, services, and appointment booking.",
    tags: ["Medical", "Booking"],
    image: "/assets/lecentre.jpg",
    href: "https://lecentre.co.za/",
  },
  {
    title: "Levante",
    description: "Architecture and interior design studio with project portfolio and enquiry system.",
    tags: ["Architecture", "Interior"],
    image: "/assets/levante.jpg",
    href: "https://levante.co.za/",
  },
  {
    title: "Limoncello",
    description: "Italian restaurant website with menu, wine list, and reservation system.",
    tags: ["Restaurant", "Italian"],
    image: "/assets/limoncello.jpg",
    href: "https://limoncello.co.za/",
  },
  {
    title: "Marche",
    description: "Market and vendor platform with stall directory and event calendar.",
    tags: ["Marketplace", "Events"],
    image: "/assets/marche.jpg",
    href: "https://marche.co.za/",
  },
  {
    title: "Penzura",
    description: "Property management website with listings, tenant portal, and maintenance requests.",
    tags: ["Property", "Management"],
    image: "/assets/penzura.jpg",
    href: "https://penzura.co.za/",
  },
  {
    title: "Salem HI",
    description: "Home inspection services website with online booking and report delivery.",
    tags: ["Inspection", "Booking"],
    image: "/assets/salemhi.png",
    href: "https://salemhi.co.za/",
  },
  {
    title: "Tomy Global",
    description: "International logistics website with tracking, quotes, and customs documentation.",
    tags: ["Logistics", "International"],
    image: "/assets/tomy-global.png",
    href: "https://tomyglobal.com/",
  },
  {
    title: "Tomy Tour",
    description: "Tour operator website with package builder, gallery, and booking flow.",
    tags: ["Tourism", "Booking"],
    image: "/assets/tomy-tour.png",
    href: "https://tomytour.com/",
  },
  {
    title: "Uzapa",
    description: "Solar energy solutions website with calculator, case studies, and contact flow.",
    tags: ["Solar", "Calculator"],
    image: "/assets/uzapa.jpg",
    href: "https://uzapa.co.za/",
  },
];

export function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="main-content">
        <section className="projects-page">
          <div className="container">
            <div className="hero__card card" data-tilt data-magnetic data-holo>
              <h1 className="hero__title">My Projects</h1>
              <p className="hero__desc" style={{ marginBottom: 0 }}>
                Welcome to my Project Page! I&apos;m Stopher, a web designer focused on crafting seamless, captivating digital experiences. With 22+ projects shipped across South Africa, the DRC, Mozambique, and Canada, each build is a blend of responsive design and intuitive UI. Let&apos;s create digital stories together.
              </p>
            </div>

            <div className="section-card card" data-tilt data-morph data-holo style={{ marginBottom: "var(--space-3xl)" }}>
              <div className="projects__grid" data-book style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "var(--space-xl)",
              }}>
                {projects.map((project) => (
                  <Link
                    key={project.title}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card card"
                    data-tilt
                    data-flip
                    data-magnetic
                    data-holo
                  >
                    <div className="project-card__img-wrap">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-card__img block h-full w-full object-cover"
                        loading="lazy"
                      />
                      <span className="project-card__hover-cta">View Site &rarr;</span>
                    </div>
                    <div className="project-card__body">
                      <div className="project-card__tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="project-card__tag tech-pill">{tag}</span>
                        ))}
                      </div>
                      <h3 className="project-card__title">{project.title}</h3>
                      <p className="project-card__desc">{project.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
