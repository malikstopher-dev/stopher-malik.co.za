export interface SequenceOptions {
  track: HTMLElement;
  canvas: HTMLCanvasElement;
  count: number;
  source: (index: number) => string;
  focusX?: number;
  focusY?: number;
  smoothing?: number;
  cacheSize?: number;
  concurrency?: number;
  phase?: (progress: number) => string;
  onFrame?: (index: number) => void;
}

function scrollProgress(track: HTMLElement, viewport: HTMLElement | null) {
  const rect = track.getBoundingClientRect();
  const travel = rect.height - (viewport?.clientHeight ?? window.innerHeight);
  return travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
}

export function watchSequenceScroll(
  track: HTMLElement,
  viewport: HTMLElement,
  smoothing: number,
  update: (progress: number) => void,
) {
  let raf = 0;
  let visible = false;
  let shown = scrollProgress(track, viewport);
  update(shown);

  const measure = () => {
    raf = 0;
    if (!visible || document.hidden) return;
    const raw = scrollProgress(track, viewport);
    shown += (raw - shown) * smoothing;
    if (Math.abs(raw - shown) < 0.0004) shown = raw;
    update(shown);
    if (raw !== shown) wake();
  };

  function wake() {
    if (visible && !document.hidden && !raf) raf = requestAnimationFrame(measure);
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    wake();
  });
  observer.observe(track);
  window.addEventListener("scroll", wake, { passive: true });
  window.addEventListener("resize", wake);
  document.addEventListener("visibilitychange", wake);
  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    window.removeEventListener("scroll", wake);
    window.removeEventListener("resize", wake);
    document.removeEventListener("visibilitychange", wake);
  };
}

export function createSequence({
  track,
  canvas,
  count,
  source,
  focusX = 0.5,
  focusY = 0.32,
  smoothing = 0.16,
  cacheSize = 20,
  concurrency = 3,
  phase,
  onFrame,
}: SequenceOptions) {
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) return () => {};

  const cache = new Map<number, HTMLImageElement>();
  const loading = new Set<number>();
  const failed = new Set<number>();
  const viewport = canvas.parentElement;

  let alive = true;
  let visible = false;
  let resize = true;
  let raf = 0;
  let shown = 0;
  let target = 0;
  let drawn = -1;
  let lastPhase = "";
  let width = 0;
  let height = 0;

  const desired = () => {
    const order: number[] = [];
    // Never request a wider window than we can retain on a phone.
    for (let distance = 0; distance <= Math.min(8, Math.floor((cacheSize - 1) / 2)); distance++) {
      const forward = target + distance;
      const backward = target - distance;
      if (forward < count) order.push(forward);
      if (distance && backward >= 0) order.push(backward);
    }
    return order;
  };

  const trim = () => {
    if (cache.size <= cacheSize) return;
    const drop = [...cache.keys()]
      .sort((a, b) => Math.abs(b - target) - Math.abs(a - target))
      .slice(0, cache.size - cacheSize);
    drop.forEach((index) => cache.delete(index));
  };

  const decode = (img: HTMLImageElement) =>
    typeof img.decode === "function" ? img.decode() : Promise.resolve();

  const load = (index: number) => {
    loading.add(index);
    const img = new Image();
    img.decoding = "async";
    let settled = false;

    const settle = (ok: boolean) => {
      if (settled || !alive) return;
      settled = true;
      loading.delete(index);
      if (ok) {
        cache.set(index, img);
        trim();
        wake();
      } else {
        failed.add(index);
      }
      pump();
    };

    img.onload = () => settle(true);
    img.onerror = () => settle(false);
    img.src = source(index);
    decode(img).then(() => settle(true)).catch(() => {});
  };

  const pump = () => {
    if (!alive || !visible || document.hidden) return;
    for (const index of desired()) {
      if (loading.size >= concurrency) return;
      if (cache.has(index) || loading.has(index) || failed.has(index)) continue;
      load(index);
    }
  };

  const draw = (index: number) => {
    const img = cache.get(index);
    if (!img) return;
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    const drawWidth = img.naturalWidth * scale;
    const drawHeight = img.naturalHeight * scale;
    const x = (width - drawWidth) * focusX;
    const y = (height - drawHeight) * focusY;
    context.imageSmoothingEnabled = true;
    context.drawImage(img, x, y, drawWidth, drawHeight);
    drawn = index;
    track.dataset.frame = String(index + 1);
    onFrame?.(index);
  };

  const nearest = () => {
    if (!cache.size) return -1;
    let best = -1;
    let distance = Infinity;
    for (const index of cache.keys()) {
      const next = Math.abs(index - target);
      if (next < distance) {
        distance = next;
        best = index;
      }
    }
    return best;
  };

  const measure = () => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const cap = Math.min(dpr, 2200 / rect.width, 1600 / rect.height);
    const nextWidth = Math.max(1, Math.round(rect.width * cap));
    const nextHeight = Math.max(1, Math.round(rect.height * cap));
    if (canvas.width !== nextWidth) canvas.width = nextWidth;
    if (canvas.height !== nextHeight) canvas.height = nextHeight;
    width = canvas.width;
    height = canvas.height;
    context.fillStyle = "#070a0f";
    context.fillRect(0, 0, width, height);
    drawn = -1;
    resize = false;
    return true;
  };

  const render = () => {
    raf = 0;
    if (!alive || !visible || document.hidden) return;
    if (resize && !measure()) return;

    const raw = scrollProgress(track, viewport);
    shown += (raw - shown) * smoothing;
    if (Math.abs(raw - shown) < 0.0004) shown = raw;

    target = Math.round(shown * (count - 1));

    pump();
    const available = nearest();
    if (available >= 0 && available !== drawn) draw(available);

    track.style.setProperty("--p", shown.toFixed(4));
    if (phase) {
      const nextPhase = phase(shown);
      if (nextPhase !== lastPhase) {
        lastPhase = nextPhase;
        track.dataset.phase = nextPhase;
      }
    }

    const moving = Math.abs(raw - shown) > 0.0004;
    // Completed image loads wake the renderer themselves.
    if (moving) wake();
  };

  function wake() {
    if (!alive || !visible || document.hidden || raf) return;
    raf = requestAnimationFrame(render);
  }

  const sleep = () => {
    if (!raf) return;
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const onResize = () => {
    resize = true;
    wake();
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else sleep();
    },
    { rootMargin: "25% 0px", threshold: 0 },
  );

  const onVisibility = () => {
    if (document.hidden) sleep();
    else wake();
  };

  const resizeObserver = new ResizeObserver(onResize);

  observer.observe(canvas);
  resizeObserver.observe(canvas);
  window.addEventListener("scroll", wake, { passive: true });
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);

  track.dataset.phase = phase?.(0) ?? "intro";
  wake();

  return () => {
    alive = false;
    sleep();
    observer.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener("scroll", wake);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    cache.clear();
    loading.clear();
    failed.clear();
    delete track.dataset.frame;
    delete track.dataset.phase;
    track.style.removeProperty("--p");
  };
}
