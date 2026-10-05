"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import { useRef, type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export type Segment = string | { em: string };

/**
 * Headline that rises in word by word from a clipped line. Pass `{ em }` segments for the serif emphasis word.
 */
export function WordsReveal({
  segments,
  className,
  delay = 0,
  play = "view",
  stagger = 0.055,
}: {
  segments: Segment[];
  className?: string;
  delay?: number;
  play?: "view" | "mount";
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const words = segments.flatMap((segment) =>
    typeof segment === "string"
      ? segment
          .split(" ")
          .filter(Boolean)
          .map((word) => ({ word, em: false }))
      : [{ word: segment.em, em: true }],
  );

  const container = {
    hidden: {},
    shown: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delay } },
  };
  const word = {
    hidden: { y: "112%" },
    shown: { y: "0%", transition: { duration: reduce ? 0 : 0.95, ease: easeOut } },
  };

  return (
    <motion.span
      animate={play === "mount" ? "shown" : undefined}
      className={cn("block", className)}
      initial={reduce ? false : "hidden"}
      variants={container}
      viewport={{ once: true, amount: 0.4 }}
      whileInView={play === "view" ? "shown" : undefined}
    >
      {words.map(({ word: text, em }, index) => (
        <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom" key={`${text}-${index}`}>
          <motion.span className={cn("inline-block", em && "v2-em")} variants={word}>
            {text}
          </motion.span>
          {index < words.length - 1 ? "\u00a0" : null}
        </span>
      ))}
    </motion.span>
  );
}

export function FadeUp({
  children,
  className,
  delay = 0,
  y = 28,
  play = "view",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  play?: "view" | "mount";
} & Omit<HTMLMotionProps<"div">, "children" | "className">) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      animate={play === "mount" ? { opacity: 1, y: 0 } : undefined}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay, ease: easeOut }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={play === "view" ? { opacity: 1, y: 0 } : undefined}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const buttonTones = {
  ink: "bg-primary-500 text-neutral-50 hover:bg-tertiary-500",
  light: "bg-neutral-50 text-primary-500 hover:bg-white",
  ghost: "text-primary-500 ring-1 ring-inset ring-primary-500/15 hover:ring-primary-500/40 bg-transparent",
  ghostLight: "text-neutral-50 ring-1 ring-inset ring-neutral-50/30 hover:ring-neutral-50/70 bg-transparent",
} as const;

/**
 * Pill link that leans toward the pointer. The pull is driven by motion values so it never re-renders React.
 */
export function MagneticLink({
  href,
  children,
  tone = "ink",
  size = "md",
  className,
  icon = true,
  ...rest
}: {
  href: string;
  children: ReactNode;
  tone?: keyof typeof buttonTones;
  size?: "md" | "lg";
  className?: string;
  icon?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onPointerMove(event: React.PointerEvent) {
    if (reduce || event.pointerType !== "mouse" || !ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.32);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span className="inline-flex" ref={ref} style={{ x: springX, y: springY }}>
      <Link
        className={cn(
          "group/btn relative inline-flex items-center gap-3 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] outline-none transition-[background-color,box-shadow,color] duration-300 focus-visible:ring-2 focus-visible:ring-secondary-400 focus-visible:ring-offset-2 active:scale-[0.98]",
          size === "lg" ? "h-14 pl-7 pr-2 text-base" : "h-12 pl-6 pr-1.5 text-[15px]",
          !icon && (size === "lg" ? "pr-7" : "pr-6"),
          buttonTones[tone],
          className,
        )}
        href={href}
        onPointerLeave={reset}
        onPointerMove={onPointerMove}
        {...rest}
      >
        {children}
        {icon ? (
          <span
            className={cn(
              "relative flex items-center justify-center overflow-hidden rounded-full",
              size === "lg" ? "size-10" : "size-9",
              tone === "ink" && "bg-neutral-50/12",
              tone === "light" && "bg-primary-500 text-neutral-50",
              (tone === "ghost" || tone === "ghostLight") && "bg-current/10",
            )}
          >
            <ArrowUpRight
              className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:-translate-y-6 group-hover/btn:translate-x-6"
              strokeWidth={1.75}
            />
            <ArrowUpRight
              className="absolute size-4 -translate-x-6 translate-y-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
              strokeWidth={1.75}
            />
          </span>
        ) : null}
      </Link>
    </motion.span>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      className={cn(
        "group/link inline-flex items-center gap-1.5 text-[15px] font-medium text-primary-500 outline-none focus-visible:underline",
        className,
      )}
      href={href}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:bg-[length:100%_1px]">
        {children}
      </span>
      <ArrowUpRight
        className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
        strokeWidth={1.75}
      />
    </Link>
  );
}
