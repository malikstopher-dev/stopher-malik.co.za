import { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { AboutPage } from "./AboutPage";

export const metadata: Metadata = {
  title: "About | SMK Web Design",
  description: "Get to know Stopher Malik, lead web designer and developer at SMK.",
  alternates: { canonical: "https://stopher-malik.co.za/about/" },
  openGraph: pageOpenGraph("/about/"),
};

export default function About() {
  return <AboutPage />;
}