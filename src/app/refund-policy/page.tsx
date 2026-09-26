import { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { RefundPolicyPage } from "./RefundPolicyPage";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | SMK Web Design",
  description:
    "SMK Web Design's refund, cancellation and recurring service policy for web design, development and digital services.",
  alternates: {
    canonical: "https://stopher-malik.co.za/refund-policy/",
  },
  openGraph: pageOpenGraph("/refund-policy/"),
};

export default function RefundPolicy() {
  return <RefundPolicyPage />;
}
