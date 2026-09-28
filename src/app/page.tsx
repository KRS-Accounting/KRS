import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Gauge,
  MessageSquareText,
  Network,
  PanelsTopLeft,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AgentsSection } from "@/components/agents-section";
import { CareersClock } from "@/components/careers-clock";
import { ContactCta } from "@/components/contact-cta";
import { FieldNotesSection } from "@/components/field-notes-section";
import { StatsSection } from "@/components/stats-section";
import { HeroVideoSection } from "@/components/hero-video-section";
import { Reveal, RevealFade } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { ProcessTimeline } from "@/components/process-timeline";
import { ServicesBento } from "@/components/services-bento";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SlimCta } from "@/components/slim-cta";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { cn } from "@/lib/utils";

const mediaSignals = [
  { label: "Money Review", mark: "MR", note: "AI accounting operations", href: "https://www.moneyreview.gr/" },
  { label: "Kathimerini Business", mark: "K", note: "Greek SME advisory", href: "https://www.kathimerini.gr/economy/business/" },
  { label: "Naftemporiki", mark: "N", note: "Tax technology", href: "https://www.naftemporiki.gr/" },
  { label: "Startupper", mark: "S", note: "Founder finance", href: "https://www.startupper.gr/" },
];

const pressTickerCopies = 8;
const pressTickerDuration = `${34 * pressTickerCopies}s`;

const processSteps = [
  {
    time: "Day 1",
    title: "Start",
    text: "After signature, KRS opens the operating file, confirms authorisations, and maps the first tax and accounting obligations.",
    cta: "Explore tax advisor service",
  },
  {
    time: "Every month",
    title: "Monthly accounting close",
    text: "Receipts, bank activity, payroll changes, and myDATA requirements move through one review sequence before the month closes.",
    cta: "Discover accounting services",
  },
  {
    time: "Once a year",
    title: "Annual filings and tax return",
    text: "Financial statements, tax returns, and supporting evidence are prepared with visible status before submission deadlines.",
    cta: "Discover annual filings",
  },
  {
    time: "Always",
    title: "Talk to real experts",
    text: "Ask questions directly to KRS advisors and get instant help from real people who understand and care for your business.",
    cta: "Talk to our team",
  },
];

const benefits: Array<{ value: string; text: string; icon: LucideIcon }> = [
  {
    value: "One platform",
    text: "for accounting, payroll, tax advisory, and document control.",
    icon: PanelsTopLeft,
  },
  {
    value: "24h response logic",
    text: "for structured tax and accounting questions.",
    icon: MessageSquareText,
  },
  {
    value: "Greek compliance graph",
    text: "connecting authorities, deadlines, and advisor review.",
    icon: Network,
  },
  {
    value: "Realtime transparency",
    text: "across missing documents, filings, and monthly close status.",
    icon: Gauge,
  },
];

const socialVideos = [
  {
    id: "Wl6-gvmHT88",
    href: "https://www.youtube.com/shorts/Wl6-gvmHT88",
    title: "Building a company in Greece.",
    text: "The founder on the early decisions that shape a business.",
  },
  {
    id: "_HIrEfhkh6Y",
    href: "https://www.youtube.com/shorts/_HIrEfhkh6Y",
    title: "What entrepreneurship looks like in practice.",
    text: "A conversation about clients, teams, and staying focused as the company grows.",
  },
  {
    id: "-_k56R5dp7U",
    href: "https://www.youtube.com/shorts/-_k56R5dp7U",
    title: "Advice founders usually wait too long to hear.",
    text: "Tax, cash, and structure, discussed in plain language for people running a business.",
  },
];

const faqs = [
  {
    question: "Does KRS AI do all bookkeeping tasks for me?",
    answer:
      "KRS AI supports document routing, classification, deadline tracking, and evidence gathering. Licensed accounting professionals review and complete the reserved accounting work, while you provide context or documents when something is missing.",
  },
  {
    question: "Does KRS AI replace my accountant?",
    answer:
      "No. The platform improves preparation and visibility. Human KRS advisors remain responsible for judgment, review, and professional work that must be handled by licensed specialists.",
  },
  {
    question: "Which Greek compliance systems does KRS AI support?",
    answer:
      "The operating model is designed around AADE, myDATA, Taxisnet, EFKA, ERGANI, gov.gr workflows, and the documents Greek businesses need for accounting, payroll, and tax continuity.",
  },
  {
    question: "What kind of questions can I ask my tax team?",
    answer:
      "You can ask about VAT, payroll obligations, entity structure, deductibility, deadlines, filings, monthly reports, and operational tax choices. KRS routes the question to the right advisor with the relevant file context.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <div className="-mt-18 flex min-h-[100dvh] flex-col">
        <HeroVideoSection />
        <MediaSection />
      </div>
      <StatsSection />
      <ServicesSection />
      <ManifestoSection />
      <SlimCta />
      <AgentsSection workSide="fan" />
      <ProcessSection />
      <WhySection />
      <TestimonialSection />
      <FieldNotesSection />
      <CareersSection />
      <FaqSection />
      <SocialVideosSection />
      <ContactCta />
      <SiteFooter />
    </main>
  );
}

