import { WhyPage } from "@/components/why-page";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return pageMetadata({
    title: "Why KRS AI?",
    description:
      "A licensed Greek accounting practice with an AI operating file. Bookkeeping, payroll, and tax stay in one reviewed place, so founders can run the company.",
    canonical: "/why",
  });
}

export default function Why() {
  return <WhyPage />;
}
