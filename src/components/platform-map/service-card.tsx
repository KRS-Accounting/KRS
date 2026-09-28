"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { PlatformService } from "./data";
import { AUTO_ADVANCE_MS, CARD, COMET, cardTop, cycleDelay } from "./geometry";
import { serviceIcons } from "./service-icons";
import { reviewedPercent } from "./status";
import { StatusRing } from "./status-ring";
import type { RadioItemProps } from "./use-active-service";

const spring = { damping: 26, stiffness: 420, type: "spring" } as const;

export function serviceRadioLabel(service: PlatformService) {
  return `${service.name}, ${service.inputs.length} client inputs, ${reviewedPercent(service.inputs)}% reviewed`;
}

export function ServiceCard({
  active,
  autoAdvance,
  index,
  radioProps,
  reducedMotion,
  service,
}: {
  active: boolean;
  autoAdvance?: ReactNode;
  index: number;
  radioProps: RadioItemProps;
  reducedMotion: boolean;
  service: PlatformService;
}) {
  const Icon = serviceIcons[service.id];
  const transition = reducedMotion ? { duration: 0 } : spring;

  return (
    <button
      {...radioProps}
      aria-label={serviceRadioLabel(service)}
      className={cn(
        "pointer-events-auto absolute flex items-stretch justify-between gap-3 overflow-hidden rounded-[var(--radius-xl)] border p-3.5 text-left text-primary-foreground outline-none transition-[background-color,border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
        active
          ? "border-secondary/65 bg-[#0f2743] shadow-[0_24px_48px_-26px_rgba(174,136,47,0.6),inset_0_1px_0_rgba(244,239,230,0.08)]"
          : "cursor-pointer border-primary-foreground/10 bg-[#061f3d] shadow-[inset_0_1px_0_rgba(244,239,230,0.05)] hover:border-primary-foreground/25 hover:bg-[#0a2646]"
      )}
      style={{ height: CARD.height, left: CARD.x, top: cardTop(index), width: CARD.width }}
    >
      {active && !reducedMotion ? (
        <span
          aria-hidden="true"
          className="platform-land pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(226,192,112,0.85),inset_0_0_28px_rgba(174,136,47,0.3)]"
          style={cycleDelay(COMET.entry + COMET.cardArrival)}
        />
      ) : null}

      <span className="relative flex min-w-0 flex-col justify-center">
        <span className="flex items-center gap-2.5">
          <motion.span
            animate={{ scale: active ? 1 : 0.9 }}
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-md border transition-colors duration-300",
              active
                ? "border-secondary bg-secondary text-primary"
                : "border-primary-foreground/12 bg-primary-foreground/[0.06] text-primary-foreground/70"
            )}
            initial={false}
            transition={transition}
          >
            <Icon aria-hidden="true" className="size-3.5" strokeWidth={2} />
          </motion.span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold leading-tight">{service.name}</span>
            <span className="mt-0.5 block truncate text-[11.5px] leading-tight text-primary-foreground/55">
              {service.subtitle}
            </span>
          </span>
        </span>
      </span>

      <motion.span
        animate={{ scale: active ? 1 : 0.92 }}
        className="relative self-center"
        initial={false}
        transition={transition}
      >
        <StatusRing items={service.inputs} muted={!active}>
          <span
            className={cn(
              "text-[10.5px] font-semibold tabular-nums transition-colors duration-300",
              active ? "text-primary-foreground" : "text-primary-foreground/60"
            )}
          >
            {reviewedPercent(service.inputs)}%
          </span>
        </StatusRing>
      </motion.span>

      {autoAdvance}
    </button>
  );
}

/** Progress bar that drives auto-advance: `onComplete` fires when its CSS animation ends. */
export function AutoAdvanceBar({
  className,
  onComplete,
  running,
}: {
  className?: string;
  onComplete: () => void;
  running: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("platform-autoplay pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-secondary", className)}
      onAnimationEnd={(event) => {
        if (event.animationName === "platform-autoplay") onComplete();
      }}
      style={{ animationDuration: `${AUTO_ADVANCE_MS}ms`, animationPlayState: running ? "running" : "paused" }}
    />
  );
}
