import localFont from "next/font/local";

export const baiJamjuree = localFont({
  src: [
    { path: "../../node_modules/@fontsource/bai-jamjuree/files/bai-jamjuree-latin-400-normal.woff2", weight: "400" },
    { path: "../../node_modules/@fontsource/bai-jamjuree/files/bai-jamjuree-latin-500-normal.woff2", weight: "500" },
    { path: "../../node_modules/@fontsource/bai-jamjuree/files/bai-jamjuree-latin-600-normal.woff2", weight: "600" },
    { path: "../../node_modules/@fontsource/bai-jamjuree/files/bai-jamjuree-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

export const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
  preload: true,
});
