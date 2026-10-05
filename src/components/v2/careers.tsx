"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { FadeUp, MagneticLink, WordsReveal } from "@/components/v2/motion";

const perks = ["Six focused hours a day", "AI handles the portal work", "Office in central Athens"];

export function Careers() {
  const reduce = Boolean(useReducedMotion());
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="px-3 sm:px-5" id="careers" ref={ref}>
      <div className="relative mx-auto overflow-hidden rounded-[32px] bg-[#efe9df]">
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[min(900px,92vh)]">
          <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: imageScale, y: imageY }}>
            <Image
              alt="KRS colleagues stepping out onto a sunlit terrace in Athens in the early afternoon"
              className="object-cover object-[70%_50%]"
              fill
              sizes="100vw"
              src="/images/v2/v2-careers.jpg"
            />
          </motion.div>
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(254_254_253/0.92)_0%,rgb(254_254_253/0.75)_28%,rgb(254_254_253/0)_55%)] lg:block" />
        </div>

        <div className="relative px-6 py-12 sm:px-10 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-[46%] lg:flex-col lg:justify-center lg:px-14 lg:py-16">
          <h2 className="text-balance text-[clamp(2.25rem,4.4vw,4.5rem)] font-light leading-[1.02] text-primary-500">
            <WordsReveal segments={["Join a", { em: "6-hour" }, "working day."]} />
          </h2>
          <FadeUp className="mt-6 max-w-md text-lg leading-relaxed text-primary-400" delay={0.1}>
            AI handles the document chasing, routing and portal work. Our advisors, operators and engineers spend their
            best hours on judgment and clients.
          </FadeUp>
          <FadeUp className="mt-8 flex flex-wrap gap-2" delay={0.18}>
            {perks.map((perk) => (
              <span className="rounded-full bg-neutral-50/90 px-4 py-2 text-sm text-primary-500 ring-1 ring-primary-500/8" key={perk}>
                {perk}
              </span>
            ))}
          </FadeUp>
          <FadeUp className="mt-10" delay={0.26}>
            <MagneticLink href="/careers">See open roles</MagneticLink>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
