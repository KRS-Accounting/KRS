"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { bookCall } from "@/components/v2/content";
import { FadeUp, MagneticLink, WordsReveal } from "@/components/v2/motion";

const promises = ["First call is free", "A named advisor", "Replies within 24 hours"];

export function Closing() {
  const reduce = Boolean(useReducedMotion());
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-18%", "0%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1.02]);

  return (
    <section
      aria-label="Book a call"
      className="relative isolate overflow-hidden bg-primary-500 text-neutral-50"
      id="contact"
      ref={ref}
    >
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { y: imageY, scale: imageScale }}>
        <Image
          alt=""
          className="object-cover object-[50%_75%]"
          fill
          sizes="100vw"
          src="/images/v2/v2-cta-athens.jpg"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(1_25_54/0.65)_0%,rgb(1_25_54/0.15)_42%,rgb(1_25_54/0.72)_78%,rgb(1_25_54/1)_100%)]" />

      <div className="mx-auto flex min-h-[min(980px,100dvh)] max-w-[1400px] flex-col px-5 pb-12 pt-28 sm:px-8 lg:px-12 lg:pt-36">
        <h2 className="max-w-4xl text-balance text-[clamp(2.75rem,7vw,7rem)] font-light leading-[0.98] tracking-[-0.045em]">
          <WordsReveal segments={["Start with a", { em: "free" }, "call."]} />
        </h2>
        <FadeUp className="mt-7 max-w-lg text-lg leading-relaxed text-neutral-50/75" delay={0.15}>
          Tell us about your company. We map your obligations and show you what changes in your first month.
        </FadeUp>
        <FadeUp className="mt-10" delay={0.25}>
          <MagneticLink href={bookCall.href} size="lg" tone="light">
            {bookCall.label}
          </MagneticLink>
        </FadeUp>

        <ul className="mt-auto flex flex-wrap gap-x-10 gap-y-3 border-t border-neutral-50/15 pt-8 text-[15px] text-neutral-50/75">
          {promises.map((promise) => (
            <li key={promise}>{promise}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
