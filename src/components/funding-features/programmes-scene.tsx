"use client";

import { motion } from "motion/react";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneHeader, UiBadge } from "@/components/services-bento/scene-ui";
import { GlassScene } from "@/components/tax-features/glass";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const sources = [
  { name: "ESPA", detail: "Competitiveness and regional calls", tag: "Greece", group: 0 },
  { name: "Development Law", detail: "Investment aid for productive projects", tag: "Greece", group: 1 },
  { name: "Other national schemes", detail: "Current Greek grant and loan routes", tag: "Greece", group: 1 },
  { name: "Horizon Europe", detail: "Research and innovation calls", tag: "EU", group: 2 },
  { name: "EIC", detail: "Pathfinder, Transition, Accelerator", tag: "EU", group: 2 },
  { name: "Other EU programmes", detail: "Digital Europe, LIFE, Interreg", tag: "EU", group: 2 },
];

export function FundingProgrammesScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { tx } = useI18n();
  const ready = reducedMotion || active;

  return (
    <GlassScene>
      <SceneHeader subtitle="Greece and the EU" title="Funding watchlist">
        <UiBadge variant={ready ? "secondary" : "outline"}>{ready ? "Watched" : "Loading"}</UiBadge>
      </SceneHeader>
      <div className="flex flex-col divide-y divide-border">
        {sources.map((source, index) => (
          <motion.div
            animate={{ opacity: ready && focus !== source.group ? 0.45 : 1, y: 0 }}
            className={cn(
              "flex items-center justify-between gap-3 px-3 py-2.5",
              ready && focus === source.group && "bg-secondary/8",
            )}
            data-demo-spot={index + 1}
            initial={false}
            key={source.name}
            transition={sceneTransition(reducedMotion, 0.06 + index * 0.05, active)}
          >
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium leading-4">{tx(source.name)}</p>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{tx(source.detail)}</p>
            </div>
            <UiBadge variant={source.tag === "EU" ? "outline" : "secondary"}>{tx(source.tag)}</UiBadge>
          </motion.div>
        ))}
      </div>
    </GlassScene>
  );
}
