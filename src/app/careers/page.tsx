import { CareersPage } from "@/components/careers-page";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return pageMetadata({
    title: "Careers | KRS",
    description:
      "Join KRS: a six-hour working day with eight-hour pay, licensed accounting work, and an AI operating file. Open roles in Athens.",
    canonical: "/careers",
  });
}

export default function Careers() {
  return <CareersPage />;
}
