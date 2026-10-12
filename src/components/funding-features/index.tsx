"use client";

import { useState, type ReactNode } from "react";

import { FeatureDemoFrame, type FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { FundingAlertsScene } from "@/components/funding-features/alerts-scene";
import { FundingApplyScene } from "@/components/funding-features/apply-scene";
import { FundingMatchScene } from "@/components/funding-features/match-scene";
import { FundingProgrammesScene } from "@/components/funding-features/programmes-scene";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

type FeatureBlock = {
  id: string;
  label: string;
  title: string;
  body: string;
  items: readonly { id: string; title: string; text: string }[];
  reversed?: boolean;
  Scene: (props: FeatureSceneProps) => ReactNode;
};

const blocks: FeatureBlock[] = [
  {
    id: "programmes",
    label: "Programmes",
    title: "Greek and EU funding on one current watchlist",
    body: "KRS monitors national and EU programmes together, so relevant opportunities are identified without your team having to search multiple portals.",
    items: [
      {
        id: "espa",
        title: "NSRF (ESPA) and regional programmes",
        text: "Competitiveness, regional and sector-specific programmes are monitored as new calls are published.",
      },
      {
        id: "national",
        title: "Development Law and current national schemes",
        text: "Investment incentives and other active Greek funding routes stay on the same watchlist.",
      },
      {
        id: "eu",
        title: "Horizon Europe, EIC and other EU programmes",
        text: "Relevant Horizon Europe, EIC, Digital Europe, LIFE and Interreg opportunities are reviewed against the company and proposed project.",
      },
    ],
    Scene: FundingProgrammesScene,
  },
  {
    id: "match",
    label: "Match",
    title: "A focused shortlist before application work begins",
    body: "KRS compares the company and project with the published eligibility criteria. Potential matches are reviewed in detail before they reach your shortlist.",
    reversed: true,
    items: [
      {
        id: "profile",
        title: "Your funding profile is built once",
        text: "Legal form, sector, headcount, region and the spend you want to fund are kept on the file.",
      },
      {
        id: "score",
        title: "Each opportunity is screened against the criteria",
        text: "Eligibility, budget and timing decide the fit. It is not a keyword search of the call title.",
      },
      {
        id: "shortlist",
        title: "Only potential matches reach the shortlist",
        text: "A call that does not fit is marked and held. The shortlist is what you are asked to read.",
      },
    ],
    Scene: FundingMatchScene,
  },
  {
    id: "alerts",
    label: "Alerts",
    title: "Relevant opportunities reach you with time to act",
    body: "When a programme opens or a deadline changes, KRS reviews the opportunity against your funding profile and notifies you when it remains worth considering.",
    items: [
      {
        id: "open",
        title: "New calls reviewed as they are published",
        text: "New national and EU opportunities are screened against the company and proposed project.",
      },
      {
        id: "dates",
        title: "Deadline changes kept on the calendar",
        text: "When a deadline changes, the updated date stays with the same opportunity and application file.",
      },
      {
        id: "short",
        title: "Each alert explains the potential match",
        text: "The alert identifies the programme, why it may be relevant and when a decision is needed.",
      },
    ],
    Scene: FundingAlertsScene,
  },
  {
    id: "apply",
    label: "Application",
    title: "We prepare the application with you, then submit it",
    body: "KRS prepares the business case, budget and forms. You provide the required company information, documents and approval. The application is submitted once the complete pack has been reviewed.",
    reversed: true,
    items: [
      {
        id: "draft",
        title: "Built from the company and project file",
        text: "The business case, eligible costs and supporting records form the starting application pack.",
      },
      {
        id: "yours",
        title: "Your responsibilities are clear and dated",
        text: "Documents, decisions and signatures still needed from you are listed against the submission timetable.",
      },
      {
        id: "file",
        title: "Submitted after your approval",
        text: "You review and approve the final pack. KRS submits it and keeps the acknowledgement with the project file.",
      },
    ],
    Scene: FundingApplyScene,
  },
];

export function FundingFeatureShowcase() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-24 lg:gap-32">
        {blocks.map((block) => (
          <FeatureRow block={block} key={block.id} />
        ))}
      </div>
    </section>
  );
}

function FeatureRow({ block }: { block: FeatureBlock }) {
  const { tx } = useI18n();
  const [focus, setFocus] = useState(0);
  const defaultItem = block.items[0]?.id ?? "";

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={cn(block.reversed && "lg:order-2")}>
        <p className="mono-label text-secondary">{tx(block.label)}</p>
        <h2 className="mt-4 max-w-xl text-balance text-3xl font-normal leading-tight sm:text-4xl lg:text-5xl">
          <Reveal>{tx(block.title)}</Reveal>
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">{tx(block.body)}</p>
        <Accordion
          className="mt-8 border-t border-primary/14"
          defaultValue={defaultItem}
          onValueChange={(value) => {
            const next = block.items.findIndex((item) => item.id === value);
            if (next >= 0) setFocus(next);
          }}
          type="single"
        >
          {block.items.map((item, index) => (
            <AccordionItem className="border-primary/14" key={item.id} value={item.id}>
              <AccordionTrigger
                className="rounded-none py-5 text-left text-base font-semibold hover:no-underline"
                onMouseEnter={() => setFocus(index)}
              >
                {tx(item.title)}
              </AccordionTrigger>
              <AccordionContent className="max-w-xl pb-5 text-sm leading-7 text-muted-foreground">
                {tx(item.text)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <FeatureDemoFrame className={cn("min-h-[380px] lg:min-h-[440px]", block.reversed && "lg:order-1")} focus={focus}>
        {(props) => <block.Scene {...props} focus={focus} />}
      </FeatureDemoFrame>
    </div>
  );
}
