"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

import { sceneTransition } from "@/components/services-bento/scene-motion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function SceneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none flex h-full min-h-0 flex-col overflow-hidden rounded-[var(--radius-xl)] bg-muted p-2",
        className,
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-xs">
        {children}
      </div>
    </div>
  );
}

export function SceneHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  const { tx } = useI18n();

  return (
    <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2.5">
      <div className="min-w-0">
        {subtitle ? <p className="text-[11px] leading-none text-muted-foreground">{tx(subtitle)}</p> : null}
        <p className={cn("truncate text-sm font-medium", subtitle && "mt-1")}>{tx(title)}</p>
      </div>
      {children}
    </div>
  );
}

export function UiBadge({
  children,
  variant = "outline",
  className,
  demoSpot,
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
  demoSpot?: number;
}) {
  const { tx } = useI18n();

  return (
    <Badge className={className} data-demo-spot={demoSpot} variant={variant}>
      {typeof children === "string" ? tx(children) : children}
    </Badge>
  );
}

export function UiButton({
  children,
  variant = "default",
  className,
  demoSpot,
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "ghost";
  className?: string;
  demoSpot?: number;
}) {
  const { tx } = useI18n();

  return (
    <span className={cn(buttonVariants({ variant, size: "xs" }), className)} data-demo-spot={demoSpot}>
      {typeof children === "string" ? tx(children) : children}
    </span>
  );
}

export function UiCheckbox({
  checked,
  reducedMotion,
  delay = 0,
  active,
  demoSpot,
}: {
  checked: boolean;
  reducedMotion: boolean;
  delay?: number;
  active: boolean;
  demoSpot?: number;
}) {
  return (
    <span
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-[4px] border",
        checked ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background",
      )}
      data-demo-spot={demoSpot}
    >
      <motion.span
        animate={{ opacity: checked ? 1 : 0, scale: checked ? 1 : 0.65 }}
        className="flex"
        initial={false}
        transition={sceneTransition(reducedMotion, delay, active)}
      >
        <Check className="size-2.5" strokeWidth={3} />
      </motion.span>
    </span>
  );
}

export function UiAvatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground",
        className,
      )}
    >
      {initials}
    </span>
  );
}
