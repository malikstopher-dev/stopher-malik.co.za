export interface SequenceOptions {
  track: HTMLElement;
  canvas: HTMLCanvasElement;
  count: number;
  source: (index: number) => string;
  focusX?: number;
  focusY?: number;
  smoothing?: number;
  exitScrub?: boolean;
  idleFrames?: number;
  cacheSize?: number;
  concurrency?: number;
  phase?: (progress: number) => string;
  onFrame?: (index: number) => void;
}

export function createSequence({
  track,
  canvas,
  count,
  source,
  focusX = 0.5,
  focusY = 0.32,
  smoothing = 0.16,
  exitScrub = false,
  idleFrames = 0,
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
  let idleTime = 0;
  let lastTick = 0;

  const progress = () => {
    const rect = track.getBoundingClientRect();
    const travel = exitScrub ? rect.height : rect.height - (viewport?.clientHeight ?? window.innerHeight);
    if (travel <= 0) return 0;
    return Math.min(1, Math.max(0, -rect.top / travel));
  };

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

    const raw = progress();
    shown += (raw - shown) * smoothing;
    if (Math.abs(raw - shown) < 0.0004) shown = raw;

    // Animate the opening shot independently of scroll-driven copy and phases.
    const idle = idleFrames > 0 && raw < 0.12;
    const now = performance.now();
    if (idle && lastTick) idleTime += Math.min(now - lastTick, 120);
    lastTick = idle ? now : 0;
    const offset = idle ? (1 - Math.cos(idleTime * Math.PI / 2400)) * .5 * idleFrames * (1 - raw / .12) : 0;
    const nextTarget = Math.min(count - 1, Math.round(shown * (count - 1) + offset));
    if (nextTarget !== target) target = nextTarget;

    track.style.setProperty("--p", shown.toFixed(4));
    if (phase) {
      const nextPhase = phase(shown);
      if (nextPhase !== lastPhase) {
        lastPhase = nextPhase;
        track.dataset.phase = nextPhase;
      }
    }

    pump();

    const available = nearest();
    if (available >= 0 && available !== drawn) draw(available);

    const moving = Math.abs(raw - shown) > 0.0004;
    // Completed image loads wake the renderer themselves.
    if (moving) wake();
    else if (idle) idleTimer = window.setTimeout(wake, 80);
  };

  let idleTimer = 0;
  function wake() {
    clearTimeout(idleTimer);
    if (!alive || !visible || document.hidden || raf) return;
    raf = requestAnimationFrame(render);
  }

  const sleep = () => {
    clearTimeout(idleTimer);
    lastTick = 0;
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
      canvas.toggleAttribute('data-portrait-playing', visible && !document.hidden);
      if (visible) wake();
      else sleep();
    },
    { rootMargin: "25% 0px", threshold: 0 },
  );

  const onVisibility = () => {
    canvas.toggleAttribute('data-portrait-playing', visible && !document.hidden);
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
    canvas.removeAttribute('data-portrait-playing');
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
  };
}
