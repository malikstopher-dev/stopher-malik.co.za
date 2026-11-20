import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  href?: string;
  external?: boolean;
  index?: number;
  eager?: boolean;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  image,
  href,
  external = false,
  index,
  eager = false,
  className = "",
}: ProjectCardProps) {
  const content = (
    <>
      <div className="project-card__media">
        <img
          src={image}
          alt={`${title} website preview`}
          className="project-card__img"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
        />
        {index ? <span className="project-card__index" aria-hidden="true">{String(index).padStart(2, "0")}</span> : null}
        {href ? <span className="project-card__open">View live <span aria-hidden="true">↗</span></span> : null}
      </div>
      <div className="project-card__caption">
        <div className="project-card__intro">
          <h3 className="project-card__title">{title}</h3>
          <p className="project-card__desc">{description}</p>
        </div>
        <ul className="project-card__tags" aria-label="Project services">
          {tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
    </>
  );

  return (
    <article className={`project-card ${className}`} data-reveal>
      {href ? (
        <Link
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="project-card__link"
          aria-label={`${title}${external ? " — opens in a new tab" : ""}`}
        >
          {content}
        </Link>
      ) : (
        <div className="project-card__link">{content}</div>
      )}
    </article>
  );
}
