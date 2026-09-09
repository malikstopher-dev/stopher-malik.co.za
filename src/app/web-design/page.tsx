import { Metadata } from "next";
import { WebDesignPage } from "./WebDesignPage";

export const metadata: Metadata = {
  title: "Web Design Johannesburg | SMK Web Design",
  description: "Premium custom web design for South African businesses. Conversion-focused, mobile-first, SEO-ready websites built to win clients. Free quote from SMK Web Design.",
};

export default function WebDesign() {
  return <WebDesignPage />;
}