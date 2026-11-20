"use client";

import dynamic from "next/dynamic";

const CobeGlobe = dynamic(() => import("@/components/globe/CobeGlobe").then((mod) => mod.CobeGlobe), {
  ssr: false,
  loading: () => <div className="studio-globe__loading" aria-hidden="true" />,
});

export function LocationCard() {
  return (
    <div className="studio-globe">
      <div className="studio-globe__stage" data-magnetic>
        <div className="studio-globe__ring" aria-hidden="true" />
        <CobeGlobe className="studio-globe__canvas" />
      </div>
      <div className="studio-globe__meta">
        <p><span>Currently in</span> Sandton, Johannesburg</p>
        <p className="studio-globe__note">Drag the globe. Work reaches four countries.</p>
      </div>
    </div>
  );
}
