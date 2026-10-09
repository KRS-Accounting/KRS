"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, ExternalLink, Phone, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

import { useI18n } from "@/i18n/provider";
import type { Locale } from "@/i18n/locale";
import { cn } from "@/lib/utils";

type FormState = {
  fullName: string;
  workEmail: string;
  phone: string;
  company: string;
  companyStage: string;
  teamSize: string;
  industry: string;
  payroll: string;
  services: string[];
  timeline: string;
  callWindow: string;
  notes: string;
  privacy: boolean;
  website: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  fullName: "",
  workEmail: "",
  phone: "",
  company: "",
  companyStage: "",
  teamSize: "",
  industry: "",
  payroll: "",
  services: [],
  timeline: "",
  callWindow: "",
  notes: "",
  privacy: false,
  website: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const digitsOnly = (value: string) => value.replace(/\D/g, "");

const formatPhoneForSubmit = (phone: string) => {
  const national = digitsOnly(phone);
  if (!national) return "";
  return `+30${national}`;
};

const progressLabels = ["About you", "Your business", "The call"] as const;
const companyStages = ["Operating company", "Starting a company", "Switching advisor", "Group or holding"] as const;
const teamSizes = ["Just me", "2-10 people", "11-50 people", "51+ people"] as const;
const industries = [
  "Technology and SaaS",
  "Professional services",
  "Retail and e-commerce",
  "Hospitality and short-term rentals",
  "Construction and real estate",
  "Healthcare",
  "Creative and media",
  "Other",
] as const;
const payrollOptions = ["Yes", "Not yet"] as const;
const serviceOptions = ["Tax advisory", "Accounting and myDATA", "Payroll", "Business advisory", "Funding and grants"] as const;
const timelineOptions = ["This week", "Within two weeks", "I am flexible"] as const;
const callWindows = ["Morning, 09:00-12:00", "Midday, 12:00-15:00", "Afternoon, 15:00-18:00"] as const;

const callSummary = (timeline: string, callWindow: string, locale: Locale) => {
  const [start, end] = callWindow.split(", ")[1]?.split("-") ?? [];
  const greek = locale === "el";
  const when =
    timeline === "This week"
      ? greek
        ? "αυτή την εβδομάδα"
        : "this week"
      : timeline === "Within two weeks"
        ? greek
          ? "μέσα στις επόμενες δύο εβδομάδες"
          : "within the next two weeks"
        : greek
          ? "όποτε σας βολεύει"
          : "when it suits you";
  const part = callWindow.startsWith("Morning")
    ? greek
      ? "το πρωί"
      : "in the morning"
    : callWindow.startsWith("Midday")
      ? greek
        ? "το μεσημέρι"
        : "around midday"
      : greek
        ? "το απόγευμα"
        : "in the afternoon";

  if (!start || !end) return when;

  return greek
    ? `${when}, ${part}, μεταξύ ${start} και ${end}, ώρα Αθήνας`
    : `${when}, ${part}, between ${start} and ${end} Athens time`;
};
type ContactMode = "phone" | "calendar";
type SubmitStatus = "idle" | "submitting" | "success";

const bookingsPageUrl =
  "https://bookings.cloud.microsoft/book/KRSSalesmeeting@krs.gr/?ismsaljsauthenabled";

const fieldLabelClassName = "block text-sm font-semibold";
const fieldsetClassName = "m-0 min-w-0 border-0 p-0";

const inputClassName =
  "mt-2 h-12 w-full border border-primary/20 bg-transparent px-4 text-base font-normal text-foreground outline-none transition placeholder:font-normal placeholder:text-muted-foreground/55 hover:border-primary/38 focus-visible:border-secondary focus-visible:ring-3 focus-visible:ring-secondary/18";

const choiceControlClassName =
  "border border-primary/18 bg-transparent text-sm font-semibold text-primary transition hover:border-primary/42 hover:bg-primary/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary";

export function OnboardingFlow({
  compact = false,
  defaultServices,
}: {
  compact?: boolean;
  defaultServices?: readonly string[];
} = {}) {
  const prefersReducedMotion = useReducedMotion();
  const { tx, locale, href } = useI18n();
  const [formData, setFormData] = useState<FormState>(() =>
    defaultServices?.length ? { ...initialState, services: [...defaultServices] } : initialState,
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [contactMode, setContactMode] = useState<ContactMode | null>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sentBookings = useRef(new Set<string>());

  useEffect(() => {
    if (step > 0) headingRef.current?.focus();
  }, [step]);

  const updateField = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setFormData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validateStep = (currentStep: number) => {
    const nextErrors: FormErrors = {};

    if (currentStep === 0) {
      if (formData.fullName.trim().length < 2) nextErrors.fullName = "Please enter your name.";
      if (!emailPattern.test(formData.workEmail.trim())) {
        nextErrors.workEmail = "Please enter a valid work email.";
      }
      if (formData.company.trim().length < 2) nextErrors.company = "Please enter your company name.";
      const phoneDigits = digitsOnly(formData.phone);
      if (!phoneDigits) {
        nextErrors.phone = "Please enter your phone number.";
      } else if (phoneDigits.length < 6 || phoneDigits.length > 15) {
        nextErrors.phone = "Enter a valid phone number.";
      }
    }

    if (currentStep === 1) {
      if (!formData.companyStage) nextErrors.companyStage = "Choose the option that best describes your company.";
      if (!formData.teamSize) nextErrors.teamSize = "Choose your current team size.";
      if (!formData.payroll) nextErrors.payroll = "Let us know whether you currently run payroll.";
      if (formData.services.length === 0) nextErrors.services = "Choose at least one area where you need help.";
    }

    if (currentStep === 2 && contactMode === "phone") {
      if (!formData.timeline) nextErrors.timeline = "Choose a preferred timeframe.";
      if (!formData.callWindow) nextErrors.callWindow = "Choose the best part of the day for a call.";
      if (!formData.privacy) nextErrors.privacy = "Please confirm that KRS may contact you about this request.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const moveBack = () => {
    setDirection(-1);
    setErrors({});
    setStep((current) => Math.max(0, current - 1));
  };

  const leadPayload = (booking: "phone_call" | "microsoft_bookings") => ({
    ...formData,
    workEmail: formData.workEmail.trim().toLowerCase(),
    phone: formatPhoneForSubmit(formData.phone),
    industry: formData.industry || "Other",
    timeline: booking === "phone_call" ? formData.timeline : "",
    callWindow: booking === "phone_call" ? formData.callWindow : "",
    notes: booking === "phone_call" ? formData.notes : "",
    booking,
  });

  const sendLead = async (booking: "phone_call" | "microsoft_bookings") => {
    if (sentBookings.current.has(booking)) return true;
    sentBookings.current.add(booking);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload(booking)),
      });

      if (response.ok) return true;
      sentBookings.current.delete(booking);
      return response.status;
    } catch {
      sentBookings.current.delete(booking);
      return 0;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep(step) || step >= 2) return;

    setDirection(1);
    setStep((current) => current + 1);
  };

  const requestPhoneCall = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep(2) || status === "submitting") return;

    setStatus("submitting");
    await sendLead("phone_call");
    setStatus("success");
  };

  if (status === "success") {
    const firstName = formData.fullName.trim().split(/\s+/)[0];

    return (
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <Check className="size-6" strokeWidth={2} />
        </span>
        <p className="mono-label mt-8 text-secondary">{tx("Consultation request")}</p>
        <h2 className={cn("mt-4 max-w-xl text-balance font-medium leading-tight", compact ? "text-3xl" : "text-4xl sm:text-5xl")}>
          {locale === "el" ? "Ευχαριστούμε" : "Thank you"}
          {firstName ? `, ${firstName}` : ""}.
        </h2>
        <p className={cn("mt-5 max-w-xl text-muted-foreground", compact ? "text-sm leading-6" : "text-base leading-7 sm:text-lg sm:leading-8")}>
          {locale === "el" ? "Θα σας καλέσουμε" : "We will call you"} {callSummary(formData.timeline, formData.callWindow, locale)}.
        </p>
        <div className="mt-9 flex flex-col gap-3 border-t border-primary/14 pt-7 sm:flex-row">
          <Link
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary/20 px-6 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px"
            href={href("/")}
          >
            {tx("Return to KRS")}
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <ol aria-label={tx("Consultation request progress")} className="grid grid-cols-3 gap-3 border-b border-primary/14 pb-4">
        {progressLabels.map((label, index) => (
          <li
            aria-current={step === index ? "step" : undefined}
            className={cn(
              "text-xs font-semibold text-muted-foreground transition-colors sm:text-sm",
              index <= step && "text-primary"
            )}
            key={label}
          >
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/18 font-mono text-[0.62rem]",
                  index < step && "border-primary bg-primary text-primary-foreground",
                  index === step && "border-secondary bg-secondary text-secondary-foreground"
                )}
              >
                {index < step ? <Check className="size-3" strokeWidth={2.25} /> : index + 1}
              </span>
              <span className="leading-4">{tx(label)}</span>
            </span>
          </li>
        ))}
      </ol>

      {step < 2 && (
      <form className={compact ? "mt-6" : "mt-8"} noValidate onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          className="absolute -left-[9999px]"
          name="website"
          onChange={(event) => updateField("website", event.target.value)}
          tabIndex={-1}
          type="text"
          value={formData.website}
        />

        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            custom={direction}
            exit={{ opacity: 0, x: prefersReducedMotion ? 0 : direction > 0 ? -22 : 22 }}
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : direction > 0 ? 22 : -22 }}
            key={step}
            transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <div>
                <p className="mono-label text-secondary">{tx("A few essentials")}</p>
                <h2
                  className={cn(
                    "mt-4 text-balance font-medium leading-tight",
                    compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl",
                  )}
                  ref={headingRef}
                  tabIndex={-1}
                >
                  {tx("Let's make the first call useful.")}
                </h2>
                <p
                  className={cn(
                    "mt-4 max-w-xl text-muted-foreground",
                    compact ? "text-sm leading-6" : "leading-7",
                  )}
                >
                  {tx("We use these details to match you with the right advisor and reply personally.")}
                </p>

                <div className={cn("grid gap-x-5 gap-y-6 sm:grid-cols-2", compact ? "mt-6" : "mt-8")}>
                  <TextField
                    autoComplete="name"
                    error={errors.fullName}
                    label="Your name"
                    name="fullName"
                    onChange={(value) => updateField("fullName", value)}
                    placeholder="Full name"
                    value={formData.fullName}
                  />
                  <TextField
                    autoComplete="organization"
                    error={errors.company}
                    label="Company"
                    name="company"
                    onChange={(value) => updateField("company", value)}
                    placeholder="Company name"
                    value={formData.company}
                  />
                  <EmailField
                    error={errors.workEmail}
                    label="Work email"
                    name="workEmail"
                    onBlur={(value) => updateField("workEmail", value.trim().toLowerCase())}
                    onChange={(value) => updateField("workEmail", value.replace(/\s/g, ""))}
                    value={formData.workEmail}
                  />
                  <PhoneField
                    error={errors.phone}
                    onPhoneChange={(value) => updateField("phone", digitsOnly(value))}
                    phone={formData.phone}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <p className="mono-label text-secondary">{tx("Your business")}</p>
                <h2
                  className={cn(
                    "mt-4 text-balance font-medium leading-tight",
                    compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl",
                  )}
                  ref={headingRef}
                  tabIndex={-1}
                >
                  {tx("Give us the shape of your business.")}
                </h2>
                <p
                  className={cn(
                    "mt-4 max-w-xl text-muted-foreground",
                    compact ? "text-sm leading-6" : "leading-7",
                  )}
                >
                  {tx("A quick profile helps us bring the right tax, accounting, or payroll context to the call.")}
                </p>

                <div className={cn("grid", compact ? "mt-6 gap-5" : "mt-8 gap-7")}>
                  <OptionGroup
                    error={errors.companyStage}
                    label="Where are you today?"
                    onSelect={(value) => updateField("companyStage", value)}
                    options={companyStages}
                    value={formData.companyStage}
                  />
                  <OptionGroup
                    error={errors.teamSize}
                    label="How large is the team?"
                    onSelect={(value) => updateField("teamSize", value)}
                    options={teamSizes}
                    value={formData.teamSize}
                  />

                  <div className="grid items-start gap-6 sm:grid-cols-2">
                    <label className={fieldLabelClassName} htmlFor="industry">
                      {tx("Industry (optional)")}
                      <select
                        className={cn(
                          "mt-2 h-12 w-full appearance-none px-4 text-left outline-none",
                          choiceControlClassName
                        )}
                        id="industry"
                        onChange={(event) => updateField("industry", event.target.value)}
                        value={formData.industry}
                      >
                        <option value="">{tx("Select your industry")}</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>
                            {tx(industry)}
                          </option>
                        ))}
                      </select>
                    </label>
                    <OptionGroup
                      columns="grid-cols-2"
                      error={errors.payroll}
                      label="Do you run payroll?"
                      onSelect={(value) => updateField("payroll", value)}
                      options={payrollOptions}
                      value={formData.payroll}
                    />
                  </div>

                  <MultiOptionGroup
                    error={errors.services}
                    label="What should we help with?"
                    onToggle={(value) => {
                      const services = formData.services.includes(value)
                        ? formData.services.filter((service) => service !== value)
                        : [...formData.services, value];
                      updateField("services", services);
                    }}
                    options={serviceOptions}
                    values={formData.services}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step < 2 && (
          <div className={cn("flex items-center justify-between gap-4 border-t border-primary/14", compact ? "mt-7 pt-5" : "mt-9 pt-6")}>
            {step > 0 ? (
              <button
                className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-primary transition hover:bg-primary/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px sm:px-4"
                onClick={moveBack}
                type="button"
              >
                <ArrowLeft className="size-4" strokeWidth={1.75} />
                {tx("Back")}
              </button>
            ) : (
              <span />
            )}

            <button
              className="inline-flex h-12 min-w-36 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px"
              type="submit"
            >
              {tx("Continue")}
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </button>
          </div>
        )}
      </form>
      )}

      {step === 2 && (
        <div className={compact ? "mt-6" : "mt-8"}>
          <p className="mono-label text-secondary">{tx("The call")}</p>
          <h2
            className={cn(
              "mt-4 text-balance font-medium leading-tight",
              compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl",
            )}
            ref={headingRef}
            tabIndex={-1}
          >
            {tx("When should we talk?")}
          </h2>
          <p
            className={cn(
              "mt-4 max-w-xl text-muted-foreground",
              compact ? "text-sm leading-6" : "leading-7",
            )}
          >
            {tx("Ask us to phone you at a time that suits you, or book an exact slot on our calendar.")}
          </p>

          <div className={cn("grid gap-3 sm:grid-cols-2", compact ? "mt-6" : "mt-8")} role="group" aria-label={tx("How should we talk?")}>
            <button
              aria-pressed={contactMode === "phone"}
              className={cn(
                "flex min-h-28 flex-col items-start gap-2 px-4 py-4 text-left active:translate-y-px",
                choiceControlClassName,
                contactMode === "phone" && "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              )}
              onClick={() => {
                setContactMode("phone");
                setStatus("idle");
              }}
              type="button"
            >
              <span className="flex items-center gap-2">
                <Phone className="size-4" strokeWidth={1.75} />
                {tx("Phone me")}
              </span>
              <span className={cn("text-sm font-normal leading-5", contactMode === "phone" ? "text-primary-foreground/78" : "text-muted-foreground")}>
                {tx("Choose a day window and a time of day. We will call you then.")}
              </span>
            </button>
            <button
              aria-pressed={contactMode === "calendar"}
              className={cn(
                "flex min-h-28 flex-col items-start gap-2 px-4 py-4 text-left active:translate-y-px",
                choiceControlClassName,
                contactMode === "calendar" && "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              )}
              onClick={() => {
                setContactMode("calendar");
                setStatus("idle");
                setErrors({});
              }}
              type="button"
            >
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4" strokeWidth={1.75} />
                {tx("Book on the calendar")}
              </span>
              <span className={cn("text-sm font-normal leading-5", contactMode === "calendar" ? "text-primary-foreground/78" : "text-muted-foreground")}>
                {tx("Pick an exact time. The calendar opens in a new window.")}
              </span>
            </button>
          </div>

          {contactMode === "phone" && (
            <form className={cn("grid", compact ? "mt-6 gap-5" : "mt-8 gap-7")} noValidate onSubmit={requestPhoneCall}>
              <OptionGroup
                columns="sm:grid-cols-3"
                error={errors.timeline}
                label="Preferred timeframe"
                onSelect={(value) => updateField("timeline", value)}
                options={timelineOptions}
                value={formData.timeline}
              />
              <OptionGroup
                columns="sm:grid-cols-3"
                error={errors.callWindow}
                label="Best part of the day (Athens time)"
                onSelect={(value) => updateField("callWindow", value)}
                options={callWindows}
                value={formData.callWindow}
              />
              <label className={fieldLabelClassName} htmlFor="notes">
                {tx("Anything we should know before the call? (optional)")}
                <textarea
                  className={cn(inputClassName, "h-28 resize-none py-3 leading-6")}
                  id="notes"
                  maxLength={1000}
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder={tx("A deadline, current challenge, or question you want us to prepare for.")}
                  value={formData.notes}
                />
              </label>
              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-muted-foreground">
                  <input
                    checked={formData.privacy}
                    className="mt-1 size-4 shrink-0 accent-[#AE882F]"
                    onChange={(event) => updateField("privacy", event.target.checked)}
                    type="checkbox"
                  />
                  <span>{tx("I agree that KRS may contact me about this consultation request.")}</span>
                </label>
                {errors.privacy && <FieldError>{errors.privacy}</FieldError>}
              </div>
              <div className="flex justify-end">
                <button
                  className="inline-flex h-12 min-w-36 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px disabled:cursor-wait disabled:opacity-65"
                  disabled={status === "submitting"}
                  type="submit"
                >
                  {status === "submitting" ? (
                    <>
                      {tx("Sending")}
                      <RotateCcw className="size-4 animate-spin" strokeWidth={1.75} />
                    </>
                  ) : (
                    <>
                      {tx("Request my call")}
                      <ArrowRight className="size-4" strokeWidth={1.75} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {contactMode === "calendar" && (
            <div className={cn("border border-primary/12 px-5 py-5", compact ? "mt-6" : "mt-8")}>
              <p className={cn("max-w-xl text-muted-foreground", compact ? "text-sm leading-6" : "leading-7")}>
                {tx("The call is booked as soon as you choose a time, and you will get a confirmation invite.")}
              </p>
              <a
                className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px"
                href={bookingsPageUrl}
                onClick={() => {
                  void sendLead("microsoft_bookings");
                }}
                rel="noreferrer"
                target="_blank"
              >
                {tx("Open calendar")}
                <ExternalLink className="size-4" strokeWidth={1.75} />
              </a>
            </div>
          )}

          <div className={cn("border-t border-primary/14", compact ? "mt-7 pt-5" : "mt-9 pt-6")}>
            <button
              className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-primary transition hover:bg-primary/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px sm:px-4"
              onClick={moveBack}
              type="button"
            >
              <ArrowLeft className="size-4" strokeWidth={1.75} />
              {tx("Back")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TextField({
  label,
  name,
  value,
  placeholder,
  error,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
  type?: "text";
  autoComplete?: string;
}) {
  const { tx } = useI18n();

  return (
    <label className={fieldLabelClassName} htmlFor={name}>
      {tx(label)}
      <input
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className={inputClassName}
        id={name}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={tx(placeholder)}
        type={type}
        value={value}
      />
      {error && <FieldError>{error}</FieldError>}
    </label>
  );
}

function EmailField({
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
}: {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
}) {
  const { tx } = useI18n();
  const errorId = `${name}-error`;

  return (
    <label className={fieldLabelClassName} htmlFor={name}>
      {tx(label)}
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        autoCapitalize="off"
        autoComplete="email"
        autoCorrect="off"
        className={inputClassName}
        enterKeyHint="next"
        id={name}
        inputMode="email"
        maxLength={254}
        name={name}
        onBlur={(event) => onBlur(event.target.value)}
        onChange={(event) => onChange(event.target.value)}
        placeholder="you@company.com"
        spellCheck={false}
        type="email"
        value={value}
      />
      {error && (
        <FieldError id={errorId}>{error}</FieldError>
      )}
    </label>
  );
}

function PhoneField({
  phone,
  error,
  onPhoneChange,
}: {
  phone: string;
  error?: string;
  onPhoneChange: (value: string) => void;
}) {
  const { tx } = useI18n();
  const errorId = "phone-error";

  return (
    <label className={fieldLabelClassName}>
      {tx("Phone")}
      <div className="mt-2 flex">
        <span
          aria-hidden="true"
          className="flex h-12 shrink-0 items-center border border-r-0 border-primary/20 px-3 text-sm font-semibold text-foreground"
        >
          +30
        </span>
        <input
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          aria-required
          autoComplete="tel-national"
          className="h-12 w-full min-w-0 border border-primary/20 bg-transparent px-4 text-base font-normal text-foreground outline-none transition placeholder:font-normal placeholder:text-muted-foreground/55 hover:border-primary/38 focus-visible:border-secondary focus-visible:ring-3 focus-visible:ring-secondary/18"
          enterKeyHint="next"
          id="phone"
          inputMode="numeric"
          maxLength={15}
          name="phone"
          onChange={(event) => onPhoneChange(event.target.value)}
          onKeyDown={(event) => {
            const allowedKeys = [
              "Backspace",
              "Delete",
              "ArrowLeft",
              "ArrowRight",
              "ArrowUp",
              "ArrowDown",
              "Tab",
              "Home",
              "End",
              "Enter",
            ];
            if (allowedKeys.includes(event.key) || event.metaKey || event.ctrlKey) return;
            if (!/^\d$/.test(event.key)) event.preventDefault();
          }}
          onPaste={(event) => {
            event.preventDefault();
            onPhoneChange(digitsOnly(event.clipboardData.getData("text")));
          }}
          pattern="[0-9]*"
          placeholder="6912345678"
          spellCheck={false}
          type="tel"
          value={phone}
        />
      </div>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </label>
  );
}

function OptionGroup({
  label,
  options,
  value,
  onSelect,
  error,
  columns = "sm:grid-cols-2",
}: {
  label: string;
  options: readonly string[];
  value: string;
  onSelect: (value: string) => void;
  error?: string;
  columns?: string;
}) {
  const { tx } = useI18n();

  return (
    <fieldset className={fieldsetClassName}>
      <legend className={cn(fieldLabelClassName, "w-full max-w-full px-0 ps-0")}>{tx(label)}</legend>
      <div className={cn("mt-2 grid gap-2", columns)}>
        {options.map((option) => {
          const selected = value === option;

          return (
            <button
              aria-pressed={selected}
              className={cn(
                "flex min-h-12 items-center justify-between gap-3 px-4 py-3 text-left active:translate-y-px",
                choiceControlClassName,
                selected && "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              )}
              key={option}
              onClick={() => onSelect(option)}
              type="button"
            >
              <span>{tx(option)}</span>
              {selected && <Check className="size-4 shrink-0 text-secondary" strokeWidth={2.25} />}
            </button>
          );
        })}
      </div>
      {error && <FieldError>{error}</FieldError>}
    </fieldset>
  );
}

function MultiOptionGroup({
  label,
  options,
  values,
  onToggle,
  error,
}: {
  label: string;
  options: readonly string[];
  values: string[];
  onToggle: (value: string) => void;
  error?: string;
}) {
  const { tx } = useI18n();

  return (
    <fieldset className={fieldsetClassName}>
      <legend className={cn(fieldLabelClassName, "w-full max-w-full px-0 ps-0")}>{tx(label)}</legend>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = values.includes(option);

          return (
            <button
              aria-pressed={selected}
              className={cn(
                "flex min-h-12 items-center justify-between gap-3 px-4 py-3 text-left active:translate-y-px",
                choiceControlClassName,
                selected && "border-secondary bg-secondary/12"
              )}
              key={option}
              onClick={() => onToggle(option)}
              type="button"
            >
              <span>{tx(option)}</span>
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center border border-primary/22",
                  selected && "border-secondary bg-secondary text-secondary-foreground"
                )}
              >
                {selected && <Check className="size-3.5" strokeWidth={2.25} />}
              </span>
            </button>
          );
        })}
      </div>
      {error && <FieldError>{error}</FieldError>}
    </fieldset>
  );
}

function FieldError({ children, id }: { children: string; id?: string }) {
  const { tx } = useI18n();

  return (
    <span className="mt-2 block text-xs font-medium leading-5 text-destructive" id={id} role="alert">
      {tx(children)}
    </span>
  );
}
