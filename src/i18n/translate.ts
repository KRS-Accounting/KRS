import elDraft from "@/content/el-draft.json";
import elServices from "@/content/el-services.json";

import type { Locale } from "@/i18n/locale";

const greek = {
  ...(elDraft as Record<string, string>),
  ...(elServices as Record<string, string>),
};

export type Translate = (value: string) => string;

export function translate(locale: Locale, value: string) {
  if (locale !== "el") return value;

  return greek[value] ?? value;
}
