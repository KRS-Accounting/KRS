"use client";

import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";

import { STAGE_WIDTH, type StagePoint } from "./geometry";
import { statusMeta, type ReviewStatus } from "./status";
import { StatusBars, StatusDot } from "./status-ring";

export type FanItem = { label: string; meta: string; status: ReviewStatus };

const DOT_OFFSET = 5;
const ROW_OFFSET = 9;

/**
 * Rows whose status dot sits exactly on a fan point. `side` is where the fan opens:
 * right-side rows read away from the card, left-side rows mirror toward the orb.
 */
export function FanList({
  items,
  label,
  listKey,
  metaStyle = "label",
  points,
  pulseDelays,
  reducedMotion,
  side,
}: {
  items: readonly FanItem[];
  label: string;
  listKey: string;
  /** `label` for short channel names, `sentence` for longer details that would not fit in mono caps. */
  metaStyle?: "label" | "sentence";
  points: readonly StagePoint[];
  pulseDelays?: readonly number[];
  reducedMotion: boolean;
  side: "left" | "right";
}) {
  const { tx } = useI18n();
  const source = side === "right" ? -1 : 1;

  return (
    <ul aria-label={tx(label)} className="pointer-events-none absolute inset-0 m-0 list-none p-0">
      <AnimatePresence initial={false}>
        {items.map((item, index) => {
          const point = points[index];
          if (!point) return null;

          return (
            <motion.li
              animate={{ opacity: 1, scale: 1, x: 0 }}
              className={cn("absolute flex items-start gap-2.5", side === "left" && "flex-row-reverse text-right")}
              exit={
                reducedMotion
                  ? { opacity: 0, transition: { duration: 0 } }
                  : { opacity: 0, transition: { duration: 0.18 }, x: source * 12 }
              }
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96, x: source * 28 }}
              key={`${listKey}-${index}`}
              style={
                side === "right"
                  ? { left: point.x - DOT_OFFSET, top: point.y - ROW_OFFSET, width: STAGE_WIDTH - point.x + DOT_OFFSET }
                  : { left: 0, top: point.y - ROW_OFFSET, width: point.x + DOT_OFFSET }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { damping: 24, delay: 0.1 + index * 0.045, stiffness: 260, type: "spring" }
              }
            >
              <StatusDot pulseDelay={pulseDelays?.[index]} status={item.status} />
              <span className="min-w-0">
                <span className="block truncate text-[13.5px] font-medium leading-[18px] text-primary-foreground/92">
                  {tx(item.label)}
                </span>
                <span className={cn("mt-1 flex items-center gap-2", side === "left" && "flex-row-reverse")}>
                  <span
                    className={cn(
                      "truncate leading-4",
                      metaStyle === "label"
                        ? "font-mono text-[10px] uppercase tracking-[0.12em] text-primary-foreground/45"
                        : "text-xs text-primary-foreground/55"
                    )}
                  >
                    {tx(item.meta)}
                  </span>
                  <StatusBars status={item.status} />
                </span>
                <span className="sr-only">{`, ${tx(statusMeta[item.status].label)}`}</span>
              </span>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
}
