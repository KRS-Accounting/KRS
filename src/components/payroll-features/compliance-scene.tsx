"use client";

import { motion } from "motion/react";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneHeader, UiBadge, UiCheckbox } from "@/components/services-bento/scene-ui";
import { GlassScene } from "@/components/tax-features/glass";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const checks = [
  { title: "ERGANI hire notices", text: "April starters declared before day one", status: "Filed", sure: true },
  { title: "Working schedules", text: "Hours on the contract match ERGANI", status: "Matched", sure: true },
  { title: "Employee EFKA", text: "Contributions calculated on gross pay", status: "Checked", sure: true },
  { title: "Payroll withholding", text: "Tax withheld on the payslip", status: "Checked", sure: true },
  { title: "Open leaver", text: "1 end date still missing", status: "Review", sure: false },
];

export function PayrollComplianceScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { tx } = useI18n();
  const ready = reducedMotion || active;
  const watched = ready && focus >= 1;
  const filed = ready && focus >= 2;

  return (
    <GlassScene>
      <SceneHeader subtitle="April payroll" title="EFKA and ERGANI">
        <UiBadge variant={filed ? "secondary" : ready ? "default" : "outline"}>
          {filed ? "APD ready" : ready ? "Checks running" : "Queued"}
        </UiBadge>
      </SceneHeader>
      <div className="flex flex-col divide-y divide-border">
        {checks.map((item, index) => {
          const checked = reducedMotion || (ready && item.sure);
          return (
            <motion.div
              animate={{ opacity: focus === 1 && !item.sure ? 0.45 : 1, y: ready || index < 2 ? 0 : 8 }}
              className="flex items-center gap-3 px-3 py-2.5"
              initial={false}
              key={item.title}
              transition={sceneTransition(reducedMotion, 0.08 + index * 0.08, active)}
            >
              <UiCheckbox
                active={active}
                checked={checked}
                delay={0.14 + index * 0.08}
                demoSpot={item.sure ? index + 1 : undefined}
                reducedMotion={reducedMotion}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium leading-4">{tx(item.title)}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{tx(item.text)}</p>
              </div>
              <UiBadge className={cn(!watched && item.sure && "opacity-70")} variant={item.sure && ready ? "secondary" : "outline"}>
                {tx(item.status)}
              </UiBadge>
            </motion.div>
          );
        })}
      </div>
      <div className="border-t border-border px-3 py-2">
        <p className="text-[11px] text-muted-foreground">
          {tx(filed ? "APD agrees to the payslips" : watched ? "Filings sit on the same calendar" : "Waiting for the leaver’s last day")}
        </p>
      </div>
    </GlassScene>
  );
}
