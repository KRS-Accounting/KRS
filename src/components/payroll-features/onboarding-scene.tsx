"use client";

import { motion } from "motion/react";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneHeader, UiBadge, UiCheckbox } from "@/components/services-bento/scene-ui";
import { GlassScene } from "@/components/tax-features/glass";
import { useI18n } from "@/i18n/provider";

const steps = [
  { title: "Contract", text: "Part-time designer · signed", sure: true },
  { title: "AFM and AMKA", text: "Tax and social security numbers received", sure: true },
  { title: "IBAN", text: "Salary account confirmed", sure: true },
  { title: "ERGANI notice", text: "Filed before the first day", sure: true },
  { title: "May payslip", text: "Added to the next run", sure: false },
];

export function PayrollOnboardingScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { tx } = useI18n();
  const ready = reducedMotion || active;
  const setup = ready && focus >= 1;
  const included = ready && focus >= 2;

  return (
    <GlassScene>
      <SceneHeader subtitle="Starts 4 May" title="Niki A.">
        <UiBadge variant={included ? "secondary" : ready ? "default" : "outline"}>
          {included ? "On May payroll" : ready ? "Onboarding" : "Waiting"}
        </UiBadge>
      </SceneHeader>
      <div className="flex flex-col divide-y divide-border">
        {steps.map((item, index) => {
          const checked = reducedMotion || (ready && (item.sure || (included && !item.sure)));
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
            </motion.div>
          );
        })}
      </div>
      <div className="border-t border-border px-3 py-2">
        <p className="text-[11px] text-muted-foreground">
          {tx(included ? "First payslip is on the May run" : setup ? "Record added to payroll" : "Collecting the hire details")}
        </p>
      </div>
    </GlassScene>
  );
}
