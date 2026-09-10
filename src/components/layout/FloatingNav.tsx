"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const destinations = [
  { href: "/", label: "Home", path: "M3 10 12 3l9 7v11h-7v-7h-4v7H3Z" },
  { href: "/about/", label: "About", path: "M20 21v-2a6 6 0 0 0-6-6h-4a6 6 0 0 0-6 6v2M16 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0" },
  { href: "/projects/", label: "Projects", path: "M3 7h18v14H3ZM8 7V3h8v4M3 12h18" },
  { href: "/stack/", label: "Stack", path: "m2 7 10-5 10 5-10 5ZM2 12l10 5 10-5M2 17l10 5 10-5" },
  { href: "/blog/", label: "Blog", path: "M4 19a2 2 0 0 1 2-2h14M6 2h14v20H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM8 6h8M8 10h6" },
  { href: "/contact/", label: "Contact", path: "m22 2-7 20-4-9-9-4ZM22 2 11 13" },
];

export function FloatingNav() {
  const pathname = usePathname();
  return (
    <nav className="floating-nav" aria-label="Site navigation">
      {destinations.map(({ href, label, path }) => {
        const active = href === "/" ? pathname === "/" : pathname === href.slice(0, -1) || pathname.startsWith(href);
        return (
          <Link href={href} key={href} className={`floating-nav__item${active ? " floating-nav__item--active" : ""}`} aria-label={label} aria-current={active ? "page" : undefined}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>
            <span className="floating-nav__label">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
