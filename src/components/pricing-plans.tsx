"use client";

import { useState } from "react";
import { ArrowRight, Check, CircleCheck } from "lucide-react";
import { motion } from "motion/react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const DEFAULT_PLAN_INDEX = 1;

type Plan = {
  name: string;
  label: string;
  price: string;
  unit: string;
  description: string;
  chooseIf: string[];
  details: string[];
};

type ComparisonRow = { feature: string; values: string[] };

const existingPlans: Plan[] = [
  {
    name: "Independent",
    label: "Freelancers and sole traders",
    price: "€79",
    unit: "/ month",
    description: "For independent professionals who want a dependable accounting and tax rhythm without carrying the administration alone.",
    chooseIf: ["You operate as a freelancer or sole trader", "You need VAT and myDATA work kept on track", "You value direct access to an advisor who knows your file"],
    details: ["Monthly income and expense bookkeeping", "myDATA classification and monitoring", "VAT return preparation", "Annual income tax return preparation", "AADE deadline calendar", "Secure document collection", "Direct advisor support"],
  },
  {
    name: "IKE / EPE",
    label: "Established private companies",
    price: "€149",
    unit: "/ month",
    description: "The core operating plan for an IKE or EPE that needs visible monthly close, filings, and financial context.",
    chooseIf: ["You run one IKE or EPE with standard operations", "You want monthly close and tax obligations in one place", "You need a structured accounting partner as the business grows"],
    details: ["Everything in Independent", "Monthly bookkeeping close", "Corporate tax return preparation", "Annual financial statements", "Basic management reporting", "Director and shareholder coordination", "Advisor-routed operating questions"],
  },
  {
    name: "AE",
    label: "Société Anonyme",
    price: "€299",
    unit: "/ month",
    description: "For AEs that need deeper reporting, more formal financial coordination, and a regular management review rhythm.",
    chooseIf: ["You operate through an AE", "You have a team, payroll, or formal reporting needs", "You want a senior financial partner close to the operating file"],
    details: ["Everything in IKE / EPE", "Enhanced financial statement preparation", "Detailed management reporting", "Monthly management review", "Board-ready finance coordination", "Priority advisor response", "Complex filing scoping support"],
  },
  {
    name: "Custom",
    label: "Groups and complex operations",
    price: "Tailored",
    unit: "scope",
    description: "For groups, holdings, larger teams, and cross-border operations that need a dedicated financial operating model.",
    chooseIf: ["You have multiple entities or an international footprint", "Your business needs a dedicated finance partner", "Your tax, reporting, or payroll scope does not fit a standard plan"],
    details: ["Everything in AE", "Multi-entity coordination", "Cross-border accounting support", "Dedicated financial partner", "Custom reporting cadence", "Priority planning and review", "Specialist filing coordination"],
  },
];

