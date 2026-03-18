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

export interface NewsArticle {
  title: string;
  source: string;
  date: string;
  url: string;
}

export interface FetchNewsResponse {
  success: boolean;
  data?: NewsArticle[];
  error?: string;
}

export async function fetchNews(): Promise<FetchNewsResponse> {
  try {
    // Simulando delay de rede para demonstrar o carregamento independente (Suspense)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockNews: NewsArticle[] = [
      {
        title: "Petróleo fecha em alta com tensões geopolíticas renovadas",
        source: "Reuters",
        date: new Date().toISOString(),
        url: "https://www.reuters.com/business/energy/",
      },
      {
        title: "OPEP+ sinaliza manutenção de cortes na produção até junho",
        source: "Bloomberg",
        date: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 horas atrás
        url: "https://www.bloomberg.com/energy",
      },
      {
        title: "Petrobras anuncia novos investimentos em campos maduros",
        source: "Valor Econômico",
        date: new Date(Date.now() - 86400000).toISOString(), // Ontem
        url: "https://valor.globo.com/empresas/energia/",
      },
      {
        title: "Estoques de óleo bruto nos EUA caem mais que o esperado",
        source: "CNBC",
        date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 dias atrás
        url: "https://www.cnbc.com/oil-gas/",
      },
      {
        title: "Demanda global por petróleo deve crescer em 2026, diz AIE",
        source: "Financial Times",
        date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 dias atrás
        url: "https://www.ft.com/commodities",
      },
    ];

    return {
      success: true,
      data: mockNews,
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      success: false,
      error: "Não foi possível carregar as notícias no momento.",
    };
  }
}
