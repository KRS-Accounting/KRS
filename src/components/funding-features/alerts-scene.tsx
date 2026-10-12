"use client";

import { motion } from "motion/react";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneHeader, UiBadge } from "@/components/services-bento/scene-ui";
import { GlassScene } from "@/components/tax-features/glass";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const alerts = [
  { title: "ESPA call opened", text: "Competitiveness, equipment and software", tag: "New", group: 0 },
  { title: "EIC Accelerator cut-off", text: "Deadline updated, match under review", tag: "Date", group: 1 },
  { title: "Development Law", text: "Still open for this project", tag: "Potential match", group: 2 },
  { title: "Regional skills call", text: "Headcount does not qualify", tag: "Held", group: 2 },
];

export function FundingAlertsScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { tx } = useI18n();
  const ready = reducedMotion || active;

  return (
    <GlassScene>
      <SceneHeader subtitle="This week" title="Funding alerts">
        <UiBadge variant={ready ? "secondary" : "outline"}>{ready ? "3 for you" : "Quiet"}</UiBadge>
      </SceneHeader>
      <div className="flex flex-col gap-2 p-3">
        {alerts.map((alert, index) => {
          const held = alert.tag === "Held";
          const visible = ready && (focus >= alert.group || alert.group === 0);
          return (
            <motion.div
              animate={{ opacity: visible ? (held && focus >= 2 ? 0.4 : 1) : 0.35, y: 0 }}
              className={cn(
                "rounded-[var(--radius-lg)] border border-border bg-background px-3 py-2",
                ready && focus === alert.group && !held && "ring-ring",
              )}
              data-demo-spot={index + 1}
              initial={false}
              key={alert.title}
              transition={sceneTransition(reducedMotion, 0.08 + index * 0.08, active)}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] font-medium">{tx(alert.title)}</p>
                <UiBadge variant={held ? "outline" : "secondary"}>{tx(alert.tag)}</UiBadge>
              </div>
              <p className="mt-1 text-[11px] leading-4 text-muted-foreground">{tx(alert.text)}</p>
            </motion.div>
          );
        })}
      </div>
    </GlassScene>
  );
}