const formationPlans: Plan[] = [
  {
    name: "Independent Start",
    label: "Open a sole trade",
    price: "€79",
    unit: "/ month",
    description: "For professionals who want to open correctly, understand their first obligations, and begin with their bookkeeping ready.",
    chooseIf: ["You are starting as a freelancer or sole trader", "You want registration and the first accounting steps coordinated", "You need help understanding early VAT and myDATA obligations"],
    details: ["Business activity and tax registration guidance", "AADE and myDATA onboarding support", "Opening document checklist", "First VAT return preparation", "Monthly income and expense bookkeeping", "Annual income tax return preparation", "Direct advisor support"],
  },
  {
    name: "IKE / EPE Start",
    label: "Form a private company",
    price: "€149",
    unit: "/ month",
    description: "For founders who want formation steps, opening registrations, and their ongoing accounting file coordinated as one launch.",
    chooseIf: ["You are incorporating an IKE or EPE", "You want the formation sequence made visible", "You want accounting and tax support ready at launch"],
    details: ["IKE or EPE formation coordination", "Registration and opening document checklist", "AADE and myDATA onboarding support", "Opening accounting file", "First monthly bookkeeping close", "Corporate tax and filing calendar", "Advisor support through launch"],
  },
  {
    name: "AE Start",
    label: "Form a Société Anonyme",
    price: "€299",
    unit: "/ month",
    description: "For founders setting up an AE who need a rigorous launch path and the reporting foundation to operate with confidence.",
    chooseIf: ["You are establishing an AE", "Your launch involves a team, investors, or formal governance", "You want reporting and payroll readiness from the start"],
    details: ["AE formation coordination", "Opening registration and governance checklist", "AADE and myDATA onboarding support", "Opening accounting file and balances", "Payroll and ERGANI readiness", "Board-ready reporting foundation", "Priority advisor coordination"],
  },
  {
    name: "Custom Start",
    label: "Groups, holdings, and complex launches",
    price: "Tailored",
    unit: "scope",
    description: "For a formation that needs a bespoke team, complex ownership planning, or coordination across more than one jurisdiction.",
    chooseIf: ["You are forming a group, holding, or multi-entity operation", "Your launch has a complex shareholder or international structure", "You want a finance partner to map the full operating model"],
    details: ["Formation workstream coordination", "Complex ownership and governance checklist", "Multi-entity opening file design", "Cross-border tax scoping", "Payroll readiness planning", "Custom reporting foundation", "Dedicated launch coordination"],
  },
];

const existingComparison: ComparisonRow[] = [
  { feature: "Monthly bookkeeping and document review", values: ["Included", "Included", "Included", "Included"] },
  { feature: "myDATA classification and monitoring", values: ["Included", "Included", "Included", "Included"] },
  { feature: "VAT return preparation", values: ["Included", "Included", "Included", "Included"] },
  { feature: "Annual financial statements and tax return", values: ["Guided", "Included", "Enhanced", "Custom"] },
  { feature: "Management reporting", values: ["-", "Core view", "Detailed view", "Custom reporting"] },
  { feature: "Payroll and ERGANI coordination", values: ["Add-on", "Add-on", "Included", "Custom"] },
  { feature: "Advisor review", values: ["Direct support", "Structured support", "Monthly", "Dedicated"] },
  { feature: "Multi-entity and cross-border support", values: ["-", "On request", "On request", "Included in scope"] },
];

const formationComparison: ComparisonRow[] = [
  { feature: "Formation and registration coordination", values: ["Included", "Included", "Included", "Custom"] },
  { feature: "AADE and myDATA onboarding support", values: ["Included", "Included", "Included", "Included"] },
  { feature: "Opening document checklist", values: ["Included", "Included", "Included", "Custom"] },
  { feature: "Opening accounting file", values: ["-", "Included", "Included", "Included"] },
  { feature: "Governance and ownership coordination", values: ["-", "Core support", "Formal foundation", "Custom"] },
  { feature: "Payroll and ERGANI launch readiness", values: ["Add-on", "Add-on", "Included", "Custom"] },
  { feature: "First reporting view", values: ["-", "Core view", "Board-ready foundation", "Custom"] },
  { feature: "Ongoing monthly plan after launch", values: ["Independent", "IKE / EPE", "AE", "Custom"] },
];

