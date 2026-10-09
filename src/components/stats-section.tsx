"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { Reveal, RevealFade } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";

const stats: Array<{
  label: string;
  value: string;
  unit?: string;
  text: string;
}> = [
  {
    label: "Structured response",
    value: "24",
    unit: "h",
    text: "Tax and accounting questions are routed with a 24-hour response logic, then reviewed by a KRS advisor.",
  },
  {
    label: "Service lines, one file",
    value: "5",
    text: "Accounting, tax, payroll, advisory, and funding move through the same controlled operating file.",
  },
  {
    label: "Practice since",
    value: "2011",
    text: "Licensed accounting and tax work in Greece, now prepared through an AI-native operating layer.",
  },
  {
    label: "Operating file",
    value: "1",
    text: "One place for documents, deadlines, filings, and advisor questions instead of scattered portals.",
  },
];

const reelEase = [0.16, 1, 0.3, 1] as const;
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function DigitReel({ digit, delay }: { digit: number; delay: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const play = Boolean(reduce) || inView;

  return (
    <span className="relative inline-block h-[1em] overflow-hidden align-top" ref={ref}>
      <motion.span
        animate={{ y: play ? `${-digit}em` : "0em" }}
        aria-hidden="true"
        className="flex flex-col"
        initial={false}
        transition={{
          delay: reduce ? 0 : delay,
          duration: reduce ? 0 : 1.4,
          ease: reelEase,
        }}
      >
        {digits.map((item) => (
          <span className="flex h-[1em] items-center justify-center" key={item}>
            {item}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function MetricValue({
  value,
  unit,
  delay = 0,
}: {
  value: string;
  unit?: string;
  delay?: number;
}) {
  return (
    <span className="font-heading inline-flex items-baseline gap-1 text-6xl font-medium leading-none tracking-[-0.04em] text-primary sm:text-7xl">
      <span className="inline-flex tabular-nums">
        {value.split("").map((character, index) =>
          /\d/.test(character) ? (
            <DigitReel delay={delay + index * 0.1} digit={Number(character)} key={`${character}-${index}`} />
          ) : (
            <span key={`${character}-${index}`}>{character}</span>
          )
        )}
      </span>
      {unit ? <span className="text-[0.42em] font-semibold tracking-tight">{unit}</span> : null}
    </span>
  );
}

export function StatsSection() {
  const { tx } = useI18n();

  return (
    <section className="border-y border-primary/12 bg-card px-4 py-24 sm:px-6 lg:px-12" id="stat">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-6 lg:grid-cols-[0.65fr_0.35fr] lg:items-end">
          <div>
            <p className="mono-label text-secondary">{tx("The practice")}</p>
            <h2 className="type-h3 mt-5 max-w-4xl text-balance text-foreground">
              <Reveal>{tx("The practice, in numbers.")}</Reveal>
            </h2>
          </div>
          <RevealFade className="max-w-xl text-lg leading-8 text-muted-foreground" delay={0.1}>
            {tx(
              "Greek founders and finance teams keep accounting, payroll, tax, and filings in one reviewed system. This is how that practice is scoped.",
            )}
          </RevealFade>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
          {stats.map((stat, index) => (
            <article
              className={cn(
                index === 0 ? "xl:pr-10" : index === stats.length - 1 ? "xl:pl-10" : "xl:px-10",
                index > 0 && "xl:border-l xl:border-primary/12"
              )}
              key={stat.label}
            >
              <p className="mono-label text-muted-foreground">{tx(stat.label)}</p>
              <p className="sr-only">
                {stat.value}
                {stat.unit ?? ""} {tx(stat.label)}
              </p>
              <p aria-hidden="true" className="mt-6">
                <MetricValue delay={index * 0.08} unit={stat.unit ? tx(stat.unit) : undefined} value={stat.value} />
              </p>
              <p className="mt-6 max-w-xs text-sm leading-7 text-muted-foreground">{tx(stat.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
