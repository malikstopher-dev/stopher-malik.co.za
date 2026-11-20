"use client";

import { useEffect, useRef } from "react";
import { createSequence } from "@/lib/sequence";
import styles from "./about-sequence.module.css";

const FRAME_COUNT = 96;
const source = (index: number) =>
  `/assets/about-frames/desktop/frame_${String(index + 1).padStart(4, "0")}.webp`;

const chapters = [
  { index: "01", title: "Form", copy: "Presence, before anything else." },
  { index: "02", title: "Craft", copy: "Precision is something you can feel." },
  { index: "03", title: "Impact", copy: "Attention, turned into action." },
];

export function AboutSequence() {
  const trackRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const canvas = canvasRef.current;
    if (!track || !canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const sequence = createSequence({
      track,
      canvas,
      count: FRAME_COUNT,
      source,
      focusY: 0.5,
      smoothing: 0.14,
      cacheSize: 20,
      concurrency: 3,
      phase: (value) => String(Math.min(2, Math.floor(value * 3))),
      onFrame: (index) => {
        if (counterRef.current) {
          counterRef.current.textContent = `${String(index + 1).padStart(2, "0")} / ${FRAME_COUNT}`;
        }
      },
    });

    return sequence;
  }, []);

  return (
    <section ref={trackRef} className={styles.track} aria-labelledby="about-sequence-title" data-phase="0">
      <div className={styles.stage}>
        <header className={styles.head}>
          <p className={styles.kicker}>The practice</p>
          <h2 id="about-sequence-title">
            Made with <em>intent.</em>
          </h2>
        </header>

        <figure className={styles.film}>
          <img
            className={styles.poster}
            src={source(0)}
            alt="Stopher Malik surrounded by sweeping waves of blue pigment"
            loading="lazy"
            decoding="async"
          />
          <canvas ref={canvasRef} aria-hidden="true" />
          <div className={styles.vignette} aria-hidden="true" />
          <div className={styles.hud} aria-hidden="true">
            <span>Portrait study / 02</span>
            <span ref={counterRef}>01 / {FRAME_COUNT}</span>
          </div>
          <div className={styles.chapters} aria-hidden="true">
            {chapters.map((chapter) => (
              <div className={styles.chapter} key={chapter.index}>
                <span className={styles.chapterIndex}>{chapter.index}</span>
                <span className={styles.chapterTitle}>{chapter.title}</span>
                <span className={styles.chapterCopy}>{chapter.copy}</span>
              </div>
            ))}
          </div>
          <div className={styles.progress} aria-hidden="true"><span /></div>
        </figure>

        <p className={styles.hint}>
          <span aria-hidden="true" />
          Scroll to move through the process
        </p>
      </div>
    </section>
  );
}
