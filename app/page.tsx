import type { Metadata } from "next";
import PartnerForm from "@/components/PartnerForm";

export const metadata: Metadata = {
  title: "Apply for Partnership — Business Qualification Form",
  description: "Apply to become a Buyology stockist, retail or B2B distribution partner. Complete our five-step business qualification form.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "Apply for Partnership with Buyology", description: "Complete the five-step business qualification form." },
  twitter: { title: "Apply for Partnership with Buyology", description: "Apply for stockist, retail and B2B distribution partnerships." },
};

export default function Home() {
  return <PartnerForm />;
}
