"use client";

import Image from "next/image";
import { useMemo, type ReactNode } from "react";
import { CalendarClock, FileCheck2, Landmark } from "lucide-react";

import { ProcessTimeline, type ProcessStep } from "@/components/process-timeline";
import { Reveal, RevealFade } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const steps: ProcessStep[] = [
  {
    time: "Day 1",
    title: "Complete your intake",
    text: "Share the company details and provide access to the books so KRS can identify open returns and upcoming deadlines.",
    cta: "Talk to KRS",
  },
  {
    time: "Same week",
    title: "We review the open filings",
    text: "A tax advisor reviews the filing history, upcoming AADE deadlines and anything still outstanding.",
    cta: "Talk to KRS",
  },
  {
    time: "Before the next date",
    title: "We prepare the returns",
    text: "VAT, income tax and any EU reporting are drafted from the books. We ask only for what is still missing.",
    cta: "Talk to KRS",
  },
  {
    time: "After review",
    title: "We file after review",
    text: "Once the return has been reviewed and approved, KRS submits it to AADE and records the filing status.",
    cta: "Talk to KRS",
  },
  {
    time: "Through the year",
    title: "You stay ahead",
    text: "Future deadlines remain on the calendar, and the same advisor is available when a decision affects a return.",
    cta: "Talk to KRS",
  },
];

export function TaxProcessSection() {
  const { tx } = useI18n();
  const proofs = useMemo(
    () => [
      <IntakeProof key="intake" />,
      <ReviewProof key="review" />,
      <PrepareProof key="prepare" />,
      <FileProof key="file" />,
      <CurrentProof key="current" />,
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
              <Reveal>{tx("From intake to a filed return.")}</Reveal>
            </h2>
          </div>
          <RevealFade className="max-w-xl text-lg leading-8 text-muted-foreground" delay={0.1}>
            {tx("Five steps, one advisor. KRS reviews the open filings and protects the next AADE deadline while the tax file comes across.")}
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
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
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
    <ProofShell label="Intake" title="Company details received">
      <div className="mt-5 grid gap-2">
        {[
          ["Entity", "IKE · Athens"],
          ["Books access", "Granted"],
          ["Next return", "April VAT"],
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

function ReviewProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="Review" title="Your tax advisor">
      <div className="mt-5 flex items-center gap-4">
        <Image
          alt={tx("Alexis, tax advisor")}
          className="size-16 shrink-0 rounded-full object-cover"
          height={128}
          src="/images/krs-expert-tax-advisor.webp"
          width={128}
        />
        <div>
          <p className="text-lg font-semibold">Alexis</p>
          <p className="text-sm text-muted-foreground">{tx("Tax advisor")}</p>
          <Badge className="mt-2 rounded-full" variant="secondary">
            {tx("Direct access")}
          </Badge>
        </div>
      </div>
    </ProofShell>
  );
}

function PrepareProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="Preparation" title="Returns in draft">
      <div className="mt-5 grid gap-2">
        {[
          { title: "April VAT", status: "Draft" },
          { title: "E3 working papers", status: "In review" },
          { title: "Missing evidence", status: "1 item" },
        ].map((item) => (
          <div className="flex items-center justify-between border border-primary/12 bg-background px-3 py-2" key={item.title}>
            <span className="text-sm font-medium">{tx(item.title)}</span>
            <Badge className="rounded-full" variant={item.status === "1 item" ? "outline" : "secondary"}>
              {tx(item.status)}
            </Badge>
          </div>
        ))}
      </div>
    </ProofShell>
  );
}

function FileProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="Filing" title="Submitted to AADE">
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { label: "VAT", icon: Landmark },
          { label: "E3", icon: FileCheck2 },
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

function CurrentProof() {
  const { tx } = useI18n();

  return (
    <ProofShell label="Current" title="The year in view">
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ["April VAT", "Filed"],
          ["OSS", "On track"],
          ["Income tax", "Watched"],
          ["Advisor", "One message away"],
        ].map(([label, value]) => (
          <div className={cn("border border-primary/12 bg-background px-3 py-3")} key={label}>
            <p className="text-xs text-muted-foreground">{tx(label)}</p>
            <p className="mt-1 text-sm font-semibold">{tx(value)}</p>
          </div>
        ))}
      </div>
    </ProofShell>
  );
}
