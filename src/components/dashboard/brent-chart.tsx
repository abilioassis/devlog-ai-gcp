"use client";

import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BrentDataPoint } from "@/app/dashboard/actions";

interface BrentChartProps {
  data: BrentDataPoint[];
}

const chartConfig = {
  price: {
    label: "US$:",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    day: "numeric",
  }).format(date);
};

export function BrentChart({ data }: BrentChartProps) {
  const trendDescription = useMemo(() => {
    if (!data || data.length < 2) return "Dados insuficientes";
    const first = data[0].price;
    const last = data[data.length - 1].price;
    const diff = last - first;
    return `O preço do barril de petróleo Brent ${diff >= 0 ? "aumentou" : "caiu"} ${formatCurrency(Math.abs(diff))} nos últimos ${data.length} dias.`;
  }, [data]);

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader>
        <CardTitle>Preço do Petróleo Brent</CardTitle>
        <CardDescription>Histórico de preços por barril</CardDescription>
        <p className="sr-only">{trendDescription}</p>
      </CardHeader>
      <CardContent className="flex-1 min-h-[350px] w-full pb-6">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{ left: 0, right: 12, top: 12, bottom: 20 }}
            >
              <defs>
                <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                minTickGap={30}
                tickFormatter={formatDate}
                tick={{ fill: "var(--color-muted-foreground)" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={80}
                domain={["auto", "auto"]}
                tickFormatter={formatCurrency}
                tick={{ fill: "var(--color-muted-foreground)" }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent 
                    indicator="line" 
                    labelFormatter={formatDate}
                  />
                }
              />
              <Area
                dataKey="price"
                type="monotone"
                fill="url(#fillPrice)"
                fillOpacity={0.4}
                stroke="var(--color-price)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
