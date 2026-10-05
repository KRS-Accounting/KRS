"use client";

import { Children, cloneElement, Fragment, isValidElement, useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

import { cn } from "@/lib/utils";

const revealEase = [0.4, 0, 0.2, 1] as const;
const wordEase = [0.16, 1, 0.3, 1] as const;

const fadeVariants = {
  hidden: { y: 16, opacity: 0 },
  shown: { y: 0, opacity: 1 },
};

const wordVariants = {
  hidden: { y: "130%" },
  shown: { y: "0%", transition: { duration: 0.95, ease: wordEase } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Scroll into view (default) or play once on mount, for above-the-fold heroes. */
  play?: "view" | "mount";
};

/** Splits text into words. An element wrapping plain text (an accent span) is split too, keeping its styling per word. */
function splitWords(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap((child) => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child).split(/\s+/).filter(Boolean);
    }

    if (isValidElement<{ children?: ReactNode }>(child) && typeof child.props.children === "string") {
      return child.props.children
        .split(/\s+/)
        .filter(Boolean)
        .map((word, index) => cloneElement(child, { key: `${child.key}-${index}` }, word));
    }

    return [child];
  });
}

/** Headline line whose words rise one after another from their own clipped masks. */
export function Reveal({ children, className, delay = 0, play = "view" }: RevealProps) {
  const skipMotion = Boolean(useReducedMotion());
  const words = splitWords(children);

  return (
    <motion.span
      animate={play === "mount" && !skipMotion ? "shown" : undefined}
      className={cn("block", className)}
      initial={skipMotion ? false : "hidden"}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
      viewport={{ once: true, amount: 0.4 }}
      whileInView={!skipMotion && play === "view" ? "shown" : undefined}
    >
      {words.map((word, index) => (
        <Fragment key={index}>
          {index > 0 ? " " : null}
          <span className="-mx-[0.06em] -mb-[0.28em] -mt-[0.1em] inline-block overflow-hidden px-[0.06em] pb-[0.28em] pt-[0.1em] align-bottom">
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </motion.span>
  );
}

export function RevealFade({ children, className, delay = 0, play = "view" }: RevealProps) {
  const skipMotion = Boolean(useReducedMotion());

  return (
    <motion.div
      animate={play === "mount" || skipMotion ? "shown" : undefined}
      className={className}
      initial={skipMotion ? false : "hidden"}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={!skipMotion && play === "view" ? "shown" : undefined}
    >
      <motion.div
        className="block"
        transition={{ duration: skipMotion ? 0 : 0.7, delay: skipMotion ? 0 : delay, ease: revealEase }}
        variants={fadeVariants}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

type RevealWordsSegment = { text: string; accent?: boolean };

/** Lights words up one by one as the paragraph scrolls through the viewport. Each line starts on its own row. */
export function RevealWords({ className, lines }: { className?: string; lines: RevealWordsSegment[][] }) {
  const reduce = Boolean(useReducedMotion());
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.42"] });

  const words = lines.flatMap((segments, row) =>
    segments.flatMap((segment) =>
      segment.text
        .split(" ")
        .filter(Boolean)
        .map((word) => ({ word, row, accent: Boolean(segment.accent) })),
    ),
  );

  return (
    <p className={className} ref={ref}>
      {lines.map((_, row) => (
        <span className="block" key={row}>
          {words.map((item, position) =>
            item.row === row ? (
              <RevealWord
                accent={item.accent}
                key={position}
                progress={scrollYProgress}
                range={[position / words.length, (position + 1) / words.length]}
                reduce={reduce}
              >
                {item.word}
              </RevealWord>
            ) : null,
          )}
        </span>
      ))}
    </p>
  );
}

function RevealWord({
  accent,
  children,
  progress,
  range,
  reduce,
}: {
  accent: boolean;
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);

  return (
    <>
      <motion.span className={cn(accent && "italic text-secondary")} style={{ opacity: reduce ? 1 : opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}
