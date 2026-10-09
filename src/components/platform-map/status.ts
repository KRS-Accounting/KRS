export type ReviewStatus = "reviewed" | "prepared" | "waiting";

export const reviewStatuses = ["reviewed", "prepared", "waiting"] as const satisfies readonly ReviewStatus[];

export const statusMeta: Record<
  ReviewStatus,
  { label: string; short: string; description: string; color: string }
> = {
  reviewed: {
    label: "Advisor reviewed",
    short: "Reviewed",
    description: "KRS advisors make the calls that need judgment.",
    color: "#ae882f",
  },
  prepared: {
    label: "AI prepared",
    short: "AI prepared",
    description: "KRS technology gathers evidence, deadlines, and open questions.",
    color: "rgba(244, 239, 230, 0.78)",
  },
  waiting: {
    label: "Waiting on you",
    short: "Waiting on you",
    description: "Only the facts and approvals you can provide.",
    color: "#8aa0ba",
  },
};

export function countStatuses(items: readonly { status: ReviewStatus }[]) {
  const counts: Record<ReviewStatus, number> = { reviewed: 0, prepared: 0, waiting: 0 };
  for (const item of items) counts[item.status] += 1;
  return counts;
}

export function reviewedPercent(items: readonly { status: ReviewStatus }[]) {
  if (items.length === 0) return 0;
  return Math.round((countStatuses(items).reviewed / items.length) * 100);
}
