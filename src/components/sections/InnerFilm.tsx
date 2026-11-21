"use client";

import { useEffect, useRef } from "react";
import { heroPortrait, mountPortraitVideo } from "@/lib/portrait-video";

export function InnerFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current) return mountPortraitVideo(ref.current, heroPortrait);
  }, []);
  return (
    <div className="inner-film" aria-hidden="true">
      <video ref={ref} muted loop playsInline preload="none" />
      <div className="portrait-orbit"><i /><i /></div>
    </div>
  );
}
