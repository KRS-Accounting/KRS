import { AboutPage } from "@/components/about-page";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return pageMetadata({
    title: "About Us | KRS",
    description:
      "KRS is a licensed Greek accounting practice with its own platform. Bookkeeping, payroll and tax stay with named advisors, so you can run the company.",
    canonical: "/about",
  });
}

export default function About() {
  return <AboutPage />;
}
