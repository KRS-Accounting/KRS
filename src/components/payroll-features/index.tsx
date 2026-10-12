"use client";

import { useState, type ReactNode } from "react";

import { FeatureDemoFrame, type FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { PayrollAdviceScene } from "@/components/payroll-features/advice-scene";
import { PayrollComplianceScene } from "@/components/payroll-features/compliance-scene";
import { PayrollOnboardingScene } from "@/components/payroll-features/onboarding-scene";
import { PayrollRunScene } from "@/components/payroll-features/run-scene";
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
    id: "run",
    label: "Payroll",
    title: "The monthly payroll, with the full cost visible first",
    body: "KRS calculates gross pay, net pay and employer contributions before anyone is paid. Payslips are issued with the run, not chased afterwards.",
    items: [
      {
        id: "calc",
        title: "Pay calculated from this month’s changes",
        text: "Hires, leavers, hours and allowances land on the run before the payslips are issued.",
      },
      {
        id: "file",
        title: "APD drafted from the same numbers",
        text: "The APD, the monthly declaration to EFKA, is prepared from the payslips, so the filing and the pay always match.",
      },
      {
        id: "cost",
        title: "Employer cost before you approve",
        text: "Employer EFKA contributions are shown on the run before you approve it, so the total cost is clear before payday.",
      },
    ],
    Scene: PayrollRunScene,
  },
  {
    id: "compliance",
    label: "Compliance",
    title: "EFKA, payroll tax and ERGANI on one calendar",
    body: "Contributions, payroll tax and ERGANI notices are checked with each run, so corrections are made while the month is still open.",
    reversed: true,
    items: [
      {
        id: "ergani",
        title: "ERGANI notices on time",
        text: "New hires are declared before they start. Schedule changes and departures are filed within their own deadlines.",
      },
      {
        id: "efka",
        title: "Contributions and payroll tax",
        text: "Employee and employer EFKA, and the tax withheld from pay, are calculated on each run and filed with EFKA and AADE.",
      },
      {
        id: "apd",
        title: "APD filed once the run is final",
        text: "The monthly APD is filed once open changes are resolved, so corrections are not left for later.",
      },
    ],
    Scene: PayrollComplianceScene,
  },
  {
    id: "onboarding",
    label: "Onboarding",
    title: "New hires ready before their first day",
    body: "The contract, tax number (AFM), social security number (AMKA) and bank details are collected once. The ERGANI hire notice is filed before the first day, and the first payslip is included in the next run.",
    items: [
      {
        id: "details",
        title: "One set of details",
        text: "The contract, AFM, AMKA and IBAN are collected before payroll setup starts, so nothing is chased on their first morning.",
      },
      {
        id: "record",
        title: "Added to the payroll record",
        text: "The new employee is set up alongside the rest of the team, with their pay terms, working hours and start date.",
      },
      {
        id: "first",
        title: "Included in the next run",
        text: "When the details arrive complete, the new employee is set up within one business day and paid in the next run.",
      },
    ],
    Scene: PayrollOnboardingScene,
  },
  {
    id: "advice",
    label: "Payroll advice",
    title: "Answers during the month, not on payday",
    body: "Questions about a hire, a departure or a change in hours go to the advisor who already runs your payroll. Any follow-up is added to the payroll calendar.",
    reversed: true,
    items: [
      {
        id: "access",
        title: "Direct access, no ticket queue",
        text: "Message the advisor responsible for the run. They already have the headcount, the pay date and the open changes.",
      },
      {
        id: "context",
        title: "Advice that fits the contract",
        text: "A part-time hire, a schedule change and a departure each need a different answer. The reply is based on the employee’s actual contract.",
      },
      {
        id: "calendar",
        title: "Next steps on the payroll calendar",
        text: "When a decision needs an ERGANI notice or a change on the next payslip, that date is added to the payroll calendar.",
      },
    ],
    Scene: PayrollAdviceScene,
  },
];

export function PayrollFeatureShowcase() {
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
