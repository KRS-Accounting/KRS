import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

import { CareersClock } from "@/components/careers-clock";
import { Reveal, RevealFade } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { T } from "@/i18n/t";
import { cn } from "@/lib/utils";

const applyInbox = "krs@krs.gr";

const reasons = [
  {
    title: "Six hours. Eight-hour pay.",
    text: "KRS introduced a six-hour working day in Greece. The reserved work stays sharp because the day is built around judgment, not overtime.",
  },
  {
    title: "AI takes the chasing",
    text: "Document routing, portal loops, and missing-file follow-ups move through the operating layer. Advisors spend the day on review.",
  },
  {
    title: "The work stays inspectable",
    text: "You are never asked to hide behind a black box. Every filing has an owner, a trail, and a person who can explain it.",
  },
  {
    title: "The craft keeps moving",
    text: "Greek compliance, myDATA, payroll, and tax advice are the job. Continuous training sits inside the day, so the professional value of the work keeps rising.",
  },
];

const roles = [
  {
    title: "Accountant",
    team: "Practice",
    location: "Athens",
    arrangement: "Full-time, on site",
    text: "Own client files through monthly close, myDATA, and advisor review. Licensed accounting work inside one operating file.",
  },
  {
    title: "Assistant accountant",
    team: "Practice",
    location: "Athens",
    arrangement: "Full-time, on site",
    text: "Prepare documents, reconciliations, and evidence for close. Learn the file beside a named reviewer.",
  },
  {
    title: "Payroll specialist",
    team: "Practice",
    location: "Athens",
    arrangement: "Full-time, on site",
    text: "Run payroll, EFKA checks, and ERGANI notices with the same cadence as the accounting file.",
  },
  {
    title: "Administrative assistant",
    team: "Operations",
    location: "Athens",
    arrangement: "Full-time, on site",
    text: "Keep the office, the calendar, and the first client contact in order so the practice can stay on the work.",
  },
];

const teamChannel = "https://www.youtube.com/@KrsGr";

const teamInterview = {
  id: "zRfPugL_BcY",
  title: "The team on the six-hour day.",
  text: "The Sixers #17. Konstantinos sits with the practice. They talk about what the day is like, what is hard, and why some people left.",
};

const interviewShorts = [
  {
    id: "zWdWuSgUThI",
    title: "Why the first team left.",
    text: "The six-hour day is not a perk. People who could not keep the pace said so, on camera.",
  },
  {
    id: "Wl6-gvmHT88",
    title: "Culture starts with the leader.",
    text: "A short from the floor on why the day only holds if the people running it keep it.",
  },
  {
    id: "_HIrEfhkh6Y",
    title: "What if they leave untrained.",
    text: "Training sits inside the six hours. The file does not survive on overtime and hope.",
  },
];

const hireSteps = [
  {
    n: "01",
    title: "We read the CV",
    text: "Named people read every application. There is no portal maze and no black-box filter.",
  },
  {
    n: "02",
    title: "You meet the team",
    text: "A conversation about files you have kept, not a case-study theatre. You should leave knowing how the day actually runs.",
  },
  {
    n: "03",
    title: "A start date if it is a fit",
    text: "If it works, we set a date. The six-hour day begins on the floor, with a reviewer beside you.",
  },
];

function applyHref(role: string) {
  const subject = encodeURIComponent(`Application: ${role}`);
  const body = encodeURIComponent(
    `Hello KRS,\n\nI would like to apply for ${role}.\n\nName:\nPhone:\nLinkedIn or CV:\n\n`
  );
  return `mailto:${applyInbox}?subject=${subject}&body=${body}`;
}

