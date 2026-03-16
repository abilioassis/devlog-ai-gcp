"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeRange } from "@/app/dashboard/actions";

const ranges: { value: TimeRange; label: string }[] = [
  { value: "1m", label: "1M" },
  { value: "6m", label: "6M" },
  { value: "1y", label: "1A" },
];

export function TimeframePicker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentRange = (searchParams.get("range") as TimeRange) || "1m";

  const handleRangeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("range", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Tabs value={currentRange} onValueChange={handleRangeChange} className="w-full sm:w-auto">
      <TabsList className="grid w-full grid-cols-3 h-9">
        {ranges.map((range) => (
          <TabsTrigger key={range.value} value={range.value} className="text-xs">
            {range.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
