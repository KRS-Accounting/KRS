import type { Metadata } from "next";

import { getI18n } from "@/i18n/request";

export async function pageMetadata({
  title,
  description,
  canonical,
}: {
  title: string;
  description?: string;
  canonical?: string;
}): Promise<Metadata> {
  const { tx } = await getI18n();

  return {
    title: tx(title),
    description: description ? tx(description) : undefined,
    alternates: canonical ? { canonical } : undefined,
  };
}
