import Link from "next/link";
import { LocalTime } from "./LocalTime";

import { socials } from "@/lib/socials";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <img
              className="site-footer__mark"
              src="/assets/stopher-portrait.webp"
              alt=""
              width="40"
              height="40"
              loading="lazy"
              decoding="async"
            />
            <p>
              Independent web design<br />and development practice.
            </p>
          </div>
          <a href="mailto:info@stopher-malik.co.za" className="site-footer__email">
            Let&rsquo;s make<br /><em>something.</em>
          </a>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__column site-footer__column--wide">
            <h3>Stopher Malik</h3>
            <p>
              Web design, branding and SEO for businesses in South Africa and abroad.
            </p>
            <LocalTime />
          </div>
          <div className="site-footer__column">
            <h3>Explore</h3>
            <ul>
              <li><Link href="/projects/">Work</Link></li>
              <li><Link href="/about/">About</Link></li>
              <li><Link href="/blog/">Journal</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
              <li><Link href="/profile/">Business card</Link></li>
            </ul>
          </div>
          <div className="site-footer__column">
            <h3>Services</h3>
            <ul>
              <li><Link href="/web-design/">Web design</Link></li>
              <li><Link href="/ecommerce/">E-commerce</Link></li>
              <li><Link href="/seo-performance/">SEO &amp; performance</Link></li>
              <li><Link href="/branding/">Branding</Link></li>
            </ul>
          </div>
          <div className="site-footer__column">
            <h3>Elsewhere</h3>
            <ul>
              {socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>&copy; {year} SMK Web Design. All rights reserved.</p>
          <div>
            <Link href="/privacy/">Privacy</Link>
            <Link href="/terms/">Terms</Link>
            <Link href="/refund-policy/">Refunds</Link>
          </div>
          <p>Johannesburg · South Africa</p>
        </div>
      </div>
    </footer>
  );
}
