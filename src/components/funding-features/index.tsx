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
    title: "Greek and EU funding, on one watchlist",
    body: "National schemes and Commission programmes are watched together, so a relevant call is not left in a portal you do not open.",
    items: [
      {
        id: "espa",
        title: "ESPA and the regional calls",
        text: "Partnership Agreement programmes, competitiveness calls and regional operational programmes, as each one opens.",
      },
      {
        id: "national",
        title: "Development Law, Greece 2.0 and other Greek routes",
        text: "Investment aid, recovery funding and other national grant and loan schemes sit on the same list.",
      },
      {
        id: "eu",
        title: "Horizon Europe, the EIC and the rest of the EU map",
        text: "Pathfinder, Transition, Accelerator and wider Horizon calls, plus Digital Europe, LIFE, Interreg and other Commission programmes.",
      },
    ],
    Scene: FundingProgrammesScene,
  },
  {
    id: "match",
    label: "Match",
    title: "Your company matched to the calls that fit",
    body: "Activity, size, region and the project you want to fund are compared with each call. A weak fit does not become homework.",
    reversed: true,
    items: [
      {
        id: "profile",
        title: "The company is profiled once",
        text: "Legal form, sector, headcount, region and the spend you want to fund are kept on the file.",
      },
      {
        id: "score",
        title: "Each call is scored against that profile",
        text: "Eligibility, budget and timing decide the fit. It is not a keyword search of the call title.",
      },
      {
        id: "shortlist",
        title: "Only the useful routes stay on the list",
        text: "A call that does not fit is marked and held. The short list is what you are asked to read.",
      },
    ],
    Scene: FundingMatchScene,
  },
  {
    id: "alerts",
    label: "Alerts",
    title: "New calls reach you before the deadline",
    body: "When a programme opens or a date moves, the match is updated and you are notified. You do not have to watch the portals.",
    items: [
      {
        id: "open",
        title: "Opening calls are checked as they are published",
        text: "A new ESPA, national or EU call is compared with the company file when it appears.",
      },
      {
        id: "dates",
        title: "Deadline changes stay on the calendar",
        text: "A moved cut-off is updated on the same file as the application, not left in an old email.",
      },
      {
        id: "short",
        title: "You hear about the calls that still fit",
        text: "The alert names the programme, why it matches, and the date you need to act.",
      },
    ],
    Scene: FundingAlertsScene,
  },
  {
    id: "apply",
    label: "Application",
    title: "We apply with you, then file it",
    body: "KRS drafts the case, the budget and the forms. You supply the company facts and sign off. The application goes in once that pack is complete.",
    reversed: true,
    items: [
      {
        id: "draft",
        title: "Drafted from the company file",
        text: "The narrative, the costs and the records already on file are the starting pack.",
      },
      {
        id: "yours",
        title: "Your part is named, with a date",
        text: "Documents, decisions and signatures still needed from you are listed before the deadline.",
      },
      {
        id: "file",
        title: "Submitted after your approval",
        text: "You review the pack. KRS files it and keeps the acknowledgement on the project.",
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
