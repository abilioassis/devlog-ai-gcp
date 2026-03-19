"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { TaskForm } from "./TaskForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { moveTask } from "../actions";
import { toast } from "sonner";
import { Loader2, MoveHorizontal } from "lucide-react";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    priority: "low" | "medium" | "high";
    dueDate: Date | null;
    bucketId: string;
  };
  buckets: {
    id: string;
    name: string;
  }[];
}

const priorityColors = {
  low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  high: "bg-red-500/10 text-red-500 border-red-500/20",
};

const priorityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
};

export function TaskCard({ task, buckets }: TaskCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  async function handleMoveTask(targetBucketId: string) {
    if (targetBucketId === task.bucketId) return;
    
    setIsMoving(true);
    const result = await moveTask(task.id, targetBucketId);
    setIsMoving(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Tarefa movida com sucesso!");
    }
  }

  return (
    <>
      <div
        className="group bg-background border rounded-lg p-3 space-y-3 hover:border-primary/50 transition-all shadow-sm cursor-default relative"
      >
        <div className="flex justify-between items-start gap-2">
          <p className="text-sm font-medium leading-tight">{task.title}</p>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Pencil className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <Badge 
              variant="outline" 
              className={cn("text-[10px] uppercase font-bold px-1.5 py-0 whitespace-nowrap", priorityColors[task.priority])}
            >
              {priorityLabels[task.priority]}
            </Badge>
            {task.dueDate && (
              <div className="flex items-center text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded whitespace-nowrap">
                <Calendar className="mr-1 h-3 w-3" />
                {format(new Date(task.dueDate), "dd/MM/yyyy")}
              </div>
            )}
          </div>

          <Select onValueChange={handleMoveTask} defaultValue={task.bucketId}>
            <SelectTrigger 
              className="h-6 w-auto border-none bg-muted hover:bg-muted/80 text-[10px] px-2 gap-1 focus:ring-0"
              disabled={isMoving}
            >
              {isMoving ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <MoveHorizontal className="h-3 w-3 opacity-50" />
              )}
              <SelectValue placeholder="Mover" />
            </SelectTrigger>
            <SelectContent align="end">
              {buckets.map((bucket) => (
                <SelectItem key={bucket.id} value={bucket.id} className="text-xs">
                  {bucket.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Tarefa</DialogTitle>
            <DialogDescription>
              Atualize as informações desta tarefa.
            </DialogDescription>
          </DialogHeader>
          <TaskForm 
            initialData={task} 
            onSuccess={() => setIsEditDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
