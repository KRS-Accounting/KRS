"use client";

import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { bookCall } from "@/components/v2/content";
import { easeOut, FadeUp, MagneticLink, WordsReveal } from "@/components/v2/motion";
import { cn } from "@/lib/utils";

const cubicInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export function Hero() {
  const reduce = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const expand = useTransform(scrollYProgress, [0, 0.55], [0, 1], { ease: cubicInOut, clamp: true });
  const cardA = useTransform(scrollYProgress, [0.42, 0.6], [0, 1], { clamp: true });
  const cardB = useTransform(scrollYProgress, [0.54, 0.72], [0, 1], { clamp: true });
  const cardC = useTransform(scrollYProgress, [0.66, 0.84], [0, 1], { clamp: true });
  const intro = useMotionValue(reduce ? 0 : 1);

  useEffect(() => {
    if (reduce) {
      intro.set(0);
      return;
    }
    const controls = animate(intro, 0, { duration: 1.5, delay: 0.35, ease: easeOut });
    return () => controls.stop();
  }, [intro, reduce]);

  useEffect(() => {
    const stage = stageRef.current;
    const copy = copyRef.current;
    if (!stage || !copy) {
      return;
    }
    const sync = () => {
      stage.style.setProperty("--hero-top", `${copy.offsetTop + copy.offsetHeight + 28}px`);
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(copy);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="Introduction"
      className={cn("relative", reduce ? "lg:h-[100dvh]" : "lg:h-[230vh]")}
      ref={sectionRef}
    >
      <motion.div
        className="v2-hero relative px-3 pb-3 sm:px-5 sm:pb-5 lg:sticky lg:top-0 lg:h-[100dvh] lg:overflow-hidden"
        ref={stageRef}
        style={
          {
            "--e": reduce ? 0 : expand,
            "--intro": intro,
            "--ca": reduce ? 1 : cardA,
            "--cb": reduce ? 1 : cardB,
            "--cc": reduce ? 1 : cardC,
          } as React.CSSProperties
        }
      >
        <div
          className="v2-hero-copy relative mx-auto grid max-w-[1400px] gap-8 px-2 pt-28 sm:px-3 sm:pt-32 lg:pt-28 xl:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] xl:items-end xl:gap-12"
          ref={copyRef}
        >
          <h1 className="text-balance text-[clamp(2.75rem,6.4vw,6.5rem)] font-light leading-[0.98] tracking-[-0.045em] text-primary-500">
            <WordsReveal delay={0.25} play="mount" segments={["Greek accounting,", { em: "rebuilt" }, "on AI."]} />
          </h1>
          <div className="flex flex-col gap-7 xl:pb-3">
            <FadeUp delay={0.7} play="mount" y={18}>
              <p className="max-w-md text-lg leading-[1.55] text-primary-400">
                Licensed accountants and tax advisors, with AI doing the matching, chasing and filing prep. Answers
                within 24 hours.
              </p>
            </FadeUp>
            <FadeUp className="flex flex-wrap items-center gap-3" delay={0.85} play="mount" y={18}>
              <MagneticLink href={bookCall.href}>{bookCall.label}</MagneticLink>
              <MagneticLink href="/pricing" icon={false} tone="ghost">
                See pricing
              </MagneticLink>
            </FadeUp>
          </div>
        </div>

        <div className="v2-hero-frame relative mt-10 aspect-[4/5] overflow-hidden rounded-[28px] bg-primary-500 sm:aspect-[16/11] lg:absolute lg:inset-0 lg:mt-0 lg:aspect-auto lg:rounded-none">
          <div className="v2-hero-media absolute inset-0">
            <Image
              alt=""
              className="object-cover"
              fill
              priority
              sizes="100vw"
              src="/videos/krs-hero-poster.jpg"
            />
            {!reduce ? (
              <video
                aria-hidden="true"
                autoPlay
                className={cn(
                  "absolute inset-0 size-full object-cover transition-opacity duration-1000",
                  videoReady ? "opacity-100" : "opacity-0",
                )}
                loop
                muted
                onCanPlay={() => setVideoReady(true)}
                playsInline
                poster="/videos/krs-hero-poster.jpg"
                preload="auto"
              >
                <source src="/videos/krs-hero.mp4" type="video/mp4" />
              </video>
            ) : null}
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(1_25_54/0.08)_0%,rgb(1_25_54/0)_35%,rgb(1_25_54/0.45)_100%)]" />

          <HeroCards framed={reduce} />
        </div>
      </motion.div>
    </section>
  );
}

function HeroCards({ framed }: { framed: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className={cn(
          "v2-hero-card absolute right-[7%] top-[22%] hidden w-[19rem]",
          !framed && "lg:block",
        )}
        style={{ "--c": "var(--ca)" } as React.CSSProperties}
      >
        <GlassCard>
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary-500 text-secondary-300">
              <Sparkles className="size-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] text-primary-400">Prepared by AI</p>
              <p className="truncate text-[15px] font-medium text-primary-500">Bank line matched</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-neutral-400/80 px-3.5 py-3 text-[13px]">
            <span className="text-primary-500">Alpha Supplies</span>
            <span className="font-mono text-primary-400">64.02</span>
            <span className="font-medium tabular-nums text-primary-500">€1,240</span>
          </div>
        </GlassCard>
      </div>

      <div
        className="v2-hero-card absolute left-[6%] top-[46%] hidden w-[20rem] lg:block"
        style={{ "--c": "var(--cb)" } as React.CSSProperties}
      >
        <GlassCard>
          <div className="flex items-center gap-3">
            <span className="relative size-10 overflow-hidden rounded-full ring-2 ring-neutral-50">
              <Image alt="" className="scale-110 object-cover" fill sizes="40px" src="/images/krs-expert-tax-advisor.webp" />
            </span>
            <div>
              <p className="text-[13px] text-primary-400">Reviewed by your tax advisor</p>
              <p className="text-[15px] font-medium text-primary-500">Reverse charge applies</p>
            </div>
          </div>
          <p className="mt-3 text-[13px] leading-5 text-primary-400">
            I checked the supplier&apos;s VAT number and updated the September file.
          </p>
        </GlassCard>
      </div>

      <div
        className="v2-hero-card absolute bottom-5 left-5 w-[calc(100%-2.5rem)] max-w-[19rem] sm:bottom-8 sm:left-8 lg:bottom-[12%] lg:left-auto lg:right-[12%]"
        style={{ "--c": "var(--cc)" } as React.CSSProperties}
      >
        <GlassCard>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[13px] text-primary-400">VAT return, September</p>
              <p className="mt-0.5 text-[15px] font-medium text-primary-500">Ready for signature</p>
            </div>
            <span className="flex size-8 items-center justify-center rounded-full bg-primary-500 text-neutral-50">
              <Check className="size-4" strokeWidth={2} />
            </span>
          </div>
          <div className="mt-4 flex gap-1.5">
            {["Matched", "Reviewed", "Filed"].map((step, index) => (
              <span
                className={cn(
                  "flex-1 rounded-full px-2 py-1.5 text-center text-[11px] font-medium",
                  index < 2 ? "bg-primary-500 text-neutral-50" : "bg-secondary-100 text-secondary-800",
                )}
                key={step}
              >
                {step}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[22px] bg-neutral-50/88 p-4 shadow-[0_30px_70px_-30px_rgb(1_25_54/0.55),inset_0_1px_0_rgb(255_255_255/0.7)] ring-1 ring-white/50 backdrop-blur-xl">
      {children}
    </div>
  );
}
