"use client";

import dynamic from "next/dynamic";

const ThreeGlobe = dynamic(() => import("@/components/globe/ThreeGlobe").then((mod) => mod.ThreeGlobe), {
  ssr: false,
  loading: () => (
    <div className="relative flex-1 min-h-[200px] flex items-center justify-center text-white/40 font-display text-label-sm">
      Loading globe...
    </div>
  ),
});

export function LocationCard() {
  return (
    <div className="location-card card relative overflow-hidden" data-holo data-magnetic>
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center gap-3 text-white mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" className="text-accent" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="font-display font-semibold text-body-lg">Sandton, Johannesburg, South Africa</span>
        </div>
        <div className="relative flex-1 min-h-[200px]">
          <ThreeGlobe
            markerLat={-26.1076}
            markerLon={28.0567}
            markerLabel="Sandton, Johannesburg, South Africa"
          />
        </div>
      </div>
    </div>
  );
}
