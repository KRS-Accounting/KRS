"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import { RevealFade } from "@/components/reveal";

import { CompactMap } from "./compact-map";
import type { PlatformService } from "./data";
import type { FanItem } from "./fan-list";
import type { WorkSide } from "./map-wires";
import { PlatformStage } from "./platform-stage";
import { AutoAdvanceBar } from "./service-card";
import { reviewStatuses, statusMeta } from "./status";
import { StatusDot } from "./status-ring";
import { useActiveService, usePrefersReducedMotion } from "./use-active-service";

export type { WorkSide } from "./map-wires";

export function PlatformMap({
  services,
  workSide = "panel",
}: {
  services: readonly PlatformService[];
  workSide?: WorkSide;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { activeIndex, advance, autoEnabled, autoRunning, holdHandlers, manual, select } = useActiveService({
    count: services.length,
    reducedMotion,
    rootRef,
  });

  const service = services[activeIndex];
  const inputItems: FanItem[] = service.inputs.map((input) => ({
    label: input.label,
    meta: input.channel,
    status: input.status,
  }));
  const workItems: FanItem[] = service.work.map((item) => ({
    label: item.label,
    meta: item.detail,
    status: item.status,
  }));
  const autoAdvance = autoEnabled ? (
    <AutoAdvanceBar key={service.id} onComplete={advance} running={autoRunning} />
  ) : null;

  const layoutProps = { activeIndex, autoAdvance, inputItems, reducedMotion, select, services, workItems };

  return (
    <MotionConfig reducedMotion="user">
      <div ref={rootRef} {...holdHandlers}>
        <RevealFade className="hidden xl:block" delay={0.15}>
          <PlatformStage {...layoutProps} workSide={workSide} />
        </RevealFade>
        <RevealFade className="xl:hidden" delay={0.15}>
          <CompactMap {...layoutProps} />
        </RevealFade>

        <MapFooter
          activeIndex={activeIndex}
          announce={manual}
          count={services.length}
          reducedMotion={reducedMotion}
          service={service}
        />
      </div>
    </MotionConfig>
  );
}

function MapFooter({
  activeIndex,
  announce,
  count,
  reducedMotion,
  service,
}: {
  activeIndex: number;
  /** Only announce caption changes the visitor asked for, not auto-advance. */
  announce: boolean;
  count: number;
  reducedMotion: boolean;
  service: PlatformService;
}) {
  return (
    <div className="mt-10 grid gap-10 border-t border-primary-foreground/10 pt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 xl:mt-12">
      <div>
        <p className="mono-label text-secondary">
          {service.name}{" "}
          <span className="text-primary-foreground/40">
            / {activeIndex + 1} of {count}
          </span>
        </p>
        <div aria-atomic="true" aria-live={announce ? "polite" : "off"} className="mt-4 min-h-[5.25rem] sm:min-h-[4.5rem]">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl text-balance text-2xl leading-[1.3] sm:text-[28px]"
              exit={{ opacity: 0, y: -8 }}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              key={service.id}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
            >
              {service.caption}
            </motion.p>
          </AnimatePresence>
        </div>
        <Link
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground transition-[gap,color] duration-300 hover:gap-3 hover:text-secondary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
          href={service.href}
        >
          {service.exploreLabel}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      <ul aria-label="Status legend" className="m-0 grid list-none gap-5 p-0 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {reviewStatuses.map((status) => (
          <li className="flex gap-3" key={status}>
            <StatusDot className="mt-1.5" status={status} />
            <span>
              <span className="block text-sm font-semibold">{statusMeta[status].label}</span>
              <span className="mt-1 block text-sm leading-6 text-primary-foreground/60">
                {statusMeta[status].description}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
