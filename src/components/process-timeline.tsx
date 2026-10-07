"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  FileCheck2,
  MessageSquareText,
} from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export type ProcessStep = {
  time: string;
  title: string;
  text: string;
  cta: string;
};

type ProcessTimelineProps = {
  steps: ProcessStep[];
  proofs?: ReactNode[];
};

const timelineIcons = [BadgeCheck, CalendarClock, FileCheck2, MessageSquareText];

const onboardingSteps = [
  { number: "01", label: "Contract & signature", position: "top" },
  { number: "02", label: "Authority registration", position: "bottom" },
  { number: "03", label: "Operating file setup", position: "top" },
  { number: "04", label: "Advisor takeover", position: "bottom" },
  { number: "05", label: "Initial accounting", position: "top" },
];

const monthlyNotifications = [
  {
    icon: CalendarClock,
    title: "Monthly obligations list prepared",
    text: "VAT, payroll, and myDATA actions are sorted by owner and deadline.",
    status: "Ready",
    time: "09:12",
    accent: true,
  },
  {
    icon: FileCheck2,
    title: "Monthly P&L is ready",
    text: "Revenue, expenses, and exceptions are packaged for advisor review.",
    status: "Review",
    time: "11:40",
  },
];

const annualFolders = [
  {
    title: "Tax return",
    meta: "Income tax / E3",
    status: "Ready",
    accent: true,
  },
  {
    title: "Statements",
    meta: "Balance sheet / P&L",
    status: "Drafted",
  },
  {
    title: "Obligations",
    meta: "VAT / payroll / fees",
    status: "Matched",
  },
];

const personalExperts = [
  {
    name: "Alexis",
    role: "Tax Advisor",
    image: "/images/krs-expert-tax-advisor.webp",
  },
  {
    name: "Maria",
    role: "Payroll Specialist",
    image: "/images/krs-expert-payroll-advisor.webp",
  },
  {
    name: "Nikos",
    role: "Accounting Advisor",
    image: "/images/krs-expert-accounting-advisor.webp",
  },
];

function TimelineDot({ active, index }: { active: boolean; index: number }) {
  return (
    <div className="relative flex size-12 items-center justify-center">
      <span
        className={cn(
          "absolute size-12 rounded-full border transition-colors duration-500",
          active ? "border-secondary bg-secondary/18" : "border-primary/16 bg-muted"
        )}
      />
      <span
        className={cn(
          "relative flex size-7 items-center justify-center rounded-full font-mono text-[0.65rem] transition-all duration-500",
          active ? "scale-100 bg-secondary text-secondary-foreground" : "scale-90 bg-primary/10 text-primary/58"
        )}
      >
        0{index + 1}
      </span>
    </div>
  );
}

function TimelineCard({
  step,
  active,
  index,
}: {
  step: ProcessStep;
  active: boolean;
  index: number;
}) {
  const { tx, href } = useI18n();

  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.74, y: active ? 0 : 10 }}
      className="w-full max-w-md lg:ml-auto lg:text-right"
      initial={false}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div
        className={cn(
          "w-full border border-primary/12 bg-card p-6 text-foreground shadow-[var(--shadow-sm)] transition-colors duration-500 sm:p-7",
          active && "border-secondary/50 bg-background"
        )}
      >
        <div className="flex items-center justify-between gap-4 lg:flex-row-reverse">
          <Badge
            className={cn(
              "rounded-full border-transparent",
              active ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
            )}
            variant="secondary"
          >
            {tx(step.time)}
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">T+0{index}</span>
        </div>
        <h3 className="mt-6 text-2xl font-semibold leading-tight">{tx(step.title)}</h3>
        <p className="mt-4 leading-7 text-muted-foreground">{tx(step.text)}</p>
        <a
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary lg:justify-end"
          href={href("/onboarding")}
        >
          {tx(step.cta)}
          <ArrowRight className="size-4" />
        </a>
      </div>
    </motion.div>
  );
}

