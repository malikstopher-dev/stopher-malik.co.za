import type { Metadata } from "next";
import { baiJamjuree, inter } from "@/lib/fonts";
import "./globals.css";
import { CosmicBackground } from "@/components/layout/CosmicBackground";

export const metadata: Metadata = {
  title: "Web Designer Johannesburg | SMK Web Design | Stopher Malik",
  description: "Web designer in Johannesburg helping South African businesses get more clients. High-converting websites built for performance & real results. Free quote.",
  keywords: ["web designer Johannesburg", "web design South Africa", "business websites South Africa", "website design Johannesburg", "affordable web design Johannesburg", "small business website South Africa", "conversion focused web design", "SMK Web Design", "Stopher Malik", "web developer Johannesburg", "landing page design South Africa", "SEO Johannesburg", "Sandton web designer", "Gauteng web design"],
  authors: [{ name: "Stopher Malik — SMK Web Design" }],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    type: "website",
    url: "https://www.stopher-malik.co.za/",
    title: "Web Designer Johannesburg | SMK Web Design | Stopher Malik",
    description: "Web designer in Johannesburg building high-converting websites for South African businesses. Get more clients & grow your business online. Free quote today.",
    images: [
      {
        url: "https://www.stopher-malik.co.za/assets/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "SMK Web Design — Professional Website Design in Johannesburg, South Africa",
      },
    ],
    locale: "en_ZA",
    siteName: "SMK Web Design",
  },
  twitter: {
    card: "summary_large_image",
    site: "@stopher_malik",
    creator: "@stopher_malik",
    title: "Web Designer Johannesburg | SMK Web Design | Stopher Malik",
    description: "High-performing, conversion-focused websites for South African businesses. Free quote from SMK Web Design.",
    images: ["https://www.stopher-malik.co.za/assets/og-image-1200x630.png"],
  },
  verification: {
    google: "2eb5f1f9b4260ae5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//api.web3forms.com" />
        <link rel="preconnect" href="https://api.web3forms.com" />
      </head>
      <body
        className={`${baiJamjuree.variable} ${inter.variable} antialiased has-floating-nav`}
      >
        <CosmicBackground />
        {children}
      </body>
    </html>
  );
}
