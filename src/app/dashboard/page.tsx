import { Suspense } from "react";
import { fetchBrentData, fetchNews, TimeRange } from "./actions";
import { BrentChart } from "@/components/dashboard/brent-chart";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { TimeframePicker } from "@/components/dashboard/timeframe-picker";
import { NewsFeed } from "@/components/dashboard/news-feed";
import { NewsFeedSkeleton } from "@/components/dashboard/news-feed-skeleton";

async function ChartContainer({ range }: { range: TimeRange }) {
  const response = await fetchBrentData(range);

  if (!response.success || !response.data) {
    return (
      <div className="flex items-center justify-center h-[400px] border-2 border-dashed rounded-lg text-muted-foreground">
        {response.error || "Erro ao carregar dados do Brent"}
      </div>
    );
  }

  return <BrentChart data={response.data} />;
}

async function NewsContainer() {
  const response = await fetchNews();

  if (!response.success || !response.data) {
    return (
      <div className="flex items-center justify-center h-[600px] border-2 border-dashed rounded-lg text-muted-foreground">
        {response.error || "Erro ao carregar feed de notícias"}
      </div>
    );
  }

  return <NewsFeed articles={response.data} />;
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DashboardPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const range = (resolvedParams.range as TimeRange) || "1m";

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard de Commodities</h2>
          <p className="text-muted-foreground">Acompanhe preços e notícias do mercado de Petróleo Brent.</p>
        </div>
        <TimeframePicker />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <Suspense key={range} fallback={<DashboardSkeleton />}>
            <ChartContainer range={range} />
          </Suspense>
        </div>
        <div className="lg:col-span-3">
          <Suspense fallback={<NewsFeedSkeleton />}>
            <NewsContainer />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
