import { ArrowRight, FileText, Landmark, UsersRound } from "lucide-react";

import { PricingCalculator } from "@/components/pricing-calculator";
import { PricingPlans } from "@/components/pricing-plans";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/i18n/metadata";
import { getI18n } from "@/i18n/request";

export function generateMetadata() {
  return pageMetadata({
    title: "Pricing | KRS AI",
    description: "Transparent accounting, payroll, and tax advisory pricing for Greek businesses.",
  });
}

const pricingFaqs = [
  {
    question: "Are the listed prices monthly fees?",
    answer:
      "Yes. The plan prices are monthly starting fees for ongoing accounting support. They exclude VAT and are confirmed once we understand your business structure, document volume, and reporting needs.",
  },
  {
    question: "What is included in the monthly price?",
    answer:
      "Each plan includes the recurring bookkeeping and compliance work shown in the comparison table. The exact mix of VAT, myDATA, annual filings, reporting, and advisor support depends on the plan you choose.",
  },
  {
    question: "How is payroll priced?",
    answer:
      "Payroll administration and ERGANI coordination start at €14 per employee per month. We confirm the final payroll scope before onboarding, especially when there are variable schedules or additional employment requirements.",
  },
  {
    question: "What happens if my business grows or becomes more complex?",
    answer:
      "Your scope can grow with your business. If document volume, payroll, entities, or reporting needs change, your advisor will explain the revised scope and fee before any change takes effect.",
  },
  {
    question: "Are formation costs included when I am starting a company?",
    answer:
      "Formation support has a separate starting estimate, shown in the calculator. Notarial, legal, specialist tax, and other third-party requirements are scoped separately and confirmed in writing before work begins.",
  },
];

export default async function PricingPage() {
  const { tx, href } = await getI18n();

  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader />

      <PricingPlans />

      <section className="border-y border-primary/12 bg-primary px-4 py-16 text-primary-foreground sm:px-6 md:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-3">
          <div>
            <Landmark className="size-7 text-secondary" strokeWidth={1.5} />
            <h2 className="mt-5 text-3xl leading-tight">
              <Reveal>{tx("Built around Greek compliance.")}</Reveal>
            </h2>
            <p className="mt-3 text-sm leading-6 text-primary-foreground/65">{tx("AADE, myDATA, EFKA, and ERGANI are not extras. They are part of the operating context.")}</p>
          </div>
          <div>
            <FileText className="size-7 text-secondary" strokeWidth={1.5} />
            <h2 className="mt-5 text-3xl leading-tight">
              <Reveal>{tx("One file, visible progress.")}</Reveal>
            </h2>
            <p className="mt-3 text-sm leading-6 text-primary-foreground/65">{tx("Your documents, open questions, and filing work remain connected instead of disappearing into an inbox.")}</p>
          </div>
          <div>
            <UsersRound className="size-7 text-secondary" strokeWidth={1.5} />
            <h2 className="mt-5 text-3xl leading-tight">
              <Reveal>{tx("People remain accountable.")}</Reveal>
            </h2>
            <p className="mt-3 text-sm leading-6 text-primary-foreground/65">{tx("Automation prepares the work. Licensed professionals review it and help you make informed decisions.")}</p>
          </div>
        </div>
      </section>

      <PricingCalculator />

      <section className="border-b border-primary/12 bg-[#FDF8F0] px-4 py-16 sm:px-6 md:py-22 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="mono-label text-secondary">{tx("A tailored operating scope")}</p>
            <h2 className="mt-4 text-balance text-5xl leading-[0.98] sm:text-6xl">
              <Reveal>{tx("Your business does not fit a template? That is normal.")}</Reveal>
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{tx("For groups, holding structures, international operations, audits, and specialist filings, KRS builds a scope with the right people and review rhythm.")}</p>
          </div>
          <Button asChild className="h-12 rounded-full px-6 shadow-[var(--shadow-md)]" variant="secondary">
            <a href={href("/onboarding")}>
              {tx("Request a tailored scope")}
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </a>
          </Button>
        </div>
      </section>

      <section className="border-t border-primary/12 px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-28" id="pricing-faq">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
          <div>
            <h2 className="text-4xl font-normal leading-tight sm:text-5xl">
              <Reveal>{tx("The details behind your quote.")}</Reveal>
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
              {tx("A clear scope comes before a commitment. Here are the practical answers clients ask before getting started.")}
            </p>
          </div>
          <Accordion className="border-t border-primary/16" collapsible type="single">
            {pricingFaqs.map((faq, index) => (
              <AccordionItem className="border-primary/14" key={faq.question} value={`pricing-faq-${index}`}>
                <AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline">
                  {tx(faq.question)}
                </AccordionTrigger>
                <AccordionContent className="max-w-3xl pb-7 text-sm leading-7 text-muted-foreground">
                  {tx(faq.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
