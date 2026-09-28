import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AgentsSection } from "@/components/agents-section";
import { AgentsSectionLegacy } from "@/components/agents-section-legacy";

export const metadata: Metadata = {
  title: "Lab | KRS AI",
  description: "Section variants under review and retired blocks kept for reference.",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return (
    <div className="bg-[#FDF8F0]">
      <section className="border-b border-primary/12">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 md:py-20 lg:px-12">
          <p className="mono-label text-secondary">Lab</p>
          <h1 className="mt-5 max-w-4xl text-balance text-[54px] leading-[0.94] sm:text-7xl lg:text-[88px]">
            Compare section variants before they ship.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Each block below is the real section component. The homepage uses the mirrored fan; the others stay here
            so they can be compared or brought back.
          </p>
        </div>
      </section>

      <LabEntry
        description="Client inputs fan into the active service, and the KRS Platform hands one reviewed work list back."
        file="src/components/agents-section.tsx"
        label="Variant A / Work list panel"
        status="Alternative"
      >
        <AgentsSection id="agents-panel" workSide="panel" />
      </LabEntry>

      <LabEntry
        description="Same map, but every job KRS delivers gets its own wire, so both sides fan out from the platform."
        file="src/components/agents-section.tsx"
        label="Variant B / Mirrored fan"
        status="On homepage"
      >
        <AgentsSection id="agents-fan" workSide="fan" />
      </LabEntry>

      <LabEntry
        description="The previous agents block: work KRS handles, the People + AI connection card, and the client company inputs."
        file="src/components/agents-section-legacy.tsx"
        label="Legacy / Connection layer"
        status="Retired"
      >
        <AgentsSectionLegacy id="agents-legacy" />
      </LabEntry>
    </div>
  );
}

function LabEntry({
  children,
  description,
  file,
  label,
  status,
}: {
  children: ReactNode;
  description: string;
  file: string;
  label: string;
  status: string;
}) {
  return (
    <section className="border-b border-primary/12">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-12">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold leading-tight">{label}</h2>
            <span className="rounded-full border border-primary/16 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {status}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <code className="font-mono text-xs text-muted-foreground">{file}</code>
      </div>
      {children}
    </section>
  );
}
