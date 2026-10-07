"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronRight, Languages, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useI18n } from "@/i18n/provider";
import { withLocale, type Locale } from "@/i18n/locale";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MegaMenuLink = {
  label: string;
  description?: string;
  href: string;
};

type MegaMenuColumn = {
  title?: string;
  links: MegaMenuLink[];
};

type MegaMenuFeature = MegaMenuLink & {
  eyebrow: string;
};

type MegaNavItem = {
  label: string;
  columns: MegaMenuColumn[];
  features?: MegaMenuFeature[];
  ctaLabel: string;
  ctaHref: string;
  hidden?: boolean;
};

const easeOut = [0.16, 1, 0.3, 1] as const;

const navItems: MegaNavItem[] = [
  {
    label: "Services",
    ctaLabel: "Book an initial free consultation",
    ctaHref: "/onboarding",
    columns: [
      {
        links: [
          {
            label: "Accounting",
            description: "Digital accounting for businesses - formation, records, finance and closure",
            href: "/services/accounting",
          },
          {
            label: "Tax Advisory",
            description: "Personal advice on our platform - tax strategy, advice and audit",
            href: "/services/tax-advisory",
          },
          {
            label: "Payroll Accounting",
            description: "Accurate payroll fully integrated - cost strategy and program participation",
            href: "/services/payroll",
          },
          {
            label: "Funding & Grants",
            description: "Local and European grants - we help you find the right funding",
            href: "/services/funding-grants",
          },
          {
            label: "Consulting Services",
            description: "Business plan, funding, and business development support",
            href: "/services/consulting",
          },
        ],
      },
    ],
    features: [
      {
        eyebrow: "Guide",
        label: "Taxes, Accounting, and Tips for Starting a Business",
        description: "A practical entry point for founders and operators.",
        href: "/#field-notes",
      },
    ],
  },
  {
    hidden: true,
    label: "Industries",
    ctaLabel: "Book a free demo",
    ctaHref: "/onboarding",
    columns: [
      {
        title: "By company type",
        links: [
          { label: "Tax Advisory for UG", description: "Tailored tax advice for your UG", href: "/onboarding" },
          {
            label: "Tax Advisory for GmbH",
            description: "Custom tax advice for limited liability companies",
            href: "/onboarding",
          },
          {
            label: "Tax Advisory for Holding",
            description: "Specialized advice for holding structures",
            href: "/onboarding",
          },
          {
            label: "Tax Advisory for Startups",
            description: "Smart tax support for your startup",
            href: "/onboarding",
          },
          {
            label: "Tax Advisory for Companies",
            description: "Personal tax advice for SMEs",
            href: "/onboarding",
          },
          {
            label: "Tax Advisory for Founders",
            description: "Professional guidance from day one",
            href: "/onboarding",
          },
        ],
      },
    ],
    features: [
      {
        eyebrow: "Learn more",
        label: "Tax Advisor Costs",
        description: "The costs of a tax advisor explained.",
        href: "/#field-notes",
      },
      {
        eyebrow: "Learn more",
        label: "Tax Advisor Obligation",
        description: "Is a tax advisor mandatory?",
        href: "/#faq",
      },
    ],
  },
  {
    hidden: true,
    label: "Guides",
    ctaLabel: "Explore our guides",
    ctaHref: "/#field-notes",
    columns: [
      {
        title: "Tax Advisory",
        links: [
          { label: "Tax Advisor Search", href: "/#field-notes" },
          { label: "Tax Advisor Costs", href: "/#field-notes" },
          { label: "Tax Advisor Switch", href: "/#field-notes" },
          { label: "Free tax advice", href: "/#field-notes" },
          { label: "Do I need a tax advisor?", href: "/#faq" },
        ],
      },
      {
        title: "Bookkeeping",
        links: [
          { label: "Bookkeeper search", href: "/#field-notes" },
          { label: "Bookkeeping costs", href: "/#field-notes" },
          { label: "Bookkeeping outsourcing", href: "/#field-notes" },
          { label: "Bookkeeping UG", href: "/#field-notes" },
          { label: "Bookkeeping GmbH", href: "/#field-notes" },
        ],
      },
      {
        title: "Tax tips",
        links: [
          { label: "Tax return documents", href: "/#field-notes" },
          { label: "Deducting tax consulting costs", href: "/#field-notes" },
          { label: "Common questions about tax advisors", href: "/#faq" },
          { label: "When should I consult a tax advisor?", href: "/#faq" },
          { label: "Tax Advisor Comparison", href: "/#field-notes" },
        ],
      },
    ],
    features: [
      {
        eyebrow: "Learn more",
        label: "Cost calculator",
        description: "Calculate costs for tax consulting and accounting.",
        href: "/onboarding",
      },
      {
        eyebrow: "Learn more",
        label: "Digital tax advice",
        description: "Benefits and practical tips.",
        href: "/#services",
      },
    ],
  },
  {
    label: "About Us",
    ctaLabel: "Book an initial free consultation",
    ctaHref: "/onboarding",
    columns: [
      {
        links: [
          { label: "About us", description: "KRS AI's story and mission", href: "/about" },
          { label: "Why KRS AI?", description: "Benefits of our platform and advice", href: "/why" },
          { label: "Careers", description: "Open positions at KRS AI", href: "/careers" },
          { label: "Contact us", description: "Personal contact with our team", href: "/onboarding" },
        ],
      },
    ],
    features: [
      {
        eyebrow: "Careers",
        label: "Open positions",
        description: "Your start at KRS AI.",
        href: "/careers",
      },
    ],
  },
  {
    label: "Pricing",
    ctaLabel: "Find your plan",
    ctaHref: "/pricing",
    columns: [
      {
        links: [
          {
            label: "Pricing plans",
            description: "Clear monthly plans for Greek businesses.",
            href: "/pricing",
          },
          {
            label: "Pricing calculator",
            description: "Estimate a plan based on your operating needs.",
            href: "/pricing#calculator",
          },
        ],
      },
    ],
  },
  {
    label: "Blog",
    ctaLabel: "Read all articles",
    ctaHref: "/#field-notes",
    columns: [
      {
        title: "Latest articles",
        links: [
          {
            label: "VAT and myDATA changes Greek SMEs should track.",
            description: "News / 08 min",
            href: "/#field-notes",
          },
          {
            label: "How to keep myDATA current through the year.",
            description: "Guide / 11 min",
            href: "/#field-notes",
          },
          {
            label: "The tax question founders ask too late.",
            description: "Insight / 17 min",
            href: "/#field-notes",
          },
        ],
      },
      {
        title: "Browse topics",
        links: [
          { label: "Accounting", href: "/#field-notes" },
          { label: "Payroll", href: "/#field-notes" },
          { label: "Tax Filings", href: "/#field-notes" },
          { label: "Tax tips", href: "/#field-notes" },
        ],
      },
    ],
    features: [
      {
        eyebrow: "Guide Hub",
        label: "Taxes, Accounting, and Tips for Starting a Business",
        description: "A founder-friendly resource path.",
        href: "/#field-notes",
      },
      {
        eyebrow: "Press",
        label: "Known from",
        description: "Media, updates, and public notes from KRS AI.",
        href: "/#media",
      },
    ],
  },
];

