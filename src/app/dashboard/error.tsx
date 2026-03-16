"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex h-[400px] w-full items-center justify-center p-4">
      <Card className="w-full max-w-md border-destructive">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <CardTitle>Erro ao carregar dados</CardTitle>
          </div>
          <CardDescription>
            Não foi possível obter a cotação do barril de petróleo neste momento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground break-all">
            {error.message || "A API pode estar indisponível."}
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => reset()} variant="outline" className="w-full">
            Tentar novamente
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
