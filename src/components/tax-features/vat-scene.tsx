"use client";

import { motion } from "motion/react";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneHeader, UiBadge, UiCheckbox } from "@/components/services-bento/scene-ui";
import { GlassScene } from "@/components/tax-features/glass";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const checks = [
  { title: "Output VAT 24%", text: "Domestic sales tied to issued invoices", status: "Checked", sure: true },
  { title: "Input VAT", text: "Deductible purchases matched to receipts", status: "Checked", sure: true },
  { title: "Reverse charge", text: "EU services flagged, no Greek VAT charged", status: "Checked", sure: true },
  { title: "myDATA alignment", text: "Return agrees to transmitted records", status: "Checked", sure: true },
  { title: "Open exceptions", text: "1 invoice still missing a VAT rate", status: "Review", sure: false },
];

export function VatScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { tx } = useI18n();
  const ready = reducedMotion || active;
  const watched = ready && focus >= 1;
  const filed = ready && focus >= 2;

  return (
    <GlassScene>
      <SceneHeader subtitle="April VAT · AADE" title="VAT return">
        <UiBadge variant={filed ? "secondary" : ready ? "default" : "outline"}>
          {filed ? "Ready to file" : ready ? "In review" : "Queued"}
        </UiBadge>
      </SceneHeader>
      <div className="flex flex-col divide-y divide-border">
        {checks.map((item, index) => {
          const checked = reducedMotion || (ready && item.sure);
          const dimmed = focus === 1 && !item.sure;

          return (
            <motion.div
              animate={{ opacity: dimmed ? 0.45 : 1, y: ready || index < 2 ? 0 : 8 }}
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
                className={cn(!watched && item.sure && "opacity-70")}
                variant={item.sure && ready ? "secondary" : "outline"}
              >
                {tx(item.status)}
              </UiBadge>
            </motion.div>
          );
        })}
      </div>
      <div className="border-t border-border px-3 py-2">
        <p className="text-[11px] text-muted-foreground">
          {tx(filed ? "Due with AADE on the April cycle" : watched ? "Deadline on the calendar" : "Waiting for the last receipt")}
        </p>
      </div>
    </GlassScene>
  );
}