const languageOptions = [
  { value: "el", label: "Greek", native: "Ελληνικά", available: true },
  { value: "en", label: "English", native: "English", available: true },
  { value: "he", label: "Hebrew", native: "עברית", available: false },
  { value: "ar", label: "Arabic", native: "العربية", available: false },
  { value: "zh", label: "Chinese", native: "中文", available: false },
] as const;

type LanguageValue = (typeof languageOptions)[number]["value"];
type MobileView = "menu" | "languages";

const clientLogin = "https://krs-platform-staging-6xbnf.ondigitalocean.app/portal/login";

const mobileLinks = [
  { label: "Accounting", href: "/services/accounting" },
  { label: "Tax Advisory", href: "/services/tax-advisory" },
  { label: "Payroll", href: "/services/payroll" },
  { label: "Consulting", href: "/services/consulting" },
  { label: "Funding & Grants", href: "/services/funding-grants" },
  { label: "Pricing", href: "/pricing" },
  { label: "Why KRS AI", href: "/why" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/#field-notes" },
] as const;

const pageVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%" }),
  center: { x: "0%" },
  exit: (direction: number) => ({ x: direction > 0 ? "-100%" : "100%" }),
};

export function SiteHeader() {
  const { locale, pathname, tx, href } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>("menu");
  const [direction, setDirection] = useState(1);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const showingLanguages = menuOpen && mobileView === "languages";

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (showingLanguages) {
      backButtonRef.current?.focus();
    }
  }, [showingLanguages]);

  function openLanguages() {
    setDirection(1);
    setMobileView("languages");
  }

  function showMenu() {
    setDirection(-1);
    setMobileView("menu");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function onLanguageChange(value: LanguageValue) {
    if (value !== "el" && value !== "en") return;

    const hash = window.location.hash;
    window.location.assign(withLocale(value as Locale, `${pathname}${hash}`));
    closeMenu();
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 px-4 transition-[background-color,border-color,backdrop-filter] duration-300 sm:px-6 lg:px-12",
          menuOpen
            ? "border-b border-transparent bg-transparent"
            : "border-b border-primary/12 bg-background/88 backdrop-blur-xl",
        )}
      >
        <nav className="relative mx-auto flex h-18 max-w-[1400px] items-center justify-between">
          {showingLanguages ? (
            <button
              aria-label={tx("Back to menu")}
              className="flex size-11 items-center justify-center rounded-full bg-primary-foreground text-primary"
              onClick={showMenu}
              ref={backButtonRef}
              type="button"
            >
              <ArrowLeft className="size-5" strokeWidth={1.75} />
            </button>
          ) : (
            <Link aria-label={tx("KRS AI home")} className="flex items-center" href={href("/")}>
              <Image
                alt="KRS AI"
                className="h-14 w-auto"
                height={416}
                priority
                src={menuOpen ? "/logos/Full%20logo.svg" : "/logos/Full%20logo%20Dark.png"}
                unoptimized
                width={1008}
              />
            </Link>
          )}
          <div className="hidden h-full items-center gap-2 lg:flex">
            {navItems
              .filter((item) => !item.hidden)
              .map((item) => (
                <HeaderMegaNavItem item={item} key={item.label} />
              ))}
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "hidden items-center gap-2 border-l border-primary/12 pl-4 lg:flex",
                menuOpen && "lg:hidden",
              )}
            >
              <LanguageSelect id="site-language" onChange={onLanguageChange} value={locale} />
            </div>
            <Button
              asChild
              className={cn("hidden h-10 rounded-full px-5 sm:inline-flex", menuOpen && "sm:hidden")}
              variant="ghost"
            >
              <a href={clientLogin}>{tx("Client login")}</a>
            </Button>
            <Button asChild className={cn("hidden h-10 rounded-full px-5 shadow-sm sm:inline-flex", menuOpen && "sm:hidden")}>
              <a href={href("/onboarding")}>
                {tx("Contact")}
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </a>
            </Button>
            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? tx("Close menu") : tx("Open menu")}
              className={cn(
                "flex size-11 items-center justify-center rounded-full transition-colors duration-300 lg:hidden",
                menuOpen
                  ? "bg-primary-foreground text-primary"
                  : "bg-primary text-primary-foreground",
              )}
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              {menuOpen ? <X className="size-5" strokeWidth={1.75} /> : <Menu className="size-5" strokeWidth={1.75} />}
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        direction={direction}
        language={locale}
        onClose={closeMenu}
        onExitComplete={() => setMobileView("menu")}
        onLanguageChange={onLanguageChange}
        onOpenLanguages={openLanguages}
        open={menuOpen}
        view={mobileView}
      />
    </>
  );
}

