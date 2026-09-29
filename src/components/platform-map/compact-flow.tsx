"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { FanItem } from "./fan-list";
import { cycleDelay, type StagePoint } from "./geometry";
import { statusMeta } from "./status";
import { StatusBars, StatusDot } from "./status-ring";

/** Centre of a row's status dot, measured from the row's top-left (or top-right when mirrored). */
export const FLOW_DOT_X = 5;
export const FLOW_DOT_Y = 9;

const drawEase = [0.16, 1, 0.3, 1] as const;

export function drawIn(delay: number, reducedMotion: boolean) {
  return reducedMotion ? { duration: 0 } : { delay: 0.08 + delay, duration: 0.6, ease: drawEase };
}

/** `y` is the dot centre; `inset` pushes the row in from the edge its dot sits on. */
export type FlowPoint = { inset: number; y: number };

export function FlowList({
  enter,
  items,
  label,
  listKey,
  metaStyle,
  points,
  pulseDelays,
  reducedMotion,
  side,
}: {
  enter: { x?: number; y?: number };
  items: readonly FanItem[];
  label: string;
  listKey: string;
  /** `label` for short channel names, `sentence` for longer details that would not fit in mono caps. */
  metaStyle: "label" | "sentence";
  points: readonly FlowPoint[];
  pulseDelays?: readonly number[];
  reducedMotion: boolean;
  /** Edge the dots sit on: `start` reads away from the dot, `end` mirrors the row to read toward it. */
  side: "start" | "end";
}) {
  return (
    <ul aria-label={label} className="pointer-events-none absolute inset-0 m-0 list-none p-0">
      <AnimatePresence initial={false}>
        {items.map((item, index) => {
          const point = points[index];
          if (!point) return null;

          return (
            <motion.li
              animate={{ opacity: 1, x: 0, y: 0 }}
              className={cn("absolute flex items-start gap-3", side === "end" && "flex-row-reverse text-right")}
              exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.18 } }}
              initial={reducedMotion ? false : { opacity: 0, ...enter }}
              key={`${listKey}-${index}`}
              style={
                side === "start"
                  ? { left: point.inset, right: 0, top: point.y - FLOW_DOT_Y }
                  : { left: 0, right: point.inset, top: point.y - FLOW_DOT_Y }
              }
              transition={
                reducedMotion ? { duration: 0 } : { delay: 0.08 + index * 0.045, duration: 0.4, ease: drawEase }
              }
            >
              <StatusDot pulseDelay={pulseDelays?.[index]} status={item.status} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium leading-[18px] text-primary-foreground/92">
                  {item.label}
                </span>
                <span className={cn("mt-1 flex items-center gap-2", side === "end" && "flex-row-reverse")}>
                  <span
                    className={cn(
                      "truncate leading-4",
                      metaStyle === "label"
                        ? "font-mono text-[10px] uppercase tracking-[0.12em] text-primary-foreground/45"
                        : "text-xs text-primary-foreground/55"
                    )}
                  >
                    {item.meta}
                  </span>
                  <StatusBars status={item.status} />
                </span>
                <span className="sr-only">{`, ${statusMeta[item.status].label}`}</span>
              </span>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
}

export function FlowHeader({
  className,
  style,
  subtitle,
  title,
}: {
  className?: string;
  style?: CSSProperties;
  subtitle: string;
  title: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-3 gap-y-1", className)} style={style}>
      <p className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">{title}</p>
      <p className="min-w-0 truncate text-xs text-primary-foreground/50">{subtitle}</p>
    </div>
  );
}

export function PlatformCaption({
  activeIndex,
  className,
  count,
  style,
}: {
  activeIndex: number;
  className?: string;
  count: number;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("pointer-events-none", className)} style={style}>
      <p className="text-lg font-medium leading-tight">KRS Platform</p>
      <p className="mt-1 text-[13px] text-primary-foreground/58">
        AI + Human review ·{" "}
        <span className="font-semibold text-secondary tabular-nums">{activeIndex + 1}</span> of{" "}
        <span className="font-semibold text-secondary tabular-nums">{count}</span>
      </p>
    </div>
  );
}

/** SVG glow behind the orb plus the pulse that fires when a comet reaches it; sized like the desktop stage. */
export function OrbGlow({
  center,
  pulseDelay,
  pulseKey,
  size,
}: {
  center: StagePoint;
  pulseDelay: number;
  pulseKey: string;
  size: number;
}) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <>
      <defs>
        <radialGradient id={`${gradientId}-glow`}>
          <stop offset="0" stopColor="#0b3970" stopOpacity="0.95" />
          <stop offset="0.55" stopColor="#0b3970" stopOpacity="0.32" />
          <stop offset="1" stopColor="#0b3970" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${gradientId}-pulse`}>
          <stop offset="0" stopColor="#ae882f" stopOpacity="0.32" />
          <stop offset="0.6" stopColor="#ae882f" stopOpacity="0.08" />
          <stop offset="1" stopColor="#ae882f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={center.x} cy={center.y} fill={`url(#${gradientId}-glow)`} rx={size * 1.3} ry={size * 1.14} />
      <ellipse
        className="platform-orb-pulse"
        cx={center.x}
        cy={center.y}
        fill={`url(#${gradientId}-pulse)`}
        key={pulseKey}
        rx={size * 0.72}
        ry={size * 0.72}
        style={cycleDelay(pulseDelay)}
      />
    </>
  );
}

export function ReviewerSwap({
  children,
  className,
  reducedMotion,
  swapKey,
}: {
  children: ReactNode;
  className?: string;
  reducedMotion: boolean;
  swapKey: string;
}) {
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className={className}
        exit={{ opacity: 0, y: -6 }}
        initial={reducedMotion ? false : { opacity: 0, y: 6 }}
        key={swapKey}
        transition={{ duration: reducedMotion ? 0 : 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
