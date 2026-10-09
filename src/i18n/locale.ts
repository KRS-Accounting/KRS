export const locales = ["en", "el"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "el";
}

export function withLocale(locale: Locale, href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const bare = path.replace(/^\/(?:en|el)(?=\/|$)/, "") || "/";

  if (locale === defaultLocale) return `${bare}${hash}`;
  if (bare === "/") return `/${locale}${hash}`;

  return `/${locale}${bare}${hash}`;
}
