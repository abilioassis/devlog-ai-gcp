import { db } from "@/db";
import { plans } from "@/db/schema";

import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Settings2 } from "lucide-react";

import Link from "next/link";
import { CreateTaskDialog } from "../components/create-task-dialog";
import { TaskCard } from "../components/TaskCard";
import { BucketDialog } from "../components/BucketDialog";

interface PlanBoardPageProps {
  params: Promise<{
    planId: string;
  }>;
}

export default async function PlanBoardPage({ params }: PlanBoardPageProps) {
  const { planId } = await params;

  const plan = await db.query.plans.findFirst({
    where: eq(plans.id, planId),
    with: {
      buckets: {
        with: {
          tasks: {
            orderBy: (tasks, { desc }) => [desc(tasks.createdAt)],
          },
        },
      },
    },
  });

  if (!plan) {
    notFound();
  }

  return (
    <div className="h-full flex flex-col space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/agileboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              AgileBoard
            </Link>
            <span className="text-muted-foreground">/</span>
            <h1 className="text-2xl font-bold tracking-tight">{plan.name}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Visualize e organize suas tarefas nos buckets.
          </p>
        </div>
        <BucketDialog 
          planId={planId}
          trigger={
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Novo Bucket
            </Button>
          }
        />
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-max">
          {plan.buckets.map((bucket) => (
            <div key={bucket.id} className="w-80 flex flex-col bg-muted/50 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground truncate">
                    {bucket.name}
                  </h3>
                  <BucketDialog
                    initialData={{ id: bucket.id, name: bucket.name }}
                    trigger={
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                        <Settings2 className="h-3 w-3" />
                      </Button>
                    }
                  />
                </div>
                <Badge variant="outline">{bucket.tasks.length}</Badge>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto max-h-[calc(100vh-250px)] pr-1 custom-scrollbar">
                {bucket.tasks.length > 0 ? (
                  bucket.tasks.map((task) => (
                    <TaskCard 
                      key={task.id} 
                      task={{...task, bucketId: bucket.id}} 
                      buckets={plan.buckets.map(b => ({ id: b.id, name: b.name }))} 
                    />
                  ))
                ) : (
                  <div className="text-center py-10 border-2 border-dashed rounded-lg bg-background/50">
                    <p className="text-xs text-muted-foreground">Sem tarefas</p>
                  </div>
                )}
              </div>

              <CreateTaskDialog 
                bucketId={bucket.id}
                trigger={
                  <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-primary">
                    <Plus className="mr-2 h-4 w-4" /> Adicionar tarefa
                  </Button>
                }
              />
            </div>
          ))}

          {/* New Bucket Placeholder */}
          <BucketDialog
            planId={planId}
            trigger={
              <div className="w-80 border-2 border-dashed rounded-lg flex items-center justify-center p-6 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-pointer group shrink-0">
                <div className="flex flex-col items-center gap-2">
                  <Plus className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Adicionar Bucket</span>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

