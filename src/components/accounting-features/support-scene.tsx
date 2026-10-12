"use client";

import Image from "next/image";
import { motion } from "motion/react";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneHeader, UiBadge, UiButton } from "@/components/services-bento/scene-ui";
import { useI18n } from "@/i18n/provider";

export function SupportScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { tx } = useI18n();
  const ready = reducedMotion || active;
  const industry = ready && focus >= 1;
  const extraHelp = ready && focus >= 2;

  return (
    <div className="pointer-events-none relative flex h-full items-center justify-center overflow-hidden p-5 sm:p-8">
      <div aria-hidden className="absolute inset-0 bg-[#eef1f4]" />
      <div
        aria-hidden
        className="absolute -top-16 -left-10 size-72 rounded-full bg-[radial-gradient(circle,var(--secondary)_0%,transparent_68%)] opacity-45 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-16 bottom-0 size-80 rounded-full bg-[radial-gradient(circle,var(--tertiary)_0%,transparent_70%)] opacity-40 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/3 size-56 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--chart-2)_0%,transparent_70%)] opacity-35 blur-3xl"
      />

      <div className="relative flex w-full max-w-[440px] flex-col overflow-hidden rounded-2xl border border-white/80 bg-card/80 shadow-[0_28px_60px_-32px_rgba(1,25,54,0.55)] backdrop-blur-md">
        <SceneHeader subtitle="Direct message" title="Nikos, accounting">
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
            <p className="text-[10px] text-muted-foreground">{tx("You")} · 09:42</p>
            <p className="mt-1 text-[13px] leading-5">
              {tx("Booked a €4,200 invoice from DesignWorks. Brand project. Move it to marketing?")}
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
                src="/images/krs-expert-accounting-advisor.webp"
                width={48}
              />
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground">Nikos · {tx("Accountant")}</p>
                {industry ? (
                  <p className="text-[10px] font-medium text-secondary">{tx("SaaS / agency close")}</p>
                ) : null}
              </div>
            </div>
            <p className="mt-1.5 text-[13px] leading-5">
              {tx("Leave it on 73 Services, not marketing. I will keep myDATA 1.3 with the invoice.")}
            </p>
          </motion.div>

          {extraHelp ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[var(--radius-lg)] border border-secondary/30 bg-secondary/10 px-3 py-2"
              initial={{ opacity: 0, y: 8 }}
              transition={sceneTransition(reducedMotion, 0.12, active)}
            >
              <p className="text-[11px] leading-4 text-muted-foreground">
                {tx("Cash-flow note added to this month’s report.")}
              </p>
            </motion.div>
          ) : null}

          <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
            <span className="flex-1 text-[12px] text-muted-foreground">{tx("Reply to Nikos")}</span>
            <UiButton demoSpot={3} variant="secondary">
              Send
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  );
}
