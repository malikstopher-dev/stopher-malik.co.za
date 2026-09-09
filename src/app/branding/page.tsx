import { Metadata } from "next";
import { BrandingPage } from "./BrandingPage";

export const metadata: Metadata = {
  title: "Branding & Identity | SMK Web Design",
  description: "Logos, brand kits, and visual identity for South African businesses. Branding that makes your business impossible to forget in a crowded market.",
};

export default function Branding() {
  return <BrandingPage />;
}