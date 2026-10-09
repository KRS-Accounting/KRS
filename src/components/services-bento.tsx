"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useState, type ReactNode } from "react";

import { AccountingScene } from "@/components/services-bento/accounting-scene";
import { ConsultingScene } from "@/components/services-bento/consulting-scene";
import { FundingScene } from "@/components/services-bento/funding-scene";
import { SceneGhostCursor } from "@/components/services-bento/ghost-cursor";
import { PayrollScene } from "@/components/services-bento/payroll-scene";
import { sceneEase, type ServiceSceneProps } from "@/components/services-bento/scene-motion";
import { TaxAdvisoryScene } from "@/components/services-bento/tax-advisory-scene";
import { BentoSceneProvider, useHoverScene } from "@/components/services-bento/use-hover-scene";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

type ServiceCard = {
  id: string;
  title: string;
  text: string;
  href: string;
  span: string;
  minHeight: string;
  Scene: (props: ServiceSceneProps) => ReactNode;
};

const services: ServiceCard[] = [
  {
    id: "accounting",
    title: "Accounting",
    text: "From formation to monthly books, financial insight and closure stay in one operating file.",
    href: "/services/accounting",
    span: "md:col-span-2 lg:col-span-8",
    minHeight: "min-h-[400px] lg:min-h-[448px]",
    Scene: AccountingScene,
  },
  {
    id: "tax-advisory",
    title: "Tax Advisory",
    text: "Practical tax direction before a choice becomes a filing or missed opportunity.",
    href: "/services/tax-advisory",
    span: "lg:col-span-4",
    minHeight: "min-h-[340px] lg:min-h-[448px]",
    Scene: TaxAdvisoryScene,
  },
  {
    id: "payroll",
    title: "Payroll",
    text: "Payroll, EFKA checks and ERGANI notices stay connected to each employee record.",
    href: "/services/payroll",
    span: "lg:col-span-4",
    minHeight: "min-h-[320px] lg:min-h-[360px]",
    Scene: PayrollScene,
  },
  {
    id: "consulting",
    title: "Consulting",
    text: "Turn financial context and growth plans into a focused next action.",
    href: "/services/consulting",
    span: "lg:col-span-4",
    minHeight: "min-h-[320px] lg:min-h-[360px]",
    Scene: ConsultingScene,
  },
  {
    id: "funding",
    title: "Funding & Grants",
    text: "Find the relevant route, build a stronger case, and keep grant reporting visible.",
    href: "/services/funding-grants",
    span: "lg:col-span-4",
    minHeight: "min-h-[320px] lg:min-h-[360px]",
    Scene: FundingScene,
  },
];

export function ServicesBento({ className }: { className?: string } = {}) {
  return (
    <BentoSceneProvider>
      <div className={cn("krs-app mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12", className)}>
        {services.map((service, index) => (
          <ServiceBentoCard index={index} key={service.id} service={service} />
        ))}
      </div>
    </BentoSceneProvider>
  );
}

function ServiceBentoCard({
  service,
  index,
}: {
  service: ServiceCard;
  index: number;
}) {
  const { tx, href } = useI18n();
  const reduce = useReducedMotion();
  const {
    ref,
    active,
    featured,
    demoEnabled,
    canHover,
    reducedMotion,
    activate,
    deactivate,
    onBlur,
    onFocus,
    onPointerEnter,
    onPointerLeave,
  } = useHoverScene(service.id);
  const Scene = service.Scene;
  const [pointerInside, setPointerInside] = useState(false);
  const engage = useCallback(() => activate(service.id), [activate, service.id]);
  const release = useCallback(() => deactivate(service.id), [deactivate, service.id]);

  return (
    <motion.div
      className={cn(service.span, service.minHeight)}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : index * 0.06, ease: sceneEase }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
    >
      <Link
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-card text-card-foreground shadow-sm outline-none transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          active && "-translate-y-0.5 shadow-md",
        )}
        data-scene-active={active ? "true" : "false"}
        href={href(service.href)}
        onBlur={onBlur}
        onFocus={onFocus}
        onMouseEnter={onPointerEnter}
        onMouseLeave={onPointerLeave}
        onPointerEnter={() => {
          setPointerInside(true);
          onPointerEnter();
        }}
        onPointerLeave={() => {
          setPointerInside(false);
          onPointerLeave();
        }}
        ref={ref}
      >
        <div className="relative z-10 px-5 pt-5 pb-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-medium tracking-tight">{tx(service.title)}</h3>
            <ArrowRight
              className={cn(
                "mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1",
                active && "translate-x-1",
              )}
            />
          </div>
          <p className="mt-1.5 max-w-md text-sm leading-6 text-muted-foreground">{tx(service.text)}</p>
        </div>
        <div aria-hidden="true" className="relative min-h-0 flex-1 px-4 pb-4">
          <Scene active={active} reducedMotion={reducedMotion} />
        </div>
        {demoEnabled && featured && !(canHover && pointerInside) ? (
          <SceneGhostCursor onEngage={engage} onRelease={release} playing />
        ) : null}
      </Link>
    </motion.div>
  );
}
