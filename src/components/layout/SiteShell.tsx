import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { FloatingNav } from "./FloatingNav";
import { BackToTop } from "./BackToTop";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <>
    <Nav />
    {children}
    <Footer />
    <FloatingNav />
    <a href="https://wa.me/27825100050" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M21 11.5A9 9 0 0 1 8 20l-5 1 1-5A9 9 0 1 1 21 11.5Z"/><path d="M8 7c0 5 4 9 9 9l1-3-3-1-1 1-3-3 1-1-1-3Z"/></svg>
    </a>
    <BackToTop />
  </>;
}
