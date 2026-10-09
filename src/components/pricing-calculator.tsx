"use client";

import { useId, useMemo, useState } from "react";
import { ArrowRight, Check, Info, Minus, Plus } from "lucide-react";

import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const volumeTiers = [
  { id: "0-50", label: "0-50", documents: 20 },
  { id: "51-100", label: "51-100", documents: 75 },
  { id: "101-300", label: "101-300", documents: 200 },
  { id: "301-500", label: "301-500", documents: 400 },
  { id: "500+", label: "500+", documents: 550 },
] as const;

type VolumeTierId = (typeof volumeTiers)[number]["id"];

const structures = [
  { id: "professional", label: "Sole trader", base: 79, formation: 90 },
  { id: "ike-epe", label: "IKE / EPE", base: 149, formation: 350 },
  { id: "ae", label: "AE", base: 299, formation: 800 },
  { id: "custom", label: "Custom", base: 499, formation: 1200 },
] as const;

const calculatorFieldsetClassName = "m-0 min-w-0 border-0 p-0";
const calculatorLegendClassName = "block w-full max-w-full px-0 ps-0 text-sm font-semibold text-foreground";
const calculatorInputGroupClassName = "grid gap-2";
const calculatorInputHeaderClassName = "grid gap-0.5";

function calculatorChoiceButtonClass(active: boolean) {
  return cn(
    "min-h-12 border px-4 text-left text-sm font-semibold transition",
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-primary/15 bg-card text-foreground hover:border-primary/42"
  );
}

