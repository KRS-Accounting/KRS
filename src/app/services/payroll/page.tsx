import { PayrollPage } from "@/components/payroll-page";
import { pageMetadata } from "@/i18n/metadata";
import { payrollPage } from "@/lib/service-pages";

export function generateMetadata() {
  return pageMetadata({
    title: "Payroll for Greek Businesses | KRS",
    description: payrollPage.description,
    canonical: "/services/payroll",
  });
}

export default function PayrollRoute() {
  return <PayrollPage />;
}
