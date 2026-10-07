"use client";

import { useEffect } from "react";

import type { Locale } from "@/i18n/locale";

export function LocaleHtml({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
