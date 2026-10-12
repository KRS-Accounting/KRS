"use client";

import { motion } from "motion/react";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneHeader, UiBadge } from "@/components/services-bento/scene-ui";
import { GlassScene } from "@/components/tax-features/glass";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const profile = [
  ["Entity", "Software IKE"],
  ["Region", "Attica"],
  ["Project", "Product development"],
];

const matches = [
  { name: "ESPA competitiveness", result: "Potential match", keep: true },
  { name: "EIC Accelerator", result: "Potential match", keep: true },
  { name: "Green facility call", result: "Not shortlisted", keep: false },
];

export function FundingMatchScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { tx } = useI18n();
  const ready = reducedMotion || active;
  const scored = ready && focus >= 1;
  const shortlisted = ready && focus >= 2;

  return (
    <GlassScene>
      <SceneHeader subtitle="Company file" title="Call match">
        <UiBadge variant={shortlisted ? "secondary" : ready ? "default" : "outline"}>
          {shortlisted ? "2 to review" : scored ? "Screened" : "Profiling"}
        </UiBadge>
      </SceneHeader>
      <div className="grid gap-2 p-3">
        {profile.map(([label, value], index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex items-center justify-between rounded-[var(--radius-lg)] border border-border bg-background px-3 py-2",
              ready && focus === 0 && "ring-ring",
            )}
            data-demo-spot={index + 1}
            initial={false}
            key={label}
            transition={sceneTransition(reducedMotion, 0.05 + index * 0.05, active)}
          >
            <p className="text-[12px] text-muted-foreground">{tx(label)}</p>
            <p className="text-[13px] font-medium">{tx(value)}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col divide-y divide-border border-t border-border">
        {matches.map((item) => {
          const dimmed = shortlisted && !item.keep;
          return (
            <motion.div
              animate={{ opacity: scored ? (dimmed ? 0.4 : 1) : 0.55, y: 0 }}
              className="flex items-center justify-between gap-3 px-3 py-2.5"
              initial={false}
              key={item.name}
              transition={sceneTransition(reducedMotion, 0.2, active)}
            >
              <p className="truncate text-[13px] font-medium">{tx(item.name)}</p>
              <UiBadge variant={item.keep && scored ? "secondary" : "outline"}>
                {tx(scored ? item.result : "Open")}
              </UiBadge>
            </motion.div>
          );
        })}
      </div>
    </GlassScene>
  );
}
