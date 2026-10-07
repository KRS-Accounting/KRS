import { FundingPage } from "@/components/funding-page";
import { pageMetadata } from "@/i18n/metadata";
import { fundingGrantsPage } from "@/lib/service-pages";

export function generateMetadata() {
  return pageMetadata({
    title: "Funding and Grants for Greek Businesses | KRS",
    description: fundingGrantsPage.description,
    canonical: "/services/funding-grants",
  });
}

export default function FundingGrantsRoute() {
  return <FundingPage />;
}
