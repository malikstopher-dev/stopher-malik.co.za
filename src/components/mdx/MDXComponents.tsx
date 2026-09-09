"use client";

import type { MDXComponents as MDXComponentsType } from "mdx/types";
import Link from "next/link";

const HR = (props: React.HTMLAttributes<HTMLHRElement>) => (
  <hr {...props} style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "var(--space-3xl) 0" }} />
);

export const MDXComponents: MDXComponentsType = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className="hero__title" style={{ marginBottom: "var(--space-xl)" }}>{children}</h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="section-title" style={{ marginTop: "var(--space-3xl)", marginBottom: "var(--space-lg)" }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18" aria-hidden="true">
        <polygon points="12,3 21,12 12,21 3,12" />
      </svg>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} style={{ fontFamily: "var(--font-display)", fontSize: "var(--body-lg)", fontWeight: 600, color: "var(--white)", marginTop: "var(--space-2xl)", marginBottom: "var(--space-sm)" }}>{children}</h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} style={{ fontSize: "var(--body-md)", color: "var(--white-dim)", lineHeight: "var(--leading-relaxed)", marginBottom: "var(--space-lg)" }}>{children}</p>
  ),
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const safeHref = href ?? "#";
    if (safeHref.startsWith("http")) {
      return <a {...props} href={safeHref} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light underline underline-offset-2">{children}</a>;
    }
    return <Link {...props} href={safeHref} className="text-accent hover:text-accent-light underline underline-offset-2">{children}</Link>;
  },
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} style={{ listStyle: "disc", paddingLeft: "var(--space-xl)", marginBottom: "var(--space-lg)", color: "var(--white-dim)", lineHeight: "var(--leading-relaxed)" }}>{children}</ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} style={{ listStyle: "decimal", paddingLeft: "var(--space-xl)", marginBottom: "var(--space-lg)", color: "var(--white-dim)", lineHeight: "var(--leading-relaxed)" }}>{children}</ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} style={{ marginBottom: "var(--space-sm)" }}>{children}</li>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} style={{ color: "var(--white)", fontWeight: 600 }}>{children}</strong>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} style={{ fontStyle: "italic", color: "var(--accent)" }}>{children}</em>
  ),
  blockquote: ({ children, ...props }: React.QuoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote {...props} style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "var(--space-lg)", margin: "var(--space-xl) 0", fontStyle: "italic", color: "var(--white-muted)" }}>{children}</blockquote>
  ),
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code {...props} style={{ background: "var(--black-medium)", padding: "0.125rem 0.375rem", borderRadius: "var(--radius-sm)", fontSize: "0.9em", color: "var(--accent-light)" }}>{children}</code>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre {...props} style={{ background: "var(--ink)", padding: "var(--space-lg)", borderRadius: "var(--radius-lg)", overflow: "auto", marginBottom: "var(--space-lg)" }}>{children}</pre>
  ),
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src={src} alt={alt} {...props} className="w-full h-auto rounded-xl my-8" loading="lazy" decoding="async" />
  ),
  hr: HR,
};