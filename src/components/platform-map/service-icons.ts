import type { LucideIcon } from "lucide-react";
import { Compass, HandCoins, Landmark, ReceiptText, UsersRound } from "lucide-react";

import type { PlatformServiceId } from "./data";

export const serviceIcons: Record<PlatformServiceId, LucideIcon> = {
  accounting: ReceiptText,
  "tax-advisory": Landmark,
  payroll: UsersRound,
  consulting: Compass,
  "funding-grants": HandCoins,
};
