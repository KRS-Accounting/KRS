"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type ComponentType } from "react";

import { AccountingScene } from "@/components/services-bento/accounting-scene";
import { ConsultingScene } from "@/components/services-bento/consulting-scene";
import { FundingScene } from "@/components/services-bento/funding-scene";
import { PayrollScene } from "@/components/services-bento/payroll-scene";
import type { ServiceSceneProps } from "@/components/services-bento/scene-motion";
import { TaxAdvisoryScene } from "@/components/services-bento/tax-advisory-scene";
import { Reveal, RevealFade } from "@/components/reveal";
import { cn } from "@/lib/utils";

const easeOut = [0.16, 1, 0.3, 1] as const;
const desktopQuery = "(min-width: 1024px)";

type ServiceId = "accounting" | "tax-advisory" | "payroll" | "consulting" | "funding";

const services: ReadonlyArray<{
  id: ServiceId;
  name: string;
  title: string;
  text: string;
  points: readonly string[];
  href: string;
  tone: "mist" | "sand" | "navy" | "blue" | "paper";
}> = [
  {
    id: "accounting",
    name: "Accounting",
    title: "Monthly books, closed on time.",
    text: "From company formation to year-end. AI matches every invoice and bank line, and an accountant signs off.",
    points: ["myDATA kept current", "Monthly P&L", "Year-end statements"],
    href: "/services/accounting",
    tone: "mist",
  },
  {
    id: "tax-advisory",
    name: "Tax Advisory",
    title: "Direction before the deadline.",
    text: "Ask a question, get a reviewed answer within 24 hours. VAT, structure, deductions and cross-border work.",
    points: ["VAT and reverse charge", "Company structure", "Audit support"],
    href: "/services/tax-advisory",
    tone: "sand",
  },
  {
    id: "payroll",
    name: "Payroll",
    title: "Payroll without the portal work.",
    text: "Payroll runs, EFKA contributions and ERGANI notices, connected to each employee and checked before submission.",
    points: ["Monthly runs", "EFKA and ERGANI", "Hiring and exits"],
    href: "/services/payroll",
    tone: "navy",
  },
  {
    id: "consulting",
    name: "Consulting",
    title: "Plans you can act on.",
    text: "Turn your numbers and growth plans into one clear next step on hiring, pricing, cash or structure.",
    points: ["Cash planning", "Hiring cost", "Business plans"],
    href: "/services/consulting",
    tone: "blue",
  },
  {
    id: "funding",
    name: "Funding & Grants",
    title: "Find the money you qualify for.",
    text: "We match you to Greek and EU programmes, build the application and keep grant reporting on schedule.",
    points: ["Eligibility checks", "Applications", "Grant reporting"],
    href: "/services/funding-grants",
    tone: "paper",
  },
];

const scenes: Record<ServiceId, ComponentType<ServiceSceneProps>> = {
  accounting: AccountingScene,
  "tax-advisory": TaxAdvisoryScene,
  payroll: PayrollScene,
  consulting: ConsultingScene,
  funding: FundingScene,
};

const tones = {
  mist: { panel: "bg-neutral-400", stage: "bg-[radial-gradient(90%_70%_at_70%_30%,#ffffff_0%,#eeedec_100%)]", dark: false },
  sand: { panel: "bg-secondary-50", stage: "bg-[radial-gradient(90%_70%_at_70%_30%,#fefefd_0%,#f2ecde_100%)]", dark: false },
  navy: { panel: "bg-primary", stage: "bg-[radial-gradient(90%_80%_at_70%_20%,#0b3970_0%,#011936_100%)]", dark: true },
  blue: { panel: "bg-tertiary-50", stage: "bg-[radial-gradient(90%_70%_at_70%_30%,#ffffff_0%,#d8dfe8_100%)]", dark: false },
  paper: { panel: "bg-neutral-300", stage: "bg-[radial-gradient(90%_70%_at_70%_30%,#ffffff_0%,#f3f2f1_100%)]", dark: false },
} as const;

