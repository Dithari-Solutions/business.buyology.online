import type { Metadata } from "next";
import PartnerForm from "@/components/PartnerForm";
export const metadata: Metadata = {
 title: "Become a Partner — Stockist Qualification Form",
 description: "Apply to become a Buyology stockist, retail or B2B distribution partner. Complete our five-step business qualification form and choose your partnership.",
 alternates: { canonical: "/become-partner/" },
 openGraph: { url: "/become-partner/", title: "Become a Buyology Partner", description: "Complete the five-step stockist partner qualification form." },
 twitter: { title: "Become a Buyology Partner", description: "Apply for stockist, retail and B2B distribution partnerships." },
};
export default function BecomePartner() { return <PartnerForm />; }