function PlanCard({
  plan,
  isSelected,
  isHovered,
  onHover,
  onSelect,
}: {
  plan: Plan;
  isSelected: boolean;
  isHovered: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <article
      aria-current={isSelected ? "true" : undefined}
      className={cn(
        "relative row-span-8 grid h-full cursor-pointer grid-rows-subgrid gap-y-5 border p-6 transition-[border-color,box-shadow,background-color] sm:p-7",
        isSelected ? "bg-secondary/10" : "bg-background",
        isSelected || isHovered
          ? "border-secondary shadow-[var(--shadow-md)] ring-1 ring-secondary/25"
          : "border-primary/15 hover:border-primary/35"
      )}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a, button")) return;
        onSelect();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      onMouseEnter={onHover}
      tabIndex={0}
    >
      <p className="mono-label self-start text-muted-foreground">{plan.label}</p>
      <h3 className="self-start text-4xl leading-none">{plan.name}</h3>
      <p className="self-start text-sm leading-6 text-muted-foreground">{plan.description}</p>
      <div className="self-start border-t border-primary/12 pt-5">
        <p className="text-sm font-medium text-muted-foreground">Starting at</p>
        <p className="mt-2 font-heading text-5xl leading-none">{plan.price}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {plan.unit === "/ month" ? "All-inclusive monthly fee, excluding VAT" : "A tailored monthly scope, confirmed before work begins"}
        </p>
      </div>
      <div className="grid self-start gap-3">
        <Button
          asChild
          className={cn(
            "h-11 w-full rounded-full",
            isSelected && "bg-secondary text-secondary-foreground hover:bg-secondary/90"
          )}
          variant={isSelected ? "secondary" : "outline"}
        >
          <a href="/onboarding">
            Book a free consultation
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </a>
        </Button>
        <a className="inline-flex min-h-10 items-center justify-center gap-2 text-sm font-semibold text-foreground underline decoration-current/35 underline-offset-4 transition hover:text-secondary" href="#calculator">
          Calculate pricing
          <ArrowRight className="size-4" strokeWidth={1.75} />
        </a>
      </div>
      <div className="self-start border-t border-primary/12 pt-6">
        <h4 className="text-base font-semibold">Choose {plan.name} if you:</h4>
        <ul className="mt-4 grid gap-3 text-sm leading-6">
          {plan.chooseIf.map((reason) => <li className="flex gap-3" key={reason}><Check className="mt-1 size-4 shrink-0 text-secondary" strokeWidth={2} />{reason}</li>)}
        </ul>
      </div>
      <div className="self-start border-t border-primary/12 pt-6">
        <h4 className="text-base font-semibold">Financial administration</h4>
        <ul className="mt-4 grid gap-3 text-sm leading-6">
          {plan.details.map((detail) => <li className="flex gap-3" key={detail}><Check className="mt-1 size-4 shrink-0 text-secondary" strokeWidth={2} />{detail}</li>)}
        </ul>
      </div>
      <div className="self-start border-t border-primary/12 pt-6">
        <h4 className="text-base font-semibold">Payroll</h4>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Starting at €14 per employee / month</p>
        <p className="mt-2 flex gap-3 text-sm leading-6 text-muted-foreground">
          <Check className="mt-1 size-4 shrink-0 text-secondary" strokeWidth={2} />
          Payroll administration and ERGANI coordination.
        </p>
      </div>
    </article>
  );
}

function comparisonColumnClass(planIndex: number, selectedPlanIndex: number | null, hoveredPlanIndex: number | null) {
  return cn(
    "p-5 transition-colors",
    selectedPlanIndex === planIndex && "bg-secondary/10",
    hoveredPlanIndex === planIndex &&
      hoveredPlanIndex !== selectedPlanIndex &&
      "bg-secondary/[0.06] ring-1 ring-inset ring-secondary/20"
  );
}

