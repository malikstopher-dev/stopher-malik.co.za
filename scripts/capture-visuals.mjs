import { spawn, spawnSync } from "node:child_process";
import { createWriteStream, existsSync, mkdirSync, readdirSync } from "node:fs";
import { createConnection } from "node:net";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = dirname(scriptDir);
const sourceRoot = join(appRoot, "..", "SM-UPGRADE");
const label = process.argv[2] || "baseline";
const targetMode = process.argv[3] || "both";
const outputRoot = join(appRoot, "artifacts", "visual", label);

mkdirSync(outputRoot, { recursive: true });

function findPlaywright() {
  const cacheRoot = join(process.env.LOCALAPPDATA || "", "npm-cache", "_npx");
  for (const entry of readdirSync(cacheRoot)) {
    const candidate = join(cacheRoot, entry, "node_modules", "playwright", "index.mjs");
    if (existsSync(candidate)) return candidate;
  }
  throw new Error("Playwright was not found in the npm cache. Run `npx playwright --version` first.");
}

function browserExecutable() {
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  const executable = candidates.find(existsSync);
  if (!executable) throw new Error("Chrome or Edge is required for visual capture.");
  return executable;
}

async function isReady(url) {
  const endpoint = new URL(url);
  const port = Number(endpoint.port || (endpoint.protocol === "https:" ? 443 : 80));
  return new Promise((resolve) => {
    const socket = createConnection({ host: endpoint.hostname, port });
    socket.setTimeout(1_000);
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.once("error", () => resolve(false));
  });
}

async function waitForServer(url, process, timeoutMs = 600_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (process && process.exitCode !== null) {
      throw new Error(`Server exited before becoming ready: ${url}`);
    }
    if (await isReady(url)) return;
    await new Promise((resolve) => setTimeout(resolve, 1_000));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function startServer(name, command, args, cwd) {
  const stdout = createWriteStream(join(outputRoot, `${name}.stdout.log`));
  const stderr = createWriteStream(join(outputRoot, `${name}.stderr.log`));
  const process = spawn(command, args, {
    cwd,
    shell: false,
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe"],
  });
  process.stdout.pipe(stdout);
  process.stderr.pipe(stderr);
  return { process, stdout, stderr };
}

function stopServer(server) {
  if (!server) return;
  spawnSync("taskkill.exe", ["/pid", String(server.process.pid), "/t", "/f"], {
    windowsHide: true,
    stdio: "ignore",
  });
  server.stdout.end();
  server.stderr.end();
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const step = Math.max(500, Math.floor(window.innerHeight * 0.8));
    let lastHeight = document.documentElement.scrollHeight;
    for (let y = 0; y < lastHeight; y += step) {
      window.scrollTo(0, y);
      await delay(90);
      lastHeight = Math.max(lastHeight, document.documentElement.scrollHeight);
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await delay(300);
  });
}

