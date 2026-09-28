"use client";

import { AnimatePresence, motion } from "motion/react";

import type { PlatformService } from "./data";
import { COMET, WORK_PANEL_WIDTH, cycleDelay } from "./geometry";
import { countStatuses } from "./status";
import { StatusChip } from "./status-ring";

const ROW_HEIGHT = 54;
const MAX_ROWS = 6;
const rowEase = [0.16, 1, 0.3, 1] as const;

export function WorkPanel({
  centerY,
  landDelay,
  reducedMotion,
  service,
}: {
  centerY: number;
  /** Cycle offset at which the orb comet reaches the panel; rows light up one after another. */
  landDelay: number;
  reducedMotion: boolean;
  service: PlatformService;
}) {
  const reviewed = countStatuses(service.work).reviewed;

  return (
    <div
      className="absolute left-0 flex -translate-y-1/2 flex-col overflow-hidden rounded-[var(--radius-xl)] border border-primary-foreground/12 bg-[#05203f]/90 shadow-[0_40px_80px_-48px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(244,239,230,0.06)]"
      style={{ top: centerY, width: WORK_PANEL_WIDTH }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-primary-foreground/10 px-4 py-3.5">
        <AnimatePresence initial={false} mode="wait">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="truncate text-base font-medium leading-tight"
            exit={{ opacity: 0, y: -6 }}
            initial={reducedMotion ? false : { opacity: 0, y: 6 }}
            key={service.id}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            {service.workTitle}
          </motion.p>
        </AnimatePresence>
        <span className="shrink-0 rounded-full border border-secondary/45 bg-secondary/15 px-2 py-0.5 font-mono text-[10.5px] tabular-nums text-secondary-300">
          {reviewed}/{service.work.length} reviewed
        </span>
      </div>

      <div className="relative" style={{ minHeight: ROW_HEIGHT * MAX_ROWS }}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.ul
            animate={{ opacity: 1 }}
            aria-label={`What KRS delivers for ${service.name}`}
            className="m-0 list-none divide-y divide-primary-foreground/[0.07] p-0"
            exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.16 } }}
            key={service.id}
          >
            {service.work.map((item, index) => (
              <motion.li
                animate={{ opacity: 1, y: 0 }}
                className="relative flex items-center justify-between gap-3 px-4"
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                key={item.label}
                style={{ height: ROW_HEIGHT }}
                transition={reducedMotion ? { duration: 0 } : { delay: 0.06 + index * 0.05, duration: 0.35, ease: rowEase }}
              >
                {reducedMotion ? null : (
                  <span
                    aria-hidden="true"
                    className="platform-land pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(174,136,47,0.2),transparent_70%)] shadow-[inset_2px_0_0_#ae882f]"
                    style={cycleDelay(landDelay + index * COMET.workStagger)}
                  />
                )}
                <span className="relative min-w-0">
                  <span className="block truncate text-[13.5px] font-medium leading-5">{item.label}</span>
                  <span className="block truncate text-xs leading-5 text-primary-foreground/55">{item.detail}</span>
                </span>
                <StatusChip className="relative" status={item.status} />
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
