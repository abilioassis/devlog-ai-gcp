"use server";

import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export interface BrentDataPoint {
  date: string;
  price: number;
}

export type TimeRange = "1m" | "6m" | "1y";

export interface FetchBrentResponse {
  success: boolean;
  data?: BrentDataPoint[];
  error?: string;
}

export async function fetchBrentData(timeRange: TimeRange = "1m"): Promise<FetchBrentResponse> {
  try {
    const validRanges = ["1m", "6m", "1y"];
    if (!validRanges.includes(timeRange as string)) {
      // Force safe fallback
      timeRange = "1m";
    }

    const today = new Date();
    const period1 = new Date();
    // Default config object allowed intervals for yahoo-finance2
    let interval: "1d" | "1wk" | "1mo" | "15m" | "60m" = "1d";

    switch (timeRange) {
      case "1m":
        period1.setMonth(today.getMonth() - 1);
        interval = "1d";
        break;
      case "6m":
        period1.setMonth(today.getMonth() - 6);
        interval = "1d";
        break;
      case "1y":
        period1.setFullYear(today.getFullYear() - 1);
        interval = "1d";
        break;
    }

    const queryOptions: any = {
      period1: period1.toISOString().split("T")[0],
      period2: today.toISOString().split("T")[0],
      interval,
    };

    const result: any[] = await yahooFinance.historical("BZ=F", queryOptions);

    if (!result || result.length === 0) {
      return { success: false, error: "Sem dados para este período" };
    }

    const data: BrentDataPoint[] = result.map((item: any) => ({
      date: item.date.toISOString(),
      price: Number(item.close?.toFixed(2) || 0),
    }));

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching Brent data:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
