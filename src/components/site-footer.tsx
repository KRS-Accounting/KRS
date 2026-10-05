import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { NewsletterSignup } from "@/components/newsletter-signup";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";

type FooterLinkGroup = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

const legalStripLinks = [
  { label: "Terms of service", href: "/legal/terms-of-service" },
  { label: "Privacy policy", href: "/legal/privacy-policy" },
  { label: "Cookie policy", href: "/legal/cookies" },
  { label: "System status", href: "#" },
] as const;

const complianceBadges = [
  {
    alt: "GDPR Compliant",
    href: null,
    src: "/logos/compliance/gdpr.svg",
    title: "GDPR",
    subtitle: "Compliant",
  },
  {
    alt: "AICPA SOC 2",
    href: "#",
    src: "/logos/compliance/soc2.svg",
    title: "AICPA",
    subtitle: "SOC2",
  },
  {
    alt: "ISO 27001",
    href: "#",
    src: "/logos/compliance/iso27001.svg",
    title: "27001",
    subtitle: "ISO",
  },
] as const;

const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Services",
    links: [
      { label: "Tax Advisory", href: "/services/tax-advisory" },
      { label: "Bookkeeping", href: "/services/accounting" },
      { label: "Payroll", href: "/services/payroll" },
      { label: "Consulting Services", href: "/services/consulting" },
      { label: "Funding & Grants", href: "/services/funding-grants" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About KRS AI", href: "/about" },
      { label: "Why KRS AI", href: "/why" },
      { label: "Careers", href: "/careers" },
      { label: "Contact us", href: "/onboarding" },
    ],
  },
  {
    title: "Pricing",
    links: [
      { label: "Pricing plans", href: "/pricing" },
      { label: "Pricing calculator", href: "/pricing#calculator" },
    ],
  },
  {
    title: "Blog",
    links: [
      { label: "All articles", href: "/#field-notes" },
      { label: "Accounting", href: "/#field-notes" },
      { label: "Payroll", href: "/#field-notes" },
      { label: "Tax filings", href: "/#field-notes" },
      { label: "Tax tips", href: "/#field-notes" },
    ],
  },
];

function FooterLinkColumn({ group }: { group: FooterLinkGroup }) {
  return (
    <div>
      <h3 className="mono-label mb-4 text-primary-foreground/42">{group.title}</h3>
      <ul className="grid gap-2.5">
        {group.links.map((link) => (
          <li key={link.label}>
            <a
              className="text-sm leading-6 text-primary-foreground/68 transition-colors hover:text-primary-foreground"
              href={link.href}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComplianceBadge({
  badge,
}: {
  badge: (typeof complianceBadges)[number];
}) {
  const content = (
    <>
      <div className="flex items-center justify-center border-b border-border bg-muted px-2 py-2">
        <Image
          alt={badge.href ? "" : badge.alt}
          className="size-[50px]"
          height={50}
          src={badge.src}
          unoptimized
          width={50}
        />
      </div>
      <div className="px-1 py-1.5 text-center leading-[1.15] text-foreground">
        <p className="text-[10px] font-semibold tracking-tight">{badge.title}</p>
        <p className="text-[10px] text-muted-foreground">{badge.subtitle}</p>
      </div>
    </>
  );

  const className =
    "flex w-[66px] shrink-0 flex-col overflow-hidden rounded-lg bg-background shadow-[0_1px_2px_rgba(1,25,54,0.08)] ring-1 ring-border";

  if (!badge.href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <a
      aria-label={badge.alt}
      className={`${className} transition-transform hover:scale-[1.02] active:scale-[0.98] motion-reduce:transform-none`}
      href={badge.href}
    >
      {content}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-primary px-4 text-primary-foreground sm:px-6 lg:px-12">
      <div className="relative z-10 mx-auto max-w-[1400px] pb-[calc(min(42vw,520px)+100px)] pt-16">
        <div className="grid gap-14 border-b border-primary-foreground/12 pb-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <Link aria-label="KRS AI home" className="inline-flex items-center" href="/">
              <Image
                alt="KRS AI"
                className="h-[88px] w-auto"
                height={208}
                src="/logos/Full%20logo.svg"
                unoptimized
                width={504}
              />
            </Link>

            <p className="mt-8 max-w-sm text-sm leading-7 text-primary-foreground/68">
              Accounting, tax, payroll and advisory for Greek businesses. Prepared by AI, signed by people.
            </p>

            <SocialLinks className="mt-6" />

            <div className="mt-8 grid gap-5 text-sm leading-7 text-primary-foreground/68 sm:grid-cols-2">
              <address className="not-italic">
                <strong className="font-semibold text-primary-foreground">KRS AI Services</strong>
                <br />
                <a
                  className="transition-colors hover:text-primary-foreground"
                  href="https://www.google.com/maps/search/?api=1&query=KRS+Group+Leof.+Andrea+Siggrou+120+Athina+117+42"
                  rel="noreferrer"
                  target="_blank"
                >
                  Leof. Andrea Siggrou 120
                  <br />
                  Athina 117 42
                </a>
              </address>
              <p>
                <strong className="font-semibold text-primary-foreground">Contact</strong>
                <br />
                <a className="transition-colors hover:text-primary-foreground" href="tel:+302109341211">
                  +30 21 0934 1211
                </a>
                <br />
                <a className="transition-colors hover:text-primary-foreground" href="mailto:krs@krs.gr">
                  krs@krs.gr
                </a>
              </p>
            </div>

            <Button
              asChild
              className="mt-8 h-11 rounded-full bg-primary-foreground px-5 text-primary hover:bg-primary-foreground/90"
              variant="secondary"
            >
              <a href="/onboarding">
                Talk to KRS
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-6 lg:col-start-7">
            {footerLinkGroups.map((group) => (
              <FooterLinkColumn group={group} key={group.title} />
            ))}
          </nav>
        </div>

        <NewsletterSignup />

        <div className="pt-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <p className="max-w-4xl text-xs leading-6 text-primary-foreground/52">
              Your digital tax service with its own platform. The technical platform is operated by KRS AI Services.
              Reserved tasks are performed by licensed tax and accounting professionals. KRS AI Services and its
              licensed tax partners are separate legal entities cooperating as part of a network. Each entity is
              responsible only for its own acts and omissions to the extent permitted by law.
            </p>
            <div aria-label="Compliance certifications" className="flex shrink-0 gap-2">
              {complianceBadges.map((badge) => (
                <ComplianceBadge badge={badge} key={badge.title} />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-3 border-t border-primary-foreground/12 pt-4 lg:flex-row lg:items-center">
            <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-2">
              {legalStripLinks.map((link) => (
                <a
                  className="text-xs text-primary-foreground/52 transition-colors hover:text-primary-foreground"
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <p className="text-xs text-primary-foreground/36">© 2026 KRS.ai | All rights reserved.</p>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 translate-y-[200px]"
      >
        <Image
          alt=""
          className="h-auto w-full select-none"
          height={1435}
          sizes="100vw"
          src="/images/Footer-bg.png"
          width={2560}
        />
        <div className="absolute inset-x-0 top-0 h-[32%] bg-gradient-to-b from-primary to-transparent" />
      </div>
    </footer>
  );
}