export function PricingPlans() {
  const [journey, setJourney] = useState<"existing" | "formation">("existing");
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(DEFAULT_PLAN_INDEX);
  const [hoveredPlanIndex, setHoveredPlanIndex] = useState<number | null>(null);
  const plans = journey === "existing" ? existingPlans : formationPlans;
  const rows = journey === "existing" ? existingComparison : formationComparison;
  const headings = journey === "existing" ? ["Independent", "IKE / EPE", "AE", "Custom"] : ["Independent Start", "IKE / EPE Start", "AE Start", "Custom Start"];
  return (
    <div className="border-b border-primary/12 bg-[#FDF8F0]">
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-6 border-b border-primary/12 pb-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div><p className="mono-label text-secondary">Monthly plans</p><h2 className="mt-4 text-balance text-5xl leading-[0.98] sm:text-6xl"><Reveal>A plan for the structure you run.</Reveal></h2></div>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">Select the route that describes you today. Existing companies get a clear operating rhythm. New companies get formation support before that rhythm begins.</p>
        </div>
        <div
          aria-label="Select your business journey"
          className="mt-8 inline-flex w-max max-w-full items-center gap-1 rounded-full bg-background p-1 ring-1 ring-primary/8"
          role="tablist"
        >
          {(
            [
              ["existing", "I have a business"],
              ["formation", "I'm starting a business"],
            ] as const
          ).map(([value, label]) => {
            const selected = journey === value;
            return (
              <button
                aria-selected={selected}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition-colors duration-300 min-[375px]:px-4 min-[375px]:text-sm",
                  selected ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
                key={value}
                onClick={() => {
                  setJourney(value);
                  setSelectedPlanIndex(DEFAULT_PLAN_INDEX);
                  setHoveredPlanIndex(null);
                }}
                role="tab"
                type="button"
              >
                {selected ? (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-primary"
                    layoutId="pricing-journey-tab"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                ) : null}
                <span className="relative">{label}</span>
              </button>
            );
          })}
        </div>
        <div
          className="mt-10 grid auto-rows-auto grid-cols-1 items-stretch gap-x-4 gap-y-4 md:grid-cols-2 xl:grid-cols-4"
          onMouseLeave={() => setHoveredPlanIndex(null)}
        >
          {plans.map((plan, index) => (
            <PlanCard
              isHovered={hoveredPlanIndex === index}
              isSelected={selectedPlanIndex === index}
              key={plan.name}
              onHover={() => setHoveredPlanIndex(index)}
              onSelect={() => setSelectedPlanIndex((current) => (current === index ? null : index))}
              plan={plan}
            />
          ))}
        </div>
        <p className="mt-6 text-sm leading-6 text-muted-foreground">Prices are monthly starting points, excluding VAT. Formation steps, specialist tax work, and complex legal or notarial requirements are confirmed in writing before work begins.</p>
      </div>
    </section>
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-12" id="comparison">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-2xl"><p className="mono-label text-secondary">Compare plans</p><h2 className="mt-4 text-balance text-5xl leading-[0.98] sm:text-6xl"><Reveal>The detail behind the monthly fee.</Reveal></h2><p className="mt-5 text-lg leading-8 text-muted-foreground">The table follows the selected path above, so you can compare recurring work or the setup work that prepares your company to operate.</p></div>
        <div className="mt-10 overflow-x-auto border border-primary/15 bg-background">
          <div className="min-w-240">
            <div className="grid grid-cols-[1.8fr_repeat(4,1fr)] border-b border-primary/15 bg-muted/55 text-sm font-semibold">
              <div className="p-5">Included work</div>
              {headings.map((heading, index) => (
                <div className={comparisonColumnClass(index, selectedPlanIndex, hoveredPlanIndex)} key={heading}>
                  {heading}
                </div>
              ))}
            </div>
            {rows.map((row, rowIndex) => (
              <div
                className={cn(
                  "grid grid-cols-[1.8fr_repeat(4,1fr)] text-sm",
                  rowIndex < rows.length - 1 && "border-b border-primary/10"
                )}
                key={row.feature}
              >
                <div className="p-5 font-semibold text-foreground">{row.feature}</div>
                {row.values.map((value, valueIndex) => (
                  <div
                    className={cn(
                      "flex items-center gap-2",
                      comparisonColumnClass(valueIndex, selectedPlanIndex, hoveredPlanIndex)
                    )}
                    key={`${row.feature}-${valueIndex}`}
                  >
                    {value !== "-" ? <CircleCheck className="size-4 shrink-0 text-secondary" strokeWidth={1.75} /> : null}
                    <span className={value === "-" ? "text-muted-foreground" : "text-foreground"}>{value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
