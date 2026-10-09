import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, RevealFade } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { getI18n } from "@/i18n/request";
import type { ServicePageData } from "@/lib/service-pages";
import { cn } from "@/lib/utils";

export function ServicePage({ page }: { page: ServicePageData }) {
  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <Hero page={page} />
      <Features page={page} />
      <InlineCta page={page} />
      <Benefits page={page} />
      <SwitchProcess page={page} />
      <TestimonialsCarousel />
      <ServiceFaq page={page} />
      <FinalCta page={page} />
      <SiteFooter />
    </main>
  );
}

async function Hero({ page }: { page: ServicePageData }) {
  const { tx, href } = await getI18n();

  return (
    <section className="border-b border-primary/12 bg-[#fdf8f0] px-4 sm:px-6 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="flex flex-col justify-center py-12 lg:py-16">
          <span className="inline-flex w-fit items-center rounded-full border border-primary/14 bg-background px-3 py-1 text-xs font-medium text-primary">
            {tx("Consulting")}
          </span>
          <h1 className="mt-5 max-w-[16ch] text-balance text-4xl font-normal leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            <Reveal play="mount">{tx(page.title)}</Reveal>
          </h1>
          <RevealFade className="mt-5 max-w-[34rem] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8" delay={0.1} play="mount">
            {tx(page.description)}
          </RevealFade>
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

        <div className="relative min-h-[420px] overflow-hidden rounded-[var(--radius-2xl)] bg-primary sm:min-h-[520px] lg:my-16 lg:min-h-[560px]">
          <Image
            alt={tx(page.heroImageAlt)}
            className="object-cover object-[center_30%]"
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            src={page.heroImage}
          />
        </div>
      </div>
    </section>
  );
}

async function Features({ page }: { page: ServicePageData }) {
  const { tx } = await getI18n();

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-28" id={`${page.slug}-features`}>
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-4xl text-balance text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
          <Reveal>{tx(page.featuresTitle)}</Reveal>
        </h2>
        <div className="mt-14 grid border-y border-primary/16 md:grid-cols-3">
          {page.features.map((feature, index) => (
            <article
              className="border-b border-primary/12 px-0 py-8 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              key={feature.title}
            >
              <span className="font-mono text-xs font-semibold text-secondary">0{index + 1}</span>
              <h3 className="mt-8 text-2xl font-semibold leading-tight">{tx(feature.title)}</h3>
              <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">{tx(feature.description)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

async function InlineCta({ page }: { page: ServicePageData }) {
  const { tx, href } = await getI18n();

  return (
    <section className="border-y border-primary/12 bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-7 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-12">
        <div>
          <h2 className="max-w-4xl text-balance text-3xl font-semibold leading-tight">
            <Reveal>{tx(page.ctaTitle)}</Reveal>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-secondary-foreground/78">
            {tx(page.ctaDescription)}
          </p>
        </div>
        <Button
          asChild
          className="h-12 shrink-0 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
        >
          <Link href={href("/onboarding")}>
            {tx("Book a free consultation")}
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export async function Benefits({ page }: { page: ServicePageData }) {
  const { tx } = await getI18n();

  return (
    <section className="bg-primary px-4 py-20 text-primary-foreground sm:px-6 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-20">
          <div>
            <h2 className="max-w-xl text-balance text-4xl font-normal leading-tight sm:text-5xl">
              <Reveal>{tx(page.benefitsTitle)}</Reveal>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-primary-foreground/66">
              {tx(page.benefitsDescription)}
            </p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden bg-[#fdf8f0]">
            <Image
              alt={tx(page.benefitsImageAlt)}
              className={page.slug === "consulting" ? "object-cover object-[center_30%]" : "object-contain p-4 sm:p-8"}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              src={page.benefitsImage}
            />
          </div>
        </div>

        <div className="mt-14 grid border-t border-primary-foreground/18 md:grid-cols-2">
          {page.benefits.map((benefit, index) => (
            <article
              className={cn(
                "border-b border-primary-foreground/16 py-8 md:px-8",
                index % 2 === 0 && "md:border-r md:pl-0",
                index % 2 === 1 && "md:pr-0"
              )}
              key={benefit.title}
            >
              <span className="font-mono text-xs font-semibold text-secondary">{benefit.index}</span>
              <h3 className="mt-7 text-2xl font-semibold leading-tight">{tx(benefit.title)}</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-primary-foreground/62">{tx(benefit.description)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function SwitchProcess({ page }: { page: ServicePageData }) {
  const { tx, href } = await getI18n();

  return (
    <section className="border-y border-primary/12 bg-[#fdf8f0] px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-balance text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
            <Reveal>{tx(page.processTitle)}</Reveal>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            {tx(page.processDescription)}
          </p>
          <Link
            className="mt-7 inline-flex items-center gap-2 border-b-2 border-primary pb-1 text-sm font-semibold text-primary transition hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            href={href("/onboarding")}
          >
            {tx("Request a no-obligation quote")}
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </Link>
        </div>

        <ol className="mt-14 grid gap-4 lg:grid-cols-3">
          {page.process.map((step, index) => (
            <li
              className="flex flex-col overflow-hidden rounded-lg border border-white bg-white/28 p-5 sm:p-6 lg:min-h-[640px]"
              key={step.title}
            >
              <span className="flex h-9 w-fit min-w-16 items-center justify-center rounded-full border border-white bg-white/24 px-4 font-mono text-xs font-semibold text-primary">
                0{index + 1}
              </span>
              <h3 className="mt-5 text-2xl font-semibold leading-tight">{tx(step.title)}</h3>
              <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">{tx(step.description)}</p>
              <div className="relative mt-9 aspect-[4/3] overflow-hidden rounded-md bg-white lg:mt-auto">
                <Image
                  alt={tx(step.imageAlt)}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 31vw, 100vw"
                  src={step.image}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export async function ServiceFaq({ page }: { page: ServicePageData }) {
  const { tx } = await getI18n();

  return (
    <section className="border-t border-primary/12 px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
        <div>
          <h2 className="text-4xl font-normal leading-tight sm:text-5xl">
            <Reveal>{tx(page.faqTitle)}</Reveal>
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
            {tx(page.faqDescription)}
          </p>
        </div>

        <Accordion className="border-t border-primary/16" collapsible type="single">
          {page.faqs.map((faq, index) => (
            <AccordionItem className="border-primary/14" key={faq.question} value={`${page.slug}-faq-${index}`}>
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
  );
}

async function FinalCta({ page }: { page: ServicePageData }) {
  const { tx, href } = await getI18n();

  return (
    <section className="bg-primary px-4 py-20 text-primary-foreground sm:px-6 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <span className="flex size-11 items-center justify-center rounded-full border border-secondary text-secondary">
          <Check className="size-5" strokeWidth={1.75} />
        </span>
        <h2 className="mt-8 max-w-5xl text-balance text-5xl font-normal leading-[0.98] sm:text-6xl lg:text-7xl">
          <Reveal>{tx(page.finalTitle)}</Reveal>
        </h2>
        <div className="mt-9 flex flex-col gap-7 border-t border-primary-foreground/16 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-base leading-7 text-primary-foreground/64">
            {tx(page.finalDescription)}
          </p>
          <Button
            asChild
            className="h-12 w-fit shrink-0 rounded-full bg-primary-foreground px-6 text-primary hover:bg-primary-foreground/90"
          >
            <Link href={href("/onboarding")}>
              {tx("Book a free consultation")}
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
