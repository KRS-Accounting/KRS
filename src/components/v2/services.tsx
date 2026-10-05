"use client";

import { useLenis } from "lenis/react";
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
import { services, type ServiceId } from "@/components/v2/content";
import { easeOut, FadeUp, TextLink, WordsReveal } from "@/components/v2/motion";
import { cn } from "@/lib/utils";

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
  navy: { panel: "bg-primary-500", stage: "bg-[radial-gradient(90%_80%_at_70%_20%,#0b3970_0%,#011936_100%)]", dark: true },
  blue: { panel: "bg-tertiary-50", stage: "bg-[radial-gradient(90%_70%_at_70%_30%,#ffffff_0%,#d8dfe8_100%)]", dark: false },
  paper: { panel: "bg-neutral-300", stage: "bg-[radial-gradient(90%_70%_at_70%_30%,#ffffff_0%,#f3f2f1_100%)]", dark: false },
} as const;

const desktopQuery = "(min-width: 1024px)";

export function Services() {
  const reduce = Boolean(useReducedMotion());
  const lenis = useLenis();
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
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2 });
    } else {
      window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
    }
  }

  return (
    <section className="relative" id="services">
      <div
        className={cn("relative", pinned && "h-[calc(100dvh+var(--travel,0px))]")}
        ref={wrapRef}
      >
        <div className={cn("flex flex-col", pinned && "sticky top-0 h-[100dvh] overflow-hidden")}>
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-5 pt-20 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pt-28">
            <div>
              <h2 className="max-w-3xl text-balance text-[clamp(2.25rem,4.4vw,4.25rem)] font-light leading-[1.02] text-primary-500">
                <WordsReveal segments={["One team for the", { em: "whole" }, "back office."]} />
              </h2>
              <FadeUp className="mt-5 max-w-lg text-lg leading-relaxed text-primary-400" delay={0.1}>
                Five services on one platform, reviewed by the same people who know your file.
              </FadeUp>
            </div>
            {pinned ? <ServiceTabs active={active} onSelect={goTo} /> : null}
          </div>

          <motion.div
            className={cn(
              "flex flex-col gap-5 px-5 pb-20 pt-12 sm:px-8 lg:px-12",
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
    <div className="flex shrink-0 items-center gap-1 rounded-full bg-neutral-400 p-1" role="tablist">
      {services.map((service, index) => (
        <button
          aria-selected={active === index}
          className={cn(
            "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
            active === index ? "text-neutral-50" : "text-primary-500/60 hover:text-primary-500",
          )}
          key={service.id}
          onClick={() => onSelect(index)}
          role="tab"
          type="button"
        >
          {active === index ? (
            <motion.span
              className="absolute inset-0 rounded-full bg-primary-500"
              layoutId="v2-service-tab"
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
        tone.dark ? "text-neutral-50" : "text-primary-500",
        pinned && "h-full max-h-[620px] w-[min(1080px,calc(100vw-10rem))]",
      )}
      initial={false}
      ref={ref}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      <div className="flex flex-col p-7 sm:p-10">
        <p className={cn("text-[15px] font-medium", tone.dark ? "text-secondary-300" : "text-secondary-700")}>
          {service.name}
        </p>
        <h3 className="mt-4 max-w-sm text-balance text-[clamp(1.85rem,3vw,3rem)] font-light leading-[1.04]">
          {service.title}
        </h3>
        <p className={cn("mt-5 max-w-md text-base leading-relaxed", tone.dark ? "text-neutral-50/70" : "text-primary-400")}>
          {service.text}
        </p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {service.points.map((point) => (
            <li
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[13px]",
                tone.dark ? "bg-neutral-50/10 text-neutral-50/85" : "bg-neutral-50/80 text-primary-500 ring-1 ring-primary-500/6",
              )}
              key={point}
            >
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-10">
          <TextLink className={cn(tone.dark && "text-neutral-50")} href={service.href}>
            Explore {service.name}
          </TextLink>
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
