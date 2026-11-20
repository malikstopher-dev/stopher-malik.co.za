"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { createSequence } from "@/lib/sequence";
import styles from "./hero.module.css";

const DESKTOP_FRAMES = 192;
const MOBILE_FRAMES = 96;

function frameSource(compact: boolean, index: number) {
  const folder = compact ? "mobile" : "desktop";
  return `/assets/hero-frames/${folder}/frame_${String(index + 1).padStart(4, "0")}.webp`;
}

export function Hero() {
  const trackRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const canvas = canvasRef.current;
    if (!track || !canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 768px)");
    let dispose: (() => void) | undefined;

    const syncPhase = (name: string) => {
      copyRef.current?.toggleAttribute("inert", name !== "intro");
      outroRef.current?.toggleAttribute("inert", name !== "outro");
      if (copyRef.current) {
        if (name === "intro") copyRef.current.removeAttribute("aria-hidden");
        else copyRef.current.setAttribute("aria-hidden", "true");
      }
      if (outroRef.current) {
        if (name === "outro") outroRef.current.removeAttribute("aria-hidden");
        else outroRef.current.setAttribute("aria-hidden", "true");
      }
    };

    const start = () => {
      dispose?.();
      dispose = undefined;
      syncPhase("intro");
      const connection = (navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }).connection;
      if (reduced.matches || connection?.saveData || connection?.effectiveType === "2g") return;

      const mobile = compact.matches;
      const count = mobile ? MOBILE_FRAMES : DESKTOP_FRAMES;

      dispose = createSequence({
        track,
        canvas,
        count,
        autoplay: true,
        source: (index) => frameSource(mobile, index),
        focusY: mobile ? 0.5 : 0.3,
        smoothing: mobile ? 0.18 : 0.14,
        cacheSize: mobile ? 13 : 24,
        concurrency: mobile ? 2 : 3,
        phase: (value) => {
          const name = value < 0.15 ? "intro" : value < 0.56 ? "film" : "outro";
          syncPhase(name);
          return name;
        },
        onFrame: (index) => {
          if (counterRef.current) {
            counterRef.current.textContent = `Frame ${String(index + 1).padStart(3, "0")} / ${count}`;
          }
        },
      });
    };

    start();
    compact.addEventListener("change", start);
    reduced.addEventListener("change", start);

    return () => {
      dispose?.();
      compact.removeEventListener("change", start);
      reduced.removeEventListener("change", start);
    };
  }, []);

  return (
    <section ref={trackRef} id="home" className={styles.track} data-phase="intro" aria-labelledby="hero-title">
      <div className={styles.stage}>
        <div className={styles.ghost} aria-hidden="true">SMK</div>

        <div className={styles.film} aria-hidden="true">
          <picture>
            <source media="(max-width: 768px)" srcSet="/assets/hero-frames/poster-mobile.webp" />
            <source media="(prefers-reduced-motion: reduce)" srcSet="/assets/hero-frames/desktop/frame_0192.webp" />
            <img src="/assets/hero-frames/poster-desktop.webp" alt="" fetchPriority="high" />
          </picture>
          <canvas ref={canvasRef} />
          <div className={styles.grain} />
          <div className="portrait-orbit" aria-hidden="true"><i /><i /></div>
        </div>

        <div ref={copyRef} className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.dot} aria-hidden="true" />
            Independent designer &amp; developer
            <span className={styles.slash} aria-hidden="true">/</span>
            Johannesburg
          </p>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.line}><span>Stopher</span></span>
            <span className={`${styles.line} ${styles.surname}`}><span>Malik</span></span>
          </h1>
          <p className={styles.lede}>
            Websites with <em>depth</em> — designed to hold attention and built to earn trust.
          </p>
          <div className={styles.actions}>
            <a href="#work" className={styles.primary}>
              Selected work <span aria-hidden="true">↓</span>
            </a>
            <Link href="/contact/" className={styles.secondary}>
              Start a project <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className={styles.availability}>
            <span aria-hidden="true" /> Open for new projects · Worldwide
          </p>
        </div>

        <div ref={outroRef} className={styles.outro} aria-hidden="true">
          <p className={styles.kicker}>The reveal</p>
          <h2>Clarity,<br /><em>by design.</em></h2>
          <p>Less noise. More meaning. Strategy, design and development under one roof.</p>
          <a href="#work">View selected work <span aria-hidden="true">↓</span></a>
        </div>

        <div className={styles.rail} aria-hidden="true">
          <span className={styles.railCount}>01</span>
          <span className={styles.railLine}><span /></span>
          <span className={styles.railWord}>Scroll to develop</span>
        </div>

        <div className={styles.meta} aria-hidden="true">
          <span ref={counterRef}>Portrait study — blue pigment</span>
          <span>Design · Development · SEO</span>
        </div>

        <p className={styles.scroll}>
          <span aria-hidden="true" />
          Scroll to reveal
        </p>
      </div>
    </section>
  );
}
