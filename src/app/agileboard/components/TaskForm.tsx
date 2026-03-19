"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { createTask, updateTask } from "../actions";

const taskSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.date().optional().nullable(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormProps {
  bucketId?: string;
  initialData?: {
    id: string;
    title: string;
    priority: "low" | "medium" | "high";
    dueDate: Date | null;
  };
  onSuccess: () => void;
}

export function TaskForm({ bucketId, initialData, onSuccess }: TaskFormProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.title || "",
      priority: initialData?.priority || "medium",
      dueDate: initialData?.dueDate || null,
    },
  });

  async function onSubmit(values: TaskFormValues) {
    setIsPending(true);
    const formData = new FormData();
    if (bucketId) formData.append("bucketId", bucketId);
    formData.append("title", values.title);
    formData.append("priority", values.priority);
    if (values.dueDate) {
      formData.append("dueDate", values.dueDate.toISOString());
    }

    let result;
    if (initialData) {
      result = await updateTask(initialData.id, formData);
    } else if (bucketId) {
      result = await createTask(formData);
    } else {
      toast.error("Erro: Dados insuficientes para completar a ação.");
      setIsPending(false);
      return;
    }

    setIsPending(false);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(initialData ? "Tarefa atualizada com sucesso!" : "Tarefa criada com sucesso!");
      onSuccess();
      if (!initialData) form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Resumo da tarefa..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioridade</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Vencimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Selecione</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Salvar Alterações" : "Criar Tarefa"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
