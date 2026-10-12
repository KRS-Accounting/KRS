"use client";

import { motion } from "motion/react";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneHeader, UiBadge } from "@/components/services-bento/scene-ui";
import { GlassScene } from "@/components/tax-features/glass";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const lines = [
  { label: "Accounting profit", value: "€186,400", id: 0 },
  { label: "Non-deductible costs", value: "€4,200", id: 1 },
  { label: "Taxable result", value: "€182,200", id: 1 },
  { label: "Advance tax paid", value: "€21,800", id: 2 },
];

export function CorporateScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { tx } = useI18n();
  const ready = reducedMotion || active;
  const adjustments = ready && focus >= 1;
  const readyToFile = ready && focus >= 2;

  return (
    <GlassScene>
      <SceneHeader subtitle="Income tax · 2025" title="E3 and return">
        <UiBadge variant={readyToFile ? "secondary" : ready ? "default" : "outline"}>
          {readyToFile ? "Ready to file" : ready ? "In review" : "Drafting"}
        </UiBadge>
      </SceneHeader>
      <div className="flex flex-col gap-2 p-3">
        {lines.map((line, index) => {
          const highlighted = ready && focus === line.id;

          return (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex items-center justify-between gap-3 rounded-[var(--radius-lg)] border border-border bg-background px-3 py-2",
                highlighted && "ring-ring",
              )}
              data-demo-spot={index + 1}
              initial={false}
              key={line.label}
              transition={sceneTransition(reducedMotion, 0.06 + index * 0.06, active)}
            >
              <p className="text-[13px] font-medium">{tx(line.label)}</p>
              <p className="font-sans text-[13px] font-semibold tabular-nums">{line.value}</p>
            </motion.div>
          );
        })}
        <p className="px-1 pt-1 text-[11px] text-muted-foreground">
          {tx(
            readyToFile
              ? "Return and E3 agree to the closed books"
              : adjustments
                ? "Deductions reviewed before filing"
                : "Built from the year-end accounts",
          )}
        </p>
      </div>
    </GlassScene>
  );
}
