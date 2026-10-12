import type { Metadata } from "next";
import PartnerForm from "@/components/PartnerForm";
export const metadata: Metadata = {
 title: "Apply for Partnership — Business Qualification Form",
 description: "Apply to become a Buyology stockist, retail or B2B distribution partner. Complete our five-step business qualification form and choose your partnership.",
 alternates: { canonical: "/become-partner/" },
 openGraph: { url: "/become-partner/", title: "Apply for Partnership with Buyology", description: "Complete the five-step stockist partner qualification form." },
 twitter: { title: "Apply for Partnership with Buyology", description: "Apply for stockist, retail and B2B distribution partnerships." },
};
export default function BecomePartner() { return <PartnerForm />; }
