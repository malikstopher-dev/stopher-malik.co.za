import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
  external?: boolean;
  className?: string;
}

export function ProjectCard({ 
  title, 
  description, 
  tags, 
  image, 
  href, 
  external = false,
  className = "" 
}: ProjectCardProps) {
  return (
    <article className={`project-card relative overflow-hidden group ${className}`} data-tilt data-magnetic data-holo data-book>
      <Link 
        href={href} 
        target={external ? "_blank" : undefined} 
        rel={external ? "noopener noreferrer" : undefined}
        className="block"
      >
        <div className="project-card__img-wrap relative overflow-hidden aspect-[16/10]">
          <img 
            src={image} 
            alt=""
            className="project-card__img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <span className="project-card__hover-cta absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Site <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
        <div className="project-card__body p-6">
          <div className="project-card__tags flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span key={tag} className="project-card__tag">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="project-card__title text-white font-display font-semibold text-xl mb-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="project-card__desc text-white-muted text-body-md leading-relaxed">
            {description}
          </p>
        </div>
      </Link>
    </article>
  );
}
