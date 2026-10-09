import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";

import { Reveal, RevealFade } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { T } from "@/i18n/t";
import { cn } from "@/lib/utils";

const ctaLabel = "Talk to KRS";

const inherited = [
  {
    title: "Fragmented admin",
    text: "Taxisnet, myDATA, ERGANI, the bank, and the accountant's inbox each hold a piece of the truth. None of them is the full picture.",
  },
  {
    title: "Quarterly surprise",
    text: "The advisor appears at the deadline with questions the business could have answered in March, if anyone had asked.",
  },
  {
    title: "Compliance as a trap",
    text: "Filings are costly when they are late, rigid when they are rushed, and opaque when nobody can show the evidence.",
  },
  {
    title: "Advice without a trail",
    text: "A WhatsApp reply is not a record. Founders cannot see what was decided, by whom, or why.",
  },
];

const practiced = [
  {
    title: "One platform",
    text: "Bookkeeping, payroll, tax questions and deadlines sit together, reviewed by your advisor.",
  },
  {
    title: "Monthly close, named review",
    text: "Receipts and bank activity move through a close that has an owner before the month is gone.",
  },
  {
    title: "Greek systems, one cadence",
    text: "AADE, myDATA, Taxisnet, EFKA, and ERGANI are the context of the work, not extras bolted on later.",
  },
  {
    title: "Questions with a clock",
    text: "Structured tax and accounting questions are routed with 24-hour response logic, then reviewed by a KRS advisor.",
  },
];

const principles = [
  {
    title: "Humans stay in control",
    text: "AI prepares the work. Licensed accountants and tax advisors remain accountable for the review.",
  },
  {
    title: "Evidence over black boxes",
    text: "Every action on the platform can be inspected, explained, and handed to the person who owns it.",
  },
  {
    title: "A six-hour focused day",
    text: "KRS introduced a six-hour working day in Greece, with eight-hour pay. Better judgment, not longer hours.",
  },
  {
    title: "Precision over probability",
    text: "Structured workflows. Verified outputs. Filings that do not arrive as a surprise.",
  },
  {
    title: "Greek compliance first",
    text: "The reserved work of the practice still happens inside Greek law, Greek portals, and Greek deadlines.",
  },
  {
    title: "AI as a partner",
    text: "Tools that give advisors more time for the question that matters, not a replacement for the practice.",
  },
];

const stats = [
  {
    label: "Practice started",
    value: "2011",
    text: "Licensed accounting and tax work in Greece, now run on software we built.",
  },
  {
    label: "Structured response",
    value: "24",
    unit: "h",
    text: "Tax and accounting questions are routed with a clock, then reviewed by a named advisor.",
  },
  {
    label: "Focused working day",
    value: "6",
    unit: "h",
    text: "The team works a six-hour day so the reserved professional work stays sharp.",
  },
  {
    label: "One platform",
    value: "1",
    text: "Bookkeeping, payroll, tax and filings in one place, not scattered portals.",
  },
];

const careersOffer = [
  {
    title: "Six hours. Eight-hour pay.",
    text: "KRS pays for eight hours and asks for six of focused work, so the reserved professional work stays sharp.",
  },
  {
    title: "The platform takes the chasing",
    text: "Document routing, missing documents, and portal loops sit in the software. Advisors spend the day on review.",
  },
  {
    title: "Named review is the job",
    text: "Licensed work, a visible trail, and a reviewer beside you. You are never asked to hide behind a black box.",
  },
];

const contactPromises = [
  "Initial consultation 100% free",
  "Personalized expert advice",
  "Guaranteed fast response",
];

