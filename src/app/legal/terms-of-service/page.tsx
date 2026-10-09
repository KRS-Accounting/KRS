import type { Metadata } from "next";

import { LegalDocumentView } from "@/components/legal-document";
import { termsOfService } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service | KRS",
  description: termsOfService.description,
  alternates: { canonical: "/legal/terms-of-service" },
};

export default function TermsOfServicePage() {
  return <LegalDocumentView document={termsOfService} />;
}
