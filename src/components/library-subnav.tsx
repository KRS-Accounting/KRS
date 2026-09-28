"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const libraryLinks = [
  { href: "/design-system", label: "Design system", description: "Color, type, radius, shadow" },
  { href: "/components", label: "Components", description: "Buttons, fields, tabs, cards" },
  { href: "/lab", label: "Lab", description: "Section variants and retired blocks" },
] as const;

export function LibrarySubnav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-18 z-40 border-b border-primary/12 bg-background/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-12">
        <nav aria-label="Design library" className="flex min-w-0">
          {libraryLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                className={cn(
                  "relative px-4 py-4 text-sm font-semibold transition",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
                {active ? <span className="absolute inset-x-4 -bottom-px h-0.5 bg-secondary" /> : null}
              </Link>
            );
          })}
        </nav>
        <p className="hidden truncate text-xs text-muted-foreground sm:block">
          Tokens and primitives currently used on krs.ai
        </p>
      </div>
    </div>
  );
}
