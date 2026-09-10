import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer border-t border-white/5" style={{ paddingBottom: "120px" }}>
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand" style={{ maxWidth: "280px" }}>
            <div className="footer__logo" style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}>
              <div className="footer__logo-mark" style={{
                width: "28px",
                height: "28px",
                background: "#22c55e",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "0.875rem",
                color: "#09090b",
              }}>
                S
              </div>
              <span className="footer__logo-text" style={{
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "1rem",
              }}>
                SMK
              </span>
            </div>
            <p className="footer__tagline" style={{
              fontSize: "0.875rem",
              color: "#a1a1aa",
              lineHeight: "1.7",
            }}>
              Premium web design for South African businesses. Built to convert, designed to impress.
            </p>
          </div>

          <div>
            <h3 className="footer__column-title" style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#fafafa",
              marginBottom: "1.5rem",
            }}>
              Navigation
            </h3>
            <ul className="footer__links" style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}>
              <li><Link href="/projects/" className="footer__link">Projects</Link></li>
              <li><Link href="/stack/" className="footer__link">Stack</Link></li>
              <li><Link href="/blog/" className="footer__link">Blog</Link></li>
              <li><Link href="/about/" className="footer__link">About</Link></li>
              <li><Link href="/contact/" className="footer__link">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer__column-title" style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#fafafa",
              marginBottom: "1.5rem",
            }}>
              Services
            </h3>
            <ul className="footer__links" style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}>
              <li><Link href="/web-design/" className="footer__link">Web Design</Link></li>
              <li><Link href="/ecommerce/" className="footer__link">E-Commerce</Link></li>
              <li><Link href="/seo-performance/" className="footer__link">SEO & Performance</Link></li>
              <li><Link href="/branding/" className="footer__link">Branding</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer__column-title" style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#fafafa",
              marginBottom: "1.5rem",
            }}>
              Connect
            </h3>
            <ul className="footer__links" style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}>
              <li><a href="mailto:info@stopher-malik.co.za" className="footer__link">info@stopher-malik.co.za</a></li>
              <li><a href="tel:+27729998863" className="footer__link">+27 72 999 8863</a></li>
              <li><a href="https://wa.me/27825100050" className="footer__link" target="_blank" rel="noopener">WhatsApp</a></li>
              <li><a href="https://www.google.com/maps?q=Paulshof,Sandton,Johannesburg" className="footer__link" target="_blank" rel="noopener">Johannesburg, South Africa</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom" style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <p className="footer__copyright" style={{
            fontSize: "0.8125rem",
            color: "#52525b",
          }}>
            &copy; {currentYear} SMK Web Design. All rights reserved.
          </p>
          <div className="footer__legal" style={{
            display: "flex",
            gap: "2rem",
          }}>
            <Link href="/privacy/" className="footer__legal-link" style={{
              fontSize: "0.8125rem",
              color: "#52525b",
              transition: "color 0.2s",
            }}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
