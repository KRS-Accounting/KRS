import { AccountingPage } from "@/components/accounting-page";
import { pageMetadata } from "@/i18n/metadata";
import { accountingPage } from "@/lib/service-pages";

export function generateMetadata() {
  return pageMetadata({
    title: "Accounting Services for Greek Businesses | KRS",
    description: accountingPage.description,
    canonical: "/services/accounting",
  });
}

export default function AccountingRoute() {
  return <AccountingPage />;
}
