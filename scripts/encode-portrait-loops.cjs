// Usage: node scripts/encode-portrait-loops.cjs (requires FFmpeg with libx264).
const { execFileSync } = require("node:child_process");
const path = require("node:path");

const assets = path.join(__dirname, "..", "public", "assets");
const clips = [
  ["hero-frames", "desktop", "portrait-desktop", 192, 30, 960, "2000k"],
  ["hero-frames", "mobile", "portrait-mobile", 96, 16, 576, "1050k"],
  ["about-frames", "desktop", "portrait-mobile", 96, 18, 768, "900k"],
];

for (const [folder, source, name, count, fps, width, maxRate] of clips) {
  // Omit the first and last frames of the reverse leg so the turnover doesn't hitch.
  const filter = `[0:v]scale=${width}:-2:flags=lanczos,format=yuv420p,setsar=1,split[forward][reverse];` +
    `[reverse]reverse,trim=start_frame=1:end_frame=${count - 1},setpts=PTS-STARTPTS[back];` +
    `[forward][back]concat=n=2:v=1:a=0[out]`;

  execFileSync("ffmpeg", [
    "-hide_banner", "-loglevel", "warning", "-y", "-framerate", String(fps),
    "-i", path.join(assets, folder, source, "frame_%04d.webp"),
    "-filter_complex", filter, "-map", "[out]", "-r", String(fps),
    "-an", "-c:v", "libx264", "-preset", "fast", "-tune", "fastdecode", "-crf", "21",
    "-maxrate", maxRate, "-bufsize", maxRate, "-g", String(fps * 2),
    "-movflags", "+faststart", path.join(assets, folder, `${name}.mp4`),
  ], { stdio: "inherit" });
}
