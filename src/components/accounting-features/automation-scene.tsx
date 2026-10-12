"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneHeader, UiBadge, UiButton, UiCheckbox } from "@/components/services-bento/scene-ui";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const rows = [
  {
    vendor: "DesignWorks",
    detail: "12 Apr · 73 Services",
    amount: "+€4,200",
    vat: "24%",
    mydata: "1.3",
    sure: true,
    inbound: true,
  },
  {
    vendor: "Alpha Supplies",
    detail: "11 Apr · 20 Purchases",
    amount: "−€1,240",
    vat: "24%",
    mydata: "2.1",
    sure: true,
    inbound: false,
  },
  {
    vendor: "Cosmote",
    detail: "09 Apr · 62 Telecom",
    amount: "−€86.40",
    vat: "24%",
    mydata: "2.4",
    sure: true,
    inbound: false,
  },
  {
    vendor: "Web Services",
    detail: "08 Apr · 64 Services",
    amount: "−€156",
    vat: "24%",
    mydata: "2.4",
    sure: true,
    inbound: false,
  },
  {
    vendor: "Office Depot",
    detail: "07 Apr · 64 Supplies",
    amount: "−€450",
    vat: "Review",
    mydata: "Open",
    sure: false,
    inbound: false,
  },
];

export function AutomationScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { tx } = useI18n();
  const ready = reducedMotion || active;
  const showVat = ready && focus >= 1;
  const auditReady = ready && focus >= 2;
  const matched = ready ? rows.filter((row) => row.sure).length : 0;

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
        <SceneHeader subtitle="Bank feed" title="April transactions">
          <UiBadge variant={auditReady ? "secondary" : ready ? "default" : "outline"}>
            {auditReady ? tx("Audit-ready") : ready ? `${matched} ${tx("matched")}` : tx("Syncing")}
          </UiBadge>
        </SceneHeader>

        <div className="divide-y divide-border">
          {rows.map((row, index) => {
            const checked = reducedMotion || (ready && row.sure);

            return (
              <motion.div
                animate={{
                  opacity: ready || index < 2 ? 1 : 0.55,
                  y: ready || index < 2 ? 0 : 6,
                }}
                className={cn(
                  "grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-2 px-3 py-2",
                  focus === 0 && checked && "bg-muted/80",
                )}
                initial={false}
                key={row.vendor}
                transition={sceneTransition(reducedMotion, 0.06 + index * 0.07, active)}
              >
                <UiCheckbox
                  active={active}
                  checked={checked}
                  delay={0.12 + index * 0.06}
                  demoSpot={row.sure ? index + 1 : undefined}
                  reducedMotion={reducedMotion}
                />
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-md",
                    row.inbound ? "bg-secondary/15 text-secondary" : "bg-primary/8 text-primary",
                  )}
                >
                  {row.inbound ? <ArrowDownLeft className="size-3.5" /> : <ArrowUpRight className="size-3.5" />}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium leading-4">{row.vendor}</p>
                  <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{tx(row.detail)}</p>
                </div>
                <div className="text-right">
                  <p className={cn("text-[13px] leading-4 tabular-nums", row.inbound && "text-secondary")}>
                    {row.amount}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 text-[10px] tabular-nums text-muted-foreground",
                      showVat && row.sure && "text-foreground",
                      showVat && !row.sure && "text-secondary",
                    )}
                  >
                    {tx("VAT")} {tx(row.vat)}
                    <span className={cn("text-muted-foreground", !showVat && "opacity-0")}> · {tx(row.mydata)}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-border bg-muted/50 px-3 py-2">
          <span className="text-[11px] text-muted-foreground">
            {tx(auditReady ? "Source, VAT and myDATA filed together" : ready ? "1 line still needs a receipt" : "Waiting for the bank")}
          </span>
          <UiButton demoSpot={5} variant={ready ? "secondary" : "default"}>
            Approve
          </UiButton>
        </div>
      </div>
    </div>
  );
}