async function elementMetrics(page) {
  return page.evaluate(() => {
    const selectors = [
      ".nav",
      ".nav__inner",
      ".nav__profile",
      ".nav__avatar",
      ".ch-scrollhint",
      ".hero__bottom",
      ".tech-pill",
      ".projects__grid",
      ".project-card",
      ".project-card__img-wrap",
      ".project-card__body",
      ".testimonials",
      "footer",
      ".floating-nav",
    ];

    return Object.fromEntries(selectors.map((selector) => {
      const element = document.querySelector(selector);
      if (!element) return [selector, null];
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return [selector, {
        rect: {
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
        display: style.display,
        position: style.position,
        overflow: style.overflow,
        color: style.color,
        backgroundColor: style.backgroundColor,
        opacity: style.opacity,
        visibility: style.visibility,
      }];
    }));
  });
}

async function captureTarget(browser, target, viewport) {
  const suffix = `${viewport.name}-${target.name}`;
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    colorScheme: "dark",
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const failures = [];

  page.on("pageerror", (error) => failures.push(`pageerror: ${error.message}`));
  page.on("requestfailed", (request) => {
    failures.push(`requestfailed: ${request.url()} (${request.failure()?.errorText || "unknown"})`);
  });

  await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 600_000 });
  if (!(await page.locator("#cinematic-hero").count())) {
    throw new Error(`Unexpected page rendered at ${target.url}; #cinematic-hero is missing.`);
  }
  await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => {});
  if (await page.locator(".nav__inner").evaluate((element) => getComputedStyle(element).display !== "flex")) {
    await page.reload({ waitUntil: "networkidle", timeout: 600_000 });
  }
  await page.waitForFunction(() => getComputedStyle(document.querySelector(".nav__inner")).display === "flex");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2_000);
  await autoScroll(page);
  await page.evaluate(() => Promise.all(Array.from(document.images, (image) => image.decode().catch(() => {}))));

  const track = page.locator("#ch-track");
  if (await track.count()) {
    for (const [name, progress] of [["opening", 0], ["reveal", 0.35], ["full", 0.95]]) {
      await track.evaluate((element, p) => window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY + (element.clientHeight - window.innerHeight) * p, behavior: "instant" }), progress);
      await page.waitForTimeout(1500);
      await page.screenshot({ path: join(outputRoot, `${suffix}-hero-${name}-viewport.png`) });
    }
  }

  const sectionSelectors = [
    ["hero", "#home"],
    ["skills", ".hero__bottom"],
    ["skills-card", ".skills-card"],
    ["projects", "#projects"],
    ["services", "#services"],
    ["testimonials", ".testimonials"],
    ["footer", "footer"],
  ];

  for (const [sectionName, selector] of sectionSelectors) {
    const section = page.locator(selector).first();
    if (await section.count()) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      await section.screenshot({
        path: join(outputRoot, `${suffix}-${sectionName}.png`),
        animations: "disabled",
      });
      if (sectionName !== "hero") {
        await section.evaluate((element) => window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 24, behavior: "instant" }));
        await page.waitForTimeout(350);
        await page.screenshot({ path: join(outputRoot, `${suffix}-${sectionName === "skills-card" ? "skills" : sectionName}-viewport.png`) });
      }
    }
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: join(outputRoot, `${suffix}-full.png`),
    fullPage: true,
    animations: "disabled",
  });

  const metrics = await elementMetrics(page);
  const checks = await page.evaluate(() => ({
    noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth,
    skillsCount: document.querySelectorAll('.skills-card li').length,
    projectImagesDecoded: Array.from(document.querySelectorAll('.project-card__img')).every((image) => image.complete && image.naturalWidth > 0),
    headingRevealed: getComputedStyle(document.querySelector('.ch-wm-in')).transform === 'matrix(1, 0, 0, 1, 0, 0)',
    fonts: getComputedStyle(document.body).fontFamily,
    footerColumns: getComputedStyle(document.querySelector('.footer__grid')).gridTemplateColumns.split(' ').length,
  }));
  if (target.name === "migrated") {
    const next = page.getByRole("button", { name: "Next testimonial", exact: true });
    await next.click();
    await page.waitForTimeout(600);
    checks.testimonialNextWorks = await page.getByRole("button", { name: "Previous testimonial", exact: true }).isEnabled();
    await page.locator('.testimonials').screenshot({ path: join(outputRoot, `${suffix}-testimonials-next.png`) });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: join(outputRoot, `${suffix}-hero-reduced-motion-viewport.png`) });
    checks.reducedMotionHasHeading = await page.locator('h1').isVisible();
    checks.reducedMotionHasNoScrollTrack = await page.locator('#ch-track').count() === 0;
  }
  const result = {
    url: target.url,
    viewport,
    document: await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    })),
    metrics,
    checks,
    failures,
  };

  await context.close();
  return [suffix, result];
}

const nextPort = process.env.VISUAL_PORT || "3000";
const nextUrl = `http://127.0.0.1:${nextPort}/`;
const originalUrl = "http://127.0.0.1:4173/";
let nextServer;
let originalServer;

try {
  if (!(await isReady(nextUrl))) {
    nextServer = startServer(
      "next",
      process.env.ComSpec || "cmd.exe",
      ["/d", "/s", "/c", `npm run dev -- -p ${nextPort}`],
      appRoot,
    );
  }
  if (targetMode !== "migrated" && !(await isReady(originalUrl))) {
    originalServer = startServer("original", "python.exe", ["-m", "http.server", "4173", "--bind", "127.0.0.1"], sourceRoot);
  }

  const serverChecks = [waitForServer(nextUrl, nextServer?.process)];
  if (targetMode !== "migrated") {
    serverChecks.push(waitForServer(originalUrl, originalServer?.process));
  }
  await Promise.all(serverChecks);

  const { chromium } = await import(pathToFileURL(findPlaywright()).href);
  const browser = await chromium.launch({
    executablePath: browserExecutable(),
    headless: true,
  });

  const targets = [{ name: "migrated", url: nextUrl }];
  if (targetMode !== "migrated") {
    targets.push({ name: "original", url: originalUrl });
  }
  const viewports = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 375, height: 812 },
  ];
  const audit = {};

  for (const viewport of viewports) {
    for (const target of targets) {
      const [key, result] = await captureTarget(browser, target, viewport);
      audit[key] = result;
      console.log(`Captured ${key}`);
    }
  }

  await import("node:fs/promises").then(({ writeFile }) => (
    writeFile(join(outputRoot, "audit.json"), `${JSON.stringify(audit, null, 2)}\n`)
  ));
  for (const [name, result] of Object.entries(audit)) {
    if (!name.endsWith("-migrated")) continue;
    const checks = result.checks;
    if (!checks.noHorizontalOverflow || checks.skillsCount !== 9 || !checks.projectImagesDecoded || !checks.headingRevealed || !checks.testimonialNextWorks || !checks.reducedMotionHasHeading || !checks.reducedMotionHasNoScrollTrack || checks.footerColumns !== (result.viewport.width >= 768 ? 4 : 1) || result.failures.length) {
      throw new Error(`Visual regression checks failed for ${name}; inspect audit.json`);
    }
  }
  await Promise.race([
    browser.close(),
    new Promise((resolve) => setTimeout(resolve, 10_000)),
  ]);
  console.log(`Visual artifacts: ${outputRoot}`);
} finally {
  stopServer(nextServer);
  stopServer(originalServer);
}
