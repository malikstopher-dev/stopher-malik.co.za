"use client";

import { useEffect } from "react";

const SELECTOR = [
  "[data-reveal]",
  ".internal-page__hero",
  ".internal-panel",
  ".contact-page__hero",
  ".contact-panel",
  ".internal-page .project-card",
  ".blog-card",
].join(",");

export function ScrollFX() {
  useEffect(() => {
    document.documentElement.classList.add("fx-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const register = (root: ParentNode) => {
      if (root instanceof Element && root.matches(SELECTOR)) observer.observe(root);
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach((element) => observer.observe(element));
    };

    register(document);

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) register(node);
        });
      });
    });

    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
