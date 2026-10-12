import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarClock, MessageSquareText, Scale } from "lucide-react";

import { AccountingContactCta } from "@/components/accounting-contact-cta";
import { ServiceFaq, SwitchProcess } from "@/components/accounting-service-page";
import { FieldNotesSection } from "@/components/field-notes-section";
import { Reveal, RevealFade } from "@/components/reveal";
import { ServiceBenefits } from "@/components/service-benefits";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SlimCta } from "@/components/slim-cta";
import { StatsSection } from "@/components/stats-section";
import { TaxFeatureShowcase } from "@/components/tax-features";
import { TaxHeroVisual } from "@/components/tax-hero-visual";
import { TaxProcessSection } from "@/components/tax-process-section";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { Button } from "@/components/ui/button";
import { getI18n } from "@/i18n/request";
import { taxAdvisoryPage } from "@/lib/service-pages";

const ctaLabel = "Talk to KRS";

const heroBullets = [
  { icon: Scale, text: "VAT returns and the annual income tax filing, prepared and submitted" },
  { icon: CalendarClock, text: "AADE deadlines watched, so a penalty is not the reminder" },
  { icon: MessageSquareText, text: "Direct access to your tax advisor, with the file already in view" },
];

export function TaxPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <Pillars />
      <TaxFeatureShowcase />
      <StatsSection />
      <TaxProcessSection />
      <AccountingContactCta
        body="Share a few details and we will match you with a KRS tax advisor for a free first call."
        defaultServices={["Tax advisory"]}
        subheading="We take care of the filings. You take care of the business."
      />
      <ServiceBenefits page={taxAdvisoryPage} />
      <SwitchProcess page={taxAdvisoryPage} />
      <TestimonialsCarousel />
      <ServiceFaq page={taxAdvisoryPage} />
      <SlimCta ctaLabel={ctaLabel} heading="Ready for every tax deadline to have an owner?" />
      <FieldNotesSection showTopRule={false} />
      <SiteFooter />
    </main>
  );
}

async function Hero() {
  const { tx, href } = await getI18n();

  return (
    <section className="border-b border-primary/12 bg-[#fdf8f0] px-4 sm:px-6 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:py-16">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center rounded-full border border-primary/14 bg-background px-3 py-1 text-xs font-medium text-primary">
            {tx("Tax")}
          </span>
          <h1 className="mt-5 max-w-[18ch] text-balance text-4xl font-normal leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            <Reveal play="mount">{tx(taxAdvisoryPage.title)}</Reveal>
          </h1>
          <RevealFade
            className="mt-5 max-w-[34rem] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
            delay={0.1}
            play="mount"
          >
            {tx(taxAdvisoryPage.description)}
          </RevealFade>
          <ul className="mt-6 grid max-w-xl gap-3">
            {heroBullets.map((item) => {
              const Icon = item.icon;
              return (
                <li className="flex items-start gap-3 text-sm leading-6 sm:text-[15px]" key={item.text}>
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-3.5" strokeWidth={2} />
                  </span>
                  <span>{tx(item.text)}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild className="h-12 rounded-full px-6 text-sm">
              <Link href={href("/onboarding")}>
                {tx("Book a free consultation")}
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </Link>
            </Button>
            <Link
              className="inline-flex h-12 items-center gap-2 border-b border-primary/30 px-1 text-sm font-semibold transition hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              href={href("/pricing")}
            >
              {tx("See pricing")}
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
          <div className="absolute inset-y-6 right-0 w-[72%] overflow-hidden rounded-[var(--radius-2xl)] bg-primary sm:inset-y-4">
            <Image
              alt={tx(taxAdvisoryPage.heroImageAlt)}
              className="object-cover object-[center_30%]"
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 80vw"
              src={taxAdvisoryPage.heroImage}
            />
          </div>
          <div className="absolute bottom-10 left-0 w-[58%] max-w-[280px] sm:bottom-16 sm:w-[48%]">
            <div className="krs-app h-[210px] sm:h-[230px]">
              <TaxHeroVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

async function Pillars() {
  const { tx } = await getI18n();

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-28" id="tax-features">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-4xl text-balance text-4xl font-normal leading-tight sm:text-5xl">
          <Reveal>{tx(taxAdvisoryPage.featuresTitle)}</Reveal>
        </h2>
        <div className="mt-14 grid gap-10 border-t border-primary/14 pt-10 md:grid-cols-3 md:gap-8">
          {taxAdvisoryPage.features.map((feature) => (
            <article className="md:border-r md:border-primary/12 md:pr-8 md:last:border-r-0 md:last:pr-0" key={feature.title}>
              <h3 className="text-2xl font-semibold leading-tight">{tx(feature.title)}</h3>
              <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">{tx(feature.description)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
