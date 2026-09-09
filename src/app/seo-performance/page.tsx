import { Metadata } from "next";
import { SeoPerformancePage } from "./SeoPerformancePage";

export const metadata: Metadata = {
  title: "SEO & Performance | SMK Web Design",
  description: "Technical SEO and performance optimisation for South African websites. Core Web Vitals, speed improvements, and search visibility that drives real traffic.",
};

export default function SeoPerformance() {
  return <SeoPerformancePage />;
}