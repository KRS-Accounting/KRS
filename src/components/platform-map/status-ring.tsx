import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { PlatformService } from "./data";
import { cycleDelay } from "./geometry";
import { countStatuses, reviewStatuses, reviewedPercent, statusMeta, type ReviewStatus } from "./status";

const ringEase = "600ms cubic-bezier(0.16, 1, 0.3, 1)";

export function StatusRing({
  children,
  className,
  items,
  muted = false,
  size = 42,
  stroke = 3,
}: {
  children?: ReactNode;
  className?: string;
  items: readonly { status: ReviewStatus }[];
  muted?: boolean;
  size?: number;
  stroke?: number;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const counts = countStatuses(items);
  const total = Math.max(items.length, 1);
  const gap = items.length > 1 ? 2.5 : 0;

  const segments: { dash: number; offset: number; status: ReviewStatus }[] = [];
  let offset = 0;
  for (const status of reviewStatuses) {
    const length = (counts[status] / total) * circumference;
    segments.push({ dash: Math.max(length - gap, 0), offset, status });
    offset += length;
  }

  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ height: size, width: size }}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 -rotate-90"
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke="rgba(244, 239, 230, 0.1)"
          strokeWidth={stroke}
        />
        {segments.map((segment) => (
          <circle
            cx={size / 2}
            cy={size / 2}
            fill="none"
            key={segment.status}
            r={radius}
            stroke={statusMeta[segment.status].color}
            strokeWidth={stroke}
            style={{
              opacity: muted ? 0.4 : 1,
              strokeDasharray: `${segment.dash} ${circumference}`,
              strokeDashoffset: -segment.offset,
              transition: `stroke-dasharray ${ringEase}, stroke-dashoffset ${ringEase}, opacity 300ms ease`,
            }}
          />
        ))}
      </svg>
      {children}
    </span>
  );
}

export function StatusDot({
  className,
  pulseDelay,
  status,
}: {
  className?: string;
  /** Cycle offset of the glow that marks a comet leaving or landing on this dot. */
  pulseDelay?: number;
  status: ReviewStatus;
}) {
  const color = statusMeta[status].color;

  return (
    <span aria-hidden="true" className={cn("relative mt-1 flex size-2.5 shrink-0", className)}>
      {pulseDelay === undefined ? null : (
        <span
          className="platform-dot-pulse absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(226,192,112,0.65),transparent_70%)]"
          style={cycleDelay(pulseDelay)}
        />
      )}
      <span
        className="absolute inset-0 rounded-full border-[1.5px]"
        style={{ backgroundColor: status === "reviewed" ? color : "#041a36", borderColor: color }}
      />
    </span>
  );
}

const filledBars: Record<ReviewStatus, number> = { reviewed: 3, prepared: 2, waiting: 1 };

export function StatusBars({ status }: { status: ReviewStatus }) {
  return (
    <span aria-hidden="true" className="flex shrink-0 gap-0.5">
      {[0, 1, 2].map((bar) => (
        <span
          className="h-[3px] w-2 rounded-full"
          key={bar}
          style={{
            backgroundColor: bar < filledBars[status] ? statusMeta[status].color : "rgba(244, 239, 230, 0.14)",
          }}
        />
      ))}
    </span>
  );
}

const chipClassNames: Record<ReviewStatus, string> = {
  reviewed: "border-secondary/55 bg-secondary/20 text-secondary-300",
  prepared: "border-primary-foreground/15 bg-primary-foreground/[0.06] text-primary-foreground/78",
  waiting: "border-tertiary-300/40 bg-tertiary-300/12 text-tertiary-100",
};

export function StatusChip({ className, status }: { className?: string; status: ReviewStatus }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full border px-2 py-0.5 text-[10.5px] font-semibold leading-4 whitespace-nowrap",
        chipClassNames[status],
        className
      )}
    >
      {statusMeta[status].short}
    </span>
  );
}

export function ReviewerBadge({ className, service, size = 46 }: { className?: string; service: PlatformService; size?: number }) {
  const avatar = size - 10;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <StatusRing items={service.work} size={size} stroke={2.5}>
        <Image
          alt={service.reviewer.imageAlt}
          className="rounded-full object-cover object-top"
          height={avatar * 2}
          src={service.reviewer.image}
          style={{ height: avatar, width: avatar }}
          width={avatar * 2}
        />
      </StatusRing>
      <div className="text-left">
        <p className="text-sm font-semibold leading-tight tabular-nums">{reviewedPercent(service.work)}% reviewed</p>
        <p className="mt-0.5 text-xs leading-tight text-primary-foreground/58">
          by a {service.reviewer.role.toLowerCase()}
        </p>
      </div>
    </div>
  );
}
