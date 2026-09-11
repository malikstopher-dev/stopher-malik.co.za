"use client";

import { useEffect } from "react";

const SURFACE_SELECTOR = [
  ".internal-page .card",
  ".contact-page .card",
].join(",");

export function PremiumSurfaceEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const register = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(SURFACE_SELECTOR).forEach((surface) => {
        surface.classList.add("premium-surface");
      });
    };

    register(document);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(SURFACE_SELECTOR)) node.classList.add("premium-surface");
          register(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    if (reducedMotion.matches || !finePointer.matches) {
      return () => observer.disconnect();
    }

    let activeSurface: HTMLElement | null = null;
    let pointerTarget: Element | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let animationFrame = 0;

    const resetSurface = () => {
      if (!activeSurface) return;
      activeSurface.removeAttribute("data-premium-active");
      activeSurface.style.removeProperty("--surface-x");
      activeSurface.style.removeProperty("--surface-y");
      activeSurface.style.removeProperty("--surface-rx");
      activeSurface.style.removeProperty("--surface-ry");
      activeSurface = null;
    };

    const updateSurface = () => {
      animationFrame = 0;
      const surface = pointerTarget?.closest<HTMLElement>(SURFACE_SELECTOR) ?? null;

      if (surface !== activeSurface) {
        resetSurface();
        activeSurface = surface;
        activeSurface?.setAttribute("data-premium-active", "true");
      }

      if (!surface) return;

      const rect = surface.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = Math.min(1, Math.max(0, (pointerX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, (pointerY - rect.top) / rect.height));
      const isForm = surface.classList.contains("contact-panel--form");
      const tilt = isForm ? 0 : rect.width > 520 ? 1.2 : 3.2;

      surface.style.setProperty("--surface-x", `${(x * 100).toFixed(2)}%`);
      surface.style.setProperty("--surface-y", `${(y * 100).toFixed(2)}%`);
      surface.style.setProperty("--surface-rx", `${((0.5 - y) * tilt).toFixed(2)}deg`);
      surface.style.setProperty("--surface-ry", `${((x - 0.5) * tilt).toFixed(2)}deg`);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerTarget = event.target instanceof Element ? event.target : null;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!animationFrame) animationFrame = requestAnimationFrame(updateSurface);
    };

    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      pointerTarget = null;
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      resetSurface();
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("scroll", resetSurface, { passive: true });
    window.addEventListener("blur", resetSurface);

    return () => {
      observer.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("scroll", resetSurface);
      window.removeEventListener("blur", resetSurface);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      resetSurface();
    };
  }, []);

  return null;
}
