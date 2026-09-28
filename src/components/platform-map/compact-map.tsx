"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { PlatformService } from "./data";
import type { FanItem } from "./fan-list";
import { PlatformOrb } from "./platform-orb";
import { serviceRadioLabel } from "./service-card";
import { serviceIcons } from "./service-icons";
import { statusMeta } from "./status";
import { ReviewerBadge, StatusBars, StatusDot } from "./status-ring";
import { useRovingRadio } from "./use-active-service";

const listEase = [0.16, 1, 0.3, 1] as const;

export function CompactMap({
  activeIndex,
  autoAdvance,
  inputItems,
  reducedMotion,
  select,
  services,
  workItems,
}: {
  activeIndex: number;
  autoAdvance: ReactNode;
  inputItems: readonly FanItem[];
  reducedMotion: boolean;
  select: (index: number) => void;
  services: readonly PlatformService[];
  workItems: readonly FanItem[];
}) {
  const getRadioProps = useRovingRadio({ activeIndex, count: services.length, select });
  const service = services[activeIndex];

  return (
    <div className="grid gap-4">
      <div
        aria-label="KRS services"
        className="platform-chip-row -mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12"
        role="radiogroup"
      >
        {services.map((item, index) => {
          const Icon = serviceIcons[item.id];
          const active = index === activeIndex;

          return (
            <button
              key={item.id}
              {...getRadioProps(index)}
              aria-label={serviceRadioLabel(item)}
              className={cn(
                "relative flex h-11 shrink-0 items-center gap-2 overflow-hidden rounded-full border px-4 text-sm font-semibold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
                active
                  ? "border-secondary bg-secondary text-primary"
                  : "border-primary-foreground/15 bg-primary-foreground/[0.04] text-primary-foreground/75 hover:border-primary-foreground/30 hover:text-primary-foreground"
              )}
            >
              <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
              {item.name}
              {active ? autoAdvance : null}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)_minmax(0,1fr)]">
        <CompactList
          items={inputItems}
          label={`What you send for ${service.name}`}
          listKey={service.id}
          reducedMotion={reducedMotion}
          subtitle={`${inputItems.length} client inputs`}
          title="What you send"
        />

        <div className="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-[var(--radius-xl)] border border-secondary/30 bg-[radial-gradient(circle_at_50%_38%,rgba(11,57,112,0.95),rgba(1,25,54,0.55)_72%)] p-5 text-center">
          <PlatformOrb reducedMotion={reducedMotion} size={112} />
          <div>
            <p className="text-lg font-medium leading-tight">KRS Platform</p>
            <p className="mt-1 text-[13px] text-primary-foreground/58">
              AI + Human review ·{" "}
              <span className="font-semibold text-secondary tabular-nums">{activeIndex + 1}</span> of{" "}
              <span className="font-semibold text-secondary tabular-nums">{services.length}</span>
            </p>
          </div>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              initial={reducedMotion ? false : { opacity: 0, y: 6 }}
              key={service.id}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
            >
              <ReviewerBadge service={service} />
            </motion.div>
          </AnimatePresence>
        </div>

        <CompactList
          items={workItems}
          label={`What KRS delivers for ${service.name}`}
          listKey={service.id}
          reducedMotion={reducedMotion}
          subtitle={service.workTitle}
          title="What KRS delivers"
        />
      </div>
    </div>
  );
}

function CompactList({
  items,
  label,
  listKey,
  reducedMotion,
  subtitle,
  title,
}: {
  items: readonly FanItem[];
  label: string;
  listKey: string;
  reducedMotion: boolean;
  subtitle: string;
  title: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-primary-foreground/12 bg-primary-foreground/[0.035] p-4 sm:p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">{title}</p>
        <p className="truncate text-xs text-primary-foreground/50">{subtitle}</p>
      </div>
      <div className="relative mt-4">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.ul
            animate={{ opacity: 1 }}
            aria-label={label}
            className="m-0 grid list-none gap-3.5 p-0"
            exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.15 } }}
            key={listKey}
          >
            {items.map((item, index) => (
              <motion.li
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3"
                initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                key={item.label}
                transition={reducedMotion ? { duration: 0 } : { delay: index * 0.04, duration: 0.3, ease: listEase }}
              >
                <StatusDot status={item.status} />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium leading-[18px]">{item.label}</span>
                  <span className="mt-1 flex items-center justify-between gap-3">
                    <span className="truncate text-xs text-primary-foreground/52">{item.meta}</span>
                    <StatusBars status={item.status} />
                  </span>
                  <span className="sr-only">{`, ${statusMeta[item.status].label}`}</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
