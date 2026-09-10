import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "AKGLOBAL Trading",
    description: "Bilingual industrial supply and procurement website connecting South African sourcing with businesses in the DRC.",
    tags: ["Industrial Supply", "Bilingual"],
    image: "/assets/ak-globaltrading.jpg",
    href: "https://ak-globaltrading.com",
    external: true,
  },
  {
    title: "Salem Home Innovation",
    description: "Home services website generating enquiries from day one. Built for local SEO and client conversion.",
    tags: ["Web Design", "SEO"],
    image: "/assets/salem.jpg",
    href: "https://salemhi.co.za",
    external: true,
  },
  {
    title: "The Boma Cafe",
    description: "Premium restaurant and events website with menu showcase, gallery, and booking flow.",
    tags: ["Next.js", "Restaurant"],
    image: "/assets/the-boma-cafe.png",
    href: "https://the-boma-cafe.vercel.app",
    external: true,
  },
  {
    title: "Selrahc Architects",
    description: "Award-winning architecture studio website with bilingual support and project enquiry system.",
    tags: ["Architecture", "Bilingual"],
    image: "/assets/selrahc.jpg",
    href: "https://www.selrahcarchitects.com/",
    external: true,
  },
  {
    title: "JMOTO Electrical",
    description: "Professional electrical services website with service presentation and contact flow.",
    tags: ["Electrical", "SEO"],
    image: "/assets/jmoto.png",
    href: "https://jmoto-website.vercel.app/",
    external: true,
  },
  {
    title: "JKJ SolarTech",
    description: "Solar, electrical, CCTV and security services website for clients across South Africa.",
    tags: ["Solar / CCTV", "Security"],
    image: "/assets/jk.jpg",
    href: "https://jkjsolatech.co.za/",
    external: true,
  },
];

export function ProjectsSection() {
  return (
    <section className="projects py-5xl" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <div className="section-card">
        <div className="cin-section-head mb-12">
          <div>
            <span className="cin-kicker">Selected Work</span>
            <h2 id="projects-heading">Projects</h2>
          </div>
          <a href="/projects/" className="btn btn--ghost btn--sm">All Projects <span aria-hidden="true">&rarr;</span></a>
        </div>

        <div className="projects__grid grid grid-cols-1 md:grid-cols-2 gap-6" data-book>
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              href={project.href}
              external={project.external}
            />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
