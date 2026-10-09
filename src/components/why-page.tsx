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
import { ServicesBento } from "@/components/services-bento";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { T } from "@/i18n/t";
import { cn } from "@/lib/utils";

const ctaLabel = "Talk to KRS";

const reasons = [
  {
    title: "One operating file",
    text: "A licensed practice with its own platform. Accounting, payroll, and advice sit in one reviewed file, so software and the advisor work in the same place.",
  },
  {
    title: "Time back to the business",
    text: "KRS handles bookkeeping, payroll, and Greek filings on one platform, so founders are not chasing portals, folders, and inboxes.",
  },
  {
    title: "Named people, on a clock",
    text: "Ask your KRS advisor directly. Structured tax and accounting questions are routed with 24-hour response logic, with progress you can see.",
  },
];

const collaboration = [
  {
    title: "First conversation",
    text: "Tell us how the business runs and where the current process falls short. We review the fit and send a clear proposal.",
  },
  {
    title: "Your file opens",
    text: "Once you choose KRS, we confirm the people, records, deadlines, and first close so responsibility is visible from day one.",
  },
  {
    title: "Work stays visible",
    text: "Track documents, obligations, and advisor progress in one file. Ask when something is unclear. The trail stays inspectable.",
  },
];

const faqs = [
  {
    question: "How does KRS differ from other providers?",
    answer:
      "KRS is a licensed Greek accounting practice with its own operating file. Advisors work in the same place you can see: documents, deadlines, payroll changes, and tax questions, without a black box or a WhatsApp trail.",
  },
  {
    question: "What does the KRS platform actually do?",
    answer:
      "The file keeps accounting, payroll, tax, and filings in one sequence. KRS technology prepares evidence, routes missing documents, and tracks deadlines. Licensed accountants and tax advisors remain accountable for the review.",
  },
  {
    question: "Is KRS right for my company?",
    answer:
      "KRS is built for Greek businesses that want accounting, payroll, and tax in one place: IKE, EPE, AE, founders, and operators who need a reviewed file instead of a monthly scramble. If your setup is more complex, we still want the first conversation.",
  },
  {
    question: "What if I have questions about filings or statements?",
    answer:
      "Ask the advisor who owns your file. The question arrives with the relevant context, and the answer stays in the operating record instead of disappearing into email.",
  },
  {
    question: "How quickly can the first monthly close be ready?",
    answer:
      "That depends on the records we receive and the deadlines already in motion. After the file opens, you can see what is expected of you, what KRS owns, and when the first close is due.",
  },
];

const contactPromises = [
  "Initial consultation 100% free",
  "Personalized expert advice",
  "Guaranteed fast response",
];

