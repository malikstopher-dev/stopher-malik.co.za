"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import createGlobe from "cobe";

const DEG = Math.PI / 180;
const BASE_THETA = 0.28;

export interface GlobeMarkerGeo {
  id: string;
  country: string;
  work: string;
  location: [number, number];
}

function latLngToVec([lat, lng]: [number, number]): [number, number, number] {
  const la = lat * DEG;
  const lo = lng * DEG - Math.PI;
  return [
    -Math.cos(la) * Math.cos(lo),
    Math.sin(la),
    Math.cos(la) * Math.sin(lo),
  ];
}

function project(
  v: [number, number, number],
  phi: number,
  theta: number,
): { x: number; y: number; visible: boolean } {
  const cp = Math.cos(phi);
  const sp = Math.sin(phi);
  const ct = Math.cos(theta);
  const st = Math.sin(theta);
  const x = cp * v[0] + sp * v[2];
  const y = sp * st * v[0] + ct * v[1] - cp * st * v[2];
  const z = -sp * ct * v[0] + st * v[1] + cp * ct * v[2];
  return {
    x: (x + 1) / 2,
    y: (1 - y) / 2,
    visible: z >= 0 || x * x + y * y >= 0.64,
  };
}

function wrapPi(x: number) {
  return ((x + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
}

function focusAngles(v: [number, number, number]) {
  const phi = Math.atan2(-v[0], v[2]);
  const sp = Math.sin(phi);
  const cp = Math.cos(phi);
  const a = sp * v[0] - cp * v[2];
  return { phi, theta: Math.atan2(v[1], -a) };
}

const DEFAULT_MARKERS: GlobeMarkerGeo[] = [
  {
    id: "south-africa",
    country: "South Africa",
    work: "Home base: Sandton studio. Design, build & SEO for local businesses.",
    location: [-26.2041, 28.0473],
  },
  {
    id: "dr-congo",
    country: "DR Congo",
    work: "Restaurant & hospitality sites: Le Centre, Levante, Marché LT.",
    location: [-4.4419, 15.2663],
  },
  {
    id: "mozambique",
    country: "Mozambique",
    work: "Hospitality & tourism websites for cross-border clients.",
    location: [-25.9692, 32.5732],
  },
  {
    id: "canada",
    country: "Canada",
    work: "E-commerce for the African diaspora.",
    location: [45.5017, -73.5673],
  },
];

interface CobeGlobeProps {
  markers?: GlobeMarkerGeo[];
  className?: string;
  speed?: number;
}

export function CobeGlobe({
  markers = DEFAULT_MARKERS,
  className = "",
  speed = 0.0022,
}: CobeGlobeProps) {
  const vecs = useMemo(
    () => markers.map((m) => latLngToVec(m.location)),
    [markers],
  );

  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffset = useRef(0);
  const thetaOffset = useRef(0);
  const basePhi = useRef(0);
  const baseTheta = useRef(BASE_THETA);
  const pausedRef = useRef(false);
  const hoveredRef = useRef(false);
  const reducedRef = useRef(false);
  const [width, setWidth] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    pausedRef.current = true;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!pointerStart.current) return;
      dragOffset.current = {
        phi: (e.clientX - pointerStart.current.x) / 280,
        theta: (e.clientY - pointerStart.current.y) / 900,
      };
    };
    const handlePointerUp = () => {
      if (pointerStart.current) {
        phiOffset.current += dragOffset.current.phi;
        thetaOffset.current += dragOffset.current.theta;
        dragOffset.current = { phi: 0, theta: 0 };
      }
      pointerStart.current = null;
      pausedRef.current = false;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.round(entries[0]?.contentRect.width ?? 0);
      if (w > 0) setWidth((prev) => (prev === w ? prev : w));
    });
    ro.observe(el);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          io.disconnect();
        }
      },
      { rootMargin: "100px" },
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!shouldRender) return;
    const canvas = canvasRef.current;
    if (!canvas || width === 0 || !markers.length) return;

    let frame = 0;
    let shown = false;
    const prefersReduced = reducedRef.current;

    const hub = markers[0].location;
    const spokes = markers.slice(1).map((m) => m.location);

    function lerpLoc(
      a: [number, number],
      b: [number, number],
      t: number,
    ): [number, number] {
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    }

    function smooth(t: number) {
      return t * t * (3 - 2 * t);
    }

    const fullArcs = spokes.map((to) => ({ from: hub, to }));

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width,
      height: width,
      phi: basePhi.current,
      theta: baseTheta.current,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 20000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.32],
      markerColor: [1, 1, 1],
      glowColor: [0.42, 0.45, 0.55],
      arcColor: [0.78, 0.83, 0.96],
      arcWidth: 0.32,
      arcHeight: 0.24,
      markers: [],
      arcs: prefersReduced ? fullArcs : [],
    });

    const animate = () => {
      const dragging = pointerStart.current !== null;

      if (!dragging && !pausedRef.current && !hoveredRef.current) {
        if (!prefersReduced) basePhi.current += speed;
      }

      const curPhi = basePhi.current + phiOffset.current + dragOffset.current.phi;
      const curTheta =
        baseTheta.current + thetaOffset.current + dragOffset.current.theta;

      if (hub && !prefersReduced) {
        const tSec = performance.now() / 1000;
        const arcs = spokes.map((to, k) => {
          const phase = (tSec * 0.1 + k * 0.37) % 1;
          return { from: hub, to: lerpLoc(hub, to, smooth(phase)) };
        });
        globe.update({ phi: curPhi, theta: curTheta, arcs });
      } else {
        globe.update({ phi: curPhi, theta: curTheta });
      }

      markers.forEach((_, i) => {
        const el = dotRefs.current[i];
        if (!el) return;
        const p = project(vecs[i], curPhi, curTheta);
        el.style.left = `${p.x * 100}%`;
        el.style.top = `${p.y * 100}%`;
        el.style.opacity = p.visible ? "1" : "0";
        el.style.pointerEvents = p.visible ? "auto" : "none";
      });

      if (!shown) {
        shown = true;
        canvas.style.opacity = "1";
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      globe.destroy();
    };
  }, [width, speed, markers, vecs, shouldRender]);

  const handleTiltMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedRef.current || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `${(-dy * 4).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(dx * 5).toFixed(2)}deg`);
  };

  const handleTiltLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div ref={wrapRef} className={`relative aspect-square w-full select-none ${className}`}>
      <div
        ref={tiltRef}
        className="relative h-full w-full"
        style={{
          transform:
            "perspective(1100px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transition: "transform 0.25s ease-out",
          willChange: "transform",
        }}
        onPointerMove={handleTiltMove}
        onPointerLeave={handleTiltLeave}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-[4%] z-0 rounded-full"
        >
          <div className="atmo-ring orbit-slow h-full w-full rounded-full" />
        </div>
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          className="block h-full w-full"
          style={{
            cursor: "grab",
            opacity: 0,
            transition: "opacity 1s ease",
            touchAction: "pan-y",
          }}
        />
        {markers.map((m, i) => (
          <div
            key={m.id}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            className="group absolute"
            style={{ left: "50%", top: "50%", opacity: 0 }}
            onMouseEnter={() => {
              hoveredRef.current = true;
              pausedRef.current = true;
            }}
            onMouseLeave={() => {
              hoveredRef.current = false;
              if (!pointerStart.current) pausedRef.current = false;
            }}
          >
            <span className="absolute left-0 top-0 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 opacity-0 transition-opacity duration-200 group-hover:opacity-70" />
            <span className="absolute left-0 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-md ring-2 ring-gray-950/60 transition-transform duration-150 group-hover:scale-125" />
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-4 left-0 hidden w-max max-w-[240px] -translate-x-1/2 translate-y-1 rounded-2xl bg-white px-3.5 py-2 text-left opacity-0 shadow-xl transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100 lg:block"
            >
              <span className="block text-xs font-semibold text-gray-900">{m.country}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-gray-600">{m.work}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
