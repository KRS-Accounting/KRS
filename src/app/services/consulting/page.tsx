import { ServicePage } from "@/components/accounting-service-page";
import { pageMetadata } from "@/i18n/metadata";
import { consultingPage } from "@/lib/service-pages";

export function generateMetadata() {
  return pageMetadata({
    title: "Business Consulting Services | KRS",
    description: consultingPage.description,
    canonical: "/services/consulting",
  });
}

export default function ConsultingPage() {
  return <ServicePage page={consultingPage} />;
}
