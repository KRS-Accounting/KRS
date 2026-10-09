import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { NewsletterSignup } from "@/components/newsletter-signup";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { getI18n } from "@/i18n/request";

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
      { label: "About KRS", href: "/about" },
      { label: "Why KRS", href: "/why" },
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
  badge: {
    alt: string;
    href?: string | null;
    src: string;
    subtitle: string;
    title: string;
  };
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

export async function SiteFooter() {
  const { tx, href } = await getI18n();

  return (
    <footer className="relative isolate overflow-hidden bg-primary px-4 text-primary-foreground sm:px-6 lg:px-12">
      <div className="relative z-10 mx-auto max-w-[1400px] pt-16">
        <div className="grid gap-14 border-b border-primary-foreground/12 pb-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <Link aria-label={tx("KRS home")} className="inline-flex items-center" href={href("/")}>
              <Image
                alt="KRS"
                className="h-[88px] w-auto"
                height={208}
                src="/logos/Full%20logo.svg"
                unoptimized
                width={504}
              />
            </Link>

            <p className="mt-8 max-w-sm text-sm leading-7 text-primary-foreground/68">
              {tx(
                "Accounting, tax, payroll, and advisory for businesses operating in Greece. Delivered by experienced professionals and supported by KRS technology.",
              )}
            </p>

            <SocialLinks className="mt-6" />

            <div className="mt-8 grid gap-5 text-sm leading-7 text-primary-foreground/68 sm:grid-cols-2">
              <address className="not-italic">
                <strong className="font-semibold text-primary-foreground">KRS Group</strong>
                <br />
                <a
                  className="transition-colors hover:text-primary-foreground"
                  href="https://www.google.com/maps/search/?api=1&query=KRS+120+Andrea+Syngrou+Avenue+Athens+117+42"
                  rel="noreferrer"
                  target="_blank"
                >
                  {tx("120 Andrea Syngrou Avenue")}
                  <br />
                  {tx("Athens 117 42")}
                </a>
              </address>
              <p>
                <strong className="font-semibold text-primary-foreground">{tx("Contact")}</strong>
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
              <a href={href("/onboarding")}>
                {tx("Talk to KRS")}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>

          <nav aria-label={tx("Footer")} className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-6 lg:col-start-7">
            {footerLinkGroups.map((group) => (
              <FooterLinkColumn group={{ ...group, title: tx(group.title), links: group.links.map((link) => ({ ...link, label: tx(link.label), href: href(link.href) })) }} key={group.title} />
            ))}
          </nav>
        </div>

        <NewsletterSignup />

        <div className="pt-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <p className="max-w-4xl text-xs leading-6 text-primary-foreground/52">
              {tx(
                "KRS provides technology-enabled accounting, tax, payroll, funding, and advisory services. Regulated accounting and tax work is performed by licensed KRS professionals.",
              )}
            </p>
            <div aria-label={tx("Compliance certifications")} className="flex shrink-0 gap-2">
              {complianceBadges.map((badge) => (
                <ComplianceBadge
                  badge={{ ...badge, alt: tx(badge.alt), subtitle: tx(badge.subtitle), title: tx(badge.title) }}
                  key={badge.title}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-3 border-t border-primary-foreground/12 pt-4 lg:flex-row lg:items-center">
            <nav aria-label={tx("Legal")} className="flex flex-wrap gap-x-4 gap-y-2">
              {legalStripLinks.map((link) => (
                <a
                  className="text-xs text-primary-foreground/52 transition-colors hover:text-primary-foreground"
                  href={link.href === "#" ? link.href : href(link.href)}
                  key={link.label}
                >
                  {tx(link.label)}
                </a>
              ))}
            </nav>
            <p className="text-xs text-primary-foreground/36">{tx("© 2026 KRS | All rights reserved.")}</p>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none relative -mx-4 mt-8 h-[clamp(200px,62vw,260px)] overflow-hidden sm:-mx-6 sm:mt-10 sm:h-[clamp(260px,52vw,340px)] md:h-[clamp(300px,42vw,420px)] lg:-mx-12 lg:mt-12 lg:h-[clamp(340px,36vw,460px)] xl:h-[clamp(420px,34vw,640px)]"
      >
        <Image
          alt=""
          className="absolute top-0 left-1/2 h-auto w-[175%] max-w-none -translate-x-1/2 -translate-y-[30%] select-none sm:w-[148%] sm:-translate-y-[32%] md:w-[124%] md:-translate-y-[34%] lg:w-[108%] lg:-translate-y-[36%] xl:w-full xl:-translate-y-[36%]"
          height={1435}
          sizes="100vw"
          src="/images/Footer-bg.png"
          width={2560}
        />
      </div>
    </footer>
  );
}
