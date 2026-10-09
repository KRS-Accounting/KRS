"use client";

import Image from "next/image";
import { useMemo, type ReactNode } from "react";
import { Bell, FileCheck2, ScanSearch } from "lucide-react";

import { ProcessTimeline, type ProcessStep } from "@/components/process-timeline";
import { Reveal, RevealFade } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/provider";

const steps: ProcessStep[] = [
  {
    time: "Day 1",
    title: "Complete your intake",
    text: "Share the company and the project you want to fund, so we can see which Greek and EU routes are worth checking.",
    cta: "Talk to KRS",
  },
  {
    time: "Same week",
    title: "We build the funding profile",
    text: "Legal form, sector, region, headcount and the planned spend go on the file before any call is scored.",
    cta: "Talk to KRS",
  },
  {
    time: "As calls open",
    title: "Matches and alerts start",
    text: "ESPA, national schemes, Horizon Europe, the EIC and other EU programmes are compared with that profile.",
    cta: "Talk to KRS",
  },
  {
    time: "When a call fits",
    title: "We prepare the application with you",
    text: "KRS drafts the case and the budget. You provide the documents and the approval the call still needs.",
    cta: "Talk to KRS",
  },
  {
    time: "On the deadline",
    title: "We file, then keep the project current",
    text: "The application is submitted after your sign-off. Reporting dates stay on the same file if it is awarded.",
    cta: "Talk to KRS",
  },
];

export function FundingProcessSection() {
  const { tx } = useI18n();
  const proofs = useMemo(
    () => [
      <IntakeProof key="intake" />,
      <ProfileProof key="profile" />,
      <MatchProof key="match" />,
      <ApplyProof key="apply" />,
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
              <Reveal>{tx("From company profile to filed application.")}</Reveal>
            </h2>
          </div>
          <RevealFade className="max-w-xl text-lg leading-8 text-muted-foreground" delay={0.1}>
            {tx("Five steps, one file. KRS matches the calls and prepares the application with you before the deadline.")}
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
  return (
    <ProofShell label="Intake" title="Project details received">
      <div className="mt-5 grid gap-2">
        {[
          ["Entity", "Software IKE"],
          ["Region", "Attica"],
          ["Project", "Product development"],
        ].map(([label, value]) => (
          <div className="flex items-center justify-between border border-primary/12 bg-background px-3 py-2" key={label}>
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-medium">{value}</span>
          </div>
        ))}
      </div>
    </ProofShell>
  );
}

function ProfileProof() {
  return (
    <ProofShell label="File" title="Your funding advisor">
      <div className="mt-5 flex items-center gap-4">
        <Image
          alt="KRS funding advisor"
          className="size-16 shrink-0 rounded-full object-cover"
          height={128}
          src="/images/krs-funding-advisor.png"
          width={128}
        />
        <div>
          <p className="text-lg font-semibold">KRS funding</p>
          <p className="text-sm text-muted-foreground">Application advisor</p>
          <Badge className="mt-2 rounded-full" variant="secondary">
            Direct access
          </Badge>
        </div>
      </div>
    </ProofShell>
  );
}

function MatchProof() {
  return (
    <ProofShell label="Match" title="Calls compared with the file">
      <div className="mt-5 grid gap-2">
        {[
          { title: "ESPA competitiveness", status: "Fit" },
          { title: "EIC Accelerator", status: "Fit" },
          { title: "Horizon Europe cluster", status: "Review" },
        ].map((item) => (
          <div className="flex items-center justify-between border border-primary/12 bg-background px-3 py-2" key={item.title}>
            <span className="text-sm font-medium">{item.title}</span>
            <Badge className="rounded-full" variant={item.status === "Review" ? "outline" : "secondary"}>
              {item.status}
            </Badge>
          </div>
        ))}
      </div>
    </ProofShell>
  );
}

function ApplyProof() {
  return (
    <ProofShell label="Application" title="Pack prepared with you">
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Match", icon: ScanSearch },
          { label: "Alerts", icon: Bell },
          { label: "Filing", icon: FileCheck2 },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div className="border border-primary/12 bg-background px-3 py-4 text-center" key={item.label}>
              <Icon className="mx-auto size-5 text-secondary" />
              <p className="mt-2 text-sm font-medium">{item.label}</p>
            </div>
          );
        })}
      </div>
    </ProofShell>
  );
}

function LiveProof() {
  return (
    <ProofShell label="Current" title="The open calls in view">
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ["ESPA", "Fit"],
          ["EIC Accelerator", "Deadline watched"],
          ["Your documents", "2 still needed"],
          ["Advisor", "One message away"],
        ].map(([label, value]) => (
          <div className="border border-primary/12 bg-background px-3 py-3" key={label}>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-sm font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </ProofShell>
  );
}
