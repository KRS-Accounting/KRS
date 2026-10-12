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
    title: "Share the company and project",
    text: "Tell us about the company, the proposed investment and the costs you want to fund.",
    cta: "Talk to KRS",
  },
  {
    time: "Same week",
    title: "We build the funding profile",
    text: "Legal form, sector, region, company size, planned costs and timing are recorded before opportunities are screened.",
    cta: "Talk to KRS",
  },
  {
    time: "As calls open",
    title: "We review potential matches",
    text: "Current national and EU opportunities are compared with the profile and shortlisted for detailed review.",
    cta: "Talk to KRS",
  },
  {
    time: "Once you choose a call",
    title: "We prepare the selected application",
    text: "KRS drafts the business case, budget and forms. You provide the required documents, decisions and approvals.",
    cta: "Talk to KRS",
  },
  {
    time: "After your approval",
    title: "We submit after approval",
    text: "Once you approve the complete application, KRS submits it and records the acknowledgement. If awarded, the next obligations are added to the project calendar.",
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
              <Reveal>{tx("From funding profile to submitted application.")}</Reveal>
            </h2>
          </div>
          <RevealFade className="max-w-xl text-lg leading-8 text-muted-foreground" delay={0.1}>
            {tx("Five steps, one file. KRS screens current opportunities and prepares the selected application with you before submission.")}
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
    <ProofShell label="Intake" title="Project details received">
      <div className="mt-5 grid gap-2">
        {[
          ["Entity", "Software IKE"],
          ["Region", "Attica"],
          ["Project", "Product development"],
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

function ProfileProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="File" title="Your funding advisor">
      <div className="mt-5 flex items-center gap-4">
        <Image
          alt={tx("KRS funding advisor")}
          className="size-16 shrink-0 rounded-full object-cover"
          height={128}
          src="/images/krs-funding-advisor.png"
          width={128}
        />
        <div>
          <p className="text-lg font-semibold">{tx("KRS funding")}</p>
          <p className="text-sm text-muted-foreground">{tx("Application advisor")}</p>
          <Badge className="mt-2 rounded-full" variant="secondary">
            {tx("Direct access")}
          </Badge>
        </div>
      </div>
    </ProofShell>
  );
}

function MatchProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="Match" title="Calls compared with the file">
      <div className="mt-5 grid gap-2">
        {[
          { title: "ESPA competitiveness", status: "Potential match" },
          { title: "EIC Accelerator", status: "Potential match" },
          { title: "Horizon Europe cluster", status: "Review" },
        ].map((item) => (
          <div className="flex items-center justify-between border border-primary/12 bg-background px-3 py-2" key={item.title}>
            <span className="text-sm font-medium">{tx(item.title)}</span>
            <Badge className="rounded-full" variant={item.status === "Review" ? "outline" : "secondary"}>
              {tx(item.status)}
            </Badge>
          </div>
        ))}
      </div>
    </ProofShell>
  );
}

function ApplyProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="Application" title="Pack prepared with you">
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Match", icon: ScanSearch },
          { label: "Alerts", icon: Bell },
          { label: "Submission", icon: FileCheck2 },
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
    <ProofShell label="Current" title="The open calls in view">
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ["ESPA", "Potential match"],
          ["EIC Accelerator", "Deadline watched"],
          ["Your documents", "2 still needed"],
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
