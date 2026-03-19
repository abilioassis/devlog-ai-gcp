import { db } from "@/db";
import { plans } from "@/db/schema";

import { CreatePlanForm } from "./components/CreatePlanForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { desc } from "drizzle-orm";

export default async function AgileBoardDashboard() {
  const allPlans = await db.select().from(plans).orderBy(desc(plans.createdAt));

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">AgileBoard</h1>
        <p className="text-muted-foreground">
          Gerencie seus projetos e tarefas de forma ágil.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Criar Novo Plano</CardTitle>
            <CardDescription>Comece um novo quadro de planejamento.</CardDescription>
          </CardHeader>
          <CardContent>
            <CreatePlanForm />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Seus Planos</h2>
          {allPlans.length === 0 ? (
            <p className="text-muted-foreground italic">Nenhum plano criado ainda.</p>
          ) : (
            <div className="grid gap-4">
              {allPlans.map((plan) => (
                <Link key={plan.id} href={`/agileboard/${plan.id}`}>
                  <Card className="hover:bg-accent transition-colors cursor-pointer">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <CardDescription>
                        Criado em: {new Date(plan.createdAt).toLocaleDateString("pt-BR")}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