function MediaSection() {
  const sequence = Array.from({ length: pressTickerCopies }, () => mediaSignals).flat();

  return (
    <section className="shrink-0 border-y border-primary/12 bg-card py-6" id="media">
      <h2 className="sr-only">Press</h2>
      <div className="overflow-hidden">
        <div className="ticker-track flex w-max" style={{ animationDuration: pressTickerDuration }}>
          {[0, 1].map((copy) => (
            <div
              aria-hidden={copy === 1 ? true : undefined}
              className="flex shrink-0 gap-3 pr-3"
              key={copy}
            >
              {sequence.map((item, index) => {
                const decorative = copy === 1 || index >= mediaSignals.length;

                return (
                  <a
                    aria-hidden={decorative ? true : undefined}
                    className="group/media grid w-72 grid-cols-[auto_1fr] items-center gap-4 border-r border-primary/12 pr-6 outline-none transition-colors hover:text-primary focus-visible:text-primary"
                    href={item.href}
                    key={`${copy}-${item.label}-${index}`}
                    rel="noreferrer"
                    tabIndex={decorative ? -1 : undefined}
                    target="_blank"
                  >
                    <span className="flex size-9 items-center justify-center border border-primary/16 bg-background font-heading text-sm font-semibold text-secondary transition-colors group-hover/media:border-secondary group-hover/media:bg-secondary group-hover/media:text-secondary-foreground">
                      {item.mark}
                    </span>
                    <div>
                      <p className="font-semibold underline decoration-primary/0 underline-offset-4 transition group-hover/media:decoration-secondary group-focus-visible/media:decoration-secondary">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{item.note}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground lg:py-36" id="about">
      <div className="font-heading absolute -right-8 top-0 select-none text-[360px] font-light leading-[0.75] text-secondary/8 sm:text-[520px]">
        04
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[max(1rem,calc((100%-1400px)/2+1rem))] w-[min(22rem,40%)] bg-left-bottom bg-no-repeat sm:left-[max(1.5rem,calc((100%-1400px)/2+1.5rem))] lg:left-[max(3rem,calc((100%-1400px)/2+3rem))]"
        style={{
          backgroundImage: "url('/images/FounderKRS.webp')",
          backgroundSize: "min(22rem, 100%) auto",
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-4 sm:px-6 lg:px-12">
        <div className="relative col-span-12 min-h-[420px] lg:col-span-3 lg:min-h-[520px]">
          <p className="mono-label text-secondary">Manifesto / 01</p>
          <p className="mt-5 max-w-xs text-sm leading-7 text-primary-foreground/56">
            Accounting should feel like an operating discipline, not a periodic scramble through portals, folders, and
            inboxes.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <p className="font-heading text-balance text-4xl font-light leading-[1.04] sm:text-5xl md:text-6xl lg:text-7xl">
            <Reveal>
              We believe trust is built through evidence, cadence, and accountable review.
            </Reveal>
            <Reveal delay={0.1}>
              <span className="italic text-secondary"> AI should not obscure the work.</span> It should make the work
              inspectable.
            </Reveal>
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
  inverted = false,
  className,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  inverted?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end", className)}>
      <div>
        <p className="mono-label text-secondary">{eyebrow}</p>
        <h2
          className={cn(
            "type-h3 mt-5 max-w-4xl text-balance",
            inverted ? "text-primary-foreground" : "text-foreground"
          )}
        >
          <Reveal>{title}</Reveal>
        </h2>
      </div>
      {text ? (
        <RevealFade
          className={cn("max-w-xl text-lg leading-8", inverted ? "text-primary-foreground/68" : "text-muted-foreground")}
          delay={0.1}
        >
          {text}
        </RevealFade>
      ) : null}
    </div>
  );
}

function ServicesSection() {
  return (
    <section className="bg-background px-4 py-24 sm:px-6 lg:px-12" id="services">
      <div className="mx-auto max-w-[1400px]">
        <SectionIntro
          className="lg:grid-cols-[0.65fr_0.35fr]"
          eyebrow="What we handle"
          text="Five service lines, one operating file: advisory, accounting, payroll, consulting, and funding move through the same controlled system."
          title="Accounting, tax, payroll, and advice."
        />
        <ServicesBento />
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="relative overflow-hidden border-y border-primary/12 bg-muted/55 px-4 py-24 text-foreground sm:px-6 lg:px-12" id="process">
      <div className="relative mx-auto max-w-[1400px]">
        <SectionIntro
          className="lg:grid-cols-[0.65fr_0.35fr]"
          eyebrow="Your start at KRS AI"
          text="The timeline remains simple: start, monthly close, annual filings, and ongoing advisory. Each phase has visible evidence and a clear owner."
          title="From day one to year-end."
        />
        <ProcessTimeline steps={processSteps} />
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="bg-card px-4 py-24 sm:px-6 lg:px-12" id="why">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="mono-label text-secondary">Why KRS AI?</p>
            <h2 className="type-h3 mt-5 max-w-3xl text-balance">
              <Reveal>Built for founders and finance teams.</Reveal>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              The benefit is not a prettier portal. It is fewer unknowns, earlier questions, and better-reviewed
              decisions across accounting, payroll, tax, and filings.
            </p>
            <Link
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3 hover:text-secondary"
              href="/why"
            >
              See why KRS
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="gradient-shell shadow-[var(--shadow-lg)]">
            <Image
              alt="A connected KRS AI operating layer for accounting, advice, compliance, and live reporting"
              className="w-full bg-card"
              height={640}
              src="/images/krs-why-ai-phone.jpg"
              width={960}
            />
          </div>
        </div>

        <div className="mt-14 grid gap-px border border-primary/12 bg-primary/12 sm:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div className="bg-background p-6" key={benefit.value}>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-secondary">0{index + 1}</span>
                  <Icon className="size-5 text-muted-foreground" />
                </div>
                <h3 className="mt-16 text-2xl font-semibold leading-tight">{benefit.value}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{benefit.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return <TestimonialsCarousel />;
}

function CareersSection() {
  return (
    <section className="bg-accent px-4 py-24 text-primary-foreground sm:px-6 lg:px-12" id="careers">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
        <div className="gradient-shell shadow-[var(--shadow-xl)]">
          <div className="relative aspect-[3/4] overflow-hidden bg-background p-8 text-foreground">
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-center">
                <Image alt="KRS AI" className="h-8 w-auto" height={416} src="/logos/Full%20logo%20Dark.png" unoptimized width={1008} />
              </div>
              <div className="relative mx-auto flex aspect-square w-[74%] items-center justify-center">
                <CareersClock className="w-full" />
              </div>
              <div className="text-center">
                <p className="font-heading text-balance text-4xl font-normal leading-none">
                  Six focused hours. Work worth doing.
                </p>
                <p className="mono-label mt-5 text-muted-foreground">Athens / On site / Six-hour day</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="mono-label text-secondary">FEATURE / SPRING EDITION</p>
          <h2 className="type-h3 mt-6 text-balance">
            <Reveal>Join a 6-hour working day.</Reveal>
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-primary-foreground/72">
            KRS AI is built around focused work, healthy lifestyle, and fewer repetitive loops. Agentic workflows handle
            document chasing, routing, and mundane portal work so advisors, operators, and engineers can spend their best
            hours on judgment, systems, and client outcomes.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6">
            {[
              ["6h", "focused working day"],
              ["AI", "agentic workflows"],
              ["No", "mundane work"],
              ["Life", "healthy lifestyle"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-heading text-5xl font-medium text-secondary">{value}</p>
                <p className="mono-label mt-2 text-primary-foreground/58">{label}</p>
              </div>
            ))}
          </div>
          <Button asChild className="mt-10 h-12 rounded-full bg-primary-foreground px-6 text-primary hover:bg-primary-foreground/90">
            <Link href="/careers">
              See open roles
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-background px-4 py-24 sm:px-6 lg:px-12" id="faq">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-label text-secondary">FAQ</p>
            <h2 className="type-h3 mt-5 text-balance">
              <Reveal>Before you start.</Reveal>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">
            Straight answers on bookkeeping, tax advice, and how KRS works with Greek businesses.
          </p>
        </div>

        <Accordion className="border-t border-primary/16" defaultValue={["item-0"]} type="multiple">
          {faqs.map((faq, index) => (
            <AccordionItem className="border-b border-primary/16" key={faq.question} value={`item-${index}`}>
              <AccordionTrigger className="grid grid-cols-[auto_1fr_auto] gap-5 rounded-none py-8 text-left text-xl font-semibold hover:no-underline sm:text-2xl">
                <span className="font-mono text-base text-secondary">0{index + 1}</span>
                <span>{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="ml-11 max-w-3xl pb-8 text-base leading-8 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function SocialVideosSection() {
  return (
    <section className="bg-card px-4 pb-24 sm:px-6 lg:px-12" id="social-videos">
      <div className="mx-auto max-w-[1400px] pt-16">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-label text-secondary">Video podcasts</p>
            <h2 className="type-h3 mt-5 text-balance">
              <Reveal>The founder on building a company.</Reveal>
            </h2>
          </div>
          <a
            className="inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3"
            href="https://www.youtube.com/results?search_query=KRS+AI"
            rel="noreferrer"
            target="_blank"
          >
            Watch more episodes
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {socialVideos.map((video, index) => (
            <article className="group" key={video.id}>
              <div
                className={cn(
                  "relative mb-5 aspect-[9/16] overflow-hidden bg-primary shadow-[var(--shadow-sm)] transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-lg)]",
                  index === 1 && "bg-secondary",
                  index === 2 && "bg-tertiary"
                )}
              >
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 size-full"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                />
              </div>
              <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span>Episode</span>
                <span>/</span>
                <span>0{index + 1}</span>
              </div>
              <h3 className="text-2xl font-semibold leading-tight">{video.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{video.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

