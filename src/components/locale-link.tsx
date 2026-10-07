"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { useI18n } from "@/i18n/provider";
import { withLocale } from "@/i18n/locale";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { locale } = useI18n();

  return <Link href={withLocale(locale, href)} {...props} />;
}