export function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <Origin />
      <Practice />
      <Principles />
      <Stats />
      <Platform />
      <Careers />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  return (
    <section className="border-b border-primary/12 bg-[#fdf8f0]">
      <div className="mx-auto grid max-w-[1400px] lg:min-h-[620px] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex flex-col justify-center px-4 py-14 sm:px-6 sm:py-16 lg:px-12 lg:py-16">
          <p className="mono-label text-secondary"><T text="About us" /></p>
          <h1 className="type-h1 mt-6">
            <Reveal play="mount"><T text="Accountants." /></Reveal>
            <Reveal delay={0.08} play="mount">
              <T text="Software." />
            </Reveal>
          </h1>
          <RevealFade
            className="mt-6 max-w-[34rem] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
            delay={0.12}
            play="mount"
          >
            <T text="Named advisors handle bookkeeping, payroll and tax. The platform keeps the work in one place." />
          </RevealFade>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild className="h-12 rounded-full px-6 text-sm">
              <Link href="/onboarding">
                <T text={ctaLabel} />
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </Link>
            </Button>
            <Link
              className="inline-flex h-12 items-center gap-2 border-b border-primary/30 px-1 text-sm font-semibold transition hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              href="#how-we-work"
            >
              <T text="How we work" />
              <ChevronRight className="size-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        <div className="relative aspect-[16/11] overflow-hidden bg-primary sm:aspect-auto sm:min-h-[480px] lg:min-h-full">
          <Image
            alt="KRS team receiving an HR award for workplace culture"
            className="object-cover object-center"
            fill
            priority
            sizes="(min-width: 1024px) 54vw, 100vw"
            src="/images/krs-hero-awards.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Origin() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground lg:py-32" id="story">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[max(1rem,calc((100%-1400px)/2+1rem))] hidden w-[min(22rem,36%)] items-end sm:left-[max(1.5rem,calc((100%-1400px)/2+1.5rem))] lg:flex lg:left-[max(3rem,calc((100%-1400px)/2+3rem))]"
      >
        <Image
          alt=""
          className="h-auto w-full object-contain object-bottom"
          height={1400}
          src="/images/FounderKRS.webp"
          width={1200}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1400px] items-end gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-12">
        <div className="mx-auto w-full max-w-xs lg:col-span-4 lg:hidden">
          <Image
            alt="Konstantinos Raikos, founder and CEO of KRS"
            className="h-auto w-full object-contain object-bottom"
            height={1400}
            src="/images/FounderKRS.webp"
            width={1200}
          />
        </div>

        <div className="lg:col-span-8 lg:col-start-5 lg:pb-4">
          <h2 className="font-heading text-balance text-4xl font-light leading-[1.08] sm:text-5xl lg:text-6xl">
            <Reveal><T text="We did not start another accounting office." /></Reveal>
          </h2>
          <RevealFade className="mt-8 max-w-2xl text-lg leading-8 text-primary-foreground/72" delay={0.08}>
            <T text="When Konstantinos Raikos founded KRS in 2011, the brief was to prove that a Greek firm can respect its people, ship its own tools, and still do the reserved work of a licensed practice." />
          </RevealFade>
          <RevealFade className="mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/72" delay={0.14}>
            <T text="Today that means licensed accountants and tax advisors, working on software we built. AI prepares the work. Advisors remain accountable. You still run the company." />
          </RevealFade>
          <blockquote className="mt-12 max-w-xl border-l border-secondary pl-6">
            <p className="font-heading text-2xl font-light leading-snug text-secondary sm:text-3xl">
              <T text="We do not only manage numbers. We take part in the next day of Greek entrepreneurship." />
            </p>
            <footer className="mt-5 text-sm leading-6 text-primary-foreground/58">
              <T text="Konstantinos Raikos" />
              <span className="mt-0.5 block text-primary-foreground/42"><T text="Founder and CEO" /></span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function Practice() {
  return (
    <section className="scroll-mt-24 border-y border-primary/12" id="practice">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
        <div className="bg-muted/55 px-4 py-20 sm:px-6 sm:py-24 lg:px-12">
          <h2 className="type-h3 max-w-lg text-balance">
            <Reveal><T text="The usual setup." /></Reveal>
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
            <T text="Most businesses do not fail at accounting because they lack a tool. They fail because the work is split across people and portals that never talk to each other." />
          </p>
          <ul className="mt-12 grid gap-8">
            {inherited.map((item) => (
              <li key={item.title}>
                <h3 className="text-xl font-semibold leading-tight"><T text={item.title} /></h3>
                <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground"><T text={item.text} /></p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-primary px-4 py-20 text-primary-foreground sm:px-6 sm:py-24 lg:px-12">
          <h2 className="type-h3 max-w-lg text-balance">
            <Reveal><T text="How KRS works." /></Reveal>
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-primary-foreground/68">
            <T text="KRS is still a licensed practice. The difference is the platform: visible work, a named reviewer, and a clock on the question." />
          </p>
          <ul className="mt-12 grid gap-8">
            {practiced.map((item) => (
              <li key={item.title}>
                <h3 className="text-xl font-semibold leading-tight text-secondary"><T text={item.title} /></h3>
                <p className="mt-2 max-w-md text-sm leading-7 text-primary-foreground/68"><T text={item.text} /></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="scroll-mt-24 bg-background px-4 py-24 sm:px-6 lg:px-12" id="how-we-work">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="type-h3 max-w-3xl text-balance">
          <Reveal><T text="How the practice works." /></Reveal>
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          <T text="These are the rules we hold ourselves to. If work cannot be inspected, it does not go out." />
        </p>

        <div className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {principles.map((item) => (
            <article key={item.title}>
              <h3 className="text-2xl font-semibold leading-tight"><T text={item.title} /></h3>
              <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground"><T text={item.text} /></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-primary/12 bg-card px-4 py-24 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="type-h3 max-w-3xl text-balance">
          <Reveal><T text="The practice, in numbers." /></Reveal>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
          {stats.map((stat, index) => (
            <article
              className={cn(
                index === 0 ? "xl:pr-10" : index === stats.length - 1 ? "xl:pl-10" : "xl:px-10",
                index > 0 && "xl:border-l xl:border-primary/12"
              )}
              key={stat.label}
            >
              <p className="text-sm font-medium text-muted-foreground"><T text={stat.label} /></p>
              <p className="font-heading mt-6 inline-flex items-baseline gap-1 text-6xl font-medium leading-none tracking-[-0.04em] text-primary sm:text-7xl">
                <span>{stat.value}</span>
                {stat.unit ? <span className="text-[0.42em] font-semibold tracking-tight">{stat.unit}</span> : null}
              </p>
              <p className="mt-6 max-w-xs text-sm leading-7 text-muted-foreground"><T text={stat.text} /></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Platform() {
  return (
    <section className="bg-background px-4 py-24 sm:px-6 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div>
          <h2 className="type-h3 max-w-xl text-balance">
            <Reveal><T text="See the work as it happens." /></Reveal>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            <T text="KRS built reporting and invoicing tools because the market did not. The platform is the next layer: questions, documents and filings in one place you can actually see." />
          </p>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            <T text="Automation prepares. Licensed people decide. You are never asked to trust a black box with a tax return." />
          </p>
        </div>

        <div className="gradient-shell shadow-[var(--shadow-lg)]">
          <Image
            alt="KRS tax advisory platform showing a reviewed VAT question and required documents"
            className="w-full bg-[#fdf8f0]"
            height={720}
            src="/images/krs-tax-advisory-focused.jpg"
            width={1080}
          />
        </div>
      </div>
    </section>
  );
}

function Careers() {
  return (
    <section className="scroll-mt-24 bg-accent px-4 py-24 text-primary-foreground sm:px-6 lg:px-12" id="careers">
      <div className="mx-auto grid max-w-[1400px] items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <h2 className="type-h3 max-w-xl text-balance text-primary-foreground">
            <Reveal><T text="Join the team in Athens." /></Reveal>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/72">
            <T text="Licensed accountants, payroll specialists, and the people who build our platform. Advisors spend the day on review. Six focused hours, paid as eight." />
          </p>
          <Button
            asChild
            className="mt-10 h-12 rounded-full bg-primary-foreground px-6 text-primary hover:bg-primary-foreground/90"
          >
            <Link href="/careers">
              <T text="See open roles" />
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </Button>
        </div>

        <ul className="border-t border-primary-foreground/16">
          {careersOffer.map((item) => (
            <li className="border-b border-primary-foreground/16 py-8" key={item.title}>
              <h3 className="text-xl font-semibold leading-tight"><T text={item.title} /></h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-primary-foreground/68"><T text={item.text} /></p>
            </li>
          ))}
        </ul>
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
            <T text="Our team will get you onboarded, the authorisations in place, and the first close on a calendar." />
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
