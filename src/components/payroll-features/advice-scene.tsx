"use client";

import Image from "next/image";
import { motion } from "motion/react";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneHeader, UiBadge, UiButton } from "@/components/services-bento/scene-ui";
import { GlassScene } from "@/components/tax-features/glass";
import { useI18n } from "@/i18n/provider";

export function PayrollAdviceScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { tx } = useI18n();
  const ready = reducedMotion || active;
  const context = ready && focus >= 1;
  const scheduled = ready && focus >= 2;

  return (
    <GlassScene>
      <SceneHeader subtitle="Direct message" title="Elena, payroll">
        <UiBadge variant={ready ? "secondary" : "outline"}>{ready ? "Online" : "Away"}</UiBadge>
      </SceneHeader>
      <div className="flex flex-col gap-2 p-3">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[92%] rounded-[var(--radius-xl)] bg-muted px-3 py-2"
          data-demo-spot={1}
          initial={false}
          transition={sceneTransition(reducedMotion, 0.05, active)}
        >
          <p className="text-[10px] text-muted-foreground">{tx("You")} · 10:16</p>
          <p className="mt-1 text-[13px] leading-5">
            {tx("We are hiring a part-time designer from Monday. What do you need before she starts?")}
          </p>
        </motion.div>
        <motion.div
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 10 }}
          className="ml-auto max-w-[94%] rounded-[var(--radius-xl)] border border-border bg-card px-3 py-2 shadow-xs"
          data-demo-spot={2}
          initial={false}
          transition={sceneTransition(reducedMotion, 0.28, active)}
        >
          <div className="flex items-center gap-2">
            <Image
              alt=""
              className="size-6 rounded-full object-cover"
              height={48}
              src="/images/krs-expert-payroll-advisor.webp"
              width={48}
            />
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground">Elena · {tx("Payroll")}</p>
              {context ? <p className="text-[10px] font-medium text-secondary">{tx("Part-time hire")}</p> : null}
            </div>
          </div>
          <p className="mt-1.5 text-[13px] leading-5">
            {tx("Please send the signed contract, her AFM, AMKA, IBAN and weekly schedule. I will file the ERGANI notice before her first day and add her to the May payroll.")}
          </p>
        </motion.div>
        {scheduled ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[var(--radius-lg)] border border-secondary/30 bg-secondary/10 px-3 py-2"
            initial={{ opacity: 0, y: 8 }}
            transition={sceneTransition(reducedMotion, 0.12, active)}
          >
            <p className="text-[11px] leading-4 text-muted-foreground">{tx("ERGANI notice scheduled before her Monday start.")}</p>
          </motion.div>
        ) : null}
        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
          <span className="flex-1 text-[12px] text-muted-foreground">{tx("Reply to Elena")}</span>
          <UiButton demoSpot={3} variant="secondary">
            Send
          </UiButton>
        </div>
      </div>
    </GlassScene>
  );
}
