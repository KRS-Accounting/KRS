"use client";

import Image from "next/image";
import { useMemo, type ReactNode } from "react";
import { CalendarClock, FileCheck2, UsersRound } from "lucide-react";

import { ProcessTimeline, type ProcessStep } from "@/components/process-timeline";
import { Reveal, RevealFade } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/provider";

const steps: ProcessStep[] = [
  {
    time: "Day 1",
    title: "Complete your intake",
    text: "Share the company details and current headcount so KRS can confirm the next pay date and any pending hires.",
    cta: "Talk to KRS",
  },
  {
    time: "Same week",
    title: "We collect the payroll file",
    text: "Contracts, AFM and AMKA numbers, bank details and payroll history are collected before anything is calculated.",
    cta: "Talk to KRS",
  },
  {
    time: "Before the first run",
    title: "We set up your payroll",
    text: "If you are moving from another provider, the employee records come across and the next ERGANI and APD deadlines are mapped.",
    cta: "Talk to KRS",
  },
  {
    time: "Before payday",
    title: "We run the first payroll",
    text: "The run is reviewed and payslips are prepared. EFKA contributions and payroll tax are ready to file from the same numbers.",
    cta: "Talk to KRS",
  },
  {
    time: "Every month",
    title: "Payroll stays on track",
    text: "New hires, departures and changes in hours are handled during the month, and the same advisor is available when something changes.",
    cta: "Talk to KRS",
  },
];

export function PayrollProcessSection() {
  const { tx } = useI18n();
  const proofs = useMemo(
    () => [
      <IntakeProof key="intake" />,
      <CollectProof key="collect" />,
      <MigrateProof key="migrate" />,
      <RunProof key="run" />,
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
              <Reveal>{tx("From intake to payday.")}</Reveal>
            </h2>
          </div>
          <RevealFade className="max-w-xl text-lg leading-8 text-muted-foreground" delay={0.1}>
            {tx("Five steps, one advisor. KRS sets up the employee records and protects the next pay date while payroll moves across.")}
          </RevealFade>
        </div>
        <ProcessTimeline proofs={proofs} steps={steps} />
      </div>
    </section>
  );
}

function ProofShell({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  const { tx } = useI18n();

  return (
    <div className="p-5 sm:p-6">
      <p className="mono-label text-muted-foreground">{tx(label)}</p>
      <p className="font-heading mt-2 text-xl font-medium leading-tight">{tx(title)}</p>
      {children}
    </div>
  );
}

function IntakeProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="Intake" title="Team details received">
      <div className="mt-5 grid gap-2">
        {[
          ["Entity", "IKE · Athens"],
          ["Headcount", "12"],
          ["Next payday", "30 April"],
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

function CollectProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="File" title="Your payroll advisor">
      <div className="mt-5 flex items-center gap-4">
        <Image
          alt={tx("Elena, payroll advisor")}
          className="size-16 shrink-0 rounded-full object-cover"
          height={128}
          src="/images/krs-expert-payroll-advisor.webp"
          width={128}
        />
        <div>
          <p className="text-lg font-semibold">Elena</p>
          <p className="text-sm text-muted-foreground">{tx("Payroll advisor")}</p>
          <Badge className="mt-2 rounded-full" variant="secondary">
            {tx("Direct access")}
          </Badge>
        </div>
      </div>
    </ProofShell>
  );
}

function MigrateProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="Setup" title="Records coming across">
      <div className="mt-5 grid gap-2">
        {[
          { title: "Prior payroll pack", status: "Received" },
          { title: "ERGANI access", status: "Granted" },
          { title: "Open hire", status: "1 person" },
        ].map((item) => (
          <div className="flex items-center justify-between border border-primary/12 bg-background px-3 py-2" key={item.title}>
            <span className="text-sm font-medium">{tx(item.title)}</span>
            <Badge className="rounded-full" variant={item.status === "1 person" ? "outline" : "secondary"}>
              {tx(item.status)}
            </Badge>
          </div>
        ))}
      </div>
    </ProofShell>
  );
}

function RunProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="First run" title="April payroll prepared">
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Payslips", icon: UsersRound },
          { label: "APD", icon: FileCheck2 },
          { label: "Calendar", icon: CalendarClock },
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
    <ProofShell label="Current" title="The month in view">
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ["April payroll", "Ready"],
          ["ERGANI", "Filed"],
          ["APD", "On track"],
          ["Advisor", "One message away"],
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
