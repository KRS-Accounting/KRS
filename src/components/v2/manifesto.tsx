"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

import { FadeUp } from "@/components/v2/motion";
import { cn } from "@/lib/utils";

const statement: Array<{ text: string; em?: boolean }> = [
  { text: "We believe trust is built through evidence, cadence and accountable review." },
  { text: "AI should not obscure the work. It should make the work" },
  { text: "inspectable.", em: true },
];

export function Manifesto() {
  const reduce = Boolean(useReducedMotion());
  const textRef = useRef<HTMLParagraphElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 0.82", "end 0.42"] });
  const { scrollYProgress: portraitProgress } = useScroll({ target: portraitRef, offset: ["start end", "end start"] });
  const portraitY = useTransform(portraitProgress, [0, 1], ["14%", "-6%"]);

  const words = statement.flatMap((part) =>
    part.text.split(" ").map((word) => ({ word, em: Boolean(part.em) })),
  );

  return (
    <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-40" id="about">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8 lg:col-start-5 lg:row-start-1">
          <p
            className="text-[clamp(2rem,4.1vw,4rem)] font-light leading-[1.1] tracking-[-0.035em] text-primary-500"
            ref={textRef}
          >
            {words.map(({ word, em }, index) => (
              <Word
                em={em}
                key={`${word}-${index}`}
                progress={scrollYProgress}
                range={[index / words.length, (index + 1) / words.length]}
                reduce={reduce}
              >
                {word}
              </Word>
            ))}
          </p>
          <FadeUp className="mt-12 flex items-center gap-4" delay={0.1}>
            <span className="h-px w-10 bg-secondary-400" />
            <p className="text-[15px] text-primary-400">
              <span className="font-medium text-primary-500">Konstantinos Raikos</span>, Founder and CEO
            </p>
          </FadeUp>
        </div>

        <div className="lg:col-span-4 lg:row-start-1" ref={portraitRef}>
          <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[28px] bg-[radial-gradient(120%_80%_at_50%_100%,#d8dfe8_0%,#ebeff4_55%,#f7f6f6_100%)] lg:max-w-none">
            <motion.div className="absolute inset-x-0 bottom-0 top-[8%]" style={{ y: reduce ? 0 : portraitY }}>
              <Image
                alt="Konstantinos Raikos, founder and CEO of KRS"
                className="object-contain object-bottom"
                fill
                sizes="(min-width: 1024px) 30vw, 90vw"
                src="/images/FounderKRS.webp"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  reduce,
  em,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
  em: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);

  return (
    <>
      <motion.span className={cn(em && "v2-em text-secondary-700")} style={{ opacity: reduce ? 1 : opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}
