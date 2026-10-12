"use client";

import { motion } from "motion/react";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneHeader, UiBadge, UiCheckbox } from "@/components/services-bento/scene-ui";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const checks = [
  { title: "Bank reconciliation", text: "128 transactions matched to books", status: "Matched", sure: true },
  { title: "VAT rate validation", text: "All line items verified", status: "Matched", sure: true },
  { title: "myDATA classification", text: "Invoices aligned to AADE codes", status: "Matched", sure: true },
  { title: "Invoice matching", text: "42 invoices linked to payments", status: "Matched", sure: true },
  { title: "Missing receipts", text: "2 flagged for review, caught early", status: "Review", sure: false },
];

export function AccuracyScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { tx } = useI18n();
  const ready = reducedMotion || active;
  const compliance = ready && focus >= 1;
  const closeReady = ready && focus >= 2;

  return (
    <div className="pointer-events-none relative flex h-full items-center justify-center overflow-hidden p-5 sm:p-8">
      <div aria-hidden className="absolute inset-0 bg-[#eef1f4]" />
      <div
        aria-hidden
        className="absolute -top-16 -left-10 size-72 rounded-full bg-[radial-gradient(circle,var(--secondary)_0%,transparent_68%)] opacity-45 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-16 bottom-0 size-80 rounded-full bg-[radial-gradient(circle,var(--tertiary)_0%,transparent_70%)] opacity-40 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/3 size-56 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--chart-2)_0%,transparent_70%)] opacity-35 blur-3xl"
      />

      <div className="relative flex w-full max-w-[440px] flex-col overflow-hidden rounded-2xl border border-white/80 bg-card/80 shadow-[0_28px_60px_-32px_rgba(1,25,54,0.55)] backdrop-blur-md">
      <SceneHeader subtitle="Daily checks" title="Month-end health">
        <UiBadge variant={closeReady ? "secondary" : ready ? "default" : "outline"}>
          {closeReady ? "Close on track" : ready ? "Checks running" : "Queued"}
        </UiBadge>
      </SceneHeader>

      <div className="flex flex-col divide-y divide-border">
        {checks.map((item, index) => {
          const checked = reducedMotion || (ready && item.sure);
          const dimmed = focus === 1 && item.sure === false;

          return (
            <motion.div
              animate={{
                opacity: dimmed ? 0.45 : 1,
                y: ready || index < 2 ? 0 : 8,
              }}
              className="flex items-center gap-3 px-3 py-2.5"
              initial={false}
              key={item.title}
              transition={sceneTransition(reducedMotion, 0.08 + index * 0.08, active)}
            >
              <UiCheckbox
                active={active}
                checked={checked}
                delay={0.14 + index * 0.08}
                demoSpot={item.sure ? index + 1 : undefined}
                reducedMotion={reducedMotion}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium leading-4">{tx(item.title)}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{tx(item.text)}</p>
              </div>
              <UiBadge
                className={cn(!compliance && item.sure && "opacity-70")}
                variant={item.sure && ready ? "secondary" : "outline"}
              >
                {tx(item.status)}
              </UiBadge>
            </motion.div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
