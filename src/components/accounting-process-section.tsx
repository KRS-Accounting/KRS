"use client";

import Image from "next/image";
import { useMemo, type ReactNode } from "react";
import { BadgeCheck, Landmark, PanelsTopLeft } from "lucide-react";

import { ProcessTimeline, type ProcessStep } from "@/components/process-timeline";
import { Reveal, RevealFade } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const steps: ProcessStep[] = [
  {
    time: "Day 1",
    title: "Complete your intake",
    text: "Share company details and give KRS access to the current books so we can see where the work stands.",
    cta: "Talk to KRS",
  },
  {
    time: "Same week",
    title: "Meet your dedicated accountant",
    text: "You are matched with a Greece-based accountant who knows your industry, reachable from the first working day.",
    cta: "Talk to KRS",
  },
  {
    time: "During the switch",
    title: "We migrate your books",
    text: "KRS takes over the existing administration and closes open periods, so nothing drops during the handover.",
    cta: "Talk to KRS",
  },
  {
    time: "Once connected",
    title: "We connect your tools",
    text: "Bank feeds and working tools are connected so transactions flow in, get classified and wait for accountant review.",
    cta: "Talk to KRS",
  },
  {
    time: "Every month",
    title: "You are live and current",
    text: "Books close on time, reporting stays visible, and your accountant is one message away.",
    cta: "Talk to KRS",
  },
];

export function AccountingProcessSection() {
  const { tx } = useI18n();
  const proofs = useMemo(
    () => [
      <IntakeProof key="intake" />,
      <AccountantProof key="accountant" />,
      <HandoverProof key="handover" />,
      <ToolsProof key="tools" />,
      <LiveProof key="live" />,
    ],
    [],
  );

  return (
    <section className="relative overflow-hidden border-y border-primary/12 bg-muted/55 px-4 py-24 text-foreground sm:px-6 lg:px-12" id="process">
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-6 lg:grid-cols-[0.65fr_0.35fr] lg:items-end">
          <div>
            <p className="mono-label text-secondary">{tx("How it works")}</p>
            <h2 className="type-h3 mt-5 max-w-4xl text-balance">
              <Reveal>{tx("From intake to a current close.")}</Reveal>
            </h2>
          </div>
          <RevealFade className="max-w-xl text-lg leading-8 text-muted-foreground" delay={0.1}>
            {tx("Five steps, one owner. KRS handles the switch so the business keeps moving while the books come across.")}
          </RevealFade>
        </div>
        <ProcessTimeline proofs={proofs} steps={steps} />
      </div>
    </section>
  );
}

function ProofShell({
  label,
  title,
  children,
  className,
}: {
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const { tx } = useI18n();

  return (
    <div className={cn("p-5 sm:p-6", className)}>
      <p className="mono-label text-muted-foreground">{tx(label)}</p>
      <p className="font-heading mt-2 text-xl font-medium leading-tight">{tx(title)}</p>
      {children}
    </div>
  );
}

function IntakeProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="Intake" title="Company details received">
      <div className="mt-5 grid gap-2">
        {[
          ["Entity", "IKE · Athens"],
          ["Books access", "Granted"],
          ["Open period", "March 2026"],
        ].map(([label, value]) => (
          <div className="flex items-center justify-between border border-primary/12 bg-background px-3 py-2" key={label}>
            <span className="text-sm text-muted-foreground">{tx(label)}</span>
            <span className="text-sm font-medium">{tx(value)}</span>
          </div>
        ))}
      </div>
    </ProofShell>
  );
}

function AccountantProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="Match" title="Your accountant">
      <div className="mt-5 flex items-center gap-4">
        <Image
          alt={tx("Nikos, accounting advisor")}
          className="size-16 shrink-0 rounded-full object-cover"
          height={128}
          src="/images/krs-expert-accounting-advisor.webp"
          width={128}
        />
        <div>
          <p className="text-lg font-semibold">Nikos</p>
          <p className="text-sm text-muted-foreground">{tx("Accounting advisor")}</p>
          <Badge className="mt-2 rounded-full" variant="secondary">
            {tx("Direct access")}
          </Badge>
        </div>
      </div>
    </ProofShell>
  );
}

function HandoverProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="Handover" title="Open periods closing">
      <div className="mt-5 grid gap-2">
        {[
          { title: "Prior accountant pack", status: "Received" },
          { title: "March close", status: "In review" },
          { title: "Active deadlines", status: "Protected" },
        ].map((item) => (
          <div className="flex items-center justify-between border border-primary/12 bg-background px-3 py-2" key={item.title}>
            <span className="text-sm font-medium">{tx(item.title)}</span>
            <Badge className="rounded-full" variant={item.status === "Protected" ? "secondary" : "outline"}>
              {tx(item.status)}
            </Badge>
          </div>
        ))}
      </div>
    </ProofShell>
  );
}

function ToolsProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="Connections" title="Bank and tools live">
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Bank feed", icon: Landmark },
          { label: "Invoices", icon: PanelsTopLeft },
          { label: "myDATA", icon: BadgeCheck },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div className="border border-primary/12 bg-background px-3 py-4 text-center" key={item.label}>
              <Icon className="mx-auto size-5 text-secondary" />
              <p className="mt-2 text-sm font-medium">{tx(item.label)}</p>
            </div>
          );
        })}
      </div>
    </ProofShell>
  );
}

function LiveProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="Live" title="April close in view">
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ["Books", "Current"],
          ["VAT / myDATA", "On track"],
          ["P&L pack", "Ready"],
          ["Accountant", "One message away"],
        ].map(([label, value]) => (
          <div className="border border-primary/12 bg-background px-3 py-3" key={label}>
            <p className="text-xs text-muted-foreground">{tx(label)}</p>
            <p className="mt-1 text-sm font-semibold">{tx(value)}</p>
          </div>
        ))}
      </div>
    </ProofShell>
  );
}
