import { LocaleHtml } from "@/components/locale-html";
import { I18nProvider } from "@/i18n/provider";
import { getI18n } from "@/i18n/request";

export default async function Template({ children }: { children: React.ReactNode }) {
  const { locale, pathname } = await getI18n();

  return (
    <I18nProvider locale={locale} pathname={pathname}>
      <LocaleHtml locale={locale} />
      {children}
    </I18nProvider>
  );
}
