import { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { StackPage } from "./StackPage";

export const metadata: Metadata = {
  title: "Stack | SMK Web Design",
  description: "Stopher Malik's professional design and development stack at SMK.",
  alternates: { canonical: "https://stopher-malik.co.za/stack/" },
  openGraph: pageOpenGraph("/stack/"),
};

export default function Stack() {
  return <StackPage />;
}