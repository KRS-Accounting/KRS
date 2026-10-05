"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { authorities } from "@/components/v2/content";
import { easeOut, FadeUp, TextLink, WordsReveal } from "@/components/v2/motion";
import { cn } from "@/lib/utils";

export function Why() {
  const reduce = useReducedMotion();

  return (
    <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36" id="why">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-3xl">
          <h2 className="text-balance text-[clamp(2.25rem,4.4vw,4.25rem)] font-light leading-[1.02] text-primary-500">
            <WordsReveal segments={["Fewer unknowns.", { em: "Earlier" }, "answers."]} />
          </h2>
          <FadeUp className="mt-5 max-w-xl text-lg leading-relaxed text-primary-400" delay={0.1}>
            The point is not a prettier portal. It is fewer surprises and better-reviewed decisions across accounting,
            payroll, tax and filings.
          </FadeUp>
          <FadeUp className="mt-7" delay={0.2}>
            <TextLink href="/why">Why KRS</TextLink>
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          <Cell className="relative min-h-[420px] overflow-hidden bg-[#e9e9eb] lg:col-span-7 lg:row-span-2 lg:min-h-[640px]" delay={0}>
            <Image
              alt="One connected platform for accounting, payroll, tax advice and documents"
              className="object-cover object-[50%_70%] transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              src="/images/krs-why-ai.jpg"
            />
            <div className="absolute inset-x-0 top-0 bg-[linear-gradient(180deg,#e9e9eb_30%,rgb(233_233_235/0))] p-7 pb-20 sm:p-10 sm:pb-24">
              <CellTitle>One platform for everything.</CellTitle>
              <CellText>Accounting, payroll, tax advice and documents in one place, with one file per company.</CellText>
            </div>
          </Cell>

          <Cell className="flex flex-col bg-primary-500 p-7 text-neutral-50 sm:p-10 lg:col-span-5" delay={0.08}>
            <CellTitle>Answers within 24 hours.</CellTitle>
            <CellText dark>Every question goes to an advisor who already knows your file.</CellText>
            <ChatPreview />
          </Cell>

          <Cell className="flex flex-col bg-secondary-50 p-7 sm:p-10 lg:col-span-5" delay={0.16}>
            <CellTitle>Every Greek authority, covered.</CellTitle>
            <CellText>We file, sync and follow up with each one for you.</CellText>
            <ul className="mt-auto grid grid-cols-3 gap-x-3 gap-y-5 pt-8 sm:grid-cols-6">
              {authorities.map((authority, index) => (
                <motion.li
                  className="flex flex-col items-center gap-2"
                  initial={reduce ? false : { opacity: 0, y: 16, scale: 0.9 }}
                  key={authority.label}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.07, ease: easeOut }}
                  viewport={{ once: true, amount: 0.6 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                >
                  <span className="relative aspect-square w-full max-w-[76px] overflow-hidden rounded-[18px] bg-white shadow-[0_12px_24px_-16px_rgb(1_25_54/0.45)] ring-1 ring-primary-500/8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1">
                    <Image
                      alt=""
                      className={authority.fit === "cover" ? "object-cover" : "object-contain p-2.5"}
                      fill
                      sizes="76px"
                      src={authority.src}
                    />
                  </span>
                  <span className="text-[12px] font-medium text-primary-400">{authority.label}</span>
                </motion.li>
              ))}
            </ul>
          </Cell>

          <Cell
            className="grid gap-8 bg-tertiary-50 p-7 sm:p-10 lg:col-span-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center"
            delay={0.24}
          >
            <div>
              <CellTitle>Live status, always.</CellTitle>
              <CellText>See missing documents, filings and the monthly close as they happen, not at year-end.</CellText>
            </div>
            <CloseChecklist />
          </Cell>
        </div>
      </div>
    </section>
  );
}

function Cell({ children, className, delay }: { children: React.ReactNode; className?: string; delay: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn("group rounded-[32px]", className)}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      transition={{ duration: 1, delay, ease: easeOut }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

function CellTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-balance text-[clamp(1.6rem,2.4vw,2.25rem)] font-light leading-[1.08]">{children}</h3>;
}

function CellText({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={cn("mt-3 max-w-sm text-base leading-relaxed", dark ? "text-neutral-50/65" : "text-primary-400")}>
      {children}
    </p>
  );
}

function ChatPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [timedStage, setStage] = useState(0);
  const stage = reduce ? 3 : timedStage;

  useEffect(() => {
    if (!inView || reduce) {
      return;
    }
    const timers = [
      window.setTimeout(() => setStage(1), 200),
      window.setTimeout(() => setStage(2), 1100),
      window.setTimeout(() => setStage(3), 2600),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [inView, reduce]);

  return (
    <div aria-hidden="true" className="mt-8 flex min-h-[12.5rem] flex-1 flex-col justify-end gap-3" ref={ref}>
      <AnimatePresence>
        {stage >= 1 ? (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="ml-auto max-w-[82%] rounded-[20px] rounded-br-md bg-neutral-50 px-4 py-3 text-[15px] leading-snug text-primary-500"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            key="question"
            transition={{ duration: 0.5, ease: easeOut }}
          >
            Can our IKE deduct the new laptops this year?
          </motion.div>
        ) : null}
        {stage === 2 ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex w-fit gap-1 rounded-[20px] rounded-bl-md bg-neutral-50/10 px-4 py-3.5"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, y: 8 }}
            key="typing"
          >
            {[0, 1, 2].map((dot) => (
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                className="size-1.5 rounded-full bg-neutral-50"
                key={dot}
                transition={{ duration: 1, repeat: Infinity, delay: dot * 0.15 }}
              />
            ))}
          </motion.div>
        ) : null}
        {stage >= 3 ? (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="max-w-[88%]"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            key="answer"
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <div className="rounded-[20px] rounded-bl-md bg-tertiary-500 px-4 py-3 text-[15px] leading-snug text-neutral-50">
              Yes, as fixed assets. I&apos;ve added them to March so depreciation starts this quarter.
            </div>
            <p className="mt-2 text-[13px] text-neutral-50/50">Your tax advisor, replied the same day</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const closeItems = ["Bank statements received", "Invoices matched to myDATA", "Payroll checked", "VAT return ready"];

function CloseChecklist() {
  const ref = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [timedDone, setDone] = useState(0);
  const done = reduce ? closeItems.length : timedDone;

  useEffect(() => {
    if (!inView || reduce) {
      return;
    }
    const timers = closeItems.map((_, index) => window.setTimeout(() => setDone(index + 1), 500 + index * 650));
    return () => timers.forEach(window.clearTimeout);
  }, [inView, reduce]);

  return (
    <ul aria-hidden="true" className="grid gap-2 sm:grid-cols-2" ref={ref}>
      {closeItems.map((item, index) => {
        const checked = index < done;
        return (
          <li
            className={cn(
              "flex items-center justify-between gap-4 rounded-2xl px-4 py-3.5 text-[15px] transition-colors duration-500",
              checked ? "bg-neutral-50 text-primary-500" : "bg-neutral-50/50 text-primary-400",
            )}
            key={item}
          >
            {item}
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full transition-all duration-500",
                checked ? "scale-100 bg-primary-500 text-neutral-50" : "scale-90 bg-primary-500/8 text-transparent",
              )}
            >
              <Check className="size-3.5" strokeWidth={2.25} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
