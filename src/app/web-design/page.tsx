import { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { WebDesignPage } from "./WebDesignPage";

export const metadata: Metadata = {
  title: "Freelance Web Design Johannesburg | Stopher Malik",
  description: "Custom web design for South African businesses. Mobile-first, SEO-ready sites that load fast and bring enquiries. Free quote from SMK Web Design.",
  alternates: { canonical: "https://stopher-malik.co.za/web-design/" },
  openGraph: pageOpenGraph("/web-design/"),
};

export default function WebDesign() {
  return <WebDesignPage />;
}