function InfoTooltip({ content }: { content: string }) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  return (
    <span
      className="relative inline-flex align-text-bottom"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        aria-controls={tooltipId}
        aria-expanded={open}
        aria-label="What counts toward monthly transactions"
        className="inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/22 text-muted-foreground transition hover:border-primary/40 hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <Info className="size-3.5" strokeWidth={2} />
      </button>
      <span
        className={cn(
          "pointer-events-none absolute right-0 top-full z-30 mt-2 w-[min(18rem,calc(100vw-3rem))] border border-primary/15 bg-background p-3 text-left text-xs leading-5 text-muted-foreground shadow-[var(--shadow-md)] transition-opacity",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
        id={tooltipId}
        role="tooltip"
      >
        {content}
      </span>
    </span>
  );
}

function VolumeSegments({
  label,
  note,
  tooltip,
  value,
  onChange,
}: {
  label: string;
  note: string;
  tooltip: string;
  value: VolumeTierId | null;
  onChange: (value: VolumeTierId) => void;
}) {
  return (
    <div className={calculatorInputGroupClassName}>
      <div className={calculatorInputHeaderClassName}>
        <p className="text-sm font-semibold leading-5 text-foreground">{label}</p>
        <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm leading-5 text-muted-foreground">
          <span>{note}</span>
          <InfoTooltip content={tooltip} />
        </p>
      </div>
      <div
        aria-label="Transactions and invoices per month."
        className="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-0 sm:border sm:border-primary/18"
        role="group"
      >
        {volumeTiers.map((tier) => {
          const active = value === tier.id;

          return (
            <button
              aria-pressed={active}
              className={cn(
                "min-h-11 px-2 text-center text-sm font-semibold transition",
                "border border-primary/15 bg-card hover:border-primary/42",
                "sm:border-0 sm:border-r sm:border-primary/18 sm:last:border-r-0",
                active && "border-primary bg-primary text-primary-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground sm:z-10"
              )}
              key={tier.id}
              onClick={() => onChange(tier.id)}
              type="button"
            >
              {tier.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NumericStepper({
  label,
  value,
  onChange,
  note,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  note: string;
}) {
  return (
    <div className={calculatorInputGroupClassName}>
      <div className={calculatorInputHeaderClassName}>
        <p className="text-sm font-semibold leading-5 text-foreground">{label}</p>
        <p className="text-sm leading-5 text-muted-foreground">{note}</p>
      </div>
      <div className="flex h-12 w-full items-stretch overflow-hidden rounded-lg border border-primary/18 bg-background">
        <button
          aria-label={`Decrease ${label}`}
          className="grid w-12 shrink-0 place-items-center border-r border-primary/18 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
          disabled={value === 0}
          onClick={() => onChange(Math.max(0, value - 1))}
          type="button"
        >
          <Minus className="size-4" strokeWidth={1.75} />
        </button>
        <span
          aria-live="polite"
          className="flex flex-1 items-center justify-center text-sm font-semibold tabular-nums text-foreground"
        >
          {value}
        </span>
        <button
          aria-label={`Increase ${label}`}
          className="grid w-12 shrink-0 place-items-center border-l border-primary/18 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          onClick={() => onChange(value + 1)}
          type="button"
        >
          <Plus className="size-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}

export function PricingCalculator() {
  const { tx, href } = useI18n();
  const [journey, setJourney] = useState<"existing" | "formation" | null>(null);
  const [structure, setStructure] = useState<(typeof structures)[number]["id"] | null>(null);
  const [volumeTier, setVolumeTier] = useState<VolumeTierId | null>(null);
  const [employees, setEmployees] = useState(0);

  const estimate = useMemo(() => {
    if (!structure || !volumeTier) return null;

    const selected = structures.find((item) => item.id === structure);
    const tier = volumeTiers.find((item) => item.id === volumeTier);
    if (!selected || !tier) return null;

    const documentAdjustment = Math.max(0, Math.ceil((tier.documents - 20) / 25)) * 25;
    const payrollAdjustment = employees * 14;
    return selected.base + documentAdjustment + payrollAdjustment;
  }, [employees, structure, volumeTier]);

  const selectedStructure = structure ? structures.find((item) => item.id === structure) : undefined;

  return (
    <section aria-labelledby="calculator-heading" className="border-y border-primary/12 bg-muted/55 px-4 py-16 sm:px-6 md:py-24 lg:px-12" id="calculator">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-18">
        <div className="max-w-xl">
          <p className="mono-label text-secondary">{tx("Pricing calculator")}</p>
          <h2 className="mt-5 text-balance text-5xl leading-[0.98] text-foreground sm:text-6xl" id="calculator-heading">
            <Reveal>{tx("A starting point, not a surprise invoice.")}</Reveal>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
            {tx("Tell us a little about the operating load. We use this estimate to start a transparent scoping conversation, including the Greek filings and support your business needs.")}
          </p>
          <div className="mt-10 border-l-2 border-secondary pl-5 text-sm leading-6 text-muted-foreground">
            {tx("The estimate excludes VAT and reflects standard monthly bookkeeping. If you are starting a business, we also show a separate starting estimate for formation support. Specialist tax work and complex legal or notarial matters are scoped separately.")}
          </div>
        </div>

        <div className="border border-primary/16 bg-background p-5 shadow-[var(--shadow-lg)] sm:p-8">
          <div className="grid gap-8">
            <fieldset className={calculatorFieldsetClassName}>
              <legend className={calculatorLegendClassName}>{tx("Where are you today?")}</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <button aria-pressed={journey === "existing"} className={calculatorChoiceButtonClass(journey === "existing")} onClick={() => setJourney("existing")} type="button">{tx("I have a business")}</button>
                <button aria-pressed={journey === "formation"} className={calculatorChoiceButtonClass(journey === "formation")} onClick={() => setJourney("formation")} type="button">{tx("I'm starting a business")}</button>
              </div>
            </fieldset>
            <fieldset className={calculatorFieldsetClassName}>
              <legend className={calculatorLegendClassName}>{tx("Your business structure")}</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-4">
                {structures.map((item) => {
                  const active = structure === item.id;
                  return (
                    <button
                      aria-pressed={active}
                      className={calculatorChoiceButtonClass(active)}
                      key={item.id}
                      onClick={() => setStructure(item.id)}
                      type="button"
                    >
                      {tx(item.label)}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className="mt-8 grid gap-8">
            <VolumeSegments
              label={tx("Bookkeeping")}
              note={tx("Transactions and invoices per month.")}
              onChange={setVolumeTier}
              tooltip={tx("Includes all bank transactions (such as card payments, bank fees and transfers) as well as purchase and sales invoices. Please estimate the average across all entities.")}
              value={volumeTier}
            />
            <NumericStepper label={tx("Employees")} note={tx("Payroll administration and ERGANI workflow")} onChange={setEmployees} value={employees} />
          </div>

          <div className="mt-8 grid gap-5 border-t border-primary/12 pt-7 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="mono-label text-secondary">{tx("Indicative monthly fee")}</p>
              <p className="mt-2 font-heading text-6xl leading-none tracking-tight text-foreground">
                {estimate !== null ? (
                  <>
                    €{estimate}
                    <span className="ml-2 font-sans text-base font-medium tracking-normal text-muted-foreground">{tx("/ month")}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </p>
              {estimate === null ? (
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {tx("Choose your structure and monthly volume to see an indicative fee.")}
                </p>
              ) : null}
              {journey === "formation" && selectedStructure ? (
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {tx("Estimated one-time formation support from")}{" "}
                  <span className="font-semibold text-foreground">€{selectedStructure.formation}</span>
                  {tx(", excluding VAT.")}
                </p>
              ) : null}
            </div>
            <Button asChild className="h-12 rounded-full px-6 shadow-[var(--shadow-md)]" variant="secondary">
              <a href={href("/onboarding")}>
                {tx("Book a free consultation")}
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </a>
            </Button>
          </div>
          <p className="mt-5 flex gap-2 text-xs leading-5 text-muted-foreground">
            <Check className="mt-0.5 size-3.5 shrink-0 text-secondary" strokeWidth={2} />
            {tx("No commitment. Your final scope and pricing will be confirmed before onboarding.")}
          </p>
        </div>
      </div>
    </section>
  );
}