function LanguageSelect({
  id,
  value,
  onChange,
}: {
  id: string;
  value: LanguageValue;
  onChange: (value: LanguageValue) => void;
}) {
  const { tx } = useI18n();

  return (
    <>
      <label className="sr-only" htmlFor={id}>
        {tx("Select language")}
      </label>
      <Languages className="size-3.5 shrink-0 text-secondary" strokeWidth={1.75} />
      <div className="relative">
        <select
          aria-label={tx("Select language")}
          className="h-9 w-[132px] appearance-none rounded-full border border-primary/12 bg-background py-0 pl-3 pr-8 text-xs font-semibold text-foreground outline-none transition hover:border-primary/25 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          id={id}
          onChange={(event) => onChange(event.target.value as LanguageValue)}
          value={value}
        >
          {languageOptions.map((option) => (
            <option disabled={!option.available} key={option.value} value={option.value}>
              {option.native}
              {option.available ? "" : ` · ${tx("Later")}`}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-muted-foreground"
          strokeWidth={1.75}
        />
      </div>
    </>
  );
}

const menuItemClass =
  "flex w-full items-center justify-between gap-4 border-b border-primary-foreground/10 py-4 text-left font-heading text-3xl font-normal tracking-[-0.03em]";

function MobileMenu({
  open,
  view,
  direction,
  language,
  onOpenLanguages,
  onLanguageChange,
  onClose,
  onExitComplete,
}: {
  open: boolean;
  view: MobileView;
  direction: number;
  language: LanguageValue;
  onOpenLanguages: () => void;
  onLanguageChange: (value: LanguageValue) => void;
  onClose: () => void;
  onExitComplete: () => void;
}) {
  const reduce = useReducedMotion();
  const { tx, href } = useI18n();
  const currentLanguage = languageOptions.find((option) => option.value === language) ?? languageOptions[0];

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {open ? (
        <motion.div
          animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
          className="fixed inset-0 z-40 overflow-hidden bg-primary text-primary-foreground lg:hidden"
          exit={{ clipPath: "inset(0% 0% 100% 0% round 0px)" }}
          initial={reduce ? false : { clipPath: "inset(0% 0% 100% 0% round 0px)" }}
          transition={{ duration: reduce ? 0 : 0.6, ease: easeOut }}
        >
          <AnimatePresence custom={direction} initial={false}>
            {view === "menu" ? (
              <motion.div
                animate="center"
                className="absolute inset-0 flex flex-col overflow-y-auto px-6 pb-10 pt-28"
                custom={direction}
                exit="exit"
                initial={reduce ? "center" : "enter"}
                key="menu"
                transition={{ duration: reduce ? 0 : 0.45, ease: easeOut }}
                variants={reduce ? undefined : pageVariants}
              >
                <nav aria-label="Mobile" className="flex flex-col">
                  {mobileLinks.map((item, index) => (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      initial={reduce || direction < 0 ? false : { opacity: 0, y: 24 }}
                      key={item.href + item.label}
                      transition={{ duration: reduce ? 0 : 0.6, delay: reduce || direction < 0 ? 0 : 0.15 + index * 0.04, ease: easeOut }}
                    >
                      <Link className={menuItemClass} href={href(item.href)} onClick={onClose}>
                        {tx(item.label)}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={reduce || direction < 0 ? false : { opacity: 0, y: 24 }}
                    transition={{
                      duration: reduce ? 0 : 0.6,
                      delay: reduce || direction < 0 ? 0 : 0.15 + mobileLinks.length * 0.04,
                      ease: easeOut,
                    }}
                  >
                    <button className={menuItemClass} onClick={onOpenLanguages} type="button">
                      <span>{tx("Language")}</span>
                      <span className="flex shrink-0 items-center gap-1 font-sans text-sm font-medium tracking-normal text-primary-foreground/60">
                        {currentLanguage.native}
                        <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                      </span>
                    </button>
                  </motion.div>
                </nav>

                <div className="mt-auto flex flex-col gap-4 pt-10">
                  <Button asChild className="h-12 w-full rounded-full bg-primary-foreground px-6 text-primary hover:bg-primary-foreground/90">
                    <a href={href("/onboarding")} onClick={onClose}>
                      {tx("Contact")}
                      <ArrowRight className="size-4" strokeWidth={1.75} />
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="h-12 w-full rounded-full border-primary-foreground/40 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    variant="outline"
                  >
                    <a href={clientLogin} onClick={onClose}>
                      {tx("Client login")}
                    </a>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                animate="center"
                className="absolute inset-0 overflow-y-auto px-6 pb-10 pt-28"
                custom={direction}
                exit="exit"
                initial={reduce ? "center" : "enter"}
                key="languages"
                transition={{ duration: reduce ? 0 : 0.45, ease: easeOut }}
                variants={reduce ? undefined : pageVariants}
              >
                <nav aria-label="Languages" className="flex flex-col">
                  {languageOptions.map((option, index) => {
                    const selected = option.value === language;

                    return (
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        initial={reduce ? false : { opacity: 0, y: 24 }}
                        key={option.value}
                        transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.08 + index * 0.04, ease: easeOut }}
                      >
                        <button
                          aria-current={selected ? "true" : undefined}
                          className={menuItemClass}
                          disabled={!option.available}
                          onClick={() => onLanguageChange(option.value)}
                          type="button"
                        >
                          <span className="min-w-0">
                            <span className="block" lang={option.value}>
                              {option.native}
                            </span>
                            {option.native === option.label ? null : (
                              <span className="mt-1 block font-sans text-sm font-medium tracking-normal text-primary-foreground/55">
                                {option.available ? option.label : tx("Later")}
                              </span>
                            )}
                          </span>
                          {selected ? (
                            <Check aria-hidden="true" className="size-5 shrink-0 text-secondary" strokeWidth={1.75} />
                          ) : null}
                        </button>
                      </motion.div>
                    );
                  })}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function megaMenuPanelWidth(item: MegaNavItem, hasFeaturePanel: boolean) {
  if (!hasFeaturePanel) {
    return "w-[min(420px,calc(100vw-3rem))]";
  }

  if (item.columns.length === 1) {
    return "w-[min(680px,calc(100vw-3rem))]";
  }

  return "w-[min(1040px,calc(100vw-3rem))]";
}

function HeaderMegaNavItem({ item }: { item: MegaNavItem }) {
  const { tx, href } = useI18n();
  const features = item.features ?? [];
  const hasFeaturePanel = features.length > 0;

  return (
    <div className="mega-menu-group flex h-full items-center">
      <button
        aria-haspopup="true"
        className="flex h-full appearance-none items-center gap-1 bg-transparent px-2 text-sm font-medium text-muted-foreground outline-none transition hover:text-foreground focus-visible:text-foreground"
        type="button"
      >
        {tx(item.label)}
        <ChevronDown
          aria-hidden="true"
          className="mega-menu-chevron size-3.5 transition duration-200"
          strokeWidth={1.75}
        />
      </button>
      <div
        className={cn(
          "mega-menu-panel absolute left-1/2 top-full z-50 pt-3 transition duration-200 ease-out",
          megaMenuPanelWidth(item, hasFeaturePanel),
        )}
      >
        <div
          className={cn(
            "grid overflow-hidden border border-primary/15 bg-white shadow-[var(--shadow-xl)]",
            hasFeaturePanel && "lg:grid-cols-[1fr_320px]",
          )}
        >
          <div className="bg-white p-5 sm:p-6">
            <div
              className={cn(
                "grid gap-x-8 gap-y-6",
                item.columns.length > 2
                  ? "lg:grid-cols-3"
                  : item.columns.length > 1
                    ? "md:grid-cols-2"
                    : "grid-cols-1",
              )}
            >
              {item.columns.map((column, columnIndex) => (
                <div key={column.title ?? column.links[0]?.href ?? columnIndex}>
                  {column.title ? <p className="mono-label mb-3 text-muted-foreground">{tx(column.title)}</p> : null}
                  <ul>
                    {column.links.map((link) => (
                      <li className="border-t border-primary/10 first:border-t-0" key={link.label}>
                        <a className="group/link block py-3 outline-none" href={href(link.href)}>
                          <span className="flex items-start justify-between gap-4">
                            <span className="text-sm font-semibold leading-5 text-foreground transition group-hover/link:text-secondary group-focus-visible/link:text-secondary">
                              {tx(link.label)}
                            </span>
                            <ArrowRight
                              aria-hidden="true"
                              className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition group-hover/link:translate-x-0.5 group-hover/link:opacity-100 group-focus-visible/link:opacity-100"
                              strokeWidth={1.75}
                            />
                          </span>
                          {link.description ? (
                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                              {tx(link.description)}
                            </span>
                          ) : null}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {hasFeaturePanel ? (
            <div className="flex min-h-full flex-col justify-between bg-primary p-5 text-primary-foreground sm:p-6">
              <div className="grid gap-3">
                {features.map((feature) => (
                  <a
                    className="group/card block border border-primary-foreground/12 bg-primary-foreground/8 p-4 outline-none transition hover:bg-primary-foreground/12 focus-visible:bg-primary-foreground/12"
                    href={href(feature.href)}
                    key={feature.label}
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span>
                        <span className="mono-label text-secondary">{tx(feature.eyebrow)}</span>
                        <span className="mt-2 block text-base font-semibold leading-5 text-primary-foreground">
                          {tx(feature.label)}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-primary-foreground/40 transition group-hover/card:translate-x-0.5 group-hover/card:text-secondary group-focus-visible/card:text-secondary"
                        strokeWidth={1.75}
                      />
                    </span>
                    <span className="mt-3 block text-xs leading-5 text-primary-foreground/58">
                      {feature.description ? tx(feature.description) : null}
                    </span>
                  </a>
                ))}
              </div>

              <Button asChild className="mt-6 h-11 w-full rounded-full px-5 text-sm font-semibold" variant="secondary">
                <a href={href(item.ctaHref)}>
                  {tx(item.ctaLabel)}
                  <ArrowRight className="size-4" strokeWidth={1.75} />
                </a>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
