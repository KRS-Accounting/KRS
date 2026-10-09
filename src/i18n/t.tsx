import { getI18n } from "@/i18n/request";

export async function T({ text }: { text: string }) {
  const { tx } = await getI18n();

  return tx(text);
}
