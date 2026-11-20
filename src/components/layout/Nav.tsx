"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./site-nav.module.css";
import { socials } from "@/lib/socials";

const links = [
  { href: "/projects/", label: "Work", index: "01" },
  { href: "/about/", label: "About", index: "02" },
  { href: "/web-design/", label: "Services", index: "03" },
  { href: "/blog/", label: "Journal", index: "04" },
  { href: "/contact/", label: "Contact", index: "05" },
];

const menuLinks = [{ href: "/", label: "Home", index: "00" }, ...links];

export function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = window.scrollY;
      setScrolled(top > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      navRef.current?.style.setProperty("--nav-progress", String(max > 0 ? Math.min(1, top / max) : 0));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;
    const first = menuRef.current?.querySelector<HTMLElement>('[data-menu-home]');
    const focusTimer = window.setTimeout(() => first?.focus({ preventScroll: true }), 90);
    menuRef.current?.scrollTo({ top: 0, behavior: 'instant' });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [
        ...(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
        ...(toggle ? [toggle] : []),
      ];
      if (!focusable.length) return;
      const firstNode = focusable[0];
      const lastNode = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === firstNode) {
        event.preventDefault();
        lastNode.focus();
      } else if (!event.shiftKey && document.activeElement === lastNode) {
        event.preventDefault();
        firstNode.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${isHome ? styles.overlay : ""} ${scrolled ? styles.scrolled : ""} ${open ? styles.menuOpen : ""}`}
      aria-label="Main navigation"
    >
      <span className={styles.progress} aria-hidden="true" />
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Stopher Malik — home">
          <img className={styles.mark} src="/assets/stopher-portrait.webp" alt="" width="56" height="56" />
          <span className={styles.wordmark}>
            <span className={styles.name}>Stopher Malik</span>
            <span className={styles.role}>SMK · Web design</span>
          </span>
        </Link>

        <div className={styles.links}>
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={styles.link}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className={styles.actions}>
          <span className={styles.status}>
            <span aria-hidden="true" />
            Open for work
          </span>
          <Link href="/contact/" className={styles.cta}>
            Let&rsquo;s talk <span aria-hidden="true">↗</span>
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        id="site-menu"
        ref={menuRef}
        className={styles.menu}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
      >
        <div className={styles.menuInner}>
          <div className={styles.socialStrip} aria-label="Social profiles" role="group">
            <strong>Find me online</strong>
            {socials.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}<span aria-hidden="true"> ↗</span></a>
            ))}
          </div>
          <div className={styles.menuNav}>
            <p className={styles.menuLabel}>Index</p>
            <ul className={styles.menuLinks}>
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={close} data-menu-home={link.href === "/" ? "" : undefined} aria-current={pathname === link.href ? "page" : undefined}>
                    <span>{link.index}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.menuAside}>
            <figure className={styles.menuPortrait}>
              <img src="/assets/stopher-portrait.webp" alt="" loading="lazy" decoding="async" />
              <figcaption>Stopher Malik — Johannesburg</figcaption>
            </figure>
            <div className={styles.menuContact}>
              <a href="mailto:info@stopher-malik.co.za">info@stopher-malik.co.za</a>
              <a href="tel:+27729998863">+27 72 999 8863</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
