"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Mail, RotateCcw } from "lucide-react";
import { useId, useState, type FormEvent } from "react";

import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";

const promises = ["5 min read", "Once a month", "No spam"];

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = { email?: string; consent?: string };

const isEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value.trim());

export function NewsletterSignup() {
  const { tx } = useI18n();
  const id = useId();
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const emailId = `${id}-email`;
  const emailErrorId = `${id}-email-error`;
  const consentErrorId = `${id}-consent-error`;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors: FieldErrors = {
      email: isEmail(email) ? undefined : tx("Enter a valid email address."),
      consent: consent ? undefined : tx("Tick the box so we can send you the letter."),
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.consent) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), consent, website }),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const swap = {
    initial: reduce ? false : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -8 },
    transition: { duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="grid gap-8 border-b border-primary-foreground/12 py-12 lg:grid-cols-12 lg:items-center lg:gap-10"
    >
      <div className="lg:col-span-6">
        <p className="mono-label text-secondary">{tx("KRS Letter")}</p>
        <h2 className="type-h4 mt-4 text-primary-foreground" id={`${id}-title`}>
          {tx("Greek tax changes, before they reach your books.")}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-primary-foreground/68">
          {tx(
            "One email a month from our advisors: new AADE and myDATA rules, the deadlines coming up, and what we are building at KRS.",
          )}
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {promises.map((promise) => (
            <li className="flex items-center gap-2 text-sm text-primary-foreground/68" key={promise}>
              <span className="flex size-4 items-center justify-center rounded-full bg-secondary/20 text-secondary">
                <Check className="size-2.5" strokeWidth={3} />
              </span>
              {tx(promise)}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-5 lg:col-start-8">
        <AnimatePresence initial={false} mode="wait">
          {status === "success" ? (
            <motion.div
              className="flex items-start gap-4 rounded-2xl bg-primary-foreground/[0.06] p-5 ring-1 ring-primary-foreground/12"
              key="success"
              role="status"
              {...swap}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Check className="size-4" strokeWidth={2.5} />
              </span>
              <div>
                <p className="font-semibold text-primary-foreground">{tx("You're on the list.")}</p>
                <p className="mt-1 text-sm leading-6 text-primary-foreground/68">
                  {tx("The next KRS Letter arrives at the start of the month.")}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" noValidate onSubmit={handleSubmit} {...swap}>
              <input
                aria-hidden="true"
                autoComplete="off"
                className="absolute -left-[9999px]"
                name="website"
                onChange={(event) => setWebsite(event.target.value)}
                tabIndex={-1}
                type="text"
                value={website}
              />

              <div
                className={cn(
                  "flex h-14 items-center gap-3 rounded-full bg-primary-foreground/[0.06] pl-5 pr-1.5 ring-1 ring-primary-foreground/16 transition hover:ring-primary-foreground/28 focus-within:ring-2 focus-within:ring-secondary",
                  errors.email && "ring-red-300/70 hover:ring-red-300/70",
                )}
              >
                <Mail aria-hidden="true" className="size-4 shrink-0 text-primary-foreground/48" strokeWidth={1.75} />
                <label className="sr-only" htmlFor={emailId}>
                  {tx("Email address")}
                </label>
                <input
                  aria-describedby={errors.email ? emailErrorId : undefined}
                  aria-invalid={Boolean(errors.email)}
                  autoCapitalize="off"
                  autoComplete="email"
                  autoCorrect="off"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/42"
                  enterKeyHint="send"
                  id={emailId}
                  inputMode="email"
                  maxLength={254}
                  name="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (errors.email && isEmail(event.target.value)) setErrors((current) => ({ ...current, email: undefined }));
                  }}
                  placeholder={tx("Enter your email")}
                  type="email"
                  value={email}
                />
                <button
                  className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-primary-foreground px-5 text-sm font-semibold text-primary transition hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px disabled:cursor-wait disabled:opacity-65"
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
                      {tx("Subscribe")}
                      <ArrowRight className="size-4" strokeWidth={1.75} />
                    </>
                  )}
                </button>
              </div>
              {errors.email && (
                <FieldError className="pl-5" id={emailErrorId}>
                  {errors.email}
                </FieldError>
              )}

              <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm leading-6 text-primary-foreground/68">
                <input
                  aria-describedby={errors.consent ? consentErrorId : undefined}
                  aria-invalid={Boolean(errors.consent)}
                  checked={consent}
                  className="mt-1 size-4 shrink-0 cursor-pointer accent-[#AE882F]"
                  name="consent"
                  onChange={(event) => {
                    setConsent(event.target.checked);
                    if (event.target.checked) setErrors((current) => ({ ...current, consent: undefined }));
                  }}
                  type="checkbox"
                />
                <span>{tx("I agree to receive the KRS Letter and occasional updates from KRS. Unsubscribe anytime.")}</span>
              </label>
              {errors.consent && (
                <FieldError className="pl-7" id={consentErrorId}>
                  {errors.consent}
                </FieldError>
              )}
              {status === "error" && (
                <FieldError className="pl-7">
                  {tx("We couldn't sign you up just now. Try again, or email krs@krs.gr.")}
                </FieldError>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function FieldError({ children, className, id }: { children: string; className?: string; id?: string }) {
  return (
    <span className={cn("mt-2 block text-xs font-medium leading-5 text-red-300", className)} id={id} role="alert">
      {children}
    </span>
  );
}
