"use client";

import { useActionState } from "react";
import { createPlan } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export function CreatePlanForm() {
  const [state, formAction, isPending] = useActionState(createPlan, null);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Input
          name="name"
          placeholder="Nome do Plano (Ex: Sprint 01)"
          required
          disabled={isPending}
        />
        {state?.error && (
          <p className="text-sm font-medium text-destructive">
            {state.error}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Criando...
          </>
        ) : (
          "Criar Plano"
        )}
      </Button>
    </form>
  );
}
