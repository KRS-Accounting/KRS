"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

import { bookCall, faqs } from "@/components/v2/content";
import { easeOut, FadeUp, TextLink, WordsReveal } from "@/components/v2/motion";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36" id="faq">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 className="max-w-md text-balance text-[clamp(2.25rem,4.4vw,4.25rem)] font-light leading-[1.02] text-primary-500">
              <WordsReveal segments={["Questions founders ask", { em: "first." }]} />
            </h2>
            <FadeUp className="mt-6" delay={0.1}>
              <p className="max-w-sm text-lg leading-relaxed text-primary-400">
                Anything else is easier to answer on a call with your company in front of us.
              </p>
              <TextLink className="mt-5" href={bookCall.href}>
                {bookCall.label}
              </TextLink>
            </FadeUp>
          </div>
        </div>

        <div className="lg:col-span-7">
          {faqs.map((faq, index) => (
            <FaqItem
              answer={faq.answer}
              key={faq.question}
              onToggle={() => setOpen((current) => (current === index ? null : index))}
              open={open === index}
              question={faq.question}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const id = useId();

  return (
    <div className="border-b border-primary-500/10 first:border-t">
      <h3>
        <button
          aria-controls={id}
          aria-expanded={open}
          className="group flex w-full items-center justify-between gap-6 py-7 text-left outline-none focus-visible:text-tertiary-500"
          onClick={onToggle}
          type="button"
        >
          <span className="text-[clamp(1.25rem,1.8vw,1.6rem)] font-normal leading-snug tracking-[-0.025em] text-primary-500">
            {question}
          </span>
          <span
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full transition-[background-color,color,rotate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              open ? "rotate-45 bg-primary-500 text-neutral-50" : "bg-neutral-400 text-primary-500 group-hover:bg-neutral-500",
            )}
          >
            <Plus className="size-5" strokeWidth={1.5} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            id={id}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, ease: easeOut }}
          >
            <p className="max-w-2xl pb-8 pr-14 text-lg leading-relaxed text-primary-400">{answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
