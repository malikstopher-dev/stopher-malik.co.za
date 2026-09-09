import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx,md}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        black: "#09090b",
        "black-soft": "#0f0f11",
        "black-medium": "#18181b",
        "black-light": "#27272a",
        white: "#fafafa",
        "white-dim": "#d4d4d8",
        "white-muted": "#a1a1aa",
        "white-ghost": "#52525b",

        // Original primary green; navigation and pills retain blue.
        accent: "#22c55e",
        "accent-light": "#4ade80",
        "accent-glow": "rgba(34, 197, 94, 0.12)",
        "accent-cyan": "#378ADD",
        "accent-cyan-glow": "rgba(55, 138, 221, 0.12)",
        "accent-violet": "#8b5cf6",
        "accent-violet-glow": "rgba(139, 92, 246, 0.12)",
        "accent-gold": "#fbbf24",
        "accent-gold-glow": "rgba(251, 191, 36, 0.12)",

        // Semantic colors
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: "#050507",
        "ink-soft": "#0a0a0f",
        "ink-medium": "#111117",
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-xl": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-md": ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-sm": ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-xl": ["1.125rem", { lineHeight: "1.7" }],
        "body-lg": ["1rem", { lineHeight: "1.6" }],
        "body-md": ["0.9375rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "body-xs": ["0.8125rem", { lineHeight: "1.5" }],
        "label-sm": ["0.75rem", { lineHeight: "1.5" }],
        "label-xs": ["0.6875rem", { lineHeight: "1.5" }],
      },
      spacing: {
        "2xs": "0.125rem",
        xs: "0.25rem",
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "3rem",
        "4xl": "4rem",
        "5xl": "6rem",
        "6xl": "8rem",
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        full: "9999px",
      },
      boxShadow: {
        "1": "0 1px 2px rgba(0,0,0,0.4)",
        "2": "0 8px 24px rgba(0,0,0,0.45)",
        "3": "0 24px 60px rgba(0,0,0,0.55)",
        "glow": "0 24px 60px -12px rgba(55, 138, 221, 0.12)",
        "premium": "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 1px rgba(255,255,255,0.06) inset",
        "magnetic": "0 40px 100px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(55,138,221,0.2) inset, 0 0 60px -10px rgba(55,138,221,0.15)",
        "aurora": "0 50px 120px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08) inset, 0 0 100px -20px rgba(55,138,221,0.2), 0 0 150px -30px rgba(139,92,246,0.15)",
      },
      transitionDuration: {
        fluid: "600ms",
        snappy: "350ms",
        instant: "150ms",
      },
      transitionTimingFunction: {
        fluid: "cubic-bezier(0.19, 1, 0.22, 1)",
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "3d": "cubic-bezier(0.23, 1, 0.32, 1)",
        expo: "cubic-bezier(0.19, 1, 0.22, 1)",
        gentle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        99: "99",
        100: "100",
        1000: "1000",
      },
      backdropBlur: {
        premium: "16px",
      },
      backgroundImage: {
        "aurora-1": "conic-gradient(from 0deg, rgba(55,138,221,0.4), rgba(6,182,212,0.3), rgba(139,92,246,0.3), rgba(251,191,36,0.3), rgba(55,138,221,0.4))",
        "aurora-2": "conic-gradient(from 180deg, rgba(6,182,212,0.35), rgba(139,92,246,0.3), rgba(251,191,36,0.25), rgba(55,138,221,0.35))",
        "aurora-3": "conic-gradient(from 90deg, rgba(139,92,246,0.3), rgba(251,191,36,0.25), rgba(55,138,221,0.35), rgba(6,182,212,0.3))",
      },
      backgroundSize: {
        noise: "3px 3px",
      },
    },
  },
  plugins: [],
};
export default config;
