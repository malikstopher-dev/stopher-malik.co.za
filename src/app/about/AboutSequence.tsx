"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 96;
const frameSource = (index: number) =>
  `/assets/about-frames/desktop/frame_${String(index + 1).padStart(4, "0")}.webp`;

export function AboutSequence() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const frameLabelRef = useRef<HTMLSpanElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const onChange = (event: MediaQueryListEvent) => setIsReducedMotion(event.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const poster = posterRef.current;
    if (!stage || !canvas || !poster) return;

    if (isReducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.dataset.sequenceState = "static";
      stage.classList.remove("is-ready");
      poster.classList.remove("is-hidden");
      return;
    }

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) {
      stage.dataset.sequenceState = "static";
      return;
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const cache = new Map<number, HTMLImageElement>();
    const pending = new Set<number>();
    const queue: number[] = [];
    const concurrency = isMobile ? 3 : 6;
    const dprCap = isMobile ? 1.5 : 2;
    const preloadRadius = isMobile ? 8 : 14;
    const cacheLimit = isMobile ? 26 : 50;
    let activeLoads = 0;
    let targetFrame = 0;
    let drawnFrame = -1;
    let initialized = false;
    let visible = false;
    let destroyed = false;
    let renderFrame = 0;
    let scrollFrame = 0;

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== height) canvas.height = height;
      drawnFrame = -1;
    };

    const draw = (image: HTMLImageElement) => {
      const width = canvas.width;
      const height = canvas.height;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      context.fillStyle = "#080b12";
      context.fillRect(0, 0, width, height);
      context.imageSmoothingEnabled = true;
      context.drawImage(image, x, y, drawWidth, drawHeight);
    };

    const nearestLoaded = (target: number) => {
      if (cache.has(target)) return target;
      for (let distance = 1; distance < FRAME_COUNT; distance++) {
        if (target - distance >= 0 && cache.has(target - distance)) return target - distance;
        if (target + distance < FRAME_COUNT && cache.has(target + distance)) return target + distance;
      }
      return -1;
    };

    const render = () => {
      renderFrame = 0;
      if (!visible || destroyed) return;
      const availableFrame = nearestLoaded(targetFrame);
      if (availableFrame < 0 || availableFrame === drawnFrame) return;
      draw(cache.get(availableFrame)!);
      drawnFrame = availableFrame;
      stage.classList.add("is-ready");
      poster.classList.add("is-hidden");
    };

    const requestRender = () => {
      if (!renderFrame && visible && !destroyed) {
        renderFrame = requestAnimationFrame(render);
      }
    };

    const trimCache = () => {
      if (cache.size <= cacheLimit) return;
      Array.from(cache.keys())
        .sort((a, b) => Math.abs(b - targetFrame) - Math.abs(a - targetFrame))
        .slice(0, cache.size - cacheLimit)
        .forEach((index) => cache.delete(index));
    };

    const pump = () => {
      while (!destroyed && activeLoads < concurrency && queue.length) {
        const index = queue.shift()!;
        activeLoads++;
        const image = new Image();
        image.decoding = "async";
        image.onload = () => {
          if (destroyed) return;
          cache.set(index, image);
          pending.delete(index);
          activeLoads--;
          trimCache();
          requestRender();
          pump();
        };
        image.onerror = () => {
          if (destroyed) return;
          pending.delete(index);
          activeLoads--;
          pump();
        };
        image.src = frameSource(index);
      }
    };

    const enqueue = (index: number, priority = false) => {
      if (index < 0 || index >= FRAME_COUNT || cache.has(index)) return;
      if (pending.has(index)) {
        if (priority) {
          const queuedIndex = queue.indexOf(index);
          if (queuedIndex >= 0) {
            queue.splice(queuedIndex, 1);
            queue.unshift(index);
          }
        }
        return;
      }
      pending.add(index);
      if (priority) queue.unshift(index);
      else queue.push(index);
    };

    const prioritizeTarget = () => {
      for (let index = queue.length - 1; index >= 0; index--) {
        if (Math.abs(queue[index] - targetFrame) <= preloadRadius * 2) continue;
        pending.delete(queue[index]);
        queue.splice(index, 1);
      }
      for (let distance = preloadRadius; distance >= 1; distance--) {
        enqueue(targetFrame + distance, true);
        enqueue(targetFrame - distance, true);
      }
      enqueue(targetFrame, true);
      pump();
      requestRender();
    };

    const updateProgress = () => {
      if (!initialized) return;
      const rect = stage.getBoundingClientRect();
      const start = window.innerHeight * 0.82;
      const travel = window.innerHeight * 0.64 + rect.height;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / travel));
      const nextFrame = Math.round(progress * (FRAME_COUNT - 1));

      stage.style.setProperty("--sequence-progress", String(progress));
      if (frameLabelRef.current) {
        frameLabelRef.current.textContent = `${String(nextFrame + 1).padStart(2, "0")} / ${FRAME_COUNT}`;
      }

      if (nextFrame !== targetFrame) {
        targetFrame = nextFrame;
        prioritizeTarget();
      }
    };

    const initialize = () => {
      if (initialized) return;
      initialized = true;
      stage.dataset.sequenceState = "loading";
      measure();
      updateProgress();
      prioritizeTarget();
    };

    const requestProgressUpdate = () => {
      if (!visible || scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        updateProgress();
      });
    };

    const onScroll = () => requestProgressUpdate();
    const onResize = () => {
      measure();
      requestProgressUpdate();
      requestRender();
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          initialize();
          updateProgress();
          requestRender();
        }
      },
      { rootMargin: "45% 0px", threshold: 0 },
    );

    intersectionObserver.observe(stage);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      destroyed = true;
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (renderFrame) cancelAnimationFrame(renderFrame);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      stage.classList.remove("is-ready");
      poster.classList.remove("is-hidden");
      cache.clear();
      queue.length = 0;
      pending.clear();
    };
  }, [isReducedMotion]);

  return (
    <div ref={stageRef} className="about-stage" data-count={FRAME_COUNT}>
      <img
        ref={posterRef}
        className="about-stage__poster"
        src={frameSource(0)}
        alt="Stopher Malik surrounded by flowing blue particles"
        loading="lazy"
        decoding="async"
      />
      <canvas ref={canvasRef} className="about-stage__canvas" aria-hidden="true" />
      <div className="about-stage__grain" aria-hidden="true" />
      <div className="about-stage__vignette" aria-hidden="true" />
      <div className="about-stage__hud" aria-hidden="true">
        <span>Cinematic portrait</span>
        <span ref={frameLabelRef}>01 / {FRAME_COUNT}</span>
      </div>
      <p className="about-stage__caption">Scroll to move through the story.</p>
      <div className="about-stage__progress" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
