"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
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
import { createBucket, updateBucket } from "../actions";

const bucketSchema = z.object({
  name: z.string().min(1, "O nome do bucket é obrigatório"),
});

type BucketFormValues = z.infer<typeof bucketSchema>;

interface BucketFormProps {
  planId?: string;
  initialData?: {
    id: string;
    name: string;
  };
  onSuccess: () => void;
}

export function BucketForm({ planId, initialData, onSuccess }: BucketFormProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<BucketFormValues>({
    resolver: zodResolver(bucketSchema),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  async function onSubmit(values: BucketFormValues) {
    setIsPending(true);
    const formData = new FormData();
    formData.append("name", values.name);
    if (planId) formData.append("planId", planId);

    let result;
    if (initialData) {
      result = await updateBucket(initialData.id, formData);
    } else if (planId) {
      result = await createBucket(formData);
    } else {
      toast.error("Erro: Dados insuficientes para completar a ação.");
      setIsPending(false);
      return;
    }

    setIsPending(false);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(initialData ? "Bucket atualizado com sucesso!" : "Bucket criado com sucesso!");
      onSuccess();
      if (!initialData) form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Bucket</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Backlog, Em Andamento..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Salvar Alterações" : "Criar Bucket"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
