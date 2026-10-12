"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneFrame, SceneHeader, UiBadge } from "@/components/services-bento/scene-ui";
import { useI18n } from "@/i18n/provider";

const lines = [
  { label: "Client revenue", value: "+€5,380.00", matched: true },
  { label: "Subscriptions", value: "-€4,260.00", matched: true },
  { label: "Office and rent", value: "-€2,860.00", matched: false },
];

export function AccountingHeroVisual() {
  const { tx } = useI18n();
  const reduce = Boolean(useReducedMotion());
  const [animatedReady, setAnimatedReady] = useState(false);

  useEffect(() => {
    if (reduce) return;

    const timer = window.setTimeout(() => setAnimatedReady(true), 280);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  const ready = reduce || animatedReady;

  return (
    <SceneFrame className="h-full bg-background/80 p-1.5 shadow-[var(--shadow-lg)]">
      <SceneHeader subtitle="Balance · April 2026" title="€63,515.72">
        <UiBadge variant={ready ? "secondary" : "outline"}>{ready ? "Reconciled" : "Syncing"}</UiBadge>
      </SceneHeader>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-1.5 p-3">
        {lines.map((line, index) => (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between gap-3 rounded-[var(--radius-lg)] px-2 py-1.5"
            initial={reduce ? false : { opacity: 0, x: 12 }}
            key={line.label}
            transition={sceneTransition(reduce, 0.08 + index * 0.1, ready)}
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className={
                  ready && line.matched
                    ? "size-1.5 rounded-full bg-secondary"
                    : "size-1.5 rounded-full bg-muted-foreground/35"
                }
              />
              <p className="truncate text-[12px] font-medium">{tx(line.label)}</p>
            </div>
            <p className="text-[12px] tabular-nums text-muted-foreground">{line.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="border-t border-border px-3 py-2">
        <p className="text-[11px] text-muted-foreground">
          {tx(ready ? "48 transactions matched" : "Matching in progress")}
        </p>
      </div>
    </SceneFrame>
  );
}
