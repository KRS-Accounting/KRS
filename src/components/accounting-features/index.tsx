"use client";

import { useState, type ReactNode } from "react";

import { AccuracyScene } from "@/components/accounting-features/accuracy-scene";
import { AutomationScene } from "@/components/accounting-features/automation-scene";
import { FeatureDemoFrame, type FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { ReportingScene } from "@/components/accounting-features/reporting-scene";
import { SupportScene } from "@/components/accounting-features/support-scene";
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
    id: "automation",
    label: "Automation",
    title: "Live financial data, reviewed by accountants",
    body: "KRS connects to your bank and tools. Transactions sync as they happen, while accountants confirm matches, VAT treatment and myDATA coding.",
    items: [
      {
        id: "matching",
        title: "Automatic transaction matching",
        text: "Incoming payments and costs are categorised and matched where the evidence is clear. Accountants review exceptions before they enter the books.",
      },
      {
        id: "vat",
        title: "VAT and myDATA built in",
        text: "Each line carries the right VAT treatment and myDATA classification. Exceptions stay visible instead of waiting for month-end.",
      },
      {
        id: "audit",
        title: "Always ready for review",
        text: "Source documents, classifications and approvals stay together, so filings and reviews start from an organised trail.",
      },
    ],
    Scene: AutomationScene,
  },
  {
    id: "support",
    label: "Expert support",
    title: "A dedicated accountant who knows the business",
    body: "You are matched with a Greece-based accountant who understands your model, reachable directly, with a 24-hour response.",
    reversed: true,
    items: [
      {
        id: "access",
        title: "Direct access, no ticket queue",
        text: "Message the person responsible for your books. They already have the context, so you do not restart the story every time.",
      },
      {
        id: "industry",
        title: "Context for how you actually trade",
        text: "Whether you run a shop, a SaaS product or a professional firm, the accountant is chosen for the way revenue and costs move.",
      },
      {
        id: "beyond",
        title: "Help beyond the monthly close",
        text: "Ask about reporting, cash, filings and the next decision throughout the year, not only when a deadline arrives.",
      },
    ],
    Scene: SupportScene,
  },
  {
    id: "accuracy",
    label: "Accuracy and compliance",
    title: "Daily checks, no month-end scramble",
    body: "Recurring checks run in the background so numbers stay accurate and the close finishes on time.",
    items: [
      {
        id: "accurate",
        title: "Books that stay accurate",
        text: "Reconciliations and classifications are reviewed continuously, so growth does not recreate the same close chaos.",
      },
      {
        id: "compliance",
        title: "Compliance in the background",
        text: "VAT, myDATA and reporting requirements are checked as work happens, not reconstructed after the period has closed.",
      },
      {
        id: "close",
        title: "A predictable month-end",
        text: "Missing receipts and mismatches surface early. The close becomes a review, not a hunt through inboxes.",
      },
    ],
    Scene: AccuracyScene,
  },
  {
    id: "reporting",
    label: "Reporting",
    title: "Monthly P&L, balance sheet and cash flow",
    body: "Management reports arrive every month without chasing your accountant.",
    reversed: true,
    items: [
      {
        id: "understand",
        title: "Understand the numbers",
        text: "Revenue, margin and cash are presented in language the leadership team can use, not only a statutory pack.",
      },
      {
        id: "ready",
        title: "Reports without the chase",
        text: "P&L, balance sheet and cash flow are prepared as part of the close, with a clear owner and a visible status.",
      },
      {
        id: "decide",
        title: "Decide with current data",
        text: "Use up-to-date books to plan hiring, spending and runway instead of waiting for a delayed year-end view.",
      },
    ],
    Scene: ReportingScene,
  },
];

export function AccountingFeatureShowcase() {
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
            if (next >= 0) {
              setFocus(next);
            }
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