export function ServicesScroll() {
  const reduce = Boolean(useReducedMotion());
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) {
      return;
    }
    const media = window.matchMedia(desktopQuery);
    const sync = () => {
      const enabled = media.matches && !reduce;
      setPinned(enabled);
      const travel = enabled ? Math.max(track.scrollWidth - track.clientWidth, 0) : 0;
      distance.set(travel);
      wrap.style.setProperty("--travel", `${travel}px`);
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(track);
    media.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, [distance, reduce]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (pinned) {
      setActive(Math.min(services.length - 1, Math.round(progress * (services.length - 1))));
    }
  });

  function goTo(index: number) {
    const wrap = wrapRef.current;
    if (!wrap) {
      return;
    }
    const top = wrap.getBoundingClientRect().top + window.scrollY;
    const target = top + (index / (services.length - 1)) * distance.get();
    window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <section className="relative bg-muted/55" id="services">
      <div className={cn("relative", pinned && "h-[calc(100dvh+var(--travel,0px))]")} ref={wrapRef}>
        <div className={cn("flex flex-col", pinned && "sticky top-0 h-[100dvh] overflow-hidden")}>
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 pt-24 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pt-28">
            <div className="max-w-3xl">
              <p className="mono-label text-secondary">What we handle</p>
              <h2 className="type-h3 mt-5 text-balance text-foreground">
                <Reveal>
                  One team for the <span className="italic text-secondary">whole</span> back office.
                </Reveal>
              </h2>
              <RevealFade className="mt-5 max-w-lg text-lg leading-8 text-muted-foreground" delay={0.1}>
                Five services on one platform, reviewed by the same people who know your file.
              </RevealFade>
            </div>
            {pinned ? <ServiceTabs active={active} onSelect={goTo} /> : null}
          </div>

          <motion.div
            className={cn(
              "flex flex-col gap-5 px-4 pb-24 pt-12 sm:px-6 lg:px-12",
              pinned && "flex-1 flex-row items-center gap-6 pb-10 pt-10 lg:px-[max(3rem,calc((100vw-1400px)/2+3rem))]",
            )}
            ref={trackRef}
            style={{ x: pinned ? x : 0 }}
          >
            {services.map((service, index) => (
              <ServicePanel
                active={pinned ? active === index : undefined}
                key={service.id}
                pinned={pinned}
                reduce={reduce}
                service={service}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServiceTabs({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  return (
    <div className="flex shrink-0 items-center gap-1 rounded-full bg-background p-1 ring-1 ring-primary/8" role="tablist">
      {services.map((service, index) => (
        <button
          aria-selected={active === index}
          className={cn(
            "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
            active === index ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
          key={service.id}
          onClick={() => onSelect(index)}
          role="tab"
          type="button"
        >
          {active === index ? (
            <motion.span
              className="absolute inset-0 rounded-full bg-primary"
              layoutId="home-service-tab"
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
            />
          ) : null}
          <span className="relative">{service.name}</span>
        </button>
      ))}
    </div>
  );
}

function ServicePanel({
  service,
  active,
  pinned,
  reduce,
}: {
  service: (typeof services)[number];
  active: boolean | undefined;
  pinned: boolean;
  reduce: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.55 });
  const isActive = active ?? inView;
  const dimmed = pinned && !reduce && !isActive;
  const tone = tones[service.tone];
  const Scene = scenes[service.id];

  return (
    <motion.article
      animate={{ scale: dimmed ? 0.94 : 1, opacity: dimmed ? 0.55 : 1 }}
      className={cn(
        "grid shrink-0 overflow-hidden rounded-[32px] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
        tone.panel,
        tone.dark ? "text-primary-foreground" : "text-foreground",
        pinned && "h-full max-h-[620px] w-[min(1080px,calc(100vw-10rem))]",
      )}
      initial={false}
      ref={ref}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      <div className="flex flex-col p-7 sm:p-10">
        <p className={cn("mono-label", tone.dark ? "text-secondary" : "text-secondary")}>{service.name}</p>
        <h3 className="font-heading mt-4 max-w-sm text-balance text-[clamp(1.85rem,3vw,2.75rem)] font-normal leading-[1.08]">
          {service.title}
        </h3>
        <p className={cn("mt-5 max-w-md text-base leading-7", tone.dark ? "text-primary-foreground/68" : "text-muted-foreground")}>
          {service.text}
        </p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {service.points.map((point) => (
            <li
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[13px]",
                tone.dark
                  ? "bg-primary-foreground/10 text-primary-foreground/85"
                  : "bg-background/80 text-foreground ring-1 ring-primary/8",
              )}
              key={point}
            >
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-10">
          <Link
            className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3",
              tone.dark ? "text-primary-foreground hover:text-secondary" : "text-foreground hover:text-secondary",
            )}
            href={service.href}
          >
            Explore {service.name}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className={cn("relative flex min-h-[340px] items-center justify-center p-5 sm:p-8", tone.stage)}>
        <motion.div
          animate={reduce ? undefined : { y: isActive ? 0 : 16, rotate: isActive ? 0 : -1.2 }}
          className="krs-app h-[320px] w-full max-w-[460px] rounded-[18px] shadow-[0_40px_80px_-40px_rgb(1_25_54/0.55)] sm:h-[360px]"
          initial={false}
          transition={{ duration: 0.9, ease: easeOut }}
        >
          <Scene active={isActive} reducedMotion={reduce} />
        </motion.div>
      </div>
    </motion.article>
  );
}