export function WhyPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <Reasons />
      <Unique />
      <Platform />
      <Collaboration />
      <Proof />
      <WhyFaq />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  return (
    <section className="bg-[#fdf8f0] px-4 pt-16 pb-10 sm:px-6 sm:pt-20 lg:px-12 lg:pt-24">
      <div className="mx-auto max-w-[920px] text-center">
        <h1 className="font-heading text-[3.25rem] font-light leading-[1.08] tracking-[-0.045em] sm:text-7xl lg:text-8xl">
          <Reveal play="mount"><T text="Why KRS?" /></Reveal>
        </h1>
        <RevealFade
          className="mx-auto mt-6 max-w-[38rem] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
          delay={0.12}
          play="mount"
        >
          <T text="A licensed Greek practice and an AI operating file for accounting, payroll, and tax. You still run the company." />
        </RevealFade>
        <div className="mt-8 flex justify-center">
          <Button asChild className="h-12 rounded-full px-6 text-sm">
            <Link href="/onboarding">
              <T text={ctaLabel} />
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Reasons() {
  return (
    <section className="bg-[#fdf8f0] px-4 pb-0 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="type-h2 text-center">
          <Reveal><T text="3 reasons to choose KRS" /></Reveal>
        </h2>
        <div className="mt-12 grid border-y border-primary/12 md:grid-cols-3">
          {reasons.map((reason, index) => (
            <article
              className={cn(
                "flex min-h-[280px] flex-col justify-between gap-16 px-0 py-10 md:px-8 md:py-12",
                index > 0 && "border-t border-primary/12 md:border-t-0 md:border-l"
              )}
              key={reason.title}
            >
              <h3 className="text-xl font-semibold leading-tight"><T text={reason.title} /></h3>
              <p className="max-w-sm text-sm leading-7 text-muted-foreground"><T text={reason.text} /></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Unique() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden sm:min-h-[520px] lg:min-h-[640px]">
          <Image
            alt="KRS accounting advisor at work in Athens"
            className="object-cover object-top"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src="/images/krs-accountant-advisor.png"
          />
        </div>
        <div className="flex flex-col justify-center px-4 py-16 sm:px-8 sm:py-20 lg:px-16">
          <h2 className="type-h3">
            <Reveal><T text="What makes KRS unique?" /></Reveal>
          </h2>
          <RevealFade className="mt-6 max-w-xl text-base leading-8 text-primary-foreground/72" delay={0.08}>
            <T text="KRS is a licensed practice with its own operating layer. Advisors work in the same file you can see: documents, deadlines, payroll changes, and tax questions. Simple, secure, and inspectable." />
          </RevealFade>
        </div>

        <div className="flex flex-col justify-center px-4 py-16 sm:px-8 sm:py-20 lg:order-none lg:px-16">
          <h2 className="type-h3">
            <Reveal><T text="Who is KRS for?" /></Reveal>
          </h2>
          <RevealFade className="mt-6 max-w-xl text-base leading-8 text-primary-foreground/72" delay={0.08}>
            <T text="Greek companies that need accounting, payroll, and tax in one place. IKE, EPE, AE, founders, and operators who want a reviewed file instead of a monthly scramble." />
          </RevealFade>
          <RevealFade className="mt-4 max-w-xl text-base leading-8 text-primary-foreground/72" delay={0.12}>
            <T text="Startups, in particular, get help with registration, myDATA, and the first close. If you want the work to stay inspectable, KRS is the right practice. If your setup is more complex, we still want the first conversation." />
          </RevealFade>
          <Button
            asChild
            className="mt-8 h-12 w-fit rounded-full bg-secondary px-6 text-secondary-foreground hover:bg-secondary/90"
          >
            <Link href="/onboarding">
              <T text={ctaLabel} />
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </Button>
        </div>
        <div className="relative min-h-[320px] overflow-hidden bg-[#e7dfd2] sm:min-h-[420px] lg:min-h-[560px]">
          <Image
            alt="KRS operating file connecting people, documents, and reviewed work"
            className="object-cover object-center"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src="/images/krs-why-ai.jpg"
          />
        </div>
      </div>
    </section>
  );
}

function Platform() {
  return (
    <section className="bg-[#fdf8f0] px-4 py-24 sm:px-6 lg:px-12 lg:py-28" id="platform">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="type-h2 mx-auto max-w-4xl text-center">
          <Reveal><T text="Bookkeeping, payroll and taxes, on one smart platform" /></Reveal>
        </h2>
        <ServicesBento className="mt-14" />
      </div>
    </section>
  );
}

function Collaboration() {
  return (
    <section className="bg-[#fdf8f0] px-4 pb-24 sm:px-6 lg:px-12" id="how-we-start">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="type-h2 text-center">
          <Reveal><T text="How does the collaboration work?" /></Reveal>
        </h2>
        <div className="mt-14 grid border-y border-primary/12 md:grid-cols-3">
          {collaboration.map((step, index) => (
            <article
              className={cn(
                "flex min-h-[240px] flex-col justify-between gap-12 px-0 py-10 md:px-8 md:py-12",
                index > 0 && "border-t border-primary/12 md:border-t-0 md:border-l"
              )}
              key={step.title}
            >
              <h3 className="text-xl font-semibold leading-tight"><T text={step.title} /></h3>
              <p className="max-w-sm text-sm leading-7 text-muted-foreground"><T text={step.text} /></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="border-y border-primary/12 bg-[#fdf8f0] px-4 py-16 sm:px-6 sm:py-20 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <blockquote className="font-heading text-balance text-3xl font-light leading-snug sm:text-4xl lg:text-[2.6rem] lg:leading-[1.2]">
            <T text="KRS gives us the operating clarity we wanted from an internal finance team, without losing the judgement of real tax advisors." />
          </blockquote>
          <footer className="mt-8">
            <p className="font-semibold"><T text="Nikos Vardakis" /></p>
            <p className="mt-1 text-sm text-muted-foreground"><T text="Co-founder, HelioStack Technologies" /></p>
          </footer>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-primary">
          <Image
            alt="A KRS advisory session over company filings"
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            src="/images/krs-pricing-advisory-session.png"
          />
        </div>
      </div>
    </section>
  );
}

function WhyFaq() {
  return (
    <section className="bg-[#fdf8f0] px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-28" id="faq">
      <div className="mx-auto grid max-w-[1400px] items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <h2 className="type-h3">
            <Reveal><T text="Frequently asked questions to KRS" /></Reveal>
          </h2>
          <Accordion className="mt-10 border-t border-primary/16" defaultValue="why-faq-0" collapsible type="single">
            {faqs.map((faq, index) => (
              <AccordionItem className="border-primary/14" key={faq.question} value={`why-faq-${index}`}>
                <AccordionTrigger className="rounded-none py-6 text-left text-lg font-semibold hover:no-underline">
                  <T text={faq.question} />
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-7 text-sm leading-7 text-muted-foreground">
                  <T text={faq.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="relative hidden min-h-[520px] overflow-hidden bg-[#e7dfd2] lg:block">
          <Image
            alt="KRS tax advisory file showing a reviewed question and next actions"
            className="object-cover object-left"
            fill
            sizes="42vw"
            src="/images/krs-tax-advisory-advisor.jpg"
          />
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-secondary-200 px-4 py-24 text-primary sm:px-6 lg:px-12 lg:py-32">
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-12 items-start gap-8">
        <div className="col-span-12 lg:col-span-8">
          <h2 className="type-display-xl text-primary">
            <Reveal><T text="Begin" /></Reveal>
            <Reveal delay={0.1}><T text="together." /></Reveal>
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <h3 className="type-h4 max-w-md text-balance text-primary"><T text="We take care of admin. You take care of business." /></h3>
          <p className="mt-4 max-w-md text-lg leading-8 text-primary/74">
            <T text="Our team will get the file open, the authorisations in place, and the first close on a calendar." />
          </p>
          <ul className="mt-6 grid max-w-md gap-2.5 text-base leading-6 text-primary">
            {contactPromises.map((item) => (
              <li className="flex items-start gap-2.5" key={item}>
                <Check className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} />
                <T text={item} />
              </li>
            ))}
          </ul>
          <Button
            asChild
            className="mt-8 h-13 w-full justify-between rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/onboarding">
              <T text={ctaLabel} />
              <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
