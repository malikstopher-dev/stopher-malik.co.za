interface PortraitClip {
  src: string;
  count: number;
  fps: number;
}

interface PortraitClips {
  desktop?: PortraitClip;
  mobile: PortraitClip;
}

// Keep the asset rates and frame counts in sync with scripts/encode-portrait-loops.cjs.
export const heroPortrait: PortraitClips = {
  desktop: { src: "/assets/hero-frames/portrait-desktop.mp4", count: 192, fps: 30 },
  mobile: { src: "/assets/hero-frames/portrait-mobile.mp4", count: 96, fps: 16 },
};

export const aboutPortrait: PortraitClips = {
  mobile: { src: "/assets/about-frames/portrait-mobile.mp4", count: 96, fps: 18 },
};

type DataConnection = EventTarget & { saveData?: boolean; effectiveType?: string };

function getConnection() {
  return (navigator as Navigator & { connection?: DataConnection }).connection;
}

export function canAnimatePortrait() {
  const connection = getConnection();
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !connection?.saveData && !["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
}

export function mountPortraitVideo(
  video: HTMLVideoElement,
  clips: PortraitClips,
  onFrame?: (index: number, count: number) => void,
) {
  const compact = window.matchMedia("(max-width: 768px)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = getConnection();
  let clip: PortraitClip | undefined;
  let visible = false;

  video.defaultMuted = true;
  video.muted = true;

  const reset = () => {
    video.pause();
    delete video.dataset.ready;
    if (!clip) return;
    clip = undefined;
    video.removeAttribute("src");
    video.load();
  };

  const sync = () => {
    const next = compact.matches ? clips.mobile : clips.desktop;
    if (!next || !canAnimatePortrait()) {
      reset();
      return;
    }
    if (!visible || document.hidden) {
      video.pause();
      return;
    }
    if (clip !== next) {
      reset();
      clip = next;
      video.src = clip.src;
    }
    if (video.paused) void video.play().catch(() => {});
  };

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });

  const onPlaying = () => { video.dataset.ready = "true"; };
  const onError = () => { delete video.dataset.ready; };
  const onTime = () => {
    if (!clip || !video.dataset.ready || !onFrame) return;
    const last = clip.count - 1;
    const step = Math.min(2 * last - 1, Math.floor(video.currentTime * clip.fps));
    onFrame(step <= last ? step : 2 * last - step, clip.count);
  };

  video.addEventListener("playing", onPlaying);
  video.addEventListener("error", onError);
  if (onFrame) video.addEventListener("timeupdate", onTime);
  observer.observe(video);
  compact.addEventListener("change", sync);
  reduced.addEventListener("change", sync);
  connection?.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);

  return () => {
    observer.disconnect();
    video.removeEventListener("playing", onPlaying);
    video.removeEventListener("error", onError);
    video.removeEventListener("timeupdate", onTime);
    compact.removeEventListener("change", sync);
    reduced.removeEventListener("change", sync);
    connection?.removeEventListener("change", sync);
    document.removeEventListener("visibilitychange", sync);
    reset();
  };
}
