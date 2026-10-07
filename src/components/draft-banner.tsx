import type { Locale } from "@/i18n/locale";

export function DraftBanner({ locale }: { locale: Locale }) {
  if (locale !== "el") return null;

  return (
    <div className="border-b border-secondary/30 bg-secondary/15 px-4 py-2 text-center text-sm text-primary sm:px-6">
      Πρόχειρη ελληνική απόδοση για εσωτερικό έλεγχο. Δεν είναι το τελικό κείμενο.
    </div>
  );
}
