import { DraftBanner } from "@/components/draft-banner";
import { LocaleHtml } from "@/components/locale-html";
import { I18nProvider } from "@/i18n/provider";
import { getI18n } from "@/i18n/request";
import { isIndexableHost } from "@/lib/site";
import { headers } from "next/headers";

export default async function Template({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const indexable = isIndexableHost(headerList.get("host"));
  const { locale, pathname } = await getI18n();

  return (
    <I18nProvider locale={locale} pathname={pathname}>
      <LocaleHtml locale={locale} />
      {indexable ? null : <DraftBanner locale={locale} />}
      {children}
    </I18nProvider>
  );
}
