"use client";

import { motion } from "motion/react";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneHeader, UiBadge } from "@/components/services-bento/scene-ui";
import { GlassScene } from "@/components/tax-features/glass";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const filings = [
  { title: "Greece VAT", detail: "April · AADE", status: "In review", sure: true },
  { title: "OSS return", detail: "Q1 · EU consumer sales", status: "Submitted", sure: true },
  { title: "Intra-EU listing", detail: "April · B2B supplies", status: "Ready", sure: true },
  { title: "UK VAT", detail: "Separate review required", status: "Review", sure: false },
];

export function CrossBorderScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { tx } = useI18n();
  const ready = reducedMotion || active;
  const coordinated = ready && focus >= 1;
  const owned = ready && focus >= 2;

  return (
    <GlassScene>
      <SceneHeader subtitle="Where you sell" title="Filing map">
        <UiBadge variant={owned ? "secondary" : ready ? "default" : "outline"}>
          {owned ? "One owner" : ready ? "Coordinating" : "Mapping"}
        </UiBadge>
      </SceneHeader>
      <div className="flex flex-col divide-y divide-border">
        {filings.map((item, index) => (
          <motion.div
            animate={{ opacity: focus === 1 && !item.sure ? 0.45 : 1, y: 0 }}
            className="flex items-center gap-3 px-3 py-2.5"
            data-demo-spot={index + 1}
            initial={false}
            key={item.title}
            transition={sceneTransition(reducedMotion, 0.08 + index * 0.07, active)}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium leading-4">{tx(item.title)}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{tx(item.detail)}</p>
            </div>
            <UiBadge
              className={cn(!coordinated && item.sure && "opacity-70")}
              variant={item.sure && ready ? "secondary" : "outline"}
            >
              {tx(item.status)}
            </UiBadge>
          </motion.div>
        ))}
      </div>
      <div className="border-t border-border px-3 py-2">
        <p className="text-[11px] text-muted-foreground">
          {tx(owned ? "Each deadline has a named advisor" : "EU sales stay on the same calendar")}
        </p>
      </div>
    </GlassScene>
  );
}
