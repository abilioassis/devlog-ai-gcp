"use client";

import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BucketForm } from "./BucketForm";

interface BucketDialogProps {
  planId?: string;
  initialData?: {
    id: string;
    name: string;
  };
  trigger: ReactNode;
}

export function BucketDialog({ planId, initialData, trigger }: BucketDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Bucket" : "Novo Bucket"}</DialogTitle>
          <DialogDescription>
            {initialData 
              ? "Altere o nome deste bucket para organizar melhor seu fluxo." 
              : "Adicione uma nova coluna ao seu quadro de tarefas."}
          </DialogDescription>
        </DialogHeader>
        <BucketForm 
          planId={planId} 
          initialData={initialData} 
          onSuccess={() => setIsOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
