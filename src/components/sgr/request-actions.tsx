'use client'

import { Button } from '@/components/ui/button';
import { approveRequest, rejectRequest } from '@/app/sgr/actions';
import { toast } from 'sonner';
import { useState } from 'react';

export function RequestActions({ requestId, currentStatus }: { requestId: string, currentStatus: string }) {
  const [isPending, setIsPending] = useState(false);

  if (currentStatus !== 'pending') {
    return null;
  }

  const handleApprove = async () => {
    setIsPending(true);
    const result = await approveRequest(requestId);
    if (result.success) {
      toast.success('Requisição aprovada com sucesso.');
    } else {
      toast.error(result.error || 'Erro ao aprovar requisição.');
    }
    setIsPending(false);
  };

  const handleReject = async () => {
    setIsPending(true);
    const result = await rejectRequest(requestId);
    if (result.success) {
      toast.success('Requisição reprovada com sucesso.');
    } else {
      toast.error(result.error || 'Erro ao reprovar requisição.');
    }
    setIsPending(false);
  };

  return (
    <div className="flex items-center gap-2 flex-nowrap">
      <Button variant="default" size="sm" onClick={handleApprove} disabled={isPending} className="bg-green-600 hover:bg-green-700 text-white">
        Aprovar
      </Button>
      <Button variant="destructive" size="sm" onClick={handleReject} disabled={isPending}>
        Reprovar
      </Button>
    </div>
  );
}
