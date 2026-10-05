"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Languages, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

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
        title: "Our Services",
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
      {
        title: "Platform Features",
        links: [
          { label: "Meet Tax Deadlines", description: "All deadlines automatically tracked", href: "/#process" },
          { label: "Manage Tax Documents", description: "Documents digitally organized and secure", href: "/#agents" },
          { label: "Get Expert Advice", description: "Direct questions to your tax advisor", href: "/onboarding" },
          { label: "Automated Data Exchange", description: "Seamlessly connect your tools", href: "/#agents" },
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
  { value: "el", label: "Greek" },
  { value: "en", label: "English" },
  { value: "he", label: "Hebrew" },
  { value: "ar", label: "Arabic" },
  { value: "zh", label: "Chinese" },
] as const;

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

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

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
          <Link aria-label="KRS AI home" className="flex items-center" href="/">
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
                "hidden items-center gap-2 border-l border-primary/12 pl-4 sm:flex",
                menuOpen && "sm:hidden",
              )}
            >
              <LanguageSelect id="site-language" />
            </div>
            <Button
              asChild
              className={cn("hidden h-10 rounded-full px-5 sm:inline-flex", menuOpen && "sm:hidden")}
              variant="ghost"
            >
              <a href={clientLogin}>Client login</a>
            </Button>
            <Button asChild className={cn("hidden h-10 rounded-full px-5 shadow-sm sm:inline-flex", menuOpen && "sm:hidden")}>
              <a href="/onboarding">
                Contact
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </a>
            </Button>
            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
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

      <MobileMenu onClose={() => setMenuOpen(false)} open={menuOpen} />
    </>
  );
}

function LanguageSelect({ id, tone = "light" }: { id: string; tone?: "light" | "dark" }) {
  return (
    <>
      <label className="sr-only" htmlFor={id}>
        Select language
      </label>
      <Languages
        className={cn("size-3.5 shrink-0", tone === "dark" ? "text-secondary" : "text-secondary")}
        strokeWidth={1.75}
      />
      <div className="relative">
        <select
          aria-label="Language selector"
          className={cn(
            "h-9 appearance-none rounded-full border py-0 pl-3 pr-8 text-xs font-semibold outline-none transition focus-visible:ring-3",
            tone === "dark"
              ? "w-full border-primary-foreground/16 bg-primary-foreground/8 text-primary-foreground hover:border-primary-foreground/28 focus-visible:border-secondary focus-visible:ring-secondary/30"
              : "w-[118px] border-primary/12 bg-background text-foreground hover:border-primary/25 focus-visible:border-ring focus-visible:ring-ring/50",
          )}
          defaultValue="en"
          id={id}
        >
          {languageOptions.map((language) => (
            <option key={language.value} value={language.value}>
              {language.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2",
            tone === "dark" ? "text-primary-foreground/55" : "text-muted-foreground",
          )}
          strokeWidth={1.75}
        />
      </div>
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-primary px-6 pb-10 pt-28 text-primary-foreground lg:hidden"
          exit={{ clipPath: "inset(0% 0% 100% 0% round 0px)" }}
          initial={reduce ? false : { clipPath: "inset(0% 0% 100% 0% round 0px)" }}
          transition={{ duration: reduce ? 0 : 0.6, ease: easeOut }}
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {mobileLinks.map((item, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                key={item.href + item.label}
                transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.15 + index * 0.04, ease: easeOut }}
              >
                <Link
                  className="block border-b border-primary-foreground/10 py-4 font-heading text-3xl font-normal tracking-[-0.03em]"
                  href={item.href}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-4 pt-10">
            <div className="flex items-center gap-3">
              <LanguageSelect id="mobile-language" tone="dark" />
            </div>
            <Button asChild className="h-12 w-full rounded-full bg-primary-foreground px-6 text-primary hover:bg-primary-foreground/90">
              <a href="/onboarding" onClick={onClose}>
                Contact
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </a>
            </Button>
            <a className="py-2 text-center text-sm text-primary-foreground/68 transition hover:text-primary-foreground" href={clientLogin}>
              Client login
            </a>
          </div>
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
  const features = item.features ?? [];
  const hasFeaturePanel = features.length > 0;

  return (
    <div className="mega-menu-group flex h-full items-center">
      <button
        aria-haspopup="true"
        className="flex h-full appearance-none items-center gap-1 bg-transparent px-2 text-sm font-medium text-muted-foreground outline-none transition hover:text-foreground focus-visible:text-foreground"
        type="button"
      >
        {item.label}
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
                  {column.title ? <p className="mono-label mb-3 text-muted-foreground">{column.title}</p> : null}
                  <ul>
                    {column.links.map((link) => (
                      <li className="border-t border-primary/10 first:border-t-0" key={link.label}>
                        <a className="group/link block py-3 outline-none" href={link.href}>
                          <span className="flex items-start justify-between gap-4">
                            <span className="text-sm font-semibold leading-5 text-foreground transition group-hover/link:text-secondary group-focus-visible/link:text-secondary">
                              {link.label}
                            </span>
                            <ArrowRight
                              aria-hidden="true"
                              className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition group-hover/link:translate-x-0.5 group-hover/link:opacity-100 group-focus-visible/link:opacity-100"
                              strokeWidth={1.75}
                            />
                          </span>
                          {link.description ? (
                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                              {link.description}
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
                    href={feature.href}
                    key={feature.label}
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span>
                        <span className="mono-label text-secondary">{feature.eyebrow}</span>
                        <span className="mt-2 block text-base font-semibold leading-5 text-primary-foreground">
                          {feature.label}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-primary-foreground/40 transition group-hover/card:translate-x-0.5 group-hover/card:text-secondary group-focus-visible/card:text-secondary"
                        strokeWidth={1.75}
                      />
                    </span>
                    <span className="mt-3 block text-xs leading-5 text-primary-foreground/58">
                      {feature.description}
                    </span>
                  </a>
                ))}
              </div>

              <Button asChild className="mt-6 h-11 w-full rounded-full px-5 text-sm font-semibold" variant="secondary">
                <a href={item.ctaHref}>
                  {item.ctaLabel}
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
