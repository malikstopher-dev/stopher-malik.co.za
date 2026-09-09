interface SkillsSectionProps {
  className?: string;
}

const skills = [
  "Web Design",
  "UI/UX Expertise",
  "React & Next.js",
  "Cloudflare",
  "Figma Tools Mastery",
  "Collaborative Team Player",
  "Problem Solving",
  "Keeping Abreast of Trends",
  "Responsive Design",
];

export function SkillsSection({ className = "" }: SkillsSectionProps) {
  return (
    <div className={`skills-card card min-w-0 ${className}`}>
      <h2 className="section-title mb-6">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18" aria-hidden="true">
          <polygon points="12,3 21,12 12,21 3,12" />
        </svg>
        Skills
      </h2>
      <ul className="flex min-w-0 flex-wrap gap-3" aria-label="Skills">
        {skills.map((skill) => (
          <li key={skill} className="tech-pill max-w-full whitespace-normal break-words">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
