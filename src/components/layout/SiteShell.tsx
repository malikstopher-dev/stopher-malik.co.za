import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { FloatingNav } from "./FloatingNav";
import { BackToTop } from "./BackToTop";
import { PremiumSurfaceEffects } from "./PremiumSurfaceEffects";
import { ScrollFX } from "./ScrollFX";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <Nav />
    <div id="main-content" tabIndex={-1}>{children}</div>
    <Footer />
    <FloatingNav />
    <PremiumSurfaceEffects />
    <ScrollFX />
    <BackToTop />
  </>;
}
