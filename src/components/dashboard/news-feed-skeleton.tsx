import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function NewsFeedSkeleton() {
  return (
    <Card className="flex flex-col h-[600px] border-none shadow-lg bg-card/50">
      <CardHeader>
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-8 px-6 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-3 pb-6 border-b border-border/40 last:border-0">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
