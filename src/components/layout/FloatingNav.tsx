"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const destinations = [
  {
    href: "/",
    label: "Home",
    icon: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></>,
  },
  {
    href: "/about/",
    label: "About",
    icon: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  },
  {
    href: "/projects/",
    label: "Projects",
    icon: <><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></>,
  },
  {
    href: "/stack/",
    label: "Stack",
    icon: <><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></>,
  },
  {
    href: "/blog/",
    label: "Blog",
    icon: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>,
  },
  {
    href: "/contact/",
    label: "Contact",
    icon: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></>,
  },
];

export function FloatingNav() {
  const pathname = usePathname();

  return (
    <nav className="floating-nav" aria-label="Site navigation" data-reveal>
      {destinations.map(({ href, label, icon }) => {
        const active = href === "/" ? pathname === "/" : pathname === href.slice(0, -1) || pathname.startsWith(href);

        return (
          <Link
            href={href}
            key={href}
            className={`floating-nav__item${active ? " floating-nav__item--active" : ""}`}
            aria-label={label}
            aria-current={active ? "page" : undefined}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {icon}
            </svg>
          </Link>
        );
      })}
    </nav>
  );
}
