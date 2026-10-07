export const locales = ["el", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "el";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "el" || value === "en";
}

export function withLocale(locale: Locale, href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const bare = path.replace(/^\/en(?=\/|$)/, "") || "/";

  if (locale === "el") return `${bare}${hash}`;
  if (bare === "/") return `/en${hash}`;

  return `/en${bare}${hash}`;
}
