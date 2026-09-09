"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

interface HeroProps {
  className?: string;
}

export function Hero({ className = "" }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isStatic, setIsStatic] = useState(false);

  const frameSequenceRef = useRef<{
    canvas: HTMLCanvasElement;
    poster: HTMLImageElement;
    ctx: CanvasRenderingContext2D;
    cache: Map<number, HTMLImageElement>;
    pending: Set<number>;
    queue: number[];
    active: number;
    destroyed: boolean;
    visible: boolean;
    hidden: boolean;
    raf: number;
    dpr: number;
    cw: number;
    ch: number;
    count: number;
    current: number;
    target: number;
    direction: number;
    dirty: boolean;
    firstDrawn: boolean;
    lastQueued: number;
    dir: string;
    lastDir: string;
    mobileMedia: MediaQueryList;
    concurrency: number;
    windowBack: number;
    windowFwd: number;
    initialBurst: number;
    dprCap: number;
    onFirstFrame: (idx: number) => void;
    onDisabled: () => void;
    _measure: () => void;
    _dir: () => string;
    _src: (i: number) => string;
    _request: (i: number) => void;
    _pump: () => void;
    _load: (i: number) => void;
    _nearestLoaded: (t: number) => number;
    _queueWindow: (t: number) => void;
    _backgroundFill: () => void;
    _draw: (img: HTMLImageElement) => void;
    _tick: () => void;
    _needsLoop: () => boolean;
    _wake: () => void;
    _sleep: () => void;
    destroy: () => void;
    begin: () => void;
    setProgress: (p: number) => void;
  } | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isReducedMotion || !canvasRef.current || !posterRef.current || !trackRef.current) {
      if (!isReducedMotion) setIsStatic(true);
      return;
    }

    const canvas = canvasRef.current;
    const poster = posterRef.current;
    const track = trackRef.current;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      setIsStatic(true);
      return;
    }

    const mobileMedia = window.matchMedia("(max-width: 768px)");
    const isMobileNow = mobileMedia.matches;
    const dirDesktop = "/assets/hero-frames/desktop";
    const dirMobile = "/assets/hero-frames/mobile";
    const countDesktop = 192;
    const countMobile = 96;
    const dprCap = isMobileNow ? 1.5 : 2;
    const concurrency = isMobileNow ? 2 : 3;
    const windowBack = 2;
    const windowFwd = isMobileNow ? 6 : 10;
    const initialBurst = isMobileNow ? 8 : 12;

    const pad4 = (n: number) => ("0000" + n).slice(-4);

    const _dir = () => {
      const m = window.matchMedia("(max-width: 768px)");
      return m.matches ? dirMobile : dirDesktop;
    };

    const _src = (i: number) => `${_dir()}/frame_${pad4(i + 1)}.webp`;

    const _measure = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      cw = Math.max(1, Math.round(rect.width * dpr));
      ch = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== cw) canvas.width = cw;
      if (canvas.height !== ch) canvas.height = ch;

      const newDir = _dir();
      if (lastDir && lastDir !== newDir) {
        cache.clear();
        queue.length = 0;
        pending.clear();
        current = -1;
      }
      lastDir = newDir;
      dir = newDir;
      count = newDir === dirMobile ? countMobile : countDesktop;
    };

    const _request = (i: number) => {
      if (destroyed || i < 0 || i >= count) return;
      if (cache.has(i) || pending.has(i)) return;
      pending.add(i);
      queue.push(i);
      _pump();
    };

    const _pump = () => {
      while (active < concurrency && queue.length) {
        const i = queue.shift()!;
        _load(i);
      }
    };

    const _load = (i: number) => {
      active++;
      const img = new Image();
      img.onload = () => {
        if (destroyed) return;
        cache.set(i, img);
        pending.delete(i);
        active--;
        dirty = true;
        _pump();
        _wake();
      };
      img.onerror = () => {
        if (destroyed) return;
        pending.delete(i);
        active--;
        _pump();
        if (cache.size === 0 && !firstDrawn) {
          destroyed = true;
          setIsStatic(true);
        }
      };
      img.decoding = "async";
      img.src = _src(i);
    };

    const _nearestLoaded = (t: number) => {
      if (cache.has(t)) return t;
      for (let d = 1; d < count; d++) {
        if (t - d >= 0 && cache.has(t - d)) return t - d;
        if (t + d < count && cache.has(t + d)) return t + d;
      }
      return -1;
    };

    const _queueWindow = (t: number) => {
      const n = count - 1;
      let b = t - windowBack;
      let f = t + windowFwd;
      if (direction < 0) {
        b = t - windowFwd;
        f = t + windowBack;
      }
      for (let i = Math.max(0, b); i <= Math.min(n, f); i++) _request(i);
    };

    const _backgroundFill = () => {
      if (queue.length || active > 0) return;
      for (let i = 0; i < count; i++) {
        const idx = (lastQueued + 1 + i) % count;
        if (!cache.has(idx) && !pending.has(idx)) {
          lastQueued = idx;
          _request(idx);
          return;
        }
      }
    };

    const _draw = (img: HTMLImageElement) => {
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;
      const s = Math.max(cw / iw, ch / ih);
      const dw = iw * s;
      const dh = ih * s;
      ctx.imageSmoothingEnabled = true;
      const dx = (cw - dw) / 2;
      const dy = dh > ch ? (ch - dh) * 0.28 : (ch - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const _tick = () => {
      raf = 0;
      if (destroyed) return;

      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && (Math.abs(rect.width * dpr - cw) > 1 || Math.abs(rect.height * dpr - ch) > 1)) {
        _measure();
        current = -1;
        dirty = true;
      }

      if (dirty) {
        dirty = false;
        _queueWindow(target);
        _backgroundFill();

        const draw = _nearestLoaded(target);
        if (draw >= 0 && draw !== current) {
          current = draw;
          _draw(cache.get(draw)!);
          if (!firstDrawn) {
            firstDrawn = true;
            poster.classList.add("is-hidden");
          }
        }
      }

      if (_needsLoop()) _wake();
    };

    const _needsLoop = () => queue.length > 0 || active > 0 || current !== target;

    const _wake = () => {
      if (raf || destroyed || !visible || hidden) return;
      raf = requestAnimationFrame(_tick);
    };

    const _sleep = () => {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
    };

    const destroy = () => {
      destroyed = true;
      _sleep();
      if (io) { io.disconnect(); }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      cache.clear();
      queue.length = 0;
      pending.clear();
    };

    const begin = () => {
      _measure();
      const n = count;
      for (let i = 0; i < initialBurst && i < n; i++) _request(i);
      lastQueued = Math.min(initialBurst, n) - 1;

      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver((entries) => {
          visible = entries[0].isIntersecting;
          if (visible) _wake(); else _sleep();
        }, { threshold: 0 });
        io.observe(canvas);
      } else {
        visible = true;
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisibility);

      visible = true;
      _wake();
    };

    const setProgress = (p: number) => {
      if (destroyed) return;
      const n = count;
      const t = Math.round(Math.min(1, Math.max(0, p)) * (n - 1));
      if (t !== target) {
        direction = t > target ? 1 : -1;
        target = t;
        dirty = true;
        _wake();
      }
    };

    let io: IntersectionObserver | null = null;

    const onScroll = () => {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      track.parentElement?.setAttribute("data-stage", p < 0.04 ? "in" : "reveal");
      setProgress(p);
    };

    const onResize = () => {
      _measure();
      current = -1;
      dirty = true;
      onScroll();
      _wake();
    };

    const onVisibility = () => {
      hidden = document.hidden;
      if (hidden) _sleep(); else _wake();
    };

    const cache = new Map<number, HTMLImageElement>();
    const pending = new Set<number>();
    const queue: number[] = [];
    let active = 0;
    let destroyed = false;
    let visible = false;
    let hidden = false;
    let raf = 0;
    let dpr = 1;
    let cw = 0;
    let ch = 0;
    let count = isMobileNow ? countMobile : countDesktop;
    let current = -1;
    let target = 0;
    let direction = 1;
    let dirty = false;
    let firstDrawn = false;
    let lastQueued = -1;
    let lastDir = "";
    let dir = isMobileNow ? dirMobile : dirDesktop;

    frameSequenceRef.current = {
      canvas, poster, ctx, cache, pending, queue, active, destroyed, visible, hidden, raf,
      dpr, cw, ch, count, current, target, direction, dirty, firstDrawn, lastQueued, dir, lastDir,
      mobileMedia, concurrency, windowBack, windowFwd, initialBurst, dprCap,
      onFirstFrame: () => {},
      onDisabled: () => setIsStatic(true),
      _measure, _dir, _src, _request, _pump, _load, _nearestLoaded, _queueWindow,
      _backgroundFill, _draw, _tick, _needsLoop, _wake, _sleep, destroy, begin, setProgress,
    };

    begin();
    onScroll();

    return () => {
      destroy();
    };
  }, [isReducedMotion]);

  if (isReducedMotion || isStatic) {
    return (
      <section id="home" className={`hero relative min-h-screen w-full ${className}`} aria-label="Introduction">
        <div className="absolute inset-0 bg-black" aria-hidden="true" />
        <img src="/assets/hero-frames/poster-desktop.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative z-10 min-h-screen flex items-end justify-center px-6 py-20">
          <div className="container max-w-[1200px] mx-auto px-6 w-full">
            <p className="ch-eyebrow text-accent font-display text-label-sm tracking-widest uppercase mb-6 animate-in">
              Johannesburg &middot; South Africa
            </p>
            <h1 className="ch-wordmark text-white font-display font-bold text-display-2xl tracking-tight leading-tight mb-6 animate-in animate-in-delay-1">
              <span className="block">SMK</span>
              <span className="block">WEB DESIGN</span>
            </h1>
            <p className="ch-tagline text-white/80 text-body-xl max-w-2xl mb-8 animate-in animate-in-delay-2">
              Digital experiences with <em>depth</em>.
            </p>
            <p className="ch-desc text-white-muted text-body-lg max-w-xl mb-10 animate-in animate-in-delay-3">
              I design and build distinctive websites, connected platforms, and business systems that turn ambitious ideas into memorable digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-in animate-in-delay-4">
              <Link href="/projects/" className="btn btn--accent btn--lg w-full sm:w-auto">
                Explore My Work <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/contact/" className="btn btn--ghost btn--lg w-full sm:w-auto">
                Start a Project
              </Link>
            </div>
          </div>
        </div>
        <p className="ch-scrollhint absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-label-xs font-display uppercase tracking-widest animate-pulse" aria-hidden="true">
          Scroll
        </p>
      </section>
    );
  }

  return (
    <section id="home" className={`hero relative min-h-screen w-full ${className}`} aria-label="Introduction">
      <div className="absolute inset-0 bg-black" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black-soft to-black" aria-hidden="true" />
      <div id="cinematic-hero" className="relative w-full h-full">
        <div id="ch-track" ref={trackRef} className="relative h-[300vh] md:h-[400vh] min-h-screen">
          <div id="ch-stage" className="sticky top-0 h-screen h-svh w-full overflow-hidden isolate">
            <div className="ch-depth-1 absolute inset-[-6%] z-1 pointer-events-none" aria-hidden="true" style={{
              background: `
                radial-gradient(120% 90% at 50% 108%, rgba(37, 99, 235, 0.22) 0%, transparent 55%),
                radial-gradient(80% 60% at 50% -10%, rgba(59, 130, 246, 0.10) 0%, transparent 60%),
                linear-gradient(180deg, #050507 0%, #07070c 45%, #050508 100%)
              `
            }} />
            <div className="ch-depth-2 absolute inset-[-4%] z-2 pointer-events-none will-change-transform" aria-hidden="true" style={{
              background: `
                radial-gradient(46% 34% at 50% 62%, rgba(59, 130, 246, 0.20) 0%, transparent 70%),
                radial-gradient(70% 50% at 50% 30%, rgba(37, 99, 235, 0.13) 0%, transparent 70%)
              `,
              filter: "blur(2px)"
            }} />
            <canvas
              id="ch-canvas"
              ref={canvasRef}
              className="absolute inset-0 z-3 w-full h-full"
              aria-hidden="true"
            />
            <img
              id="ch-poster"
              ref={posterRef}
              src="/assets/hero-frames/poster-desktop.webp"
              srcSet="/assets/hero-frames/poster-mobile.webp 720w, /assets/hero-frames/poster-desktop.webp 1440w"
              sizes="100vw"
              alt="Cinematic portrait of Stopher Malik emerging from darkness into blue and red light"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 z-3 w-full h-full object-cover"
              style={{ objectPosition: "50% 22%" }}
            />
            <canvas
              id="ch-particles"
              className="absolute inset-0 z-4 w-full h-full pointer-events-none"
              aria-hidden="true"
            />
            <div className="ch-focus absolute inset-0 z-5 pointer-events-none" aria-hidden="true" style={{
              background: "radial-gradient(38% 30% at 50% 58%, rgba(255, 77, 46, 0) 0%, transparent 70%)",
              mixBlendMode: "screen",
              opacity: 0,
            }} />
            <div className="ch-grain absolute inset-0 z-6 pointer-events-none" aria-hidden="true" style={{
              backgroundImage: `
                repeating-conic-gradient(from 11deg, rgba(255,255,255,0.028) 0% 25%, transparent 0% 50%),
                radial-gradient(140% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)
              `,
              backgroundSize: "3px 3px, 100% 100%",
              mixBlendMode: "overlay",
            }} />
            <div className="ch-copy absolute inset-0 z-7 flex flex-col justify-end pointer-events-none" style={{ pointerEvents: "none" }}>
              <div className="ch-copy-inner pointer-events-auto w-full">
                <p className="ch-eyebrow text-accent font-display text-label-sm tracking-widest uppercase mb-6 animate-in" style={{ letterSpacing: "0.24em" }}>
                  <span className="inline-block w-[34px] h-[1px] bg-gradient-to-r from-accent to-transparent mr-3" aria-hidden="true"></span>
                  Johannesburg &middot; South Africa
                </p>
                <h1 className="ch-wordmark text-white font-display font-bold tracking-tight leading-[0.94] mb-6 animate-in animate-in-delay-1">
                  <span className="block ch-wm-line overflow-hidden"><span className="block ch-wm-in transform translate-y-full transition-transform duration-[1.1s] ease-out">SMK</span></span>
                  <span className="block ch-wm-line overflow-hidden"><span className="block ch-wm-in transform translate-y-full transition-transform duration-[1.1s] ease-out">WEB DESIGN</span></span>
                </h1>
                <p className="ch-tagline text-white font-display font-medium mb-4 animate-in animate-in-delay-2" style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.6rem)" }}>
                  Digital experiences with <em className="text-accent">depth</em>.
                </p>
                <p className="ch-desc text-white-muted max-w-[58ch] mb-10 animate-in animate-in-delay-3" style={{ fontSize: "var(--body-md)", lineHeight: "var(--leading-snug)" }}>
                  I design and build distinctive websites, connected platforms, and business systems that turn ambitious ideas into memorable digital experiences.
                </p>
                <div className="ch-ctas flex flex-wrap gap-4 animate-in animate-in-delay-4">
                  <Link href="/projects/" className="btn btn--accent btn--lg">
                    Explore My Work <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <Link href="/contact/" className="btn btn--ghost btn--lg">
                    Start a Project
                  </Link>
                </div>
              </div>
            </div>
            <p id="ch-status" role="status" aria-live="polite" className="sr-only" />
          </div>
        </div>
        <p className="ch-scrollhint absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-label-xs font-display uppercase tracking-widest animate-pulse" aria-hidden="true" style={{ letterSpacing: "0.3em" }}>
          Scroll
        </p>
      </div>
    </section>
  );
}
