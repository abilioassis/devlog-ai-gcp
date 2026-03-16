import { Suspense } from "react";
import { fetchBrentData, TimeRange } from "./actions";
import { BrentChart } from "@/components/dashboard/brent-chart";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { TimeframePicker } from "@/components/dashboard/timeframe-picker";

async function DashboardContent({ range }: { range: TimeRange }) {
  const response = await fetchBrentData(range);

  if (!response.success || !response.data) {
    throw new Error(response.error || "Failed to load data");
  }

  return <BrentChart data={response.data} />;
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DashboardPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const range = (resolvedParams.range as TimeRange) || "1m";

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard de Commodities</h2>
        <TimeframePicker />
      </div>
      
      <Suspense key={range} fallback={<DashboardSkeleton />}>
        <DashboardContent range={range} />
      </Suspense>
    </div>
  );
}
