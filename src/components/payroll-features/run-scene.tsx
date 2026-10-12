"use client";

import { motion } from "motion/react";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneHeader, UiBadge } from "@/components/services-bento/scene-ui";
import { GlassScene } from "@/components/tax-features/glass";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const lines = [
  { label: "Gross pay", value: "€28,640", id: 0 },
  { label: "Employee EFKA", value: "€3,970", id: 1 },
  { label: "Withholding", value: "€2,180", id: 1 },
  { label: "Net to pay", value: "€22,490", id: 0 },
  { label: "Employer EFKA", value: "€6,410", id: 2 },
];

export function PayrollRunScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { tx } = useI18n();
  const ready = reducedMotion || active;
  const filed = ready && focus >= 1;
  const visible = ready && focus >= 2;

  return (
    <GlassScene>
      <SceneHeader subtitle="April · 12 people" title="Payroll run">
        <UiBadge variant={visible ? "secondary" : ready ? "default" : "outline"}>
          {visible ? "Ready to pay" : ready ? "In review" : "Drafting"}
        </UiBadge>
      </SceneHeader>
      <div className="flex flex-col gap-2 p-3">
        {lines.map((line, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex items-center justify-between gap-3 rounded-[var(--radius-lg)] border border-border bg-background px-3 py-2",
              ready && focus === line.id && "ring-ring",
            )}
            data-demo-spot={index + 1}
            initial={false}
            key={line.label}
            transition={sceneTransition(reducedMotion, 0.06 + index * 0.06, active)}
          >
            <p className="text-[13px] font-medium">{tx(line.label)}</p>
            <p className="font-sans text-[13px] font-semibold tabular-nums">{line.value}</p>
          </motion.div>
        ))}
        <p className="px-1 pt-1 text-[11px] text-muted-foreground">
          {tx(
            visible
              ? "Employer cost is visible before payment"
              : filed
                ? "APD drafted from this run"
                : "Built from this month’s changes",
          )}
        </p>
      </div>
    </GlassScene>
  );
}
