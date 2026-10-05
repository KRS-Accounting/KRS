"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { stats } from "@/components/v2/content";
import { easeOut, FadeUp, WordsReveal } from "@/components/v2/motion";
import { cn } from "@/lib/utils";

const DIGITS = Array.from({ length: 10 }, (_, digit) => digit);

function formatStat(value: number, format: (typeof stats)[number]["format"]) {
  if (format === "rating") {
    return { text: value.toFixed(1), suffix: "/5" };
  }
  if (format === "hours") {
    return { text: String(value), suffix: "h" };
  }
  return { text: String(value), suffix: "" };
}

export function Stats() {
  return (
    <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-4xl text-balance text-[clamp(2.25rem,4.6vw,4.5rem)] font-light leading-[1.02] text-primary-500">
          <WordsReveal segments={["Fifteen years of Greek filings. Now at", { em: "software" }, "speed."]} />
        </h2>
        <FadeUp className="mt-6 max-w-xl text-lg leading-relaxed text-primary-400" delay={0.15}>
          Hundreds of Greek businesses run their books, payroll and tax with us.
        </FadeUp>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-primary-500/10 pt-10 lg:mt-24 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-0 lg:pt-0">
          {stats.map((stat, index) => (
            <Stat index={index} key={stat.label} stat={stat} />
          ))}
        </dl>
      </div>
    </section>
  );
}

function Stat({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { text, suffix } = formatStat(stat.value, stat.format);

  return (
    <div
      className={cn(
        "flex flex-col lg:border-l lg:border-primary-500/10 lg:px-8 lg:pt-10",
        index === 0 && "lg:border-l-0 lg:pl-0",
      )}
      ref={ref}
    >
      <dt className="order-2 mt-5 text-[15px] font-medium text-primary-500">{stat.label}</dt>
      <dd className="order-1">
        <span
          aria-label={`${text}${suffix}`}
          className={cn(
            "flex items-baseline font-light leading-none tracking-[-0.05em] text-primary-500 tabular-nums",
            index === 0 ? "text-[clamp(4rem,9vw,9rem)]" : "text-[clamp(3.25rem,6vw,6rem)]",
          )}
        >
          {text.split("").map((char, charIndex) =>
            /\d/.test(char) ? (
              <Odometer delay={index * 0.12 + charIndex * 0.08} digit={Number(char)} key={charIndex} play={inView} />
            ) : (
              <span aria-hidden="true" key={charIndex}>
                {char}
              </span>
            ),
          )}
          {suffix ? (
            <span aria-hidden="true" className="ml-1 text-[0.42em] tracking-[-0.02em] text-secondary-600">
              {suffix}
            </span>
          ) : null}
        </span>
      </dd>
      <dd className="order-3 mt-1.5 max-w-[16rem] text-[15px] leading-relaxed text-primary-400">{stat.note}</dd>
    </div>
  );
}

function Odometer({ digit, play, delay }: { digit: number; play: boolean; delay: number }) {
  const reduce = useReducedMotion();

  return (
    <span aria-hidden="true" className="relative inline-block h-[1em] overflow-hidden">
      <motion.span
        animate={{ y: play || reduce ? `${-digit}em` : "0em" }}
        className="flex flex-col"
        initial={false}
        transition={{ duration: reduce ? 0 : 1.6, delay: reduce ? 0 : delay, ease: easeOut }}
      >
        {DIGITS.map((value) => (
          <span className="block h-[1em] leading-none" key={value}>
            {value}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
