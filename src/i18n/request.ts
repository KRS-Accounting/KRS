import { headers } from "next/headers";

import { translate } from "@/i18n/translate";
import { defaultLocale, isLocale, withLocale, type Locale } from "@/i18n/locale";

export async function getI18n() {
  const headerList = await headers();
  const requested = headerList.get("x-krs-locale");
  const locale: Locale = isLocale(requested) ? requested : defaultLocale;
  const pathname = headerList.get("x-krs-pathname") ?? "/";

  return {
    locale,
    pathname,
    tx: (value: string) => translate(locale, value),
    href: (path: string) => withLocale(locale, path),
  };
}