export function CareersPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <Reasons />
      <Roles />
      <HireFor />
      <TeamInterviews />
      <OpenApplication />
      <AboutLink />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  return (
    <section className="border-b border-primary/12 bg-[#fdf8f0] px-4 sm:px-6 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] lg:min-h-[620px] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex flex-col justify-center py-16 sm:py-20 lg:py-24">
          <p className="mono-label text-secondary"><T text="Careers / Athens / On site" /></p>
          <h1 className="type-h1 mt-6">
            <Reveal play="mount"><T text="Join a six-hour working day." /></Reveal>
          </h1>
          <RevealFade
            className="mt-6 max-w-[34rem] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
            delay={0.12}
            play="mount"
          >
            <T text="Licensed accountants, operators, and people who keep the file. Eight-hour pay. Six hours of focused work." />
          </RevealFade>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild className="h-12 rounded-full px-6 text-sm">
              <a href="#roles">
                <T text="See open roles" />
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </a>
            </Button>
            <Link
              className="inline-flex h-12 items-center gap-2 border-b border-primary/30 px-1 text-sm font-semibold transition hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              href="/about"
            >
              <T text="About the practice" />
              <ChevronRight className="size-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center bg-accent px-8 py-16 sm:px-12 lg:min-h-full">
          <div className="gradient-shell w-full max-w-md shadow-[var(--shadow-xl)]">
            <div className="bg-background p-8 text-foreground">
              <div className="flex items-center justify-center">
                <Image
                  alt="KRS"
                  className="h-8 w-auto"
                  height={416}
                  src="/logos/Full%20logo%20Dark.png"
                  unoptimized
                  width={1008}
                />
              </div>
              <CareersClock className="mt-10" />
              <p className="font-heading mt-10 text-center text-balance text-3xl font-normal leading-tight">
                <T text="Six focused hours. Work worth doing." />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reasons() {
  return (
    <section className="bg-background px-4 py-24 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="type-h3 max-w-3xl text-balance">
          <Reveal><T text="Why people stay." /></Reveal>
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          <T text="The offer is not a perks list. It is a working day that leaves room for the work that actually needs a person." />
        </p>
        <div className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {reasons.map((item) => (
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

function Roles() {
  return (
    <section className="scroll-mt-24 border-y border-primary/12 bg-card px-4 py-24 sm:px-6 lg:px-12" id="roles">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="type-h3 max-w-3xl text-balance">
          <Reveal><T text="Roles we hire for." /></Reveal>
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          <T text="The practice is in Athens. Roles are full-time and on site. Openings change. If the title is not listed this week, send your CV anyway." />
        </p>

        <ul className="mt-14">
          {roles.map((role) => (
            <li className="border-b border-primary/12 first:border-t" key={role.title}>
              <div className="grid gap-6 py-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h3 className="text-2xl font-semibold leading-tight"><T text={role.title} /></h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    <T text={role.team} />
                    <span className="mx-2 text-primary/25">/</span>
                    <T text={role.location} />
                    <span className="mx-2 text-primary/25">/</span>
                    <T text={role.arrangement} />
                  </p>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground"><T text={role.text} /></p>
                </div>
                <Button asChild className="h-11 w-fit rounded-full px-5">
                  <a href={applyHref(role.title)}>
                    <T text="Apply" />
                    <ArrowRight className="size-4" strokeWidth={1.75} />
                  </a>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HireFor() {
  return (
    <section className="bg-primary px-4 py-24 text-primary-foreground sm:px-6 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
        <div>
          <h2 className="type-h3 max-w-xl text-balance">
            <Reveal><T text="How we hire." /></Reveal>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-primary-foreground/68">
            <T text="No portal maze. A read of the CV, a conversation with the team, then a start date if it is a fit." />
          </p>
        </div>
        <ol className="border-t border-primary-foreground/16">
          {hireSteps.map((step) => (
            <li className="grid gap-3 border-b border-primary-foreground/16 py-8 sm:grid-cols-[auto_1fr] sm:gap-8" key={step.n}>
              <p className="font-mono text-sm text-secondary">{step.n}</p>
              <div>
                <h3 className="text-xl font-semibold leading-tight"><T text={step.title} /></h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-primary-foreground/68"><T text={step.text} /></p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TeamInterviews() {
  return (
    <section className="scroll-mt-24 bg-card px-4 py-24 sm:px-6 lg:px-12" id="interviews">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-label text-secondary"><T text="Employee interviews" /></p>
            <h2 className="type-h3 mt-5 text-balance">
              <Reveal><T text="Hear the team." /></Reveal>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              <T text="People who keep the file, talking about the six-hour day. Not a recruiting reel." />
            </p>
          </div>
          <a
            className="inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3"
            href={teamChannel}
            rel="noreferrer"
            target="_blank"
          >
            <T text="Watch more on YouTube" />
            <ArrowRight className="size-4" />
          </a>
        </div>

        <article className="mb-16">
          <div className="relative aspect-video overflow-hidden bg-primary shadow-[var(--shadow-sm)]">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 size-full"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              src={`https://www.youtube-nocookie.com/embed/${teamInterview.id}`}
              title={teamInterview.title}
            />
          </div>
          <div className="mb-3 mt-5 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span><T text="Interview" /></span>
            <span>/</span>
            <span><T text="The Sixers #17" /></span>
          </div>
          <h3 className="text-2xl font-semibold leading-tight"><T text={teamInterview.title} /></h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground"><T text={teamInterview.text} /></p>
        </article>

        <div className="grid gap-8 md:grid-cols-3">
          {interviewShorts.map((video, index) => (
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
                <span><T text="Interview" /></span>
                <span>/</span>
                <span>0{index + 1}</span>
              </div>
              <h3 className="text-2xl font-semibold leading-tight"><T text={video.title} /></h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground"><T text={video.text} /></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpenApplication() {
  return (
    <section className="bg-background px-4 py-24 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-[1400px] border border-primary/12 bg-card px-6 py-12 sm:px-10 lg:px-14">
        <h2 className="type-h3 max-w-3xl text-balance">
          <Reveal><T text="If nothing listed fits." /></Reveal>
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          <T text="Send your CV to" />{" "}
          <a className="font-semibold text-foreground underline decoration-secondary/70 underline-offset-4" href={`mailto:${applyInbox}`}>
            {applyInbox}
          </a>
          {". "}
          <T text="If we open a seat that fits, you will hear from us first. Engineers and operators who want to build the file should write too." />
        </p>
        <Button asChild className="mt-10 h-12 rounded-full px-6">
          <a href={applyHref("Open application")}>
            <T text="Send your CV" />
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </a>
        </Button>
      </div>
    </section>
  );
}

function AboutLink() {
  return (
    <section className="border-t border-primary/12 bg-[#fdf8f0]">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden bg-primary sm:min-h-[420px]">
          <Image
            alt="KRS team receiving an HR award for workplace culture"
            className="object-cover object-center"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src="/images/krs-hero-awards.jpg"
          />
        </div>
        <div className="flex flex-col justify-center px-4 py-16 sm:px-6 lg:px-12">
          <h2 className="type-h3 max-w-xl text-balance">
            <Reveal><T text="The practice behind the day." /></Reveal>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            <T text="KRS started in 2011 as a licensed Greek firm. The operating file is how that practice works now. Read the story before you apply." />
          </p>
          <Link
            className="mt-8 inline-flex h-12 w-fit items-center gap-2 border-b border-primary/30 px-1 text-sm font-semibold transition hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            href="/about"
          >
            <T text="About the practice" />
            <ChevronRight className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