function TimelineProofPanel({
  active,
  step,
  index,
}: {
  active: boolean;
  step: ProcessStep;
  index: number;
}) {
  const Icon = timelineIcons[index % timelineIcons.length] ?? BadgeCheck;
  const bars = [
    [42, 66, 82],
    [58, 76, 64],
    [48, 72, 90],
    [70, 54, 84],
  ][index] ?? [48, 72, 90];
  const isOnboarding = index === 0;
  const isMonthly = index === 1;
  const isAnnual = index === 2;
  const isExperts = index === 3;
  const { tx } = useI18n();

  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.74, y: active ? 0 : 10 }}
      className={cn("w-full", isOnboarding ? "max-w-2xl" : isMonthly || isAnnual || isExperts ? "max-w-xl" : "max-w-md")}
      initial={false}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div
        className={cn(
          "border border-primary/12 bg-card shadow-[var(--shadow-sm)] transition duration-500",
          active ? "border-secondary/45 opacity-100" : "opacity-70"
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-card text-foreground",
            isOnboarding ? "px-8 py-5 sm:px-10" : isMonthly || isAnnual ? "p-5 sm:p-6" : isExperts ? "min-h-72" : "min-h-72 p-6"
          )}
        >
          {isOnboarding || isMonthly || isAnnual || isExperts ? null : (
            <div className="relative flex items-start justify-between">
              <div>
                <p className="mono-label text-muted-foreground">{tx("Workflow evidence")}</p>
                <p className="font-heading mt-3 max-w-52 text-balance text-2xl font-medium leading-tight">
                  {tx(step.title)}
                </p>
              </div>
              <span className="flex size-12 items-center justify-center border border-primary/12 bg-muted">
                <Icon className="size-6 text-secondary" />
              </span>
            </div>
          )}

          {isOnboarding ? (
            <OnboardingEvidencePath />
          ) : isMonthly ? (
            <MonthlyNotificationsPanel />
          ) : isAnnual ? (
            <AnnualFoldersPanel />
          ) : isExperts ? (
            <PersonalExpertsPanel />
          ) : (
            <div className="relative mt-12 grid grid-cols-[0.7fr_1.3fr] gap-5">
              <div className="space-y-3">
                {[0, 1, 2].map((item) => (
                  <div className="h-9 border border-primary/12 bg-muted" key={item}>
                    <div
                      className={cn("h-full bg-secondary/70", item === 1 ? "w-2/3" : item === 2 ? "w-5/6" : "w-1/2")}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-end gap-3 border-l border-primary/12 pl-5">
                {bars.map((height, item) => (
                  <div className="flex flex-1 flex-col items-center gap-3" key={`${height}-${item}`}>
                    <span className={cn("w-full bg-primary/20", item === 1 && "bg-secondary")} style={{ height }} />
                    <span className="h-1 w-full bg-primary/12" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {isOnboarding || isMonthly || isAnnual || isExperts ? null : (
            <div className="relative mt-8 flex items-center justify-between border-t border-primary/12 pt-4">
              <p className="font-mono text-xs text-muted-foreground">Reviewed by KRS</p>
              <span className={cn("size-2 rounded-full", active ? "bg-secondary" : "bg-muted-foreground/34")} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PersonalExpertsPanel() {
  const { tx } = useI18n();

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_8%_8%,rgba(244,239,230,0.92),rgba(174,136,47,0.28)_34%,rgba(1,25,54,0.32)_100%)] p-4 shadow-[var(--shadow-md)] sm:p-5">
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(90deg,rgba(244,239,230,0.16)_1px,transparent_1px),linear-gradient(0deg,rgba(244,239,230,0.14)_1px,transparent_1px)] [background-size:12px_12px]" />
      <div className="relative bg-background px-5 py-5 shadow-[0_18px_50px_-36px_rgba(1,25,54,0.58)] sm:px-6">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">{tx("Personal experts")}</p>
        <p className="font-heading mt-1 text-xl font-medium leading-tight text-foreground sm:text-2xl">{tx("Your KRS team is here")}</p>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {tx("Ask anything and get quick help from real advisors who know your file.")}
        </p>

        <div className="mt-6 grid gap-6 text-center sm:grid-cols-3 sm:gap-4">
          {personalExperts.map((expert) => (
            <div className="min-w-0 text-center" key={expert.name}>
              <div className="relative mx-auto size-24 sm:size-28">
                <Image
                  alt={`${expert.name}, ${tx(expert.role)}`}
                  className="size-full rounded-full border border-primary/10 object-cover shadow-[var(--shadow-sm)]"
                  height={224}
                  src={expert.image}
                  width={224}
                />
                <span className="absolute -right-1 top-2 flex size-8 items-center justify-center rounded-full border-2 border-background bg-secondary text-secondary-foreground shadow-[var(--shadow-xs)]">
                  <BadgeCheck className="size-5" strokeWidth={2.2} />
                </span>
              </div>
              <p className="mt-4 text-lg font-semibold leading-6 text-foreground">{expert.name}</p>
              <p className="mt-1 text-sm leading-5 text-muted-foreground">{tx(expert.role)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnnualFoldersPanel() {
  const { tx } = useI18n();

  return (
    <div className="relative overflow-hidden border border-primary/12 bg-background p-4 shadow-[var(--shadow-xs)]">
      <div className="flex items-center justify-between border-b border-primary/12 pb-3">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">{tx("Company file")}</p>
          <p className="font-heading mt-1 text-xl leading-none text-foreground">{tx("Annual package")}</p>
        </div>
        <span className="border border-secondary/40 bg-secondary/12 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-secondary">
          2026
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {annualFolders.map((folder) => (
          <div
            className={cn(
              "relative min-h-28 border p-3",
              folder.accent ? "border-secondary/55 bg-card" : "border-primary/12 bg-muted/38"
            )}
            key={folder.title}
          >
            <span
              className={cn(
                "absolute -top-px left-3 h-2.5 w-14 border border-b-0",
                folder.accent ? "border-secondary/55 bg-card" : "border-primary/12 bg-muted"
              )}
            />
            <div className="mt-2 h-10 border border-primary/10 bg-background/70">
              <div className={cn("h-full bg-secondary/58", folder.accent ? "w-2/3" : "w-1/2")} />
            </div>
            <p className="mt-3 text-sm font-semibold leading-5 text-foreground">{tx(folder.title)}</p>
            <p className="mt-1 text-[0.68rem] leading-4 text-muted-foreground">{tx(folder.meta)}</p>
            <span
              className={cn(
                "mt-3 inline-flex border px-2 py-1 font-mono text-[0.58rem] uppercase leading-none tracking-[0.14em]",
                folder.accent
                  ? "border-secondary/40 bg-secondary/12 text-secondary"
                  : "border-primary/12 bg-card text-muted-foreground"
              )}
            >
              {tx(folder.status)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-4 border-t border-primary/12 pt-3">
        <div className="grid grid-cols-3 gap-1.5">
          <span className="h-1.5 bg-secondary" />
          <span className="h-1.5 bg-secondary/70" />
          <span className="h-1.5 bg-primary/16" />
        </div>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">{tx("3 folders")}</span>
      </div>
    </div>
  );
}

function MonthlyNotificationsPanel() {
  const { tx } = useI18n();

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent,rgba(174,136,47,0.08)_46%,transparent_76%)]" />
      <div className="relative space-y-3">
        {monthlyNotifications.map((notification, index) => {
          const Icon = notification.icon;

          return (
            <div
              className={cn(
                "grid grid-cols-[auto_1fr] gap-3 border p-4 shadow-[var(--shadow-xs)]",
                notification.accent ? "border-secondary/55 bg-background" : "border-primary/12 bg-card/80"
              )}
              key={notification.title}
            >
              <span
                className={cn(
                  "flex size-10 items-center justify-center border",
                  notification.accent
                    ? "border-secondary/45 bg-secondary text-secondary-foreground"
                    : "border-primary/12 bg-muted text-primary"
                )}
              >
                <Icon className="size-5" />
              </span>

              <div className="min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold leading-5 text-foreground">{tx(notification.title)}</p>
                    <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">{tx(notification.text)}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono text-[0.65rem] text-muted-foreground">{notification.time}</p>
                    <span
                      className={cn(
                        "mt-2 inline-flex border px-2 py-1 font-mono text-[0.6rem] uppercase leading-none tracking-[0.16em]",
                        notification.accent
                          ? "border-secondary/40 bg-secondary/12 text-secondary"
                          : "border-primary/12 bg-muted text-muted-foreground"
                      )}
                    >
                      {tx(notification.status)}
                    </span>
                  </div>
                </div>

                {index === 0 ? (
                  <div className="mt-4 grid grid-cols-3 divide-x divide-primary/12 border border-primary/12">
                    {["VAT", "Payroll", "myDATA"].map((item) => (
                      <span className="px-2 py-2 text-center font-mono text-[0.62rem] text-primary/68" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OnboardingEvidencePath() {
  const { tx } = useI18n();

  return (
    <div className="relative overflow-hidden py-1">
      <div className="relative hidden min-h-56 md:block">
        <div className="absolute left-[4%] right-[4%] top-1/2 h-px -translate-y-1/2 bg-primary/24" />
        <div className="absolute left-[4%] top-1/2 h-px w-8 -translate-x-3 -translate-y-1/2 border-t border-dashed border-primary/24" />
        <div className="absolute right-[4%] top-1/2 h-px w-8 translate-x-3 -translate-y-1/2 border-t border-dashed border-primary/24" />

        {onboardingSteps.map((item, index) => {
          const isTop = item.position === "top";
          const left = `${4 + index * 23}%`;

          return (
            <div className="absolute top-1/2" key={item.number} style={{ left }}>
              <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/12 bg-background shadow-[0_0_0_4px_var(--card)]" />
              <span
                className={cn(
                  "absolute left-1/2 w-px -translate-x-1/2 bg-primary/18",
                  isTop ? "bottom-0 h-7" : "top-0 h-7"
                )}
              />
              <div
                className={cn(
                  "absolute w-32 border bg-card p-3 shadow-[var(--shadow-xs)]",
                  index === 0 ? "border-secondary/60" : "border-primary/16",
                  isTop ? "bottom-7" : "top-7",
                  index === 4 ? "-translate-x-full" : index === 0 ? "" : "-translate-x-1/2"
                )}
              >
                <p className={cn("font-heading text-2xl leading-none", index === 0 ? "text-secondary" : "text-primary/70")}>
                  {item.number}
                </p>
                <p className="mt-1.5 text-xs font-semibold leading-4 text-foreground">{tx(item.label)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-2 md:hidden">
        {onboardingSteps.map((item, index) => (
          <div
            className={cn(
              "grid grid-cols-[auto_1fr] gap-2 border p-2.5",
              index === 0 ? "border-secondary/60 bg-background" : "border-primary/12 bg-card"
            )}
            key={item.number}
          >
            <span className="font-heading text-xl leading-none text-secondary">{item.number}</span>
            <span className="text-xs font-semibold leading-4">{tx(item.label)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProcessTimeline({ steps, proofs }: ProcessTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.3"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const handleVisible = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="relative mt-16" ref={containerRef}>
      <div className="absolute bottom-0 left-6 top-0 w-px bg-primary/14 lg:left-[44%] lg:-translate-x-1/2" />
      <motion.div
        className="absolute left-6 top-0 w-px origin-top bg-secondary lg:left-[44%] lg:-translate-x-1/2"
        style={{ height: progressHeight }}
      />

      <div className="space-y-10 lg:space-y-0">
        {steps.map((step, index) => (
          <TimelineRow
            active={activeIndex === index}
            index={index}
            key={step.title}
            onVisible={handleVisible}
            proof={proofs?.[index]}
            step={step}
          />
        ))}
      </div>
    </div>
  );
}

function TimelineRow({
  step,
  index,
  active,
  onVisible,
  proof,
}: {
  step: ProcessStep;
  index: number;
  active: boolean;
  onVisible: (index: number) => void;
  proof?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible(index);
        }
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [index, onVisible]);

  return (
    <div
      className={cn(
        "relative grid grid-cols-[auto_1fr] gap-x-6 gap-y-0 lg:grid-cols-[minmax(260px,0.86fr)_auto_minmax(520px,1.14fr)] lg:items-center lg:gap-x-10 lg:py-16",
        index === 0 && "lg:pt-0"
      )}
      ref={ref}
    >
      <div className="relative z-10 flex justify-center lg:col-start-2 lg:row-start-1">
        <TimelineDot active={active} index={index} />
      </div>

      <div className="col-start-2 min-w-0 lg:col-start-1 lg:row-start-1 lg:justify-self-end">
        <TimelineCard active={active} index={index} step={step} />
      </div>

      <div className="col-start-2 mt-4 w-full min-w-0 lg:col-start-3 lg:row-start-1 lg:mt-0 lg:justify-self-start">
        {proof ? (
          <motion.div
            animate={{ opacity: active ? 1 : 0.74, y: active ? 0 : 10 }}
            className="w-full max-w-xl"
            initial={false}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div
              className={cn(
                "border border-primary/12 bg-card shadow-[var(--shadow-sm)] transition duration-500",
                active ? "border-secondary/45 opacity-100" : "opacity-70",
              )}
            >
              {proof}
            </div>
          </motion.div>
        ) : (
          <TimelineProofPanel active={active} index={index} step={step} />
        )}
      </div>
    </div>
  );
}
