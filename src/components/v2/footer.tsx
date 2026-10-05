import Image from "next/image";
import Link from "next/link";

import { bookCall, compliance, navServices } from "@/components/v2/content";
import { FadeUp, MagneticLink } from "@/components/v2/motion";

const groups = [
  { title: "Services", links: navServices.map(({ label, href }) => ({ label, href })) },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Why KRS", href: "/why" },
      { label: "Pricing", href: "/pricing" },
      { label: "Careers", href: "/careers" },
      { label: "Get started", href: bookCall.href },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of service", href: "/legal/terms-of-service" },
      { label: "Privacy policy", href: "/legal/privacy-policy" },
      { label: "Cookie policy", href: "/legal/cookies" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-500 px-5 pt-20 text-neutral-50 sm:px-8 lg:px-12 lg:pt-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="max-w-md text-balance text-[clamp(1.6rem,2.4vw,2.25rem)] font-light leading-[1.15] tracking-[-0.03em]">
              Accounting, tax, payroll and advisory for Greek businesses. Prepared by AI, signed by{" "}
              <span className="v2-em text-secondary-300">people.</span>
            </p>
            <div className="mt-10 grid gap-6 text-[15px] leading-relaxed text-neutral-50/60 sm:grid-cols-2">
              <address className="not-italic">
                <span className="block text-neutral-50">KRS AI Services</span>
                <a
                  className="transition-colors hover:text-neutral-50"
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
                <span className="block text-neutral-50">Contact</span>
                <a className="transition-colors hover:text-neutral-50" href="tel:+302109341211">
                  +30 21 0934 1211
                </a>
                <br />
                <a className="transition-colors hover:text-neutral-50" href="mailto:krs@krs.gr">
                  krs@krs.gr
                </a>
              </p>
            </div>
            <div className="mt-10">
              <MagneticLink href={bookCall.href} tone="light">
                {bookCall.label}
              </MagneticLink>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="text-[15px] text-neutral-50/45">{group.title}</p>
                <ul className="mt-5 grid gap-3">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link className="text-[15px] text-neutral-50/85 transition-colors hover:text-secondary-300" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-8 border-t border-neutral-50/10 pt-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-3xl text-xs leading-6 text-neutral-50/45">
            Your digital tax service with its own platform. The technical platform is operated by KRS AI Services.
            Reserved tasks are performed by licensed tax and accounting professionals. KRS AI Services and its licensed
            tax partners are separate legal entities cooperating as part of a network. Each entity is responsible only
            for its own acts and omissions to the extent permitted by law.
          </p>
          <ul aria-label="Compliance certifications" className="flex shrink-0 items-center gap-3">
            {compliance.map((badge) => (
              <li className="flex h-14 items-center rounded-2xl bg-neutral-50/6 px-4 ring-1 ring-neutral-50/10" key={badge.label}>
                <Image alt={badge.label} className="h-8 w-auto" height={40} src={badge.src} unoptimized width={40} />
              </li>
            ))}
          </ul>
        </div>

        <FadeUp className="mt-16 lg:mt-24" y={60}>
          <Image
            alt=""
            aria-hidden="true"
            className="h-auto w-full select-none opacity-95"
            height={208}
            src="/logos/Full%20logo.svg"
            unoptimized
            width={504}
          />
        </FadeUp>

        <div className="flex flex-col gap-2 border-t border-neutral-50/10 py-6 text-xs text-neutral-50/40 sm:flex-row sm:justify-between">
          <p>© 2026 KRS.ai. All rights reserved.</p>
          <p>Licensed accounting and tax practice in Greece since 2011.</p>
        </div>
      </div>
    </footer>
  );
}
