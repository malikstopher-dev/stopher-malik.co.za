import { Metadata } from "next";
import { WebDesignPage } from "./WebDesignPage";

export const metadata: Metadata = {
  title: "Freelance Web Design Johannesburg | Stopher Malik",
  description: "Premium custom web design for South African businesses. Conversion-focused, mobile-first, SEO-ready websites built to win clients. Free quote from SMK Web Design.",
  alternates: { canonical: "https://stopher-malik.co.za/web-design/" },
};

export default function WebDesign() {
  return <WebDesignPage />;
}