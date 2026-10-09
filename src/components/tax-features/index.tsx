"use client";

import { useState, type ReactNode } from "react";

import { FeatureDemoFrame, type FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { Reveal } from "@/components/reveal";
import { AdviceScene } from "@/components/tax-features/advice-scene";
import { CorporateScene } from "@/components/tax-features/corporate-scene";
import { CrossBorderScene } from "@/components/tax-features/cross-border-scene";
import { VatScene } from "@/components/tax-features/vat-scene";
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
    id: "vat",
    label: "VAT",
    title: "VAT returns, filed on your cycle",
    body: "KRS prepares the ΦΠΑ return from the books and submits it to AADE. Monthly or quarterly follows the cycle that already applies to the company.",
    items: [
      {
        id: "deadlines",
        title: "Deadline monitoring",
        text: "The next VAT date sits on a calendar with an owner, so the reminder is not a penalty notice.",
      },
      {
        id: "treatment",
        title: "VAT treatment checked",
        text: "Standard 24%, reduced rates, exemptions and reverse charge are reviewed on the lines that need them, alongside myDATA.",
      },
      {
        id: "file",
        title: "Filed when the return agrees",
        text: "Open exceptions stay visible. The return goes to AADE once the period ties back to the books.",
      },
    ],
    Scene: VatScene,
  },
  {
    id: "corporate",
    label: "Income tax",
    title: "Annual income tax, without the June surprise",
    body: "The income tax return and E3 are prepared from the closed accounts. Deductions, adjustments and advance tax are reviewed before anything is filed.",
    reversed: true,
    items: [
      {
        id: "accounts",
        title: "Built from the annual accounts",
        text: "The return starts from the year that has already closed, so profit, tax and the E3 describe the same period.",
      },
      {
        id: "adjustments",
        title: "Deductions and adjustments",
        text: "Non-deductible costs and other fiscal adjustments are reviewed before filing, with the evidence kept next to the return.",
      },
      {
        id: "advance",
        title: "Advance tax in the picture",
        text: "Tax already paid in advance is shown against the result, so the amount due is not a surprise on filing day.",
      },
    ],
    Scene: CorporateScene,
  },
  {
    id: "cross-border",
    label: "Cross-border",
    title: "Greek VAT and EU filings, one owner",
    body: "Selling outside Greece adds returns. KRS coordinates domestic VAT, OSS and the intra-EU listing so each deadline has the same advisor.",
    items: [
      {
        id: "oss",
        title: "OSS and EU consumer sales",
        text: "Where you sell to consumers in other EU countries, the OSS return is prepared with the local evidence and filed on its own date.",
      },
      {
        id: "listing",
        title: "Intra-EU B2B listing",
        text: "Supplies to VAT-registered businesses in the EU stay on the listing, with the VAT number and invoice kept together.",
      },
      {
        id: "owner",
        title: "One point of contact",
        text: "Greece, OSS and the listing are coordinated by the advisor who already has the file, instead of a separate thread per country.",
      },
    ],
    Scene: CrossBorderScene,
  },
  {
    id: "advice",
    label: "Tax advice",
    title: "Advice through the year, not only at filing",
    body: "Questions about treatment, deductibility and the next sale are answered while there is still time to act. The advisor already has the books.",
    reversed: true,
    items: [
      {
        id: "planning",
        title: "A position before you act",
        text: "Bring the transaction or the new market before the invoice goes out, so the VAT treatment is chosen while it can still change.",
      },
      {
        id: "industry",
        title: "Advice that fits how you trade",
        text: "A shop, a SaaS company and a professional firm do not share a VAT answer. The advisor is working from your file, not a generic note.",
      },
      {
        id: "calendar",
        title: "The answer lands on the calendar",
        text: "When a decision creates a filing, the deadline is added to the same tax calendar instead of living in a chat.",
      },
    ],
    Scene: AdviceScene,
  },
];

export function TaxFeatureShowcase() {
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
