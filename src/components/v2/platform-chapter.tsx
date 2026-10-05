"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Lets the navy platform map rise as a sheet over the white page. The section inside renders untouched.
 */
export function PlatformChapter({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const inset = useTransform(scrollYProgress, [0, 1], [4, 0], { clamp: true });
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0], { clamp: true });
  const clipPath = useTransform(
    () => `inset(0px ${inset.get()}vw 0px ${inset.get()}vw round ${radius.get()}px ${radius.get()}px 0px 0px)`,
  );

  return (
    <motion.div className="v2-keep relative" ref={ref} style={{ clipPath: reduce ? undefined : clipPath }}>
      {children}
    </motion.div>
  );
}
