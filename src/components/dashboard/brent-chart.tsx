"use client";

import { useMemo, useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip as RechartsTooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const [targetPrice, setTargetPrice] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("brent-target-price");
    if (saved) {
      const price = parseFloat(saved);
      if (!isNaN(price)) {
        setTargetPrice(price);
        setInputValue(saved);
      }
    }
  }, []);

  const handleApplyAlert = () => {
    const price = parseFloat(inputValue);
    if (!isNaN(price)) {
      setTargetPrice(price);
      localStorage.setItem("brent-target-price", inputValue);
    } else {
      setTargetPrice(null);
      localStorage.removeItem("brent-target-price");
    }
  };

  const trendDescription = useMemo(() => {
    if (!data || data.length < 2) return "Dados insuficientes";
    const first = data[0].price;
    const last = data[data.length - 1].price;
    const diff = last - first;
    return `O preço do barril de petróleo Brent ${diff >= 0 ? "aumentou" : "caiu"} ${formatCurrency(Math.abs(diff))} nos últimos ${data.length} dias.`;
  }, [data]);

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Preço do Petróleo Brent</CardTitle>
            <CardDescription>Histórico de preços por barril</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="price-alert" className="text-xs font-medium text-muted-foreground px-1">
                Alerta de Preço (US$)
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="price-alert"
                  type="number"
                  placeholder="Ex: 85.00"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-24 h-9"
                />
                <Button onClick={handleApplyAlert} variant="outline" size="sm" className="h-9">
                  Definir
                </Button>
              </div>
            </div>
          </div>
        </div>
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
              {targetPrice !== null && (
                <ReferenceLine
                  y={targetPrice}
                  stroke="var(--destructive)"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  label={{
                    value: `Alerta: ${formatCurrency(targetPrice)}`,
                    position: "bottom",
                    fill: "var(--foreground)",
                    fontSize: 12,
                    fontWeight: "600",
                    offset: 10,
                  }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
