"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import { processSteps } from "@/components/v2/content";
import { FadeUp, TextLink, WordsReveal } from "@/components/v2/motion";
import { cn } from "@/lib/utils";

const cardTones = [
  { card: "bg-neutral-50 ring-1 ring-primary-500/8", dark: false },
  { card: "bg-secondary-50", dark: false },
  { card: "bg-tertiary-50", dark: false },
  { card: "bg-primary-500", dark: true },
] as const;

export function Process() {
  const reduce = Boolean(useReducedMotion());
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section className="px-5 pt-24 sm:px-8 lg:px-12 lg:pt-36" id="process">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-3xl text-balance text-[clamp(2.25rem,4.4vw,4.25rem)] font-light leading-[1.02] text-primary-500">
          <WordsReveal segments={["From day one to", { em: "year-end." }]} />
        </h2>
        <FadeUp className="mt-5 max-w-lg text-lg leading-relaxed text-primary-400" delay={0.1}>
          Every phase has an owner and a status you can see.
        </FadeUp>

        <div className="relative mt-12 lg:mt-4" ref={stackRef}>
          {processSteps.map((step, index) => (
            <StackCard
              index={index}
              key={step.title}
              progress={scrollYProgress}
              reduce={reduce}
              step={step}
              total={processSteps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({
  step,
  index,
  total,
  progress,
  reduce,
}: {
  step: (typeof processSteps)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.045;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [index / total, Math.min((index + 1) / total, 1)], [0, index === total - 1 ? 0 : 0.12]);
  const tone = cardTones[index % cardTones.length];

  return (
    <div className="mb-5 lg:sticky lg:top-0 lg:mb-0 lg:flex lg:h-[100dvh] lg:items-center">
      <motion.article
        className={cn(
          "v2-stack-card relative grid w-full origin-top overflow-hidden rounded-[32px] md:grid-cols-2 lg:h-[min(640px,76vh)]",
          tone.card,
          tone.dark ? "text-neutral-50" : "text-primary-500",
        )}
        style={
          {
            "--s": reduce ? 1 : scale,
            "--d": reduce ? 0 : dim,
            "--offset": `${index * 28}px`,
          } as React.CSSProperties
        }
      >
        <div className="flex flex-col p-7 sm:p-10 lg:p-14">
          <p className={cn("text-[15px] font-medium", tone.dark ? "text-secondary-300" : "text-secondary-700")}>
            {step.when}
          </p>
          <h3 className="mt-4 max-w-md text-balance text-[clamp(2rem,3.4vw,3.5rem)] font-light leading-[1.02]">
            {step.title}
          </h3>
          <p className={cn("mt-6 max-w-md text-lg leading-relaxed", tone.dark ? "text-neutral-50/70" : "text-primary-400")}>
            {step.text}
          </p>
          <div className="mt-auto pt-10">
            <TextLink className={cn(tone.dark && "text-neutral-50")} href={step.link.href}>
              {step.link.label}
            </TextLink>
          </div>
        </div>
        <div className="relative min-h-[280px] overflow-hidden md:m-3 md:rounded-[24px]">
          <Image alt={step.alt} className="object-cover" fill sizes="(min-width: 768px) 45vw, 100vw" src={step.image} />
        </div>
        <div aria-hidden="true" className="v2-stack-dim pointer-events-none absolute inset-0 bg-primary-500" />
      </motion.article>
    </div>
  );
}
