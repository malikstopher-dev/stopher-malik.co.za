import { Metadata } from "next";
import { PrivacyPage } from "./PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | SMK Web Design",
  description: "Privacy Policy for SMK Web Design and Stopher Malik. How we handle your information.",
};

export default function Privacy() {
  return <PrivacyPage />;
}