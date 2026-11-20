"use client";

import { useEffect, useRef } from "react";
import { createSequence } from "@/lib/sequence";

export function InnerFilm() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const track = canvas?.parentElement?.parentElement;
    if (!canvas || !track) return;
    const motion = matchMedia('(prefers-reduced-motion: no-preference)');
    const compact = matchMedia('(max-width: 768px)');
    let stop: (() => void) | undefined;
    const setup = () => {
      stop?.();
      canvas.style.opacity = '0';
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      if (!motion.matches || connection?.saveData || connection?.effectiveType === '2g') return;
      const mobile = compact.matches;
      stop = createSequence({ track, canvas, count: mobile ? 96 : 192, exitScrub: true, autoplay: true,
        cacheSize: mobile ? 13 : 20, concurrency: mobile ? 2 : 3,
        source: i => `/assets/hero-frames/${mobile ? 'mobile' : 'desktop'}/frame_${String(i + 1).padStart(4, '0')}.webp`,
        onFrame: () => { canvas.style.opacity = '1'; },
      });
    };
    setup();
    motion.addEventListener('change', setup);
    compact.addEventListener('change', setup);
    return () => { stop?.(); motion.removeEventListener('change', setup); compact.removeEventListener('change', setup); };
  }, []);
  return <div className="inner-film" aria-hidden="true"><canvas ref={ref} /><div className="portrait-orbit"><i /><i /></div></div>;
}
