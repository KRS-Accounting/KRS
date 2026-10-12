"use client";

import Image from "next/image";
import { motion } from "motion/react";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneHeader, UiBadge, UiButton } from "@/components/services-bento/scene-ui";
import { GlassScene } from "@/components/tax-features/glass";
import { useI18n } from "@/i18n/provider";

export function AdviceScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { tx } = useI18n();
  const ready = reducedMotion || active;
  const industry = ready && focus >= 1;
  const planned = ready && focus >= 2;

  return (
    <GlassScene>
      <SceneHeader subtitle="Direct message" title="Alexis, tax">
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
          <p className="text-[10px] text-muted-foreground">{tx("You")} · 11:04</p>
          <p className="mt-1 text-[13px] leading-5">
            {tx("We start invoicing German companies next month. Do we charge Greek VAT?")}
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
              src="/images/krs-expert-tax-advisor.webp"
              width={48}
            />
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground">Alexis · {tx("Tax advisor")}</p>
              {industry ? <p className="text-[10px] font-medium text-secondary">{tx("SaaS · EU B2B")}</p> : null}
            </div>
          </div>
          <p className="mt-1.5 text-[13px] leading-5">
            {tx("If the VAT number and B2B treatment are confirmed, reverse charge may apply. I will verify the invoice and add any required intra-EU reporting.")}
          </p>
        </motion.div>
        {planned ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[var(--radius-lg)] border border-secondary/30 bg-secondary/10 px-3 py-2"
            initial={{ opacity: 0, y: 8 }}
            transition={sceneTransition(reducedMotion, 0.12, active)}
          >
            <p className="text-[11px] leading-4 text-muted-foreground">
              {tx("Reporting deadline added to this quarter’s tax calendar.")}
            </p>
          </motion.div>
        ) : null}
        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
          <span className="flex-1 text-[12px] text-muted-foreground">{tx("Reply to Alexis")}</span>
          <UiButton demoSpot={3} variant="secondary">
            Send
          </UiButton>
        </div>
      </div>
    </GlassScene>
  );
}
