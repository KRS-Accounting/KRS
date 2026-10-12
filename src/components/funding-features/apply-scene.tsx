"use client";

import { motion } from "motion/react";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneHeader, UiBadge, UiCheckbox } from "@/components/services-bento/scene-ui";
import { GlassScene } from "@/components/tax-features/glass";
import { useI18n } from "@/i18n/provider";

const steps = [
  { title: "Case and budget drafted", text: "Narrative and costs from the company file", owner: "KRS", sure: true },
  { title: "Financial statements", text: "Last two years, from you", owner: "You", sure: true },
  { title: "Project sign-off", text: "You approve the pack before submission", owner: "You", sure: false },
  { title: "Application submitted", text: "Acknowledgement kept on the file", owner: "KRS", sure: false },
];

export function FundingApplyScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { tx } = useI18n();
  const ready = reducedMotion || active;
  const shared = ready && focus >= 1;
  const filed = ready && focus >= 2;

  return (
    <GlassScene>
      <SceneHeader subtitle="ESPA competitiveness" title="Application">
        <UiBadge variant={filed ? "secondary" : ready ? "default" : "outline"}>
          {filed ? "Submitted" : shared ? "With you" : "Drafting"}
        </UiBadge>
      </SceneHeader>
      <div className="flex flex-col divide-y divide-border">
        {steps.map((item, index) => {
          const checked = reducedMotion || (ready && (item.sure || (shared && index < 3) || filed));
          return (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-3 py-2.5"
              initial={false}
              key={item.title}
              transition={sceneTransition(reducedMotion, 0.08 + index * 0.07, active)}
            >
              <UiCheckbox
                active={active}
                checked={checked}
                delay={0.12 + index * 0.08}
                demoSpot={index + 1}
                reducedMotion={reducedMotion}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium leading-4">{tx(item.title)}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{tx(item.text)}</p>
              </div>
              <p className="text-[11px] font-medium text-muted-foreground">{tx(item.owner)}</p>
            </motion.div>
          );
        })}
      </div>
      <div className="border-t border-border px-3 py-2">
        <p className="text-[11px] text-muted-foreground">
          {tx(filed ? "Submitted with your approval" : shared ? "Waiting on your documents and sign-off" : "KRS is drafting the pack")}
        </p>
      </div>
    </GlassScene>
  );
}
