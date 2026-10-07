import { TaxPage } from "@/components/tax-page";
import { pageMetadata } from "@/i18n/metadata";
import { taxAdvisoryPage } from "@/lib/service-pages";

export function generateMetadata() {
  return pageMetadata({
    title: "Tax Advisory for Greek Businesses | KRS",
    description: taxAdvisoryPage.description,
    canonical: "/services/tax-advisory",
  });
}

export default function TaxAdvisoryRoute() {
  return <TaxPage />;
}
