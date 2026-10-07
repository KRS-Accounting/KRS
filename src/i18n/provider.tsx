"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import { translate } from "@/i18n/translate";
import { withLocale, type Locale } from "@/i18n/locale";

type I18nValue = {
  locale: Locale;
  pathname: string;
  tx: (value: string) => string;
  href: (path: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  locale,
  pathname,
  children,
}: {
  locale: Locale;
  pathname: string;
  children: ReactNode;
}) {
  const value = useMemo<I18nValue>(
    () => ({
      locale,
      pathname,
      tx: (text) => translate(locale, text),
      href: (path) => withLocale(locale, path),
    }),
    [locale, pathname],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);

  if (!value) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return value;
}
