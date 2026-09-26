import { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { TermsPage } from "./TermsPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | SMK Web Design",
  description:
    "Terms and conditions governing SMK Web Design's web design, development, graphic design, maintenance and digital services.",
  alternates: {
    canonical: "https://stopher-malik.co.za/terms/",
  },
  openGraph: pageOpenGraph("/terms/"),
};

export default function Terms() {
  return <TermsPage />;
}
