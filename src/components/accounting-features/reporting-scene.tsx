"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import type { FeatureSceneProps } from "@/components/accounting-features/demo-frame";
import { SceneHeader, UiBadge } from "@/components/services-bento/scene-ui";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const metrics = [
  { label: "Revenue", value: "€57,600", hint: "+12%", id: 0 },
  { label: "Gross margin", value: "71%", hint: "Apr", id: 1 },
  { label: "Cash on hand", value: "8.2 mo", hint: "Runway", id: 2 },
];

const chartData = [
  { month: "Nov", costs: 16400, profit: 25700 },
  { month: "Dec", costs: 16900, profit: 28900 },
  { month: "Jan", costs: 15800, profit: 28400 },
  { month: "Feb", costs: 16500, profit: 32100 },
  { month: "Mar", costs: 17000, profit: 34400 },
  { month: "Apr", costs: 16700, profit: 40900 },
];

const chartConfig = {
  costs: {
    label: "Direct costs",
    color: "var(--chart-1)",
  },
  profit: {
    label: "Gross profit",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

function euro(value: number, locale: "en" | "el") {
  return `€${Math.round(value).toLocaleString(locale === "el" ? "el-GR" : "en-IE")}`;
}

export function ReportingScene({ active, reducedMotion, focus }: FeatureSceneProps) {
  const { locale, tx } = useI18n();
  const ready = reducedMotion || active;
  const reportsReady = ready && focus >= 1;
  const decide = ready && focus >= 2;
  const chartTitle = tx(decide ? "Net cash €1,480" : reportsReady ? "Gross margin 71%" : "Revenue €57,600");
  const localizedChartConfig = {
    costs: { ...chartConfig.costs, label: tx(chartConfig.costs.label) },
    profit: { ...chartConfig.profit, label: tx(chartConfig.profit.label) },
  } satisfies ChartConfig;

  return (
    <div className="pointer-events-none relative flex h-full overflow-hidden p-3 sm:p-4">
      <div aria-hidden className="absolute inset-0 bg-[#eef1f4]" />
      <div
        aria-hidden
        className="absolute -top-16 -left-10 size-72 rounded-full bg-[radial-gradient(circle,var(--secondary)_0%,transparent_68%)] opacity-45 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-16 bottom-0 size-80 rounded-full bg-[radial-gradient(circle,var(--tertiary)_0%,transparent_70%)] opacity-40 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/3 size-56 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--chart-2)_0%,transparent_70%)] opacity-35 blur-3xl"
      />

      <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-white/80 bg-card/80 shadow-[0_28px_60px_-32px_rgba(1,25,54,0.55)] backdrop-blur-md">
      <SceneHeader subtitle="Management pack" title="March close">
        <UiBadge variant={reportsReady ? "secondary" : "outline"}>
          {reportsReady ? "Reports ready" : "Drafting"}
        </UiBadge>
      </SceneHeader>

      <div className="grid shrink-0 grid-cols-3 gap-2 px-3 pt-3">
        {metrics.map((metric, index) => (
          <Card
            className={cn(
              "gap-0 py-3 shadow-xs",
              focus === metric.id && ready && "ring-ring",
            )}
            data-demo-spot={index + 1}
            key={metric.label}
          >
            <CardHeader className="px-3">
              <CardDescription className="text-xs">{tx(metric.label)}</CardDescription>
              <CardTitle className="font-sans! text-xl font-semibold leading-none tracking-tight tabular-nums">
                {tx(metric.value)}
              </CardTitle>
              <CardAction>
                <Badge className="px-1.5 font-sans text-[10px]" variant="outline">
                  {tx(metric.hint)}
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-2 pt-2 pb-1">
        <div className="flex shrink-0 items-center justify-between gap-3 px-2">
          <p className="truncate text-[12px] font-medium tabular-nums">{chartTitle}</p>
          <p
            className={cn(
              "shrink-0 text-[10px] tabular-nums text-muted-foreground",
              decide && "font-medium text-foreground",
            )}
          >
            {tx("Apr cash")} +€1,480
          </p>
        </div>

        <ChartContainer
          className="aspect-auto h-auto min-h-[220px] w-full flex-1 pointer-events-auto"
          config={localizedChartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 0, right: 8, top: 12, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="month"
              tickFormatter={(value: string) => tx(value)}
              tickLine={false}
              tickMargin={8}
            />
            <YAxis
              axisLine={false}
              tickFormatter={(value: number) => `€${Math.round(value / 1000)}k`}
              tickLine={false}
              tickMargin={4}
              width={44}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex w-full items-center justify-between gap-4">
                      <span className="text-muted-foreground">
                        {localizedChartConfig[name as keyof typeof localizedChartConfig]?.label ?? name}
                      </span>
                      <span className="font-mono font-medium text-foreground tabular-nums">
                        {euro(Number(value), locale)}
                      </span>
                    </div>
                  )}
                  indicator="dot"
                  labelFormatter={(label, payload) => {
                    const row = payload?.[0]?.payload as { costs?: number; profit?: number } | undefined;
                    const revenue = (row?.costs ?? 0) + (row?.profit ?? 0);
                    return `${tx(String(label))} · ${euro(revenue, locale)} ${tx("revenue")}`;
                  }}
                />
              }
            />
            <defs>
              <linearGradient id="fillCosts" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="var(--color-costs)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-costs)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillProfit" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="var(--color-profit)" stopOpacity={0.85} />
                <stop offset="95%" stopColor="var(--color-profit)" stopOpacity={0.15} />
              </linearGradient>
            </defs>
            <Area
              dataKey="costs"
              fill="url(#fillCosts)"
              isAnimationActive={!reducedMotion}
              stackId="revenue"
              stroke="var(--color-costs)"
              strokeWidth={2}
              type="natural"
            />
            <Area
              dataKey="profit"
              fill="url(#fillProfit)"
              isAnimationActive={!reducedMotion}
              stackId="revenue"
              stroke="var(--color-profit)"
              strokeWidth={2}
              type="natural"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </div>
      </div>
    </div>
  );
}
