"use client";

import { Star } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { testimonials } from "@/components/v2/content";
import { easeOut } from "@/components/v2/motion";
import { cn } from "@/lib/utils";

const ADVANCE_MS = 7000;

export function Testimonials() {
  const reduce = Boolean(useReducedMotion());
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const running = inView && !paused && !reduce;
  const current = testimonials[index];

  useEffect(() => {
    if (!running) {
      return;
    }
    const timer = window.setTimeout(() => setIndex((value) => (value + 1) % testimonials.length), ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [index, running]);

  return (
    <section
      aria-label="Client testimonials"
      className="bg-neutral-300 px-5 py-24 sm:px-8 lg:px-12 lg:py-36"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      ref={ref}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[15px] font-medium text-primary-400">In their words</h2>
          <p className="flex items-center gap-3 text-[15px] text-primary-400">
            <span aria-hidden="true" className="flex gap-0.5 text-secondary-500">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star className="size-4 fill-current" key={star} strokeWidth={0} />
              ))}
            </span>
            <span>
              <span className="font-medium text-primary-500">4.8</span> on Google, from 132 reviews
            </span>
          </p>
        </div>

        <figure className="mt-10 min-h-[22rem] sm:min-h-[19rem] lg:min-h-[17rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              animate={{ opacity: 1 }}
              className="max-w-5xl font-sans text-[clamp(1.85rem,3.6vw,3.5rem)] font-light leading-[1.12] tracking-[-0.035em] text-primary-500"
              exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.35 } }}
              initial={reduce ? false : { opacity: 0 }}
              key={current.name}
            >
              <span aria-hidden="true" className="v2-em mr-1 text-secondary-500">
                &ldquo;
              </span>
              {current.quote.split(" ").map((word, wordIndex) => (
                <motion.span
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  className="inline-block"
                  initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
                  key={`${word}-${wordIndex}`}
                  transition={{ duration: 0.7, delay: wordIndex * 0.022, ease: easeOut }}
                >
                  {word}
                  {"\u00a0"}
                </motion.span>
              ))}
              <span aria-hidden="true" className="v2-em text-secondary-500">
                &rdquo;
              </span>
            </motion.blockquote>
          </AnimatePresence>
          <figcaption className="sr-only">
            {current.name}, {current.role}
          </figcaption>
        </figure>

        <div className="mt-12 grid gap-2 sm:grid-cols-3" role="tablist">
          {testimonials.map((item, itemIndex) => {
            const selected = itemIndex === index;
            return (
              <button
                aria-selected={selected}
                className={cn(
                  "group relative overflow-hidden rounded-2xl p-5 text-left transition-colors duration-500",
                  selected ? "bg-neutral-50" : "hover:bg-neutral-50/60",
                )}
                key={item.name}
                onClick={() => setIndex(itemIndex)}
                role="tab"
                type="button"
              >
                <span className="block text-[15px] font-medium text-primary-500">{item.name}</span>
                <span className="mt-1 block text-sm text-primary-400">{item.role}</span>
                <span aria-hidden="true" className="absolute inset-x-5 bottom-0 h-0.5 overflow-hidden rounded-full">
                  {selected ? (
                    <motion.span
                      animate={{ scaleX: running ? 1 : reduce ? 1 : 0.0001 }}
                      className="block h-full origin-left bg-secondary-400"
                      initial={{ scaleX: reduce ? 1 : 0 }}
                      key={`${index}-${running}`}
                      transition={{ duration: running ? ADVANCE_MS / 1000 : 0, ease: "linear" }}
                    />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
