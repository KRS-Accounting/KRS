import type { Metadata } from "next";

import { LegalDocumentView } from "@/components/legal-document";
import { privacyPolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | KRS",
  description: privacyPolicy.description,
  alternates: { canonical: "/legal/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <LegalDocumentView document={privacyPolicy} />;
}
