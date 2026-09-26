import { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { PrivacyPageContent } from "./PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | SMK Web Design",
  description:
    "Learn how SMK Web Design collects, uses and protects personal information.",
  alternates: {
    canonical: "https://stopher-malik.co.za/privacy/",
  },
  openGraph: pageOpenGraph("/privacy/"),
};

export default function Privacy() {
  return <PrivacyPageContent />;
}
