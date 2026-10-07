"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";

import { CompactColumns } from "./compact-columns";
import { CompactLine } from "./compact-line";
import type { PlatformService } from "./data";
import type { FanItem } from "./fan-list";
import { serviceRadioLabel } from "./service-card";
import { serviceIcons } from "./service-icons";
import { useRovingRadio } from "./use-active-service";

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
  const { tx } = useI18n();
  const getRadioProps = useRovingRadio({ activeIndex, count: services.length, select });
  const flowProps = { activeIndex, inputItems, reducedMotion, services, workItems };

  return (
    <div className="grid gap-8 md:gap-10">
      <div
        aria-label={tx("KRS services")}
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
              aria-label={serviceRadioLabel(item, tx)}
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

      <CompactLine className="md:hidden" {...flowProps} />
      <CompactColumns className="hidden md:block" {...flowProps} />
    </div>
  );
}